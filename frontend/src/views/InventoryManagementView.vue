<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowPathIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { useProductsStore } from '@/stores/products'
import InventoryStatsCards from '@/components/inventory/InventoryStatsCards.vue'
import InventoryFilters from '@/components/inventory/InventoryFilters.vue'
import ProductsTable from '@/components/inventory/ProductsTable.vue'
import { SkeletonStatsCard, SkeletonTable, SkeletonCard } from '@/components/skeleton'

const router = useRouter()
const productsStore = useProductsStore()

const filters = ref({
  search: '',
  category: '',
  stockStatus: '',
  sortBy: 'name',
})

const products = computed(() => productsStore.products)
const pagination = computed(() => productsStore.pagination)
const lowStockProducts = computed(() => productsStore.lowStockProducts)
const totalInventoryValue = computed(() => productsStore.totalInventoryValue)
const loading = computed(() => productsStore.loading)

const filteredProducts = computed(() => {
  let filtered = [...products.value]

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search),
    )
  }

  if (filters.value.category) {
    filtered = filtered.filter((product) => product.category === filters.value.category)
  }

  if (filters.value.stockStatus) {
    switch (filters.value.stockStatus) {
      case 'in-stock':
        filtered = filtered.filter((product) => product.stock > product.lowStockThreshold)
        break
      case 'low-stock':
        filtered = filtered.filter(
          (product) => product.stock <= product.lowStockThreshold && product.stock > 0,
        )
        break
      case 'out-of-stock':
        filtered = filtered.filter((product) => product.stock === 0)
        break
    }
  }

  filtered.sort((a, b) => {
    switch (filters.value.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'stock':
        return b.stock - a.stock
      case 'price':
        return b.price - a.price
      case 'createdAt':
        return new Date(b.createdAt) - new Date(a.createdAt)
      default:
        return 0
    }
  })

  return filtered
})

const handleFiltersChanged = (newFilters) => {
  filters.value = newFilters
}

const handleEditProduct = (productId) => {
  router.push(`/products/${productId}/edit`)
}

const refreshData = async () => {
  try {
    await productsStore.fetchProducts({ limit: 1000 })
  } catch (error) {
    console.error('Error refreshing data:', error)
  }
}

onMounted(() => {
  refreshData()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="page-header">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title">Inventory Management</h1>
          <p class="page-subtitle">
            Monitor stock levels, update inventory, and manage product availability.
          </p>
        </div>
        <div class="flex space-x-3">
          <button @click="refreshData" :disabled="loading" class="btn-secondary">
            <ArrowPathIcon class="h-4 w-4 mr-2" :class="{ 'animate-spin': loading }" />
            {{ loading ? 'Loading...' : 'Refresh' }}
          </button>
          <router-link to="/products/new" class="btn-primary">
            <PlusIcon class="h-4 w-4 mr-2" />
            Add Product
          </router-link>
        </div>
      </div>
    </div>

    <!-- Skeleton Stats Cards -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SkeletonStatsCard v-for="i in 4" :key="i" :show-change="true" />
    </div>

    <!-- Actual Stats Cards -->
    <InventoryStatsCards
      v-else
      :total-products="pagination.totalProducts"
      :low-stock-products="lowStockProducts"
      :total-inventory-value="totalInventoryValue"
      :products="products"
    />

    <!-- Skeleton Filters -->
    <SkeletonCard v-if="loading" :rows="2" />

    <!-- Actual Filters -->
    <InventoryFilters v-else @filters-changed="handleFiltersChanged" />

    <!-- Skeleton Table -->
    <SkeletonTable
      v-if="loading"
      :columns="[
        { name: 'Product', width: 'w-48' },
        { name: 'SKU', width: 'w-24' },
        { name: 'Category', width: 'w-24' },
        { name: 'Stock', width: 'w-16' },
        { name: 'Price', width: 'w-16' },
        { name: 'Status', width: 'w-20' },
        { name: 'Actions', width: 'w-20' },
      ]"
      :rows="10"
      :show-filters="false"
      :show-pagination="true"
    />

    <!-- Actual Table -->
    <ProductsTable
      v-else
      :products="products"
      :filtered-products="filteredProducts"
      @edit-product="handleEditProduct"
      @refresh-data="refreshData"
    />
  </div>
</template>
