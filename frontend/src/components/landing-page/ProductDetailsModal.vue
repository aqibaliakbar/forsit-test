<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && product"
        class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm"
        @click="closeModal"
      >
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-if="isOpen && product"
              class="relative bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700"
              @click.stop
            >
              <!-- Close Button -->
              <button
                @click="closeModal"
                class="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-700/80 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200"
              >
                <XMarkIcon class="h-6 w-6" />
              </button>

              <!-- Modal Content -->
              <div class="grid md:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <!-- Image Section -->
                <div class="bg-slate-700 p-6">
                  <div class="space-y-4">
                    <!-- Main Image -->
                    <div class="aspect-square rounded-xl overflow-hidden bg-slate-600">
                      <img
                        v-if="selectedImage"
                        :src="getImageUrl(selectedImage)"
                        :alt="product.name"
                        class="w-full h-full object-cover"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center">
                        <PhotoIcon class="h-20 w-20 text-slate-400" />
                      </div>
                    </div>

                    <!-- Image Thumbnails -->
                    <div
                      v-if="product.images && product.images.length > 1"
                      class="flex space-x-2 overflow-x-auto custom-scrollbar"
                    >
                      <button
                        v-for="(image, index) in product.images"
                        :key="index"
                        @click="selectedImage = image"
                        class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200"
                        :class="
                          selectedImage === image
                            ? 'border-blue-400'
                            : 'border-slate-600 hover:border-slate-500'
                        "
                      >
                        <img
                          :src="getImageUrl(image)"
                          :alt="`${product.name} view ${index + 1}`"
                          class="w-full h-full object-cover"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Product Details Section -->
                <div class="p-6 flex flex-col">
                  <!-- Product Info -->
                  <div class="flex-1">
                    <!-- Category Badge -->
                    <div class="mb-3">
                      <span
                        class="inline-block bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-800"
                      >
                        {{ product.category }}
                      </span>
                    </div>

                    <!-- Product Name -->
                    <h2 class="text-3xl font-bold text-white mb-3">{{ product.name }}</h2>

                    <!-- SKU -->
                    <p class="text-slate-400 text-sm mb-4">SKU: {{ product.sku }}</p>

                    <!-- Price -->
                    <div class="mb-6">
                      <span class="text-4xl font-bold text-blue-400"
                        >${{ Math.round(product.price) }}</span
                      >
                    </div>

                    <!-- Description -->
                    <div class="mb-6">
                      <h3 class="text-lg font-semibold text-white mb-2">Description</h3>
                      <p class="text-slate-300 leading-relaxed">{{ product.description }}</p>
                    </div>

                    <!-- Stock Status -->
                    <div class="mb-6">
                      <div class="flex items-center space-x-3">
                        <h3 class="text-lg font-semibold text-white">Availability:</h3>
                        <span
                          :class="[
                            'px-3 py-1 rounded-full text-sm font-medium border',
                            product.stock > product.lowStockThreshold
                              ? 'bg-green-900/50 text-green-300 border-green-800'
                              : product.stock > 0
                                ? 'bg-amber-900/50 text-amber-300 border-amber-800'
                                : 'bg-red-900/50 text-red-300 border-red-800',
                          ]"
                        >
                          {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
                        </span>
                      </div>
                      <div
                        v-if="product.stock <= product.lowStockThreshold && product.stock > 0"
                        class="mt-2"
                      >
                        <p class="text-amber-400 text-sm flex items-center">
                          <ExclamationTriangleIcon class="h-4 w-4 mr-1" />
                          Only {{ product.stock }} left in stock!
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Add to Cart Section -->
                  <div v-if="product.stock > 0" class="border-t border-slate-700 pt-6 space-y-4">
                    <!-- Quantity Selector -->
                    <div>
                      <label class="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
                      <div class="flex items-center justify-center max-w-xs">
                        <div
                          class="flex items-center border-2 border-slate-600 rounded-lg bg-slate-700"
                        >
                          <button
                            @click="decrementQuantity"
                            :disabled="quantity <= 1"
                            class="px-4 py-3 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <MinusIcon class="h-5 w-5" />
                          </button>
                          <span
                            class="px-6 py-3 text-white bg-slate-600 min-w-[4rem] text-center font-semibold text-lg"
                          >
                            {{ quantity }}
                          </span>
                          <button
                            @click="incrementQuantity"
                            :disabled="quantity >= product.stock"
                            class="px-4 py-3 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <PlusIcon class="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Total Price -->
                    <div class="bg-slate-700/50 rounded-lg p-4">
                      <div class="flex justify-between items-center">
                        <span class="text-slate-300 font-medium">Total:</span>
                        <span class="text-2xl font-bold text-blue-400">
                          ${{ Math.round(product.price * quantity) }}
                        </span>
                      </div>
                    </div>

                    <!-- Add to Cart Button -->
                    <button
                      @click="addToCart"
                      :disabled="quantity > product.stock"
                      class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center text-lg"
                    >
                      <ShoppingCartIcon class="h-6 w-6 mr-3" />
                      Add {{ quantity }} to Cart
                    </button>
                  </div>

                  <!-- Out of Stock Section -->
                  <div v-else class="border-t border-slate-700 pt-6">
                    <button
                      disabled
                      class="w-full bg-slate-700 text-slate-400 px-6 py-4 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center text-lg"
                    >
                      <ExclamationTriangleIcon class="h-6 w-6 mr-3" />
                      Out of Stock
                    </button>
                    <p class="text-slate-500 text-sm text-center mt-2">
                      This product is currently unavailable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import {
  XMarkIcon,
  PhotoIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'
import { getImageUrl } from '@/services/api'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object,
    default: null,
  },
})

// Emits
const emit = defineEmits(['close', 'add-to-cart'])

// Reactive data
const quantity = ref(1)
const selectedImage = ref(null)

// Computed
const hasImages = computed(() => props.product?.images && props.product.images.length > 0)

// Methods
const closeModal = () => {
  emit('close')
}

const incrementQuantity = () => {
  if (quantity.value < props.product.stock) {
    quantity.value++
  }
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (props.product && quantity.value > 0) {
    emit('add-to-cart', {
      product: props.product,
      quantity: quantity.value,
    })
    // Reset quantity after adding to cart
    quantity.value = 1
  }
}

// Watch for product changes to reset state
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      quantity.value = 1
      selectedImage.value = hasImages.value ? newProduct.images[0] : null
    }
  },
  { immediate: true },
)

// Watch for modal open/close to handle body scroll
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)
</script>
