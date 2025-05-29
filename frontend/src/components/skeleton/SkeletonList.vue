<script setup>
defineProps({
  items: {
    type: Number,
    default: 5,
  },
  showAvatar: {
    type: Boolean,
    default: true,
  },
  showActions: {
    type: Boolean,
    default: false,
  },
  itemHeight: {
    type: String,
    default: 'auto',
  },
})
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="i in items"
      :key="i"
      class="flex items-center space-x-4 p-4 bg-slate-800 rounded-lg animate-pulse"
      :style="{ height: itemHeight }"
    >
      <!-- icon -->
      <div v-if="showAvatar" class="h-10 w-10 bg-slate-700 rounded-full flex-shrink-0"></div>

      <!-- content -->
      <div class="flex-1 space-y-2">
        <div class="h-4 bg-slate-700 rounded w-3/4"></div>
        <div class="h-3 bg-slate-700 rounded w-1/2"></div>
      </div>

      <!-- actions -->
      <div v-if="showActions" class="flex space-x-2 flex-shrink-0">
        <div class="h-8 w-8 bg-slate-700 rounded"></div>
        <div class="h-8 w-8 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</template>
