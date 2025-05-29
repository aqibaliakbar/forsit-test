import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { orderAPI } from '@/services/api'

export const useOrdersStore = defineStore('orders', () => {
  // State
  const orders = ref([])
  const currentOrder = ref(null)
  const analytics = ref({
    summary: {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
    },
    analytics: [],
  })
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref({
    status: '',
    platform: '',
    startDate: '',
    endDate: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })

  // Getters
  const recentOrders = computed(() => {
    return orders.value.slice(0, 10)
  })

  const ordersByStatus = computed(() => {
    const statusGroups = {}
    orders.value.forEach((order) => {
      if (!statusGroups[order.status]) {
        statusGroups[order.status] = []
      }
      statusGroups[order.status].push(order)
    })
    return statusGroups
  })

  const ordersByPlatform = computed(() => {
    const platformGroups = {}
    orders.value.forEach((order) => {
      if (!platformGroups[order.platform]) {
        platformGroups[order.platform] = []
      }
      platformGroups[order.platform].push(order)
    })
    return platformGroups
  })

  const totalRevenue = computed(() => {
    return orders.value.reduce((total, order) => {
      return order.paymentStatus === 'paid' ? total + (order.totalAmount || 0) : total
    }, 0)
  })

  const averageOrderValue = computed(() => {
    const paidOrders = orders.value.filter((order) => order.paymentStatus === 'paid')
    return paidOrders.length > 0 ? totalRevenue.value / paidOrders.length : 0
  })

  // Actions
  const fetchOrders = async (params = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = {
        ...filters.value,
        ...params,
      }

      const response = await orderAPI.getOrders(queryParams)
      orders.value = response.data.orders
      pagination.value = response.data.pagination
    } catch (err) {
      error.value = err.message
      console.error('Error fetching orders:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchOrder = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await orderAPI.getOrderById(id)
      currentOrder.value = response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching order:', err)
    } finally {
      loading.value = false
    }
  }

  const createOrder = async (orderData) => {
    loading.value = true
    error.value = null

    try {
      const response = await orderAPI.createOrder(orderData)
      orders.value.unshift(response.data)
      return response
    } catch (err) {
      error.value = err.message
      console.error('Error creating order:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateOrderStatus = async (id, status) => {
    loading.value = true
    error.value = null

    try {
      const response = await orderAPI.updateOrderStatus(id, status)
      const index = orders.value.findIndex((o) => o._id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      return response
    } catch (err) {
      error.value = err.message
      console.error('Error updating order status:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePaymentStatus = async (id, paymentStatus) => {
    loading.value = true
    error.value = null

    try {
      const response = await orderAPI.updatePaymentStatus(id, paymentStatus)
      const index = orders.value.findIndex((o) => o._id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      return response
    } catch (err) {
      error.value = err.message
      console.error('Error updating payment status:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchRevenueAnalytics = async (params = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await orderAPI.getRevenueAnalytics(params)
      analytics.value = response.data
      return response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching revenue analytics:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getOrderStatusCounts = () => {
    const counts = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    }

    orders.value.forEach((order) => {
      if (Object.prototype.hasOwnProperty.call(counts, order.status)) {
        counts[order.status]++
      }
    })

    return counts
  }

  const getPlatformRevenue = () => {
    const platformRevenue = {}

    orders.value.forEach((order) => {
      if (order.paymentStatus === 'paid') {
        if (!platformRevenue[order.platform]) {
          platformRevenue[order.platform] = 0
        }
        platformRevenue[order.platform] += order.totalAmount
      }
    })

    return platformRevenue
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearError = () => {
    error.value = null
  }

  const resetCurrentOrder = () => {
    currentOrder.value = null
  }

  const resetAnalytics = () => {
    analytics.value = {
      summary: {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
      },
      analytics: [],
    }
  }

  return {
    // State
    orders,
    currentOrder,
    analytics,
    loading,
    error,
    pagination,
    filters,

    // Getters
    recentOrders,
    ordersByStatus,
    ordersByPlatform,
    totalRevenue,
    averageOrderValue,

    // Actions
    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    fetchRevenueAnalytics,
    getOrderStatusCounts,
    getPlatformRevenue,
    setFilters,
    clearError,
    resetCurrentOrder,
    resetAnalytics,
  }
})
