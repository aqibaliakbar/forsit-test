<script setup>
defineProps({
  orderStats: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
    <div class="stats-card">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Total Orders</p>
          <p class="text-2xl font-bold text-slate-100">{{ orderStats.total }}</p>
        </div>
      </div>
    </div>

    <div class="stats-card stats-card-warning">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Pending</p>
          <p class="text-2xl font-bold text-amber-400">{{ orderStats.pending }}</p>
        </div>
      </div>
    </div>

    <div class="stats-card stats-card-primary">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Processing</p>
          <p class="text-2xl font-bold text-blue-400">{{ orderStats.processing }}</p>
        </div>
      </div>
    </div>

    <div class="stats-card">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Shipped</p>
          <p class="text-2xl font-bold text-purple-400">{{ orderStats.shipped }}</p>
        </div>
      </div>
    </div>

    <div class="stats-card stats-card-success">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Delivered</p>
          <p class="text-2xl font-bold text-green-400">{{ orderStats.delivered }}</p>
        </div>
      </div>
    </div>

    <div class="stats-card stats-card-danger">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Cancelled</p>
          <p class="text-2xl font-bold text-red-400">{{ orderStats.cancelled }}</p>
        </div>
      </div>
    </div>

    <div class="stats-card stats-card-success">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Gross Revenue</p>
          <p class="text-xs text-slate-500">(incl. tax & shipping)</p>
          <p class="text-xl font-bold text-green-400">
            ${{ Math.round(orderStats.totalRevenue) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template> 