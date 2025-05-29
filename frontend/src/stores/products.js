import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productAPI } from '@/services/api'

export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref([])
  const currentProduct = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref({
    search: '',
    category: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    lowStock: false,
  })

  // Getters
  const lowStockProducts = computed(() => {
    return products.value.filter((product) => product.isLowStock)
  })

  const productsByCategory = computed(() => {
    const categories = {}
    products.value.forEach((product) => {
      if (!categories[product.category]) {
        categories[product.category] = []
      }
      categories[product.category].push(product)
    })
    return categories
  })

  const totalInventoryValue = computed(() => {
    return products.value.reduce((total, product) => {
      return total + product.price * product.stock
    }, 0)
  })

  // Actions
  const fetchProducts = async (params = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = {
        ...filters.value,
        ...params,
      }

      const response = await productAPI.getProducts(queryParams)
      products.value = response.data.products
      pagination.value = response.data.pagination
    } catch (err) {
      error.value = err.message
      console.error('Error fetching products:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchProduct = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await productAPI.getProduct(id)
      currentProduct.value = response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching product:', err)
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (productData) => {
    loading.value = true
    error.value = null

    try {
      const response = await productAPI.createProduct(productData)
      products.value.unshift(response.data)
      return response
    } catch (err) {
      error.value = err.message
      console.error('Error creating product:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id, productData) => {
    loading.value = true
    error.value = null

    try {
      const response = await productAPI.updateProduct(id, productData)
      const index = products.value.findIndex((p) => p._id === id)
      if (index !== -1) {
        products.value[index] = response.data
      }
      return response
    } catch (err) {
      error.value = err.message
      console.error('Error updating product:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateInventory = async (id, inventoryData) => {
    loading.value = true
    error.value = null

    try {
      const response = await productAPI.updateInventory(id, inventoryData)
      const index = products.value.findIndex((p) => p._id === id)
      if (index !== -1) {
        products.value[index] = response.data
      }
      return response
    } catch (err) {
      error.value = err.message
      console.error('Error updating inventory:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id) => {
    loading.value = true
    error.value = null

    try {
      await productAPI.deleteProduct(id)
      products.value = products.value.filter((p) => p._id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Error deleting product:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchLowStockProducts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await productAPI.getLowStockProducts()
      return response.data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching low stock products:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearError = () => {
    error.value = null
  }

  const resetCurrentProduct = () => {
    currentProduct.value = null
  }

  return {
    // State
    products,
    currentProduct,
    loading,
    error,
    pagination,
    filters,

    // Getters
    lowStockProducts,
    productsByCategory,
    totalInventoryValue,

    // Actions
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    updateInventory,
    deleteProduct,
    fetchLowStockProducts,
    setFilters,
    clearError,
    resetCurrentProduct,
  }
})
