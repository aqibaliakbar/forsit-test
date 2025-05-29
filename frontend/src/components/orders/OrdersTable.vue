<script setup>
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  searchQuery: {
    type: String,
    default: '',
  },
  statusFilter: {
    type: String,
    default: 'all',
  },
  dateFilter: {
    type: String,
    default: 'all',
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  paginatedOrders: {
    type: Array,
    required: true,
  },
  filteredOrdersLength: {
    type: Number,
    required: true,
  },
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString()
}

const getStatusBadgeClass = (status) => {
  const statusColors = {
    pending: 'bg-amber-900/50 text-amber-300 border border-amber-800',
    processing: 'bg-blue-900/50 text-blue-300 border border-blue-800',
    shipped: 'bg-purple-900/50 text-purple-300 border border-purple-800',
    delivered: 'bg-green-900/50 text-green-300 border border-green-800',
    cancelled: 'bg-red-900/50 text-red-300 border border-red-800',
  }
  return statusColors[status] || statusColors.pending
}

const getPaymentBadgeClass = (status) => {
  const statusColors = {
    paid: 'bg-green-900/50 text-green-300 border border-green-800',
    pending: 'bg-amber-900/50 text-amber-300 border border-amber-800',
    failed: 'bg-red-900/50 text-red-300 border border-red-800',
  }
  return statusColors[status] || statusColors.pending
}
</script>

<template>
  <div class="space-y-6">
    <!-- Filters and Actions -->
    <div class="card">
      <div class="card-body">
        <div
          class="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0"
        >
          <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <!-- Search -->
            <div class="relative">
              <MagnifyingGlassIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
              />
              <input
                :value="searchQuery"
                @input="$emit('update:searchQuery', $event.target.value)"
                type="text"
                placeholder="Search orders..."
                class="form-input pl-10 w-full sm:w-64"
              />
            </div>

            <!-- Status Filter -->
            <select
              :value="statusFilter"
              @change="$emit('update:statusFilter', $event.target.value)"
              class="form-select w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <!-- Date Filter -->
            <select
              :value="dateFilter"
              @change="$emit('update:dateFilter', $event.target.value)"
              class="form-select w-full sm:w-auto"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <button
              @click="$emit('refresh-orders')"
              class="btn-secondary w-full sm:w-auto"
              :disabled="loading"
            >
              <svg
                v-if="loading"
                class="animate-spin -ml-1 mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ loading ? 'Loading...' : 'Refresh' }}
            </button>
            <button @click="$emit('export-orders')" class="btn-outline w-full sm:w-auto">
              <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="card">
      <div class="card-body p-0">
        <div class="overflow-x-auto custom-scrollbar">
          <!-- Loading Overlay -->
          <div
            v-if="loading"
            class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div class="flex flex-col items-center space-y-4">
              <div
                class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"
              ></div>
              <p class="text-slate-300 text-sm">Loading orders...</p>
            </div>
          </div>

          <table class="min-w-full divide-y divide-slate-700">
            <thead class="bg-slate-800">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  Items
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  Gross Total
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  Payment
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-slate-900 divide-y divide-slate-700">
              <tr
                v-for="order in paginatedOrders"
                :key="order._id"
                class="hover:bg-slate-800/50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="font-mono text-blue-400 text-sm">#{{ order.orderNumber }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="font-medium text-slate-200 text-sm">{{
                      order.customerInfo?.name
                    }}</span>
                    <span class="text-xs text-slate-400">{{ order.customerInfo?.email }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="text-slate-200 text-sm">{{ formatDate(order.createdAt) }}</span>
                    <span class="text-xs text-slate-400">{{ formatTime(order.createdAt) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-slate-300 text-sm">{{ order.items?.length || 0 }} items</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="font-semibold text-green-400 text-sm"
                    >${{ Math.round(order.totalAmount) || '0' }}</span
                  >
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="badge" :class="getStatusBadgeClass(order.status)">
                    {{ order.status?.charAt(0).toUpperCase() + order.status?.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="badge" :class="getPaymentBadgeClass(order.paymentStatus)">
                    {{
                      order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1)
                    }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex space-x-2">
                    <button
                      @click="$emit('view-order', order)"
                      class="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                      title="View Order"
                    >
                      <EyeIcon class="w-4 h-4" />
                    </button>
                    <button
                      @click="$emit('edit-order', order)"
                      class="p-1 text-green-400 hover:text-green-300 transition-colors"
                      title="Edit Order"
                    >
                      <PencilIcon class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="!loading && paginatedOrders.length === 0" class="p-8 text-center">
            <ClipboardDocumentListIcon class="mx-auto h-12 w-12 text-slate-400" />
            <p class="mt-2 text-sm text-slate-500">No orders found</p>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredOrdersLength > 0"
          class="bg-slate-800 px-6 py-3 border-t border-slate-700"
        >
          <div class="flex items-center justify-between">
            <div class="text-sm text-slate-400">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
              {{ Math.min(currentPage * itemsPerPage, filteredOrdersLength) }} of
              {{ filteredOrdersLength }} orders
            </div>
            <div class="flex space-x-2">
              <button
                @click="$emit('update:currentPage', Math.max(1, currentPage - 1))"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span class="px-3 py-1 text-sm text-slate-300">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              <button
                @click="$emit('update:currentPage', Math.min(totalPages, currentPage + 1))"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
