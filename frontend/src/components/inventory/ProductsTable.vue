<script setup>
import { ref, computed } from 'vue'
import { PencilIcon } from '@heroicons/vue/24/outline'
import { getImageUrl } from '@/services/api'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  filteredProducts: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['edit-product', 'refresh-data'])

const showStockModal = ref(false)
const showPreviewModal = ref(false)
const selectedProduct = ref(null)
const newStockQuantity = ref(null)
const newLowStockThreshold = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)

const totalPages = computed(() => Math.ceil(props.filteredProducts.length / itemsPerPage.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return props.filteredProducts.slice(start, end)
})

const viewProduct = (product) => {
  selectedProduct.value = product
  showPreviewModal.value = true
}

const closePreviewModal = () => {
  showPreviewModal.value = false
  selectedProduct.value = null
}

const editProductFromPreview = () => {
  if (selectedProduct.value) {
    emit('edit-product', selectedProduct.value._id)
    closePreviewModal()
  }
}

const getStockColorClass = (product) => {
  if (product.stock === 0) return 'text-red-400'
  if (product.stock < product.lowStockThreshold) return 'text-amber-400'
  return 'text-green-400'
}

const getStockBadgeClass = (product) => {
  if (product.stock === 0) return 'badge-danger'
  if (product.stock < product.lowStockThreshold) return 'badge-warning'
  return 'badge-success'
}

const getStockStatus = (product) => {
  if (product.stock === 0) return 'Out of Stock'
  if (product.stock < product.lowStockThreshold) return 'Low Stock'
  return 'In Stock'
}

const editProduct = (productId) => {
  emit('edit-product', productId)
}

const openStockModal = (product) => {
  selectedProduct.value = product
  newStockQuantity.value = product.stock
  newLowStockThreshold.value = product.lowStockThreshold
  showStockModal.value = true
}

const closeStockModal = () => {
  showStockModal.value = false
  selectedProduct.value = null
  newStockQuantity.value = null
  newLowStockThreshold.value = null
}

