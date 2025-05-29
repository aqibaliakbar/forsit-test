<script setup>
defineProps({
  columns: {
    type: Array,
    default: () => [
      { name: 'Column 1', width: 'w-24' },
      { name: 'Column 2', width: 'w-32' },
      { name: 'Column 3', width: 'w-20' },
      { name: 'Column 4', width: 'w-16' },
      { name: 'Actions', width: 'w-20' },
    ],
  },
  rows: {
    type: Number,
    default: 5,
  },
  showFilters: {
    type: Boolean,
    default: true,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="space-y-6">
    <!-- Filters Skeleton -->
    <div v-if="showFilters" class="card">
      <div class="card-body">
        <div
          class="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0"
        >
          <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div class="h-10 bg-slate-700 rounded w-64 animate-pulse"></div>
            <div class="h-10 bg-slate-700 rounded w-32 animate-pulse"></div>
            <div class="h-10 bg-slate-700 rounded w-32 animate-pulse"></div>
          </div>
          <div class="flex space-x-3">
            <div class="h-10 bg-slate-700 rounded w-24 animate-pulse"></div>
            <div class="h-10 bg-slate-700 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Skeleton -->
    <div class="card">
      <div class="card-body p-0">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-700">
            <thead class="bg-slate-800">
              <tr>
                <th
                  v-for="column in columns"
                  :key="column.name"
                  class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                >
                  {{ column.name }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-slate-900 divide-y divide-slate-700">
              <tr v-for="i in rows" :key="i" class="animate-pulse">
                <td
                  v-for="(column, index) in columns"
                  :key="index"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  <!-- Actions column with buttons -->
                  <div v-if="column.name === 'Actions'" class="flex space-x-2">
                    <div class="h-6 w-6 bg-slate-700 rounded"></div>
                    <div class="h-6 w-6 bg-slate-700 rounded"></div>
                  </div>

                  <!-- Status-like columns with pills -->
                  <div
                    v-else-if="column.name.toLowerCase().includes('status')"
                    class="h-6 bg-slate-700 rounded-full w-20"
                  ></div>

                  <!-- Multi-line columns -->
                  <div
                    v-else-if="
                      column.name.toLowerCase().includes('customer') ||
                      column.name.toLowerCase().includes('date')
                    "
                    class="space-y-1"
                  >
                    <div class="h-4 bg-slate-700 rounded" :class="column.width"></div>
                    <div class="h-3 bg-slate-700 rounded w-3/4"></div>
                  </div>

                  <!-- Regular columns -->
                  <div v-else class="h-4 bg-slate-700 rounded" :class="column.width"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Skeleton -->
        <div v-if="showPagination" class="bg-slate-800 px-6 py-3 border-t border-slate-700">
          <div class="flex items-center justify-between">
            <div class="h-4 bg-slate-700 rounded w-48 animate-pulse"></div>
            <div class="flex space-x-2">
              <div class="h-8 bg-slate-700 rounded w-16 animate-pulse"></div>
              <div class="h-8 bg-slate-700 rounded w-20 animate-pulse"></div>
              <div class="h-8 bg-slate-700 rounded w-12 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
