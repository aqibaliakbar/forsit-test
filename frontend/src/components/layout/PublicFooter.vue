<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="bg-slate-800 border-t border-slate-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <img src="/forsit-logo.svg" alt="Forsit" class="h-8 w-auto" />
          </div>
          <p class="text-slate-400 mb-4 max-w-md">
            Your trusted partner for quality products. We offer a curated selection of electronics,
            clothing, and more at competitive prices with excellent customer service.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-slate-400 hover:text-white transition-colors">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                />
              </svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-white transition-colors">
              <span class="sr-only">X</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-white transition-colors">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.017 2.04c3.054 0 3.41.012 4.61.066 2.99.137 4.143 1.276 4.28 4.28.054 1.2.066 1.556.066 4.61 0 3.054-.012 3.41-.066 4.61-.137 2.99-1.276 4.143-4.28 4.28-1.2.054-1.556.066-4.61.066-3.054 0-3.41-.012-4.61-.066-2.99-.137-4.143-1.276-4.28-4.28-.054-1.2-.066-1.556-.066-4.61 0-3.054.012-3.41.066-4.61.137-2.99 1.276-4.143 4.28-4.28 1.2-.054 1.556-.066 4.61-.066zm0-2.04C8.818 0 8.423.014 7.174.072 4.508.23 2.728 2.013 2.57 4.68.014 8.423 0 8.818 0 12.017c0 3.2.014 3.594.072 4.844.158 2.665 1.941 4.448 4.608 4.606 4.843.058 5.238.072 8.537.072 3.2 0 3.594-.014 4.844-.072 2.665-.158 4.448-1.941 4.606-4.608.058-4.843.072-5.238.072-8.537 0-3.2-.014-3.594-.072-4.844C21.509 2.013 19.726.23 17.061.072 15.818.014 15.423 0 12.017 0zm0 5.838a6.18 6.18 0 1 0 6.18 6.18 6.18 6.18 0 0 0-6.18-6.18zm0 10.2a4.02 4.02 0 1 1 4.02-4.02 4.02 4.02 0 0 1-4.02 4.02zm7.884-10.392a1.444 1.444 0 1 1-1.444-1.444 1.444 1.444 0 0 1 1.444 1.444z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/dashboard"
                class="text-slate-400 hover:text-white transition-colors"
              >
                Admin Dashboard
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="text-white font-semibold mb-4">Customer Service</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-slate-400 hover:text-white transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" class="text-slate-400 hover:text-white transition-colors">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" class="text-slate-400 hover:text-white transition-colors"> Returns </a>
            </li>
            <li>
              <a href="#" class="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div
        class="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
      >
        <p class="text-slate-400 text-sm">
          © {{ currentYear }} Forsit Store. All rights reserved.
        </p>
        <div class="flex items-center space-x-4 mt-4 md:mt-0">
          <span class="text-slate-400 text-sm">Powered by</span>
          <div class="flex items-center space-x-1">
            <img src="/forsit-logo.svg" alt="Forsit" class="h-6 w-auto" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
