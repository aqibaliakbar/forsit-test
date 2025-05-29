<script setup>
import {
  ShoppingBagIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  recentOrders: {
    type: Array,
    required: true,
  },
  lowStockProducts: {
    type: Array,
    required: true,
  },
})

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'badge-warning',
    processing: 'badge-primary',
    shipped: 'badge-primary',
    delivered: 'badge-success',
    cancelled: 'badge-danger',
  }
  return classes[status] || 'badge-gray'
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="card">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <h3 class="section-title">Recent Orders</h3>
          <router-link to="/orders" class="text-sm text-blue-400 hover:text-blue-300">
            View all orders →
          </router-link>
        </div>
      </div>
      <div class="card-body p-0">
        <div v-if="recentOrders.length > 0" class="divide-y divide-slate-800">
          <div
            v-for="order in recentOrders.slice(0, 5)"
            :key="order._id"
            class="p-4 hover:bg-slate-800/50 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-900/30 rounded-lg">
                  <ShoppingBagIcon class="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-200">#{{ order.orderNumber }}</p>
                  <p class="text-xs text-slate-400">{{ order.customerInfo?.name }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-green-400">
                  ${{ Math.round(order.totalAmount) }}
                </p>
                <span class="badge" :class="getStatusBadgeClass(order.status)">
                  {{ order.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-8 text-center">
          <ShoppingBagIcon class="mx-auto h-12 w-12 text-slate-400" />
          <p class="mt-2 text-sm text-slate-500">No recent orders</p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <h3 class="section-title">Low Stock Alerts</h3>
          <router-link to="/inventory" class="text-sm text-blue-400 hover:text-blue-300">
            View inventory →
          </router-link>
        </div>
      </div>
      <div class="card-body p-0">
        <div v-if="lowStockProducts.length > 0" class="divide-y divide-slate-800">
          <div
            v-for="product in lowStockProducts.slice(0, 5)"
            :key="product._id"
            class="p-4 hover:bg-slate-800/50 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-amber-900/30 rounded-lg">
                  <ExclamationTriangleIcon class="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-200">{{ product.name }}</p>
                  <p class="text-xs text-slate-400">{{ product.category }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-red-400">{{ product.stock }} left</p>
                <p class="text-xs text-slate-500">Min: {{ product.lowStockThreshold }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-8 text-center">
          <CheckCircleIcon class="mx-auto h-12 w-12 text-green-400" />
          <p class="mt-2 text-sm text-slate-500">All products are well stocked!</p>
        </div>
      </div>
    </div>
  </div>
</template>