const updateStock = async () => {
  if (!selectedProduct.value || newStockQuantity.value === null) return

  try {
    await productsStore.updateInventory(selectedProduct.value._id, {
      stock: newStockQuantity.value,
      lowStockThreshold: newLowStockThreshold.value,
    })

    closeStockModal()
    emit('refresh-data')
  } catch (error) {
    console.error('Error updating stock:', error)
    alert('Error updating stock: ' + error.message)
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3 class="section-title">Products Inventory</h3>
      <p class="text-sm text-slate-400">Manage your product inventory and stock levels</p>
    </div>
    <div class="card-body p-0">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="min-w-full divide-y divide-slate-700">
          <thead class="bg-slate-800/50">
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Threshold
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-slate-900 divide-y divide-slate-700/50">
            <tr
              v-for="product in paginatedProducts"
              :key="product._id"
              class="hover:bg-slate-800/30 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div
                      v-if="product.images && product.images.length > 0"
                      class="h-12 w-12 rounded-lg overflow-hidden bg-slate-800"
                    >
                      <img
                        :src="getImageUrl(product.images[0])"
                        :alt="product.name"
                        class="h-full w-full object-cover"
                      />
                    </div>
                    <div
                      v-else
                      class="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center"
                    >
                      <span class="text-sm font-bold text-white">{{
                        product.name.charAt(0).toUpperCase()
                      }}</span>
                    </div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="text-sm font-semibold text-slate-100 truncate">
                      {{ product.name }}
                    </div>
                    <div class="text-xs text-slate-400 font-mono">{{ product.sku }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-slate-300">{{ product.category }}</span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm font-semibold text-green-400">
                  ${{ Math.round(product.price) }}
                </span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <span class="badge" :class="getStockBadgeClass(product)">
                  {{ product.stock }}
                </span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-slate-400">{{ product.lowStockThreshold }}</span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <span class="badge" :class="product.isActive ? 'badge-success' : 'badge-gray'">
                  {{ product.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewProduct(product)"
                    class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border border-blue-800 transition-colors"
                  >
                    View
                  </button>
                  <button
                    @click="editProduct(product._id)"
                    class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50 border border-emerald-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="openStockModal(product)"
                    class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-md bg-amber-900/30 text-amber-400 hover:bg-amber-900/50 border border-amber-800 transition-colors"
                  >
                    Stock
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-slate-800/30 px-6 py-4 border-t border-slate-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-slate-400">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
            {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} of
            {{ filteredProducts.length }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-sm text-slate-400"> Page {{ currentPage }} of {{ totalPages }} </span>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showStockModal" class="fixed inset-0 z-50 overflow-y-auto custom-scrollbar">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" @click="closeStockModal"></div>
      <div
        class="relative bg-slate-900 rounded-lg border border-slate-800 shadow-xl max-w-md w-full"
      >
        <div class="card-header-close">
          <h3 class="text-lg font-semibold text-slate-100">Update Stock</h3>
          <button @click="closeStockModal" class="text-slate-400 hover:text-slate-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="card-body" v-if="selectedProduct">
          <div class="space-y-4">
            <div>
              <h4 class="text-sm font-medium text-slate-200 mb-2">{{ selectedProduct.name }}</h4>
              <p class="text-xs text-slate-400">Current Stock: {{ selectedProduct.stock }}</p>
            </div>

            <div>
              <label class="form-label">New Stock Quantity</label>
              <input
                v-model.number="newStockQuantity"
                type="number"
                min="0"
                class="form-input"
                placeholder="Enter new stock quantity"
              />
            </div>

            <div>
              <label class="form-label">Low Stock Threshold</label>
              <input
                v-model.number="newLowStockThreshold"
                type="number"
                min="0"
                class="form-input"
                placeholder="Enter low stock threshold"
              />
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="flex flex-col sm:flex-row gap-3 p-4 border-t border-slate-800">
            <button
              @click="updateStock"
              :disabled="newStockQuantity === null || newStockQuantity < 0"
              class="btn-primary flex-1"
            >
              Update Stock
            </button>
            <button @click="closeStockModal" class="btn-secondary flex-1">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showPreviewModal" class="fixed inset-0 z-50 overflow-y-auto custom-scrollbar">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" @click="closePreviewModal"></div>
      <div
        class="relative bg-slate-900 rounded-lg border border-slate-800 shadow-xl max-w-2xl w-full"
      >
        <div class="card-header-close">
          <h3 class="text-lg font-semibold text-slate-100">Product Details</h3>
          <button @click="closePreviewModal" class="text-slate-400 hover:text-slate-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div class="card-body" v-if="selectedProduct">
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row gap-6">
              <div class="flex-shrink-0">
                <div
                  v-if="selectedProduct.images && selectedProduct.images.length > 0"
                  class="w-32 h-32 rounded-lg overflow-hidden bg-slate-800"
                >
                  <img
                    :src="getImageUrl(selectedProduct.images[0])"
                    :alt="selectedProduct.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="w-32 h-32 rounded-lg bg-slate-800 flex items-center justify-center"
                >
                  <span class="text-2xl font-bold text-slate-400">{{
                    selectedProduct.name.charAt(0)
                  }}</span>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-xl font-semibold text-slate-100 mb-2">
                  {{ selectedProduct.name }}
                </h4>
                <p class="text-slate-300 mb-4">{{ selectedProduct.description }}</p>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="form-label">SKU</label>
                    <p class="text-slate-200 font-mono">{{ selectedProduct.sku }}</p>
                  </div>
                  <div>
                    <label class="form-label">Category</label>
                    <p class="text-slate-200">{{ selectedProduct.category }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div class="bg-slate-800/50 rounded-lg p-4">
                <label class="form-label">Price</label>
                <p class="text-2xl font-bold text-green-400">
                  ${{ Math.round(selectedProduct.price) }}
                </p>
              </div>
              <div class="bg-slate-800/50 rounded-lg p-4">
                <label class="form-label">Current Stock</label>
                <p class="text-2xl font-bold" :class="getStockColorClass(selectedProduct)">
                  {{ selectedProduct.stock }}
                </p>
              </div>
              <div class="bg-slate-800/50 rounded-lg p-4">
                <label class="form-label">Low Stock Threshold</label>
                <p class="text-2xl font-bold text-slate-200">
                  {{ selectedProduct.lowStockThreshold }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Status</label>
                <span
                  class="badge"
                  :class="selectedProduct.isActive ? 'badge-success' : 'badge-gray'"
                >
                  {{ selectedProduct.isActive ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <div>
                <label class="form-label">Stock Status</label>
                <span class="badge" :class="getStockBadgeClass(selectedProduct)">
                  {{ getStockStatus(selectedProduct) }}
                </span>
              </div>
              <div>
                <label class="form-label">Created Date</label>
                <p class="text-slate-200">
                  {{ new Date(selectedProduct.createdAt).toLocaleDateString() }}
                </p>
              </div>
              <div>
                <label class="form-label">Last Updated</label>
                <p class="text-slate-200">
                  {{ new Date(selectedProduct.updatedAt).toLocaleDateString() }}
                </p>
              </div>
            </div>

            <div class="flex pt-4 border-t border-slate-800">
              <button @click="editProductFromPreview" class="btn-primary flex-1">
                <PencilIcon class="h-4 w-4 mr-2" />
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
