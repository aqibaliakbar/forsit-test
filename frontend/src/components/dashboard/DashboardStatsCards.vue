<script setup>
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/outline'
import { SkeletonStatsCard } from '@/components/skeleton'

defineProps({
  mainStats: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <SkeletonStatsCard v-for="i in 4" :key="i" :show-change="true" />
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div v-for="stat in mainStats" :key="stat.name" class="stats-card" :class="stat.cardClass">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">{{ stat.name }}</p>
          <p v-if="stat.subtitle" class="text-xs text-slate-500">{{ stat.subtitle }}</p>
          <p class="text-2xl font-bold" :class="stat.valueColor">{{ stat.value }}</p>
          <div v-if="stat.change" class="flex items-center mt-1">
            <component
              :is="stat.changeType === 'increase' ? ArrowUpIcon : ArrowDownIcon"
              class="h-4 w-4 mr-1"
              :class="stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'"
            />
            <span
              class="text-sm"
              :class="stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'"
            >
              {{ stat.change }}
            </span>
          </div>
        </div>
        <div class="p-3 rounded-lg" :class="stat.iconBg">
          <component :is="stat.icon" class="h-6 w-6" :class="stat.iconColor" />
        </div>
      </div>
    </div>
  </div>
</template>
