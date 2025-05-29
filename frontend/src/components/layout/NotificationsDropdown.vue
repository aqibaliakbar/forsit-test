<script setup>
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

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
</script>

<template>
  <div v-if="showNotifications" class="fixed inset-0 z-50">
    <div class="absolute inset-0" @click="$emit('close')"></div>
    <div
      class="absolute top-20 right-4 w-96 bg-slate-900 rounded-lg border border-slate-700 shadow-xl"
    >
      <!-- header -->
      <div class="flex items-center justify-between p-4 border-b border-slate-700">
        <div class="flex items-center space-x-2">
          <ExclamationTriangleIcon class="h-5 w-5 text-amber-400" />
          <h3 class="text-lg font-semibold text-slate-100">Low Stock Alert</h3>
        </div>
        <button
          @click="$emit('close')"
          class="p-1 text-slate-400 hover:text-slate-300 rounded-md transition-colors"
        >
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>

      <!-- content -->
      <div class="max-h-80 overflow-y-auto">
        <div v-if="lowStockProducts.length === 0" class="p-4 text-center">
          <p class="text-slate-400">No low stock items</p>
        </div>
        <div v-else class="p-4 space-y-3">
          <div
            v-for="product in lowStockProducts.slice(0, 5)"
            :key="product._id"
            class="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-800/70 transition-colors"
          >
            <div class="flex items-center space-x-3">
              <div
                class="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center"
              >
                <span class="text-sm font-bold text-white">{{
                  product.name.charAt(0).toUpperCase()
                }}</span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-slate-100 truncate">{{ product.name }}</p>
                <p class="text-xs text-slate-400">
                  Stock: {{ product.stock }} / Threshold: {{ product.lowStockThreshold }}
                </p>
              </div>
            </div>
            <button
              @click="$emit('go-to-product', product._id)"
              class="px-3 py-1 text-xs font-medium bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border border-blue-800 rounded-md transition-colors"
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
      <div class="p-4 border-t border-slate-700">
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
