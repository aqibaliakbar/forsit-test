<script setup>
defineProps({
  showIcon: {
    type: Boolean,
    default: true,
  },
  showSubtitle: {
    type: Boolean,
    default: false,
  },
  showChange: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'warning', 'success', 'danger', 'primary'].includes(value),
  },
})
</script>

<template>
  <div
    class="stats-card animate-pulse"
    :class="`stats-card-${variant !== 'default' ? variant : ''}`"
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <!-- title -->
        <div class="h-4 bg-slate-700 rounded w-20 mb-2"></div>

        <!-- subtitle -->
        <div v-if="showSubtitle" class="h-3 bg-slate-700 rounded w-16 mb-2"></div>

        <!-- value -->
        <div class="h-8 bg-slate-700 rounded w-16 mb-1"></div>

        <!-- change indicator -->
        <div v-if="showChange" class="flex items-center mt-1 space-x-1">
          <div class="h-4 w-4 bg-slate-700 rounded"></div>
          <div class="h-4 bg-slate-700 rounded w-12"></div>
        </div>
      </div>

      <!-- Icon -->
      <div v-if="showIcon" class="h-12 w-12 bg-slate-700 rounded-lg"></div>
    </div>
  </div>
</template>
