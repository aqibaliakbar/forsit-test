<script setup>
import {
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  analytics: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
    <div class="stats-card">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <CurrencyDollarIcon class="h-8 w-8 text-green-400" />
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-slate-400 truncate">Net Revenue</dt>
            <dd class="text-xs text-slate-500">(excl. tax & shipping)</dd>
            <dd class="text-2xl font-semibold text-slate-100">
              ${{ (analytics.summary?.netRevenue || 0).toLocaleString() }}
            </dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="stats-card">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <ClipboardDocumentListIcon class="h-8 w-8 text-blue-400" />
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-slate-400 truncate">Total Orders</dt>
            <dd class="text-2xl font-semibold text-slate-100">
              {{ (analytics.summary?.totalOrders || 0).toLocaleString() }}
            </dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="stats-card">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <ChartBarIcon class="h-8 w-8 text-yellow-400" />
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-slate-400 truncate">Avg Net Order Value</dt>
            <dd class="text-xs text-slate-500">(excl. tax & shipping)</dd>
            <dd class="text-2xl font-semibold text-slate-100">
              ${{ Math.round(analytics.summary?.averageNetOrderValue || 0) }}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
