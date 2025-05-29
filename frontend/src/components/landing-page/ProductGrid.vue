<script setup>
import { ref, computed } from 'vue'
import {
  MagnifyingGlassIcon,
  PhotoIcon,
  CubeIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'
import { getImageUrl } from '@/services/api'
import { useToast } from '@/composables/useToast'

const { showError } = useToast()

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['open-product-details', 'add-to-cart'])

const selectedCategory = ref('')
const searchQuery = ref('')
const productQuantities = ref({})

const categories = computed(() => {
  const cats = [...new Set(props.products.map((p) => p.category))]
  return cats.sort()
})

const filteredProducts = computed(() => {
  let filtered = props.products

  if (selectedCategory.value) {
    filtered = filtered.filter((p) => p.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query),
    )
  }

  return filtered
})

const openProductDetails = (product) => {
  emit('open-product-details', product)
}

const getProductQuantity = (productId) => {
  return productQuantities.value[productId] || 1
}

const incrementQuantity = (productId) => {
  const product = props.products.find((p) => p._id === productId)
  if (product && getProductQuantity(productId) < product.stock) {
    productQuantities.value[productId] = getProductQuantity(productId) + 1
  }
}

const decrementQuantity = (productId) => {
  if (getProductQuantity(productId) > 1) {
    productQuantities.value[productId] = getProductQuantity(productId) - 1
  }
}

const addToCart = (product) => {
  if (product.stock === 0) {
    showError('Out of Stock', `${product.name} is currently out of stock.`)
    return
  }

  const quantity = getProductQuantity(product._id)

  emit('add-to-cart', { product, quantity })

  productQuantities.value[product._id] = 1
}

const filterProducts = () => {
  // Trigger reactivity for computed property
}
</script>

<template>
  <section id="products" class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-4">Our Products</h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          Browse through our extensive collection of high-quality products
        </p>
      </div>

      <div class="mb-8 flex flex-wrap gap-4 justify-center">
        <div class="relative">
          <select
            v-model="selectedCategory"
            @change="filterProducts"
            class="appearance-none bg-slate-800 border border-slate-700 text-white px-4 py-3 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer font-medium min-w-[180px]"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          <ChevronDownIcon
            class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none"
          />
        </div>

        <div class="relative">
          <input
            v-model="searchQuery"
            @input="filterProducts"
            type="text"
            placeholder="Search products..."
            class="bg-slate-800 border border-slate-700 text-white px-4 py-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 font-medium"
          />
          <MagnifyingGlassIcon
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
          />
        </div>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="flex flex-col items-center space-y-4">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"
          ></div>
          <div class="space-y-2">
            <p class="text-slate-300 text-lg font-medium">Loading products...</p>
            <p class="text-slate-400 text-sm">Please wait while we fetch the latest products</p>
          </div>
        </div>
      </div>

      <div
        v-else-if="filteredProducts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="product in filteredProducts"
          :key="product._id"
          class="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-slate-600 hover:scale-105 cursor-pointer"
          @click="openProductDetails(product)"
        >
          <div class="aspect-w-1 aspect-h-1 bg-slate-700 relative">
            <img
              v-if="product.images && product.images.length > 0"
              :src="getImageUrl(product.images[0])"
              :alt="product.name"
              class="w-full h-64 object-cover"
            />
            <div v-else class="w-full h-64 bg-slate-700 flex items-center justify-center">
              <PhotoIcon class="h-16 w-16 text-slate-500" />
            </div>

            <div
              v-if="product.stock === 0"
              class="absolute inset-0 bg-slate-900/80 flex items-center justify-center"
            >
              <div class="text-center">
                <ExclamationTriangleIcon class="h-10 w-10 text-red-400 mx-auto mb-2" />
                <span class="text-red-400 font-semibold">Out of Stock</span>
              </div>
            </div>

            <div class="absolute top-3 left-3">
              <span class="bg-slate-900/80 text-white px-2 py-1 rounded-md text-xs font-medium">
                Click to view details
              </span>
            </div>
          </div>

          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-xl font-semibold text-white truncate flex-1 mr-3">
                {{ product.name }}
              </h3>
              <span
                class="text-sm bg-slate-700 text-slate-300 px-3 py-1 rounded-full whitespace-nowrap"
              >
                {{ product.category }}
              </span>
            </div>

            <p class="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
              {{ product.description }}
            </p>

            <div class="flex items-center justify-between mb-6">
              <span class="text-2xl font-bold text-blue-400">${{ Math.round(product.price) }}</span>
              <div class="flex items-center space-x-1">
                <span
                  :class="[
                    'text-sm px-3 py-1 rounded-full font-medium',
                    product.stock > product.lowStockThreshold
                      ? 'bg-green-900/50 text-green-300 border border-green-800'
                      : product.stock > 0
                        ? 'bg-amber-900/50 text-amber-300 border border-amber-800'
                        : 'bg-red-900/50 text-red-300 border border-red-800',
                  ]"
                >
                  {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
                </span>
              </div>
            </div>

            <div v-if="product.stock > 0" class="space-y-4">
              <div class="flex items-center justify-center">
                <div class="flex items-center border-2 border-slate-600 rounded-lg bg-slate-700">
                  <button
                    @click.stop="decrementQuantity(product._id)"
                    :disabled="getProductQuantity(product._id) <= 1"
                    class="px-4 py-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <MinusIcon class="h-5 w-5" />
                  </button>
                  <span
                    class="px-6 py-2 text-white bg-slate-600 min-w-[4rem] text-center font-semibold"
                  >
                    {{ getProductQuantity(product._id) }}
                  </span>
                  <button
                    @click.stop="incrementQuantity(product._id)"
                    :disabled="getProductQuantity(product._id) >= product.stock"
                    class="px-4 py-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <PlusIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>

              <button
                @click.stop="addToCart(product)"
                :disabled="getProductQuantity(product._id) > product.stock"
                class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center text-lg"
              >
                <ShoppingCartIcon class="h-5 w-5 mr-3" />
                Add to Cart
              </button>
            </div>

            <div v-else class="flex items-center justify-center">
              <button
                disabled
                class="w-full bg-slate-700 text-slate-400 px-6 py-3 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center text-lg"
              >
                <ExclamationTriangleIcon class="h-5 w-5 mr-3" />
                Out of Stock
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <CubeIcon class="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-slate-400 mb-2">No products found</h3>
        <p class="text-slate-500">Try adjusting your search or filter criteria</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
