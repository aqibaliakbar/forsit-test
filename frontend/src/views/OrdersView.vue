<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import OrdersStatsCards from '@/components/orders/OrdersStatsCards.vue'
import OrdersTable from '@/components/orders/OrdersTable.vue'
import OrderDetailModal from '@/components/orders/OrderDetailModal.vue'
import EditOrderModal from '@/components/orders/EditOrderModal.vue'
import { SkeletonStatsCard, SkeletonTable } from '@/components/skeleton'

const ordersStore = useOrdersStore()

const searchQuery = ref('')
const statusFilter = ref('all')
const dateFilter = ref('all')
const selectedOrder = ref(null)
const showOrderModal = ref(false)
const showEditModal = ref(false)
const editingOrder = ref(null)
const newStatus = ref('')
const newPaymentStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const loading = computed(() => ordersStore.loading)

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

const filteredOrders = computed(() => {
  let orders = ordersStore.orders

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    orders = orders.filter(
      (order) =>
        order.orderNumber?.toLowerCase().includes(query) ||
        order.customerInfo?.name?.toLowerCase().includes(query) ||
        order.customerInfo?.email?.toLowerCase().includes(query),
    )
  }

  if (statusFilter.value !== 'all') {
    orders = orders.filter((order) => order.status === statusFilter.value)
  }

  if (dateFilter.value !== 'all') {
    const now = new Date()
    const filterDate = new Date()

    switch (dateFilter.value) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0)
        orders = orders.filter((order) => new Date(order.createdAt) >= filterDate)
        break
      case 'week':
        filterDate.setDate(now.getDate() - 7)
        orders = orders.filter((order) => new Date(order.createdAt) >= filterDate)
        break
      case 'month':
        filterDate.setMonth(now.getMonth() - 1)
        orders = orders.filter((order) => new Date(order.createdAt) >= filterDate)
        break
    }
  }

  return orders
})

const orderStats = computed(() => {
  const orders = ordersStore.orders
  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
  }
})

const viewOrder = (order) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const editOrder = (order) => {
  editingOrder.value = order
  newStatus.value = order.status
  newPaymentStatus.value = order.paymentStatus
  showEditModal.value = true
}

const updateBothStatuses = async () => {
  if (!editingOrder.value) return

  try {
    const promises = []

    if (newStatus.value && newStatus.value !== editingOrder.value.status) {
      promises.push(ordersStore.updateOrderStatus(editingOrder.value._id, newStatus.value))
    }

    if (newPaymentStatus.value && newPaymentStatus.value !== editingOrder.value.paymentStatus) {
      promises.push(ordersStore.updatePaymentStatus(editingOrder.value._id, newPaymentStatus.value))
    }

    if (promises.length > 0) {
      await Promise.all(promises)
      showEditModal.value = false
      editingOrder.value = null
      newStatus.value = ''
      newPaymentStatus.value = ''

      await refreshOrders()
    }
  } catch (error) {
    console.error('Error updating order:', error)
  }
}

const exportOrders = () => {
  const headers = [
    'Order ID',
    'Customer',
    'Email',
    'Date',
    'Items',
    'Gross Total',
    'Status',
    'Payment',
  ]
  const csvContent = [
    headers.join(','),
    ...filteredOrders.value.map((order) =>
      [
        order.orderNumber,
        order.customerInfo?.name,
        order.customerInfo?.email,
        new Date(order.createdAt).toLocaleDateString(),
        order.items?.length || 0,
        Math.round(order.totalAmount) || '0',
        order.status,
        order.paymentStatus,
      ].join(','),
    ),
  ].join('\n')

  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

const refreshOrders = async () => {
  await ordersStore.fetchOrders()
}

onMounted(() => {
  refreshOrders()
})
</script>

<template>
  <div class="space-y-6">
    <div class="page-header">
      <h1 class="page-title">Orders Management</h1>
      <p class="page-subtitle">Manage and track all customer orders</p>
    </div>

    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      <SkeletonStatsCard v-for="i in 7" :key="i" :show-subtitle="i === 7" />
    </div>

    <OrdersStatsCards v-else :order-stats="orderStats" />

    <SkeletonTable
      v-if="loading"
      :columns="[
        { name: 'Order ID', width: 'w-20' },
        { name: 'Customer', width: 'w-32' },
        { name: 'Date', width: 'w-20' },
        { name: 'Items', width: 'w-16' },
        { name: 'Gross Total', width: 'w-12' },
        { name: 'Status', width: 'w-20' },
        { name: 'Payment', width: 'w-16' },
        { name: 'Actions', width: 'w-20' },
      ]"
      :rows="5"
      :show-filters="true"
      :show-pagination="true"
    />

    <OrdersTable
      v-else
      :loading="loading"
      v-model:search-query="searchQuery"
      v-model:status-filter="statusFilter"
      v-model:date-filter="dateFilter"
      v-model:current-page="currentPage"
      :items-per-page="itemsPerPage"
      :total-pages="totalPages"
      :paginated-orders="paginatedOrders"
      :filtered-orders-length="filteredOrders.length"
      @refresh-orders="refreshOrders"
      @export-orders="exportOrders"
      @view-order="viewOrder"
      @edit-order="editOrder"
    />

    <OrderDetailModal v-model:show-order-modal="showOrderModal" :selected-order="selectedOrder" />

    <EditOrderModal
      v-model:show-edit-modal="showEditModal"
      v-model:new-status="newStatus"
      v-model:new-payment-status="newPaymentStatus"
      :editing-order="editingOrder"
      @update-both-statuses="updateBothStatuses"
    />
  </div>
</template>
