<script setup>
import { ref, computed, onMounted } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import {
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import { useProductsStore } from '@/stores/products'
import { useOrdersStore } from '@/stores/orders'
import DashboardStatsCards from '@/components/dashboard/DashboardStatsCards.vue'
import DashboardCharts from '@/components/dashboard/DashboardCharts.vue'
import DashboardRecentActivity from '@/components/dashboard/DashboardRecentActivity.vue'

const productsStore = useProductsStore()
const ordersStore = useOrdersStore()

const loading = ref(false)
const isLoading = ref(false)

const previousPeriodData = ref({
  netRevenue: 0,
  totalOrders: 0,
  totalProducts: 0,
  averageNetOrderValue: 0,
})

const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? '+100%' : '0%'
  const change = ((current - previous) / previous) * 100
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}

const getChangeType = (current, previous) => {
  return current >= previous ? 'increase' : 'decrease'
}

const mainStats = computed(() => {
  const currentNetRevenue =
    ordersStore.analytics.summary.netRevenue ||
    ordersStore.analytics.summary.totalRevenue ||
    ordersStore.totalRevenue ||
    0
  const currentTotalOrders =
    ordersStore.analytics.summary.totalOrders || ordersStore.orders.length || 0
  const currentTotalProducts = productsStore.pagination.totalProducts || 0
  const currentAvgOrderValue =
    ordersStore.analytics.summary.averageNetOrderValue ||
    ordersStore.analytics.summary.averageOrderValue ||
    ordersStore.averageOrderValue ||
    0

  return [
    {
      name: 'Net Revenue',
      subtitle: '(excl. tax & shipping)',
      value: `$${currentNetRevenue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      iconColor: 'text-green-400',
      iconBg: 'bg-green-900/30',
      valueColor: 'text-green-400',
      cardClass: 'stats-card-success',
      change: calculatePercentageChange(currentNetRevenue, previousPeriodData.value.netRevenue),
      changeType: getChangeType(currentNetRevenue, previousPeriodData.value.netRevenue),
    },
    {
      name: 'Total Orders',
      value: currentTotalOrders.toLocaleString(),
      icon: ClipboardDocumentListIcon,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-900/30',
      valueColor: 'text-blue-400',
      cardClass: 'stats-card-primary',
      change: calculatePercentageChange(currentTotalOrders, previousPeriodData.value.totalOrders),
      changeType: getChangeType(currentTotalOrders, previousPeriodData.value.totalOrders),
    },
    {
      name: 'Total Products',
      value: currentTotalProducts.toLocaleString(),
      icon: CubeIcon,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-900/30',
      valueColor: 'text-amber-400',
      cardClass: 'stats-card-warning',
      change: calculatePercentageChange(
        currentTotalProducts,
        previousPeriodData.value.totalProducts,
      ),
      changeType: getChangeType(currentTotalProducts, previousPeriodData.value.totalProducts),
    },
    {
      name: 'Avg Net Order',
      subtitle: '(excl. tax & shipping)',
      value: `$${Math.round(currentAvgOrderValue)}`,
      icon: UsersIcon,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-900/30',
      valueColor: 'text-purple-400',
      cardClass: '',
      change: calculatePercentageChange(
        currentAvgOrderValue,
        previousPeriodData.value.averageNetOrderValue,
      ),
      changeType: getChangeType(
        currentAvgOrderValue,
        previousPeriodData.value.averageNetOrderValue,
      ),
    },
  ]
})

const secondaryStats = computed(() => {
  const orders = ordersStore.orders
  const products = productsStore.products

  return [
    {
      name: 'Pending Orders',
      value: orders.filter((o) => o.status === 'pending').length,
    },
    {
      name: 'Processing',
      value: orders.filter((o) => o.status === 'processing').length,
    },
    {
      name: 'Delivered',
      value: orders.filter((o) => o.status === 'delivered').length,
    },
    {
      name: 'Low Stock Items',
      value: products.filter((p) => p.stock <= p.lowStockThreshold).length,
    },
    {
      name: 'Categories',
      value: [...new Set(products.map((p) => p.category))].length,
    },
  ]
})

const recentOrders = computed(() => {
  return ordersStore.orders.slice(0, 10)
})

const lowStockProducts = computed(() => {
  return productsStore.lowStockProducts
})

const revenueChartData = computed(() => {
  const analytics = ordersStore.analytics.analytics

  if (!analytics || analytics.length === 0) {
    const orders = ordersStore.orders
    if (orders.length === 0) {
      return { labels: [], datasets: [] }
    }

    const last30Days = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      last30Days.push(date.toISOString().split('T')[0])
    }

    const dailyRevenue = {}
    last30Days.forEach((date) => {
      dailyRevenue[date] = 0
    })

    orders.forEach((order) => {
      if (order.paymentStatus === 'paid' && order.createdAt) {
        const orderDate = new Date(order.createdAt).toISOString().split('T')[0]
        if (orderDate in dailyRevenue) {
          dailyRevenue[orderDate] += order.totalAmount || 0
        }
      }
    })

    return {
      labels: last30Days.map((date) => {
        const d = new Date(date)
        return `${d.getMonth() + 1}/${d.getDate()}`
      }),
      datasets: [
        {
          label: 'Net Revenue',
          data: last30Days.map((date) => dailyRevenue[date]),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    }
  }

  const labels = analytics.map((item) => {
    if (item._id.day) {
      return `${item._id.month}/${item._id.day}`
    } else if (item._id.month) {
      return `${item._id.year}/${item._id.month}`
    } else {
      return item._id.year.toString()
    }
  })

  return {
    labels,
    datasets: [
      {
        label: 'Net Revenue',
        data: analytics.map((item) => item.netRevenue || item.totalRevenue || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }
})

const orderStatusChartData = computed(() => {
  const orders = ordersStore.orders
  const statusCounts = {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  }

  orders.forEach((order) => {
    if (Object.prototype.hasOwnProperty.call(statusCounts, order.status)) {
      statusCounts[order.status]++
    }
  })

  const statuses = Object.keys(statusCounts).filter((status) => statusCounts[status] > 0)

  if (statuses.length === 0) {
    return { labels: [], datasets: [] }
  }

  return {
    labels: statuses.map((status) => status.charAt(0).toUpperCase() + status.slice(1)),
    datasets: [
      {
        data: statuses.map((status) => statusCounts[status]),
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: 'rgb(226, 232, 240)',
      bodyColor: 'rgb(203, 213, 225)',
      borderColor: 'rgb(71, 85, 105)',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(71, 85, 105, 0.3)',
      },
      ticks: {
        color: 'rgb(148, 163, 184)',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(71, 85, 105, 0.3)',
      },
      ticks: {
        color: 'rgb(148, 163, 184)',
        callback: function (value) {
          return '$' + value.toLocaleString()
        },
      },
    },
  },
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'rgb(203, 213, 225)',
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: 'rgb(226, 232, 240)',
      bodyColor: 'rgb(203, 213, 225)',
      borderColor: 'rgb(71, 85, 105)',
      borderWidth: 1,
    },
  },
}

const fetchPreviousPeriodData = async () => {
  try {
    const endDate = new Date()
    endDate.setDate(endDate.getDate() - 30)
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - 30)

    const previousAnalytics = await ordersStore.fetchRevenueAnalytics({
      period: 'daily',
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    })

    previousPeriodData.value = {
      netRevenue:
        previousAnalytics.summary?.netRevenue || previousAnalytics.summary?.totalRevenue || 0,
      totalOrders: previousAnalytics.summary?.totalOrders || 0,
      averageNetOrderValue:
        previousAnalytics.summary?.averageNetOrderValue ||
        previousAnalytics.summary?.averageOrderValue ||
        0,
      totalProducts: Math.max(0, productsStore.pagination.totalProducts - 10),
    }
  } catch (error) {
    console.error('Error fetching previous period data:', error)
    const currentRevenue =
      ordersStore.analytics.summary.totalRevenue || ordersStore.totalRevenue || 0
    const currentOrders =
      ordersStore.analytics.summary.totalOrders || ordersStore.orders.length || 0
    const currentAvgOrder =
      ordersStore.analytics.summary.averageOrderValue || ordersStore.averageOrderValue || 0

    previousPeriodData.value = {
      netRevenue: currentRevenue * 0.9,
      totalOrders: Math.max(0, currentOrders - Math.ceil(currentOrders * 0.1)),
      totalProducts: Math.max(0, productsStore.pagination.totalProducts - 5),
      averageNetOrderValue: currentAvgOrder * 0.95,
    }
  }
}

const refreshData = async () => {
  loading.value = true
  isLoading.value = true
  try {
    await Promise.all([
      productsStore.fetchProducts({ limit: 100 }),
      ordersStore.fetchOrders({ limit: 50 }),
      ordersStore.fetchRevenueAnalytics({ period: 'daily' }),
    ])

    await fetchPreviousPeriodData()
  } catch (error) {
    console.error('Error refreshing data:', error)
  } finally {
    loading.value = false
    isLoading.value = false
  }
}

onMounted(() => {
  refreshData()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="page-header">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title">Dashboard Overview</h1>
          <p class="page-subtitle">
            Welcome back! Here's what's happening with your e-commerce business.
          </p>
        </div>
        <div class="flex space-x-3">
          <button @click="refreshData" :disabled="loading" class="btn-primary">
            <ArrowPathIcon class="h-4 w-4 mr-2" :class="{ 'animate-spin': loading }" />
            {{ loading ? 'Loading...' : 'Refresh' }}
          </button>
        </div>
      </div>
    </div>

    <DashboardStatsCards :main-stats="mainStats" :is-loading="isLoading" />

    <DashboardCharts
      :revenue-chart-data="revenueChartData"
      :order-status-chart-data="orderStatusChartData"
      :chart-options="chartOptions"
      :doughnut-options="doughnutOptions"
      :is-loading="isLoading"
      :secondary-stats="secondaryStats"
    />

    <DashboardRecentActivity :recent-orders="recentOrders" :low-stock-products="lowStockProducts" />
  </div>
</template>
