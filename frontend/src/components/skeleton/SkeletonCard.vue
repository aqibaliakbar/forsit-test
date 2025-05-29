<script setup>
defineProps({
  rows: {
    type: Number,
    default: 3,
  },
  height: {
    type: String,
    default: 'auto',
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  iconPosition: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right', 'top'].includes(value),
  },
})
</script>

<template>
  <div class="card animate-pulse" :style="{ height }">
    <div class="card-body">
      <div v-if="iconPosition === 'top'" class="flex flex-col items-center space-y-4">
        <div v-if="showIcon" class="h-12 w-12 bg-slate-700 rounded-lg"></div>
        <div class="w-full space-y-3">
          <div v-for="i in rows" :key="i" class="space-y-2">
            <div
              class="h-4 bg-slate-700 rounded"
              :class="i === 1 ? 'w-3/4' : i === rows ? 'w-1/2' : 'w-full'"
            ></div>
          </div>
        </div>
      </div>

      <div v-else-if="iconPosition === 'left'" class="flex items-start space-x-4">
        <div v-if="showIcon" class="h-12 w-12 bg-slate-700 rounded-lg flex-shrink-0"></div>
        <div class="flex-1 space-y-3">
          <div v-for="i in rows" :key="i" class="space-y-2">
            <div
              class="h-4 bg-slate-700 rounded"
              :class="i === 1 ? 'w-3/4' : i === rows ? 'w-1/2' : 'w-full'"
            ></div>
          </div>
        </div>
      </div>

      <div v-else class="flex items-start justify-between">
        <div class="flex-1 space-y-3">
          <div v-for="i in rows" :key="i" class="space-y-2">
            <div
              class="h-4 bg-slate-700 rounded"
              :class="i === 1 ? 'w-3/4' : i === rows ? 'w-1/2' : 'w-full'"
            ></div>
          </div>
        </div>
        <div v-if="showIcon" class="h-12 w-12 bg-slate-700 rounded-lg ml-4 flex-shrink-0"></div>
      </div>
    </div>
  </div>
</template>
