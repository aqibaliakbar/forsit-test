<script setup>
import { PhotoIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'
import { getImageUrl } from '@/services/api'

defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
  cartTotal: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  taxAmount: {
    type: Number,
    required: true,
  },
  finalTotal: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="bg-slate-800 rounded-lg p-6">
    <h2 class="text-xl font-semibold text-white mb-6">Order Summary</h2>

    <!-- Cart Items -->
    <div class="space-y-4 mb-6">
      <div
        v-for="item in cartItems"
        :key="item.product._id"
        class="flex items-center space-x-3 bg-slate-700 p-3 rounded-lg"
      >
        <img
          v-if="item.product.images && item.product.images.length > 0"
          :src="getImageUrl(item.product.images[0])"
          :alt="item.product.name"
          class="w-16 h-16 object-cover rounded"
        />
        <div v-else class="w-16 h-16 bg-slate-600 rounded flex items-center justify-center">
          <PhotoIcon class="h-8 w-8 text-slate-400" />
        </div>

        <div class="flex-1">
          <h4 class="text-white font-medium">{{ item.product.name }}</h4>
          <p class="text-slate-400 text-sm">{{ item.product.category }}</p>
          <p class="text-slate-300 text-sm">${{ item.product.price }} × {{ item.quantity }}</p>
        </div>

        <div class="text-right">
          <p class="text-white font-semibold">
            ${{ (item.product.price * item.quantity).toFixed(2) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Order Totals -->
    <div class="border-t border-slate-700 pt-4 space-y-2">
      <div class="flex justify-between text-slate-300">
        <span>Subtotal:</span>
        <span>${{ cartTotal.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-slate-300">
        <span>Shipping:</span>
        <span>${{ shippingCost.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between text-slate-300">
        <span>Tax:</span>
        <span>${{ taxAmount.toFixed(2) }}</span>
      </div>
      <div
        class="border-t border-slate-600 pt-2 flex justify-between text-lg font-semibold text-white"
      >
        <span>Total:</span>
        <span>${{ finalTotal.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Security Notice -->
    <div class="mt-6 p-3 bg-slate-700 rounded-lg">
      <div class="flex items-start space-x-2">
        <ShieldCheckIcon class="h-5 w-5 text-green-400 mt-0.5" />
        <div>
          <p class="text-sm text-slate-300">Your payment information is secure and encrypted.</p>
        </div>
      </div>
    </div>
  </div>
</template>
