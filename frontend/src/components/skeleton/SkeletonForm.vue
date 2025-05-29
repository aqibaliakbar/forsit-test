<script setup>
defineProps({
  fields: {
    type: Array,
    default: () => [
      { type: 'input', label: true, width: 'full' },
      { type: 'input', label: true, width: 'half' },
      { type: 'select', label: true, width: 'half' },
      { type: 'textarea', label: true, width: 'full' },
    ],
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  showButtons: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <!-- Form Title -->
      <div v-if="showTitle" class="mb-6">
        <div class="h-6 bg-slate-700 rounded w-48 mb-2 animate-pulse"></div>
        <div class="h-4 bg-slate-700 rounded w-64 animate-pulse"></div>
      </div>

      <!-- Form Fields -->
      <div class="space-y-6">
        <div
          v-for="(field, index) in fields"
          :key="index"
          :class="field.width === 'half' ? 'grid grid-cols-2 gap-4' : 'space-y-4'"
        >
          <div v-if="field.width === 'half'" class="space-y-2">
            <!-- first half field -->
            <div v-if="field.label" class="h-4 bg-slate-700 rounded w-20 animate-pulse"></div>
            <div class="h-10 bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div v-if="field.width === 'half'" class="space-y-2">
            <!-- second half field -->
            <div v-if="field.label" class="h-4 bg-slate-700 rounded w-24 animate-pulse"></div>
            <div class="h-10 bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div v-else class="space-y-2">
            <!-- full width field -->
            <div v-if="field.label" class="h-4 bg-slate-700 rounded w-32 animate-pulse"></div>
            <div
              v-if="field.type === 'textarea'"
              class="h-24 bg-slate-700 rounded animate-pulse"
            ></div>
            <div v-else class="h-10 bg-slate-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- buttons -->
      <div
        v-if="showButtons"
        class="flex justify-end space-x-3 mt-6 pt-6 border-t border-slate-700"
      >
        <div class="h-10 bg-slate-700 rounded w-20 animate-pulse"></div>
        <div class="h-10 bg-slate-700 rounded w-16 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>
