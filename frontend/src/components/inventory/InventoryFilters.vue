<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filters-changed'])

const filters = ref({
  search: '',
  category: '',
  stockStatus: '',
  sortBy: 'name',
})

const applyFilters = () => {
  emit('filters-changed', filters.value)
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="form-label">Search</label>
          <input
            v-model="filters.search"
            @input="applyFilters"
            type="text"
            placeholder="Search products..."
            class="form-input"
          />
        </div>
        <div>
          <label class="form-label">Category</label>
          <select v-model="filters.category" @change="applyFilters" class="form-select">
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
            <option value="Books">Books</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Toys">Toys</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label class="form-label">Stock Status</label>
          <select v-model="filters.stockStatus" @change="applyFilters" class="form-select">
            <option value="">All Items</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
        <div>
          <label class="form-label">Sort By</label>
          <select v-model="filters.sortBy" @change="applyFilters" class="form-select">
            <option value="name">Name</option>
            <option value="stock">Stock Level</option>
            <option value="price">Price</option>
            <option value="createdAt">Date Added</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
