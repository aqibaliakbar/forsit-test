<script setup>
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, CogIcon } from '@heroicons/vue/24/outline'

defineProps({
  cartItemsCount: {
    type: Number,
    default: 0,
  },
})

const mobileMenuOpen = ref(false)
</script>

<template>
  <nav class="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center space-x-3">
            <img src="/forsit-logo.svg" alt="Forsit" class="h-8 w-auto" />
          </router-link>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-3">
          <router-link
            to="/dashboard"
            class="hidden md:flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
          >
            <CogIcon class="h-5 w-5" />
            <span class="font-medium">Dashboard</span>
          </router-link>

          <button
            @click="$emit('toggle-cart')"
            class="relative p-3 text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
          >
            <ShoppingCartIcon class="h-6 w-6" />
            <span
              v-if="cartItemsCount > 0"
              class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
            >
              {{ cartItemsCount }}
            </span>
          </button>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-3 text-slate-300 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-slate-700 py-4">
        <div class="space-y-2">
          <router-link
            to="/dashboard"
            @click="mobileMenuOpen = false"
            class="block text-slate-300 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Dashboard
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
