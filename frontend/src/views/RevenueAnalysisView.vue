<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="page-header">
      <div class="min-w-0 flex-1">
        <h1 class="page-title">Revenue Analysis</h1>
        <p class="page-subtitle">
          Analyze your sales performance and revenue trends across different time periods and
          categories.
        </p>
      </div>
    </div>

    <!-- Skeleton Filters -->
    <SkeletonCard v-if="loading" :rows="2" />

    <!-- Actual Filters -->
    <RevenueFilters v-else v-model:filters="filters" @fetch-analytics="fetchAnalytics" />

    <!-- Skeleton Stats Cards -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SkeletonStatsCard v-for="i in 4" :key="i" />
    </div>

    <!-- Actual Stats Cards -->
    <RevenueStatsCards v-else :analytics="analytics" />

    <!-- Skeleton Charts and Table -->
    <div v-if="loading" class="space-y-6">
      <!-- Charts Grid Skeleton -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonChart chart-type="line" />
        <SkeletonChart chart-type="line" />
      </div>

      <!-- Table Skeleton -->
      <SkeletonCard :rows="8" height="400px" />
    </div>

    <!-- Actual Charts and Table -->
    <RevenueChartsAndTable
      v-else
      :loading="loading"
      :revenue-chart-data="revenueChartData"
      :orders-chart-data="ordersChartData"
      :line-chart-options="lineChartOptions"
      :orders-chart-options="ordersChartOptions"
      :analytics="analytics"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useOrdersStore } from '@/stores/orders'
import RevenueFilters from '@/components/revenue/RevenueFilters.vue'
import RevenueStatsCards from '@/components/revenue/RevenueStatsCards.vue'
import RevenueChartsAndTable from '@/components/revenue/RevenueChartsAndTable.vue'
import { SkeletonCard, SkeletonStatsCard, SkeletonChart } from '@/components/skeleton'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const ordersStore = useOrdersStore()

const filters = ref({
  period: 'daily',
  category: '',
  startDate: '',
  endDate: '',
})

const analytics = computed(() => ordersStore.analytics)
const loading = computed(() => ordersStore.loading)

const revenueChartData = computed(() => {
  const data = analytics.value.analytics
  if (!data || data.length === 0) {
    return { labels: [], datasets: [] }
  }

  const labels = data.map((item) => getPeriodLabel(item._id))

  return {
    labels,
    datasets: [
      {
        label: 'Net Revenue',
        data: data.map((item) => item.netRevenue || 0),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  }
})

const ordersChartData = computed(() => {
  const data = analytics.value.analytics
  if (!data || data.length === 0) {
    return { labels: [], datasets: [] }
  }

  const labels = data.map((item) => getPeriodLabel(item._id))

  return {
    labels,
    datasets: [
      {
        label: 'Orders',
        data: data.map((item) => item.orderCount),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  }
})

const lineChartOptions = {
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

const ordersChartOptions = {
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
      suggestedMax: 5,
      grid: {
        color: 'rgba(71, 85, 105, 0.3)',
      },
      ticks: {
        color: 'rgb(148, 163, 184)',
        stepSize: 1,
        callback: function (value) {
          return Number.isInteger(value) ? value : ''
        },
      },
    },
  },
}

const getPeriodLabel = (period) => {
  if (period.day) {
    return `${period.month}/${period.day}/${period.year}`
  } else if (period.week) {
    return `Week ${period.week}, ${period.year}`
  } else if (period.month) {
    return `${period.month}/${period.year}`
  } else {
    return period.year.toString()
  }
}

const fetchAnalytics = async () => {
  try {
    await ordersStore.fetchRevenueAnalytics(filters.value)
  } catch (error) {
    console.error('Error fetching analytics:', error)
  }
}

onMounted(() => {
  fetchAnalytics()
})
</script>
