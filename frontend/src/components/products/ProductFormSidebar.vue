<script setup>
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:form', 'submit', 'reset', 'delete'])

const updateForm = (field, value) => {
  emit('update:form', { ...props.form, [field]: value })
}

const getStockBadgeClass = (stock, threshold) => {
  if (stock === 0) return 'badge-danger'
  if (stock <= threshold) return 'badge-warning'
  return 'badge-success'
}
</script>

<template>
  <div class="space-y-6">
    <!-- product status -->
    <div class="card">
      <div class="card-header">
        <h3 class="section-title">Product Status</h3>
      </div>
      <div class="card-body">
        <div class="flex items-center">
          <input
            :checked="props.form.isActive"
            @change="updateForm('isActive', $event.target.checked)"
            type="checkbox"
            class="form-checkbox"
          />
          <label class="ml-2 block text-sm text-slate-300"> Active Product </label>
        </div>
        <p class="form-help">Inactive products won't be visible to customers</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <div class="card-header">
        <h3 class="section-title">Actions</h3>
      </div>
      <div class="card-body space-y-3">
        <button @click="$emit('submit')" :disabled="props.loading" class="btn-primary w-full">
          <span v-if="props.loading" class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ props.isEditing ? 'Updating...' : 'Creating...' }}
          </span>
          <span v-else>
            {{ props.isEditing ? 'Update Product' : 'Create Product' }}
          </span>
        </button>

        <button @click="$emit('reset')" class="btn-outline w-full">Reset Form</button>

        <button v-if="props.isEditing" @click="$emit('delete')" class="btn-danger w-full">
          Delete Product
        </button>
      </div>
    </div>

    <!-- Product Preview -->
    <div v-if="props.form.name" class="card">
      <div class="card-header">
        <h3 class="section-title">Preview</h3>
      </div>
      <div class="card-body">
        <div class="space-y-2">
          <h4 class="font-medium text-slate-200">{{ props.form.name }}</h4>
          <p class="text-sm text-slate-400">{{ props.form.category }}</p>
          <p class="text-lg font-semibold text-green-400">
            ${{ props.form.price?.toFixed(2) || '0.00' }}
          </p>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-slate-400">Stock:</span>
            <span
              class="badge"
              :class="getStockBadgeClass(props.form.stock, props.form.lowStockThreshold)"
            >
              {{ props.form.stock || 0 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
