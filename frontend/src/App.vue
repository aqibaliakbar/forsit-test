<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'

const router = useRouter()
const productsStore = useProductsStore()

const sidebarOpen = ref(false)
const showNotifications = ref(false)

const dashboardRoutes = [
  'dashboard',
  'products',
  'product-create',
  'product-edit',
  'inventory',
  'orders',
  'revenue-analysis',
]

const isDashboardRoute = computed(() => {
  return dashboardRoutes.includes(router.currentRoute.value.name)
})

const lowStockCount = computed(() => {
  return productsStore.lowStockProducts.length
})

const lowStockProducts = computed(() => {
  return productsStore.lowStockProducts
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const closeNotifications = () => {
  showNotifications.value = false
}

const goToInventory = () => {
  router.push('/inventory')
  closeNotifications()
}

const goToProduct = (productId) => {
  router.push(`/products/${productId}/edit`)
  closeNotifications()
}

onMounted(() => {
  productsStore.fetchProducts({ limit: 100 })
})
</script>

<template>
  <div id="app">
    <DashboardLayout
      v-if="isDashboardRoute"
      :sidebar-open="sidebarOpen"
      :show-notifications="showNotifications"
      :low-stock-count="lowStockCount"
      :low-stock-products="lowStockProducts"
      @toggle-sidebar="toggleSidebar"
      @close-sidebar="closeSidebar"
      @toggle-notifications="toggleNotifications"
      @close-notifications="closeNotifications"
      @go-to-inventory="goToInventory"
      @go-to-product="goToProduct"
    >
      <router-view />
    </DashboardLayout>

    <!-- public layout -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
