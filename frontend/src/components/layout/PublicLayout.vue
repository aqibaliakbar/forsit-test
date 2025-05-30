<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import Toast from '@/components/toast/Toast.vue'
import PublicNavigation from './PublicNavigation.vue'
import PublicFooter from './PublicFooter.vue'
import ShoppingCartSidebar from './ShoppingCartSidebar.vue'

const router = useRouter()
const { showSuccess, showError, showWarning } = useToast()

const showCart = ref(false)
const cartItems = ref([])

const validCartItems = computed(() => {
  return cartItems.value.filter((item) => item && item.product && item.product._id)
})

const cartItemsCount = computed(() => {
  return validCartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const cartTotal = computed(() => {
  return validCartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

const toggleCart = () => {
  showCart.value = !showCart.value
}

const closeCart = () => {
  showCart.value = false
}

const updateCartQuantity = (productId, newQuantity) => {
  if (newQuantity <= 0) {
    removeFromCart(productId)
    return
  }

  const item = cartItems.value.find((item) => item.product._id === productId)
  if (item && newQuantity <= item.product.stock) {
    item.quantity = newQuantity
  }
}

const removeFromCart = (productId) => {
  const index = cartItems.value.findIndex((item) => item.product._id === productId)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const proceedToCheckout = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
  showCart.value = false

  router.push('/checkout').then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

const addToCart = (product, quantity = 1) => {
  if (product.stock <= 0) {
    showError('Out of Stock', `${product.name} is currently out of stock`)
    return
  }

  const existingItem = cartItems.value.find((item) => item.product._id === product._id)
  const currentQuantity = existingItem ? existingItem.quantity : 0
  const newTotalQuantity = currentQuantity + quantity

  if (newTotalQuantity > product.stock) {
    const availableQuantity = product.stock - currentQuantity
    if (availableQuantity > 0) {
      showWarning('Limited Stock', `Only ${availableQuantity} more items available`)
    } else {
      showError('Stock Limit Reached', `Maximum ${product.stock} items allowed`)
    }
    return
  }

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cartItems.value.push({
      product,
      quantity,
    })
  }

  showSuccess('Added to Cart', `${product.name} added to your cart`)
}

onMounted(() => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart)
      const validItems = parsedCart.filter(
        (item) =>
          item &&
          item.product &&
          item.product._id &&
          item.quantity &&
          typeof item.quantity === 'number',
      )
      cartItems.value = validItems

      if (validItems.length !== parsedCart.length) {
        localStorage.setItem('cart', JSON.stringify(validItems))
      }
    } catch (error) {
      console.error('Error loading saved cart:', error)
      localStorage.removeItem('cart')
      cartItems.value = []
    }
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
      if (e.newValue) {
        try {
          cartItems.value = JSON.parse(e.newValue)
        } catch (error) {
          console.error('Error parsing cart from storage event:', error)
          cartItems.value = []
        }
      } else {
        cartItems.value = []
      }
    }
  })
})

watch(
  cartItems,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true },
)

defineExpose({
  addToCart,
  cartItems,
  cartItemsCount,
  cartTotal,
})
</script>

<template>
  <div class="min-h-screen bg-slate-900 flex flex-col">
    <PublicNavigation :cart-items-count="cartItemsCount" @toggle-cart="toggleCart" />

    <main class="flex-1">
      <slot />
    </main>

    <PublicFooter />

    <ShoppingCartSidebar
      :show-cart="showCart"
      :cart-items="cartItems"
      @close="closeCart"
      @update-quantity="updateCartQuantity"
      @remove-item="removeFromCart"
      @proceed-checkout="proceedToCheckout"
    />

    <Toast />
  </div>
</template>
