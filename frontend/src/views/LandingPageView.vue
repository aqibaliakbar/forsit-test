<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import PublicLayout from '@/components/layout/PublicLayout.vue'
import HeroSection from '@/components/landing-page/HeroSection.vue'
import ProductGrid from '@/components/landing-page/ProductGrid.vue'
import ProductDetailsModal from '@/components/landing-page/ProductDetailsModal.vue'
import { useToast } from '@/composables/useToast'

const productsStore = useProductsStore()
const layoutRef = ref(null)
const { showWarning } = useToast()

const showProductModal = ref(false)
const selectedProduct = ref(null)

const products = computed(() => productsStore.products)
const loading = computed(() => productsStore.loading)

const openProductDetails = (product) => {
  selectedProduct.value = product
  showProductModal.value = true
}

const closeProductDetails = () => {
  showProductModal.value = false
  selectedProduct.value = null
}

const handleModalAddToCart = ({ product, quantity }) => {
  if (layoutRef.value) {
    layoutRef.value.addToCart(product, quantity)
  }
  closeProductDetails()
}

const handleAddToCart = ({ product, quantity }) => {
  const existingCartItem = layoutRef.value?.cartItems.find(
    (item) => item.product._id === product._id,
  )
  const currentCartQuantity = existingCartItem ? existingCartItem.quantity : 0

  if (currentCartQuantity + quantity > product.stock) {
    showWarning(
      'Insufficient Stock',
      `Cannot add ${quantity} items. Only ${product.stock - currentCartQuantity} available.`,
    )
    return
  }

  if (layoutRef.value) {
    layoutRef.value.addToCart(product, quantity)
  }
}

const loadProducts = async () => {
  try {
    await productsStore.fetchProducts({ limit: 1000 })
  } catch (error) {
    console.error('Error loading products:', error)
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <PublicLayout ref="layoutRef">
    <HeroSection />

    <!-- Skeleton Product Grid -->
    <section v-if="loading" class="py-16 bg-slate-950">
      <div class="container mx-auto px-4">
        <!-- Search and Filter Skeleton -->
        <div class="flex flex-col md:flex-row gap-4 mb-8">
          <div class="flex-1">
            <div class="h-12 bg-slate-800 rounded-lg animate-pulse"></div>
          </div>
          <div class="md:w-48">
            <div class="h-12 bg-slate-800 rounded-lg animate-pulse"></div>
          </div>
          <div class="md:w-32">
            <div class="h-12 bg-slate-800 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <!-- Product Grid Skeleton -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="i in 12"
            :key="i"
            class="bg-slate-800 rounded-lg overflow-hidden animate-pulse"
          >
            <!-- Product Image Skeleton -->
            <div class="h-48 bg-slate-700"></div>

            <!-- Product Content Skeleton -->
            <div class="p-4 space-y-3">
              <div class="h-4 bg-slate-700 rounded w-3/4"></div>
              <div class="h-3 bg-slate-700 rounded w-1/2"></div>
              <div class="h-6 bg-slate-700 rounded w-20"></div>

              <!-- Add to Cart Button Skeleton -->
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center space-x-2">
                  <div class="h-8 w-8 bg-slate-700 rounded"></div>
                  <div class="h-6 bg-slate-700 rounded w-8"></div>
                  <div class="h-8 w-8 bg-slate-700 rounded"></div>
                </div>
                <div class="h-8 bg-slate-700 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Actual Product Grid -->
    <ProductGrid
      v-else
      :products="products"
      :loading="loading"
      @open-product-details="openProductDetails"
      @add-to-cart="handleAddToCart"
    />

    <ProductDetailsModal
      :is-open="showProductModal"
      :product="selectedProduct"
      @close="closeProductDetails"
      @add-to-cart="handleModalAddToCart"
    />
  </PublicLayout>
</template>
