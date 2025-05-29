<script setup>
import { PhotoIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
  imagePreview: {
    type: Array,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:form',
  'update:imagePreview',
  'file-upload',
  'file-drop',
  'remove-image',
])

const updateForm = (field, value) => {
  emit('update:form', { ...props.form, [field]: value })
}

const handleFileUpload = (event) => {
  emit('file-upload', event)
}

const handleDrop = (event) => {
  emit('file-drop', event)
}

const removeImage = (index) => {
  emit('remove-image', index)
}
</script>

<template>
  <div class="lg:col-span-2 space-y-6">
    <!-- Basic Information -->
    <div class="card">
      <div class="card-header">
        <h3 class="section-title">Basic Information</h3>
      </div>
      <div class="card-body space-y-4">
        <div>
          <label class="form-label">Product Name *</label>
          <input
            :value="props.form.name"
            @input="updateForm('name', $event.target.value)"
            type="text"
            required
            class="form-input"
            placeholder="Enter product name"
          />
          <p v-if="props.errors.name" class="form-error">{{ props.errors.name }}</p>
        </div>

        <div>
          <label class="form-label">Description</label>
          <textarea
            :value="props.form.description"
            @input="updateForm('description', $event.target.value)"
            rows="4"
            class="form-input"
            placeholder="Enter product description"
          ></textarea>
          <p v-if="props.errors.description" class="form-error">
            {{ props.errors.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="form-label">Category *</label>
            <select
              :value="props.form.category"
              @change="updateForm('category', $event.target.value)"
              required
              class="form-select"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Toys">Toys</option>
              <option value="Other">Other</option>
            </select>
            <p v-if="props.errors.category" class="form-error">
              {{ props.errors.category }}
            </p>
          </div>

          <div>
            <label class="form-label">SKU</label>
            <input
              :value="props.form.sku"
              @input="updateForm('sku', $event.target.value)"
              type="text"
              class="form-input"
              placeholder="Auto-generated if empty"
              :readonly="props.isEditing"
            />
            <p class="form-help">
              {{
                props.isEditing
                  ? 'SKU cannot be changed after creation'
                  : 'Leave empty to auto-generate'
              }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- pricing & inventory -->
    <div class="card">
      <div class="card-header">
        <h3 class="section-title">Pricing & Inventory</h3>
      </div>
      <div class="card-body space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="form-label">Price *</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-slate-400 sm:text-sm">$</span>
              </div>
              <input
                :value="props.form.price"
                @input="updateForm('price', parseFloat($event.target.value) || null)"
                type="number"
                step="0.01"
                min="0"
                required
                class="form-input pl-7"
                placeholder="0.00"
              />
            </div>
            <p v-if="props.errors.price" class="form-error">{{ props.errors.price }}</p>
          </div>

          <div>
            <label class="form-label">Stock Quantity *</label>
            <input
              :value="props.form.stock"
              @input="updateForm('stock', parseInt($event.target.value) || null)"
              type="number"
              min="0"
              required
              class="form-input"
              placeholder="0"
            />
            <p v-if="props.errors.stock" class="form-error">{{ props.errors.stock }}</p>
          </div>

          <div>
            <label class="form-label">Low Stock Threshold</label>
            <input
              :value="props.form.lowStockThreshold"
              @input="updateForm('lowStockThreshold', parseInt($event.target.value) || 10)"
              type="number"
              min="0"
              class="form-input"
              placeholder="10"
            />
            <p class="form-help">Alert when stock falls below this number</p>
          </div>
        </div>
      </div>
    </div>

    <!-- product images -->
    <div class="card">
      <div class="card-header">
        <h3 class="section-title">Product Images</h3>
      </div>
      <div class="card-body space-y-4">
        <!-- image upload -->
        <div>
          <label class="form-label">Upload Images</label>
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-700 border-dashed rounded-lg hover:border-slate-600 transition-colors bg-slate-800/50"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <div class="space-y-1 text-center">
              <PhotoIcon class="mx-auto h-12 w-12 text-slate-400" />
              <div class="flex text-sm text-slate-300">
                <label
                  class="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload files</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    class="sr-only"
                    @change="handleFileUpload"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-slate-500">PNG, JPG, GIF up to 10MB each</p>
            </div>
          </div>
        </div>

        <!-- image preview -->
        <div v-if="props.imagePreview.length > 0" class="space-y-3">
          <h4 class="text-sm font-medium text-slate-300">Image Preview</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(image, index) in props.imagePreview" :key="index" class="relative group">
              <div
                class="aspect-square rounded-lg overflow-hidden bg-slate-800 border border-slate-700"
              >
                <img
                  :src="image.url"
                  :alt="`Preview ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <XMarkIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
