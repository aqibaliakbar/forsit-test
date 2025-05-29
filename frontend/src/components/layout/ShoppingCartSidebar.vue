<script setup>
import { computed } from 'vue'
import {
  XMarkIcon,
  ShoppingCartIcon,
  PhotoIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { getImageUrl } from '@/services/api'

const props = defineProps({
  showCart: {
    type: Boolean,
    default: false,
  },
  cartItems: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'update-quantity', 'remove-item', 'proceed-checkout'])

const validCartItems = computed(() => {
  return props.cartItems.filter((item) => item && item.product && item.product._id)
})

const cartTotal = computed(() => {
  return validCartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
})

const updateCartQuantity = (productId, newQuantity) => {
  emit('update-quantity', productId, newQuantity)
}

const removeFromCart = (productId) => {
  emit('remove-item', productId)
}

const proceedToCheckout = () => {
  emit('proceed-checkout')
}
</script>

<template>
  <div v-if="showCart" class="fixed inset-0 z-50 overflow-hidden" @click="$emit('close')">
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="absolute right-0 top-0 h-full w-96 bg-slate-800 shadow-xl" @click.stop>
      <div class="flex flex-col h-full">
        <!-- Cart Header -->
        <div class="flex items-center justify-between p-4 border-b border-slate-700">
          <h3 class="text-lg font-semibold text-white">Shopping Cart</h3>
          <button @click="$emit('close')" class="text-slate-400 hover:text-white">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="validCartItems.length === 0" class="text-center py-8">
            <ShoppingCartIcon class="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p class="text-slate-400">Your cart is empty</p>
            <button @click="$emit('close')" class="mt-4 text-blue-400 hover:text-blue-300 text-sm">
              Continue Shopping
            </button>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="item in validCartItems"
              :key="item.product._id"
              class="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg"
            >
              <img
                v-if="item.product.images && item.product.images.length > 0"
                :src="getImageUrl(item.product.images[0])"
                :alt="item.product.name"
                class="w-12 h-12 object-cover rounded"
              />
              <div v-else class="w-12 h-12 bg-slate-600 rounded flex items-center justify-center">
                <PhotoIcon class="h-6 w-6 text-slate-400" />
              </div>

              <div class="flex-1">
                <h4 class="text-white font-medium text-sm">{{ item.product.name }}</h4>
                <p class="text-slate-400 text-xs">
                  ${{ item.product.price }} × {{ item.quantity }}
                </p>
              </div>

              <div class="flex items-center space-x-1">
                <button
                  @click="updateCartQuantity(item.product._id, item.quantity - 1)"
                  class="text-slate-400 hover:text-white"
                >
                  <MinusIcon class="h-4 w-4" />
                </button>
                <span class="text-white text-sm w-8 text-center">{{ item.quantity }}</span>
                <button
                  @click="updateCartQuantity(item.product._id, item.quantity + 1)"
                  class="text-slate-400 hover:text-white"
                >
                  <PlusIcon class="h-4 w-4" />
                </button>
              </div>

              <button
                @click="removeFromCart(item.product._id)"
                class="text-red-400 hover:text-red-300"
              >
                <TrashIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Footer -->
        <div v-if="validCartItems.length > 0" class="border-t border-slate-700 p-4">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-white">Total:</span>
            <span class="text-xl font-bold text-blue-400">${{ cartTotal.toFixed(2) }}</span>
          </div>
          <button
            @click="proceedToCheckout"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
