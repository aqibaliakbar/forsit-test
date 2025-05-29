import axios from 'axios'


const API_BASE_URL = import.meta.env.VITE_API_URL

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    })

    return Promise.reject(error)
  },
)

// helper function to construct full image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath

  // extract filename from path
  const filename = imagePath.split('/').pop()
  return `${API_BASE_URL}/products/image/${filename}`
}

// export base URL for direct use 
export {  API_BASE_URL }

// product API endpoints
export const productAPI = {
  // Get all products 
  getProducts: (params = {}) => {
    return api.get('/products', { params })
  },

  // Get single product by ID
  getProduct: (id) => {
    return api.get(`/products/${id}`)
  },

  // Create new product
  createProduct: (productData) => {
    const formData = new FormData()

    // append text fields
    Object.keys(productData).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, productData[key])
      }
    })

    // append images
    if (productData.images && productData.images.length > 0) {
      productData.images.forEach((image) => {
        formData.append('images', image)
      })
    }

    return api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // update product
  updateProduct: (id, productData) => {
    const formData = new FormData()

    // append text fields
    Object.keys(productData).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, productData[key])
      }
    })

    // append images 
    if (productData.images && productData.images.length > 0) {
      productData.images.forEach((image) => {
        formData.append('images', image)
      })
    }

    return api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // update inventory
  updateInventory: (id, inventoryData) => {
    return api.patch(`/products/${id}/inventory`, inventoryData)
  },

  // delete product
  deleteProduct: (id) => {
    return api.delete(`/products/${id}`)
  },

  // get low stock products
  getLowStockProducts: () => {
    return api.get('/products/low-stock')
  },
}

// Order API endpoints
export const orderAPI = {
  // get all orders
  getOrders: (params = {}) => api.get('/orders', { params }),

  // get order by id
  getOrderById: (id) => api.get(`/orders/${id}`),

  // create new order
  createOrder: (orderData) => api.post('/orders', orderData),

  // update order status
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),

  // update payment status
  updatePaymentStatus: (id, paymentStatus) => api.patch(`/orders/${id}/payment`, { paymentStatus }),

  // get revenue analytics
  getRevenueAnalytics: (params = {}) => api.get('/orders/analytics/revenue', { params }),

  // get order analytics
  getOrderAnalytics: (params = {}) => api.get('/orders/analytics', { params }),
}

export default api
