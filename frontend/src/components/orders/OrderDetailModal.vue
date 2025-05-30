<script setup>
defineProps({
  showOrderModal: {
    type: Boolean,
    default: false,
  },
  selectedOrder: {
    type: Object,
    default: null,
  },
})

defineEmits(['update:showOrderModal'])
</script>

<template>
  <div v-if="showOrderModal" class="fixed inset-0 z-50 overflow-y-auto custom-scrollbar">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div
        class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        @click="$emit('update:showOrderModal', false)"
      ></div>
      <div
        class="relative bg-slate-900 rounded-lg border border-slate-800 shadow-xl max-w-2xl w-full"
      >
        <div class="card-header-close">
          <h3 class="text-lg font-semibold text-slate-100">Order Details</h3>
          <button
            @click="$emit('update:showOrderModal', false)"
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
        <div class="card-body" v-if="selectedOrder">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Order Number</label>
                <p class="text-slate-200 font-mono">#{{ selectedOrder.orderNumber }}</p>
              </div>
              <div>
                <label class="form-label">Status</label>
                <span class="badge badge-primary">{{ selectedOrder.status }}</span>
              </div>
              <div>
                <label class="form-label">Customer</label>
                <p class="text-slate-200">{{ selectedOrder.customerInfo?.name }}</p>
                <p class="text-slate-400 text-sm">{{ selectedOrder.customerInfo?.email }}</p>
              </div>
              <div>
                <label class="form-label">Total</label>
                <p class="text-green-400 font-semibold text-lg">
                  ${{ Math.round(selectedOrder.totalAmount) }}
                </p>
              </div>
            </div>

            <div>
              <label class="form-label">Items</label>
              <div class="space-y-2">
                <div
                  v-for="item in selectedOrder.items"
                  :key="item.productId"
                  class="flex justify-between items-center p-3 bg-slate-800 rounded-lg"
                >
                  <div>
                    <p class="text-slate-200">{{ item.productName }}</p>
                    <p class="text-slate-400 text-sm">Quantity: {{ item.quantity }}</p>
                  </div>
                  <p class="text-slate-200 font-medium">
                    ${{ Math.round(item.price * item.quantity) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
