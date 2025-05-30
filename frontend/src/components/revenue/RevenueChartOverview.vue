<script setup>
import { Line } from 'vue-chartjs'
import { ChartBarIcon } from '@heroicons/vue/24/outline'

defineProps({
  revenueChartData: {
    type: Object,
    required: true,
  },
  ordersChartData: {
    type: Object,
    required: true,
  },
  lineChartOptions: {
    type: Object,
    required: true,
  },
  ordersChartOptions: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="card">
      <div class="card-header">
        <h3 class="section-title">Net Revenue Trends</h3>
        <p class="text-sm text-slate-400">Net revenue over time (excl. tax & shipping)</p>
      </div>
      <div class="card-body">
        <div class="chart-container">
          <Line
            v-if="revenueChartData.datasets.length > 0"
            :data="revenueChartData"
            :options="lineChartOptions"
          />
          <div v-else class="flex items-center justify-center h-full">
            <div class="text-center">
              <ChartBarIcon class="mx-auto h-12 w-12 text-slate-500" />
              <p class="mt-2 text-sm text-slate-400">No data available</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="section-title">Order Trends</h3>
        <p class="text-sm text-slate-400">Number of orders over time</p>
      </div>
      <div class="card-body">
        <div class="chart-container">
          <Line
            v-if="ordersChartData.datasets.length > 0"
            :data="ordersChartData"
            :options="ordersChartOptions"
          />
          <div v-else class="flex items-center justify-center h-full">
            <div class="text-center">
              <ChartBarIcon class="mx-auto h-12 w-12 text-slate-500" />
              <p class="mt-2 text-sm text-slate-400">No data available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
