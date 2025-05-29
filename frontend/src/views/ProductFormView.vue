<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { useProductsStore } from '@/stores/products'
import { getImageUrl } from '@/services/api'
import ProductFormFields from '@/components/products/ProductFormFields.vue'
import ProductFormSidebar from '@/components/products/ProductFormSidebar.vue'
import { SkeletonForm, SkeletonCard } from '@/components/skeleton'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const form = ref({
  name: '',
  description: '',
  category: '',
  price: null,
  stock: null,
  lowStockThreshold: 10,
  sku: '',
  isActive: true,
})

const selectedFiles = ref([])
const imagePreview = ref([])
const errors = ref({})

const isEditing = computed(() => !!route.params.id)
const loading = computed(() => productsStore.loading)

// Methods
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
  event.target.value = ''
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const processFiles = (files) => {
  files.forEach((file) => {
    if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
      selectedFiles.value.push(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value.push({
          url: e.target.result,
          file: file,
        })
      }
      reader.readAsDataURL(file)
    }
  })
}

const removeImage = (index) => {
  imagePreview.value.splice(index, 1)
  selectedFiles.value.splice(index, 1)
}

const validateForm = () => {
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = 'Product name is required'
  }

  if (!form.value.category) {
    errors.value.category = 'Category is required'
  }

  if (!form.value.price || form.value.price <= 0) {
    errors.value.price = 'Valid price is required'
  }

  if (form.value.stock === null || form.value.stock < 0) {
    errors.value.stock = 'Valid stock quantity is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    const formData = {
      ...form.value,
      images: selectedFiles.value,
    }

    if (isEditing.value) {
      await productsStore.updateProduct(route.params.id, formData)
    } else {
      await productsStore.createProduct(formData)
    }

    router.push('/inventory')
  } catch (error) {
    console.error('Error saving product:', error)
  }
}

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    category: '',
    price: null,
    stock: null,
    lowStockThreshold: 10,
    sku: '',
    isActive: true,
  }
  selectedFiles.value = []
  imagePreview.value = []
  errors.value = {}
}

const deleteProduct = async () => {
  if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    try {
      await productsStore.deleteProduct(route.params.id)
      router.push('/inventory')
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }
}

const loadProduct = async () => {
  if (isEditing.value) {
    await productsStore.fetchProduct(route.params.id)
    const product = productsStore.currentProduct

    if (product) {
      form.value = {
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
        lowStockThreshold: product.lowStockThreshold,
        sku: product.sku,
        isActive: product.isActive,
      }

      // Load existing images if any
      if (product.images && product.images.length > 0) {
        imagePreview.value = product.images.map((img) => ({
          url: getImageUrl(img),
          existing: true,
        }))
      }
    }
  }
}

onMounted(() => {
  loadProduct()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="page-header">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="page-title">
            {{ isEditing ? 'Edit Product' : 'Add New Product' }}
          </h1>
          <p class="page-subtitle">
            {{
              isEditing
                ? 'Update product information and inventory details.'
                : 'Create a new product with all necessary details.'
            }}
          </p>
        </div>
        <div class="flex space-x-3">
          <router-link to="/inventory" class="btn-secondary">
            <ArrowLeftIcon class="h-4 w-4 mr-2" />
            Back to Inventory
          </router-link>
        </div>
      </div>
    </div>

    <!-- Skeleton Form -->
    <div v-if="loading && isEditing" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Form Skeleton -->
      <div class="lg:col-span-2">
        <SkeletonForm
          :fields="[
            { type: 'input', label: true, width: 'full' },
            { type: 'textarea', label: true, width: 'full' },
            { type: 'input', label: true, width: 'half' },
            { type: 'select', label: true, width: 'half' },
            { type: 'input', label: true, width: 'half' },
            { type: 'input', label: true, width: 'half' },
          ]"
          :show-title="false"
          :show-buttons="false"
        />

        <!-- Image Upload Skeleton -->
        <SkeletonCard class="mt-6" :rows="3" height="200px" />
      </div>

      <!-- Sidebar Skeleton -->
      <div>
        <SkeletonCard :rows="4" />
        <SkeletonCard class="mt-6" :rows="2" />
      </div>
    </div>

    <!-- Actual Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Product Information -->
        <ProductFormFields
          :form="form"
          :errors="errors"
          :image-preview="imagePreview"
          :is-editing="isEditing"
          @update:form="form = $event"
          @file-upload="handleFileUpload"
          @file-drop="handleDrop"
          @remove-image="removeImage"
        />

        <!-- Sidebar -->
        <ProductFormSidebar
          :form="form"
          :loading="loading"
          :is-editing="isEditing"
          @update:form="form = $event"
          @submit="handleSubmit"
          @reset="resetForm"
          @delete="deleteProduct"
        />
      </div>
    </form>
  </div>
</template>
