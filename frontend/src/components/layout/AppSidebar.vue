<script setup>
import {
  HomeIcon,
  ChartBarIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/vue/24/outline'

defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false,
  },
})

const navigation = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    to: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'inventory',
    label: 'Inventory',
    to: '/inventory',
    icon: CubeIcon,
    activeRoutes: ['product-create', 'product-edit'],
  },
  {
    name: 'orders',
    label: 'Orders',
    to: '/orders',
    icon: ClipboardDocumentListIcon,
  },
  {
    name: 'revenue-analysis',
    label: 'Revenue Analysis',
    to: '/revenue-analysis',
    icon: ChartBarIcon,
  },
]
</script>

<template>
  <div
    class="fixed inset-y-0 left-0 z-50 w-64 sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="{ '-translate-x-full': !sidebarOpen }"
  >
    <!-- Logo Section -->
    <div
      class="flex items-center justify-center h-16 px-4 bg-slate-800/50 rounded-none border border-slate-700 p-3 text-center"
    >
      <router-link to="/">
        <div class="flex flex-col items-center justify-center">
          <img src="/forsit-logo.svg" alt="Forsit" class="h-8 w-auto" />
        </div>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="mt-6 px-4">
      <div class="space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="nav-link group"
          :class="[
            $route.name === item.name ||
            (item.activeRoutes && item.activeRoutes.includes($route.name))
              ? 'active'
              : '',
          ]"
        >
          <component
            :is="item.icon"
            class="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200"
          />
          {{ item.label }}
        </router-link>
      </div>
    </nav>

    <!-- Footer-->
    <div class="absolute bottom-4 left-4 right-4">
      <div class="bg-slate-800/50 rounded-lg border border-slate-700 p-3 text-center">
        <p class="text-xs text-slate-400">Forsit E-commerce</p>
      </div>
    </div>
  </div>
</template>
