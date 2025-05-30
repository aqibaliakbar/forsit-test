<script setup>
defineProps({
  showEditModal: {
    type: Boolean,
    default: false,
  },
  editingOrder: {
    type: Object,
    default: null,
  },
  newStatus: {
    type: String,
    default: '',
  },
  newPaymentStatus: {
    type: String,
    default: '',
  },
})

defineEmits([
  'update:showEditModal',
  'update:newStatus',
  'update:newPaymentStatus',
  'update-both-statuses',
])
</script>

<template>
  <div v-if="showEditModal" class="fixed inset-0 z-50 overflow-y-auto custom-scrollbar">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div
        class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        @click="$emit('update:showEditModal', false)"
      ></div>
      <div
        class="relative bg-slate-900 rounded-lg border border-slate-800 shadow-xl max-w-2xl w-full"
      >
        <div class="card-header-close">
          <h3 class="text-lg font-semibold text-slate-100">Update Order Status</h3>
          <button
            @click="$emit('update:showEditModal', false)"
            class="text-slate-400 hover:text-slate-300"
          >
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
        <div class="card-body">
          <div class="space-y-4">
            <div>
              <label class="form-label">New Status</label>
              <select
                :value="newStatus"
                @change="$emit('update:newStatus', $event.target.value)"
                class="form-select w-full"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label class="form-label">New Payment Status</label>
              <select
                :value="newPaymentStatus"
                @change="$emit('update:newPaymentStatus', $event.target.value)"
                class="form-select w-full"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          <div class="mt-4 space-x-2">
            <button @click="$emit('update-both-statuses')" class="btn-primary">Update</button>
            <button @click="$emit('update:showEditModal', false)" class="btn-outline">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
