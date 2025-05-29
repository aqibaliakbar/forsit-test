<script setup>
defineProps({
  height: {
    type: String,
    default: '400px',
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  showSubtitle: {
    type: Boolean,
    default: true,
  },
  chartType: {
    type: String,
    default: 'line',
    validator: (value) => ['line', 'bar', 'doughnut', 'pie'].includes(value),
  },
})
</script>

<template>
  <div class="card">
    <div v-if="showTitle || showSubtitle" class="card-header">
      <div v-if="showTitle" class="h-6 bg-slate-700 rounded w-48 mb-2 animate-pulse"></div>
      <div v-if="showSubtitle" class="h-4 bg-slate-700 rounded w-64 animate-pulse"></div>
    </div>
    <div class="card-body">
      <div class="chart-container animate-pulse" :style="{ height }">
        <!-- Chart Skeleton -->
        <div
          v-if="chartType === 'line' || chartType === 'bar'"
          class="h-full flex items-end justify-between space-x-2 p-4"
        >
          <div
            v-for="i in 8"
            :key="i"
            class="bg-slate-700 rounded-t"
            :style="{ height: `${Math.random() * 60 + 20}%`, width: '12%' }"
          ></div>
        </div>

        <!-- Pie Chart Skeleton -->
        <div v-else class="h-full flex items-center justify-center">
          <div class="relative">
            <div class="w-48 h-48 bg-slate-700 rounded-full"></div>
            <div
              v-if="chartType === 'doughnut'"
              class="absolute inset-8 bg-slate-900 rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
