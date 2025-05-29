<script setup>
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import NotificationsDropdown from './NotificationsDropdown.vue'

defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false,
  },
  showNotifications: {
    type: Boolean,
    default: false,
  },
  lowStockCount: {
    type: Number,
    default: 0,
  },
  lowStockProducts: {
    type: Array,
    default: () => [],
  },
})

</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <!-- Sidebar -->
    <AppSidebar :sidebar-open="sidebarOpen" />

    <!-- Mobile sidebar overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-40 lg:hidden" @click="$emit('close-sidebar')">
      <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
    </div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Header -->
      <AppHeader
        :low-stock-count="lowStockCount"
        @toggle-sidebar="$emit('toggle-sidebar')"
        @toggle-notifications="$emit('toggle-notifications')"
      />

      <!-- Page content -->
      <main class="py-6 animate-fade-in">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>

    <NotificationsDropdown
      :show-notifications="showNotifications"
      :low-stock-products="lowStockProducts"
      @close="$emit('close-notifications')"
      @go-to-inventory="$emit('go-to-inventory')"
      @go-to-product="$emit('go-to-product', $event)"
    />
  </div>
</template>
