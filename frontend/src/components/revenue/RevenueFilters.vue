<script setup>
const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:filters', 'fetch-analytics'])

const updateFilter = (key, value) => {
  emit('update:filters', { ...props.filters, [key]: value })
  emit('fetch-analytics')
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="form-label">Time Period</label>
          <select
            :value="props.filters.period"
            @change="updateFilter('period', $event.target.value)"
            class="form-select"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div>
          <label class="form-label">Category</label>
          <select
            :value="props.filters.category"
            @change="updateFilter('category', $event.target.value)"
            class="form-select"
          >
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
          <label class="form-label">Start Date</label>
          <input
            :value="props.filters.startDate"
            @change="updateFilter('startDate', $event.target.value)"
            type="date"
            class="form-input"
          />
        </div>
        <div>
          <label class="form-label">End Date</label>
          <input
            :value="props.filters.endDate"
            @change="updateFilter('endDate', $event.target.value)"
            type="date"
            class="form-input"
          />
        </div>
      </div>
    </div>
  </div>
</template>
