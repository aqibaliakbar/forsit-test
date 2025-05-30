<script setup>
import {
  CubeIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  totalProducts: {
    type: Number,
    default: 0,
  },
  lowStockProducts: {
    type: Array,
    default: () => [],
  },
  totalInventoryValue: {
    type: Number,
    default: 0,
  },
  products: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-4">
    <div class="stats-card">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Total Products</p>
          <p class="text-2xl font-bold text-slate-100">{{ totalProducts }}</p>
        </div>
        <div class="p-3 bg-blue-900/30 rounded-lg">
          <CubeIcon class="h-6 w-6 text-blue-400" />
        </div>
      </div>
    </div>

    <div class="stats-card stats-card-warning">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Low Stock Items</p>
          <p class="text-2xl font-bold text-amber-400">{{ lowStockProducts.length }}</p>
        </div>
        <div class="p-3 bg-amber-900/30 rounded-lg">
          <ExclamationTriangleIcon class="h-6 w-6 text-amber-400" />
        </div>
      </div>
    </div>

    <div class="stats-card stats-card-success">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Inventory Value</p>
          <p class="text-2xl font-bold text-green-400">
            ${{ totalInventoryValue.toLocaleString() }}
          </p>
        </div>
        <div class="p-3 bg-green-900/30 rounded-lg">
          <CurrencyDollarIcon class="h-6 w-6 text-green-400" />
        </div>
      </div>
    </div>

    <div class="stats-card stats-card-success">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">In Stock</p>
          <p class="text-2xl font-bold text-green-400">
            {{ products.filter((p) => p.stock >= p.lowStockThreshold).length }}
          </p>
        </div>
        <div class="p-3 bg-green-900/30 rounded-lg">
          <CheckCircleIcon class="h-6 w-6 text-green-400" />
        </div>
      </div>
    </div>
  </div>
</template>
