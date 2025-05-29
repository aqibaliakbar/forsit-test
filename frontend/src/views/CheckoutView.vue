<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { orderAPI } from '@/services/api'
import PublicLayout from '@/components/layout/PublicLayout.vue'
import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import OrderSummary from '@/components/checkout/OrderSummary.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const { showSuccess, showError, showWarning } = useToast()

const submitting = ref(false)
const orderNumber = ref('')
const cartItems = ref([])

const orderForm = ref({
  customerInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  shippingAddress: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  paymentMethod: 'credit_card',
  notes: '',
})

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

// Free shipping over $100
const shippingCost = computed(() => {
  return cartTotal.value > 100 ? 0 : 10
})

const taxAmount = computed(() => {
  return (cartTotal.value + shippingCost.value) * 0.08
})

const finalTotal = computed(() => {
  return cartTotal.value + shippingCost.value + taxAmount.value
})

// Methods
const submitOrder = async () => {
  submitting.value = true

  try {
    const orderData = {
      customerInfo: orderForm.value.customerInfo,
      shippingAddress: orderForm.value.shippingAddress,
      paymentMethod: orderForm.value.paymentMethod,
      notes: orderForm.value.notes,
      items: cartItems.value.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal: cartTotal.value,
      shippingCost: shippingCost.value,
      tax: taxAmount.value,
      totalAmount: finalTotal.value,
    }

    // Submit order
    const response = await orderAPI.createOrder(orderData)

    if (response.success) {
      orderNumber.value = response.data.orderNumber || response.data._id

      showSuccess(
        'Order Placed Successfully!',
        `Your order #${orderNumber.value} has been received and is being processed.`,
        5000,
      )

      localStorage.removeItem('cart')
      cartItems.value = []

      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'cart',
          newValue: null,
          oldValue: localStorage.getItem('cart'),
        }),
      )

      orderForm.value = {
        customerInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        },
        shippingAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
        paymentMethod: 'credit_card',
        notes: '',
      }

      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  } catch (error) {
    console.error('Error submitting order:', error)
    showError('There was an error processing your order. Please try again.')
  } finally {
    submitting.value = false
  }
}

// Load cart from localStorage
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })

  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart)
      // validate cart items and filter out invalid ones
      const validItems = parsedCart.filter(
        (item) =>
          item &&
          item.product &&
          item.product._id &&
          item.quantity &&
          typeof item.quantity === 'number',
      )
      cartItems.value = validItems

      // invalid items, update localStorage
      if (validItems.length !== parsedCart.length) {
        localStorage.setItem('cart', JSON.stringify(validItems))
      }
    } catch (error) {
      console.error('Error loading cart data:', error)
      localStorage.removeItem('cart')
      cartItems.value = []
    }
  }

  if (cartItems.value.length === 0) {
    showWarning('Your cart is empty.')
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }
})
</script>

<template>
  <PublicLayout>
    <div class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-white">Checkout</h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CheckoutForm
            v-model:order-form="orderForm"
            :submitting="submitting"
            :final-total="finalTotal"
            @submit-order="submitOrder"
          />

          <OrderSummary
            :cart-items="cartItems"
            :cart-total="cartTotal"
            :shipping-cost="shippingCost"
            :tax-amount="taxAmount"
            :final-total="finalTotal"
          />
        </div>
      </div>
    </div>
  </PublicLayout>
</template>
