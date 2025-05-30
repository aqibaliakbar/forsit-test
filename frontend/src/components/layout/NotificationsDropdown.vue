<script setup>
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { getImageUrl } from '@/services/api'

defineProps({
  showNotifications: {
    type: Boolean,
    default: false,
  },
  lowStockProducts: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['close', 'go-to-inventory', 'go-to-product'])

// handle image loading errors
const imageErrors = ref(new Set())

const handleImageError = (productId) => {
  imageErrors.value.add(productId)
}

const getProductImageUrl = (product) => {
  if (product.images && product.images.length > 0) {
    return getImageUrl(product.images[0])
  }
  return null
}

const shouldShowFallback = (productId) => {
  return imageErrors.value.has(productId)
}
</script>

<template>
  <div v-if="showNotifications" class="fixed inset-0 z-50">
    <div class="absolute inset-0" @click="$emit('close')"></div>
    <div
      class="absolute top-16 sm:top-20 right-2 sm:right-4 w-[calc(100vw-1rem)] sm:w-96 max-w-md bg-slate-900 rounded-lg border border-slate-700 shadow-xl"
    >
      <!-- header -->
      <div class="flex items-center justify-between p-3 sm:p-4 border-b border-slate-700">
        <div class="flex items-center space-x-2">
          <ExclamationTriangleIcon class="h-5 w-5 text-amber-400" />
          <h3 class="text-base sm:text-lg font-semibold text-slate-100">Low Stock Alert</h3>
        </div>
        <button
          @click="$emit('close')"
          class="p-1 text-slate-400 hover:text-slate-300 rounded-md transition-colors"
        >
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>

      <!-- content -->
      <div class="max-h-64 sm:max-h-80 overflow-y-auto">
        <div v-if="lowStockProducts.length === 0" class="p-4 text-center">
          <p class="text-slate-400">No low stock items</p>
        </div>
        <div v-else class="p-3 sm:p-4 space-y-3">
          <div
            v-for="product in lowStockProducts.slice(0, 5)"
            :key="product._id"
            class="flex items-center justify-between p-2 sm:p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-800/70 transition-colors"
          >
            <div class="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <!-- Product Image -->
              <div
                class="relative h-8 w-8 sm:h-10 sm:w-10 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0"
              >
                <img
                  v-if="getProductImageUrl(product) && !shouldShowFallback(product._id)"
                  :src="getProductImageUrl(product)"
                  :alt="product.name"
                  class="h-full w-full object-cover"
                  @error="handleImageError(product._id)"
                  loading="lazy"
                />
                <!-- fallback when image fails to load  -->
                <div
                  v-else
                  class="h-full w-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center"
                >
                  <span class="text-xs sm:text-sm font-bold text-white">{{
                    product.name.charAt(0).toUpperCase()
                  }}</span>
                </div>
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-xs sm:text-sm font-medium text-slate-100 truncate">
                  {{ product.name }}
                </p>
                <p class="text-xs text-slate-400">
                  Stock: {{ product.stock }} / Threshold: {{ product.lowStockThreshold }}
                </p>
              </div>
            </div>

            <button
              @click="$emit('go-to-product', product._id)"
              class="px-2 sm:px-3 py-1 text-xs font-medium bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border border-blue-800 rounded-md transition-colors flex-shrink-0 ml-2"
            >
              View
            </button>
          </div>

          <div v-if="lowStockProducts.length > 5" class="text-center pt-2">
            <p class="text-xs text-slate-400">
              And {{ lowStockProducts.length - 5 }} more items...
            </p>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="p-3 sm:p-4 border-t border-slate-700">
        <button
          @click="$emit('go-to-inventory')"
          class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          View All Inventory
        </button>
      </div>
    </div>
  </div>
</template>
