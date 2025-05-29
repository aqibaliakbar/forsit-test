<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  orderForm: {
    type: Object,
    required: true,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
  finalTotal: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:orderForm', 'submit-order'])

const updateCustomerInfo = (field, value) => {
  emit('update:orderForm', {
    ...props.orderForm,
    customerInfo: {
      ...props.orderForm.customerInfo,
      [field]: value,
    },
  })
}

const updateShippingAddress = (field, value) => {
  emit('update:orderForm', {
    ...props.orderForm,
    shippingAddress: {
      ...props.orderForm.shippingAddress,
      [field]: value,
    },
  })
}

const updateField = (field, value) => {
  emit('update:orderForm', {
    ...props.orderForm,
    [field]: value,
  })
}
</script>

<template>
  <div class="bg-slate-800 rounded-lg p-6">
    <!-- Back Button -->
    <button @click="$router.go(-1)" class="flex items-center text-slate-400 hover:text-white mb-4">
      <ArrowLeftIcon class="h-5 w-5 mr-2" />
      Back to Shopping
    </button>

    <h2 class="text-xl font-semibold text-white mb-6">Order Information</h2>

    <form @submit.prevent="$emit('submit-order')" class="space-y-6">
      <!-- Customer Information -->
      <div>
        <h3 class="text-lg font-medium text-white mb-4">Customer Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2"> First Name * </label>
            <input
              :value="props.orderForm.customerInfo.firstName"
              @input="updateCustomerInfo('firstName', $event.target.value)"
              type="text"
              required
              class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2"> Last Name * </label>
            <input
              :value="props.orderForm.customerInfo.lastName"
              @input="updateCustomerInfo('lastName', $event.target.value)"
              type="text"
              required
              class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-slate-300 mb-2"> Email * </label>
          <input
            :value="props.orderForm.customerInfo.email"
            @input="updateCustomerInfo('email', $event.target.value)"
            type="email"
            required
            class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-slate-300 mb-2"> Phone </label>
          <input
            :value="props.orderForm.customerInfo.phone"
            @input="updateCustomerInfo('phone', $event.target.value)"
            type="tel"
            class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Shipping Address -->
      <div>
        <h3 class="text-lg font-medium text-white mb-4">Shipping Address</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2"> Street Address * </label>
            <input
              :value="props.orderForm.shippingAddress.street"
              @input="updateShippingAddress('street', $event.target.value)"
              type="text"
              required
              class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2"> City * </label>
              <input
                :value="props.orderForm.shippingAddress.city"
                @input="updateShippingAddress('city', $event.target.value)"
                type="text"
                required
                class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                State/Province *
              </label>
              <input
                :value="props.orderForm.shippingAddress.state"
                @input="updateShippingAddress('state', $event.target.value)"
                type="text"
                required
                class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                ZIP/Postal Code *
              </label>
              <input
                :value="props.orderForm.shippingAddress.zipCode"
                @input="updateShippingAddress('zipCode', $event.target.value)"
                type="text"
                required
                class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2"> Country * </label>
              <select
                :value="props.orderForm.shippingAddress.country"
                @change="updateShippingAddress('country', $event.target.value)"
                required
                class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Method -->
      <div>
        <h3 class="text-lg font-medium text-white mb-4">Payment Method</h3>
        <div class="space-y-3">
          <label class="flex items-center">
            <input
              :checked="props.orderForm.paymentMethod === 'credit_card'"
              @change="updateField('paymentMethod', 'credit_card')"
              type="radio"
              value="credit_card"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-3 text-slate-300">Credit Card</span>
          </label>
          <label class="flex items-center">
            <input
              :checked="props.orderForm.paymentMethod === 'paypal'"
              @change="updateField('paymentMethod', 'paypal')"
              type="radio"
              value="paypal"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-3 text-slate-300">PayPal</span>
          </label>
          <label class="flex items-center">
            <input
              :checked="props.orderForm.paymentMethod === 'cash_on_delivery'"
              @change="updateField('paymentMethod', 'cash_on_delivery')"
              type="radio"
              value="cash_on_delivery"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-3 text-slate-300">Cash on Delivery</span>
          </label>
        </div>
      </div>

      <!-- Order Notes -->
      <div>
        <label class="block text-sm font-medium text-slate-300 mb-2">
          Order Notes (Optional)
        </label>
        <textarea
          :value="props.orderForm.notes"
          @input="updateField('notes', $event.target.value)"
          rows="3"
          class="w-full bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any special instructions for your order..."
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        @click="$emit('submit-order')"
        :disabled="props.submitting"
        class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
      >
        <div v-if="props.submitting" class="flex items-center">
          <div
            class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"
          ></div>
          Processing Order...
        </div>
        <span v-else>Place Order - ${{ props.finalTotal.toFixed(2) }}</span>
      </button>
    </form>
  </div>
</template>
