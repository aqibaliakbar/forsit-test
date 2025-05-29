<script setup>
import { Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { ChartBarIcon, ChartPieIcon } from '@heroicons/vue/24/outline'
import { SkeletonChart, SkeletonStatsCard } from '@/components/skeleton'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

defineProps({
  revenueChartData: {
    type: Object,
    required: true,
  },
  orderStatusChartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    required: true,
  },
  doughnutOptions: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  secondaryStats: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="space-y-6">
    <!-- Secondary Stats Cards -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <SkeletonStatsCard v-for="i in 5" :key="i" />
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div v-for="stat in secondaryStats" :key="stat.name" class="stats-card">
        <div class="text-center">
          <p class="text-sm text-slate-400">{{ stat.name }}</p>
          <p class="text-xl font-semibold text-slate-100">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Chart -->
      <div v-if="isLoading">
        <SkeletonChart chart-type="line" />
      </div>
      <div v-else class="card">
        <div class="card-header">
          <h3 class="section-title">Net Revenue Trends</h3>
          <p class="text-sm text-slate-400">Last 30 days performance (excl. tax & shipping)</p>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <Line
              v-if="revenueChartData.datasets.length > 0"
              :data="revenueChartData"
              :options="chartOptions"
            />
            <div v-else class="flex items-center justify-center h-full">
              <div class="text-center">
                <ChartBarIcon class="mx-auto h-12 w-12 text-slate-400" />
                <p class="mt-2 text-sm text-slate-500">No revenue data available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Status Chart -->
      <div v-if="isLoading">
        <SkeletonChart chart-type="doughnut" />
      </div>
      <div v-else class="card">
        <div class="card-header">
          <h3 class="section-title">Order Status Distribution</h3>
          <p class="text-sm text-slate-400">Current order statuses</p>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <Doughnut
              v-if="orderStatusChartData.datasets.length > 0"
              :data="orderStatusChartData"
              :options="doughnutOptions"
            />
            <div v-else class="flex items-center justify-center h-full">
              <div class="text-center">
                <ChartPieIcon class="mx-auto h-12 w-12 text-slate-400" />
                <p class="mt-2 text-sm text-slate-500">No order data available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
