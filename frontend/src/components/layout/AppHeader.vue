<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Bars3Icon, BellIcon } from '@heroicons/vue/24/outline'

defineProps({
  lowStockCount: {
    type: Number,
    default: 0,
  },
})

const route = useRoute()

const currentPageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
})
</script>

<template>
  <header class="header sticky top-0 z-30">
    <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center">
        <button
          @click="$emit('toggle-sidebar')"
          class="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <Bars3Icon class="h-6 w-6" />
        </button>
        <h2 class="ml-4 lg:ml-0 text-lg font-semibold text-slate-100">
          {{ currentPageTitle }}
        </h2>
      </div>

      <div class="flex items-center space-x-4">
        <!-- notifications -->
        <button
          @click="$emit('toggle-notifications')"
          class="p-2 text-slate-400 hover:text-slate-300 relative rounded-lg transition-all duration-200"
        >
          <BellIcon class="h-6 w-6" />
          <span
            v-if="lowStockCount > 0"
            class="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center"
          >
            {{ lowStockCount }}
          </span>
        </button>

        <!-- user menu -->
        <div
          class="flex items-center space-x-3 bg-slate-800/50 border border-slate-700 px-3 py-2 rounded-lg"
        >
          <div class="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span class="text-sm font-medium text-white">A</span>
          </div>
          <span class="text-sm font-medium text-slate-300">Admin</span>
        </div>
      </div>
    </div>
  </header>
</template>
