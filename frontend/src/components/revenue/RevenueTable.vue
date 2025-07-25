<script setup>
import { ChartBarIcon } from '@heroicons/vue/24/outline'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  analytics: {
    type: Object,
    required: true,
  },
})

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
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3 class="section-title">Detailed Analytics</h3>
      <p class="text-sm text-slate-400">Breakdown by time period</p>
    </div>
    <div class="card-body p-0">
      <div class="overflow-x-auto relative">
        <div
          v-if="loading"
          class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center"
        >
          <div class="flex flex-col items-center space-y-4">
            <div
              class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"
            ></div>
            <p class="text-slate-300 text-sm">Loading analytics...</p>
          </div>
        </div>

        <table class="min-w-full divide-y divide-slate-700">
          <thead class="bg-slate-800">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
              >
                Period
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
              >
                Net Revenue
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
              >
                Orders
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
              >
                Avg Net Order Value
              </th>
            </tr>
          </thead>
          <tbody class="bg-slate-900 divide-y divide-slate-700">
            <tr
              v-for="item in analytics.analytics"
              :key="getPeriodLabel(item._id)"
              class="hover:bg-slate-800/50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">
                {{ getPeriodLabel(item._id) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-semibold">
                ${{ (item.netRevenue || 0).toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                {{ item.orderCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                ${{ Math.round((item.netRevenue || 0) / item.orderCount || 0) }}
              </td>
            </tr>
          </tbody>
        </table>

      
        <div
          v-if="!loading && (!analytics.analytics || analytics.analytics.length === 0)"
          class="p-8 text-center"
        >
          <ChartBarIcon class="mx-auto h-12 w-12 text-slate-400" />
          <p class="mt-2 text-sm text-slate-500">No analytics data available</p>
        </div>
      </div>
    </div>
  </div>
</template>
