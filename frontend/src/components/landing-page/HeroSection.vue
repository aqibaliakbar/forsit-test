<script setup>
const scrollToProducts = () => {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative bg-gradient-to-br from-slate-800 to-slate-900 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
          Welcome to <span class="text-blue-400">Forsit Store</span>
        </h1>
        <p class="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Discover amazing products at unbeatable prices. Shop from our curated collection of
          electronics, clothing, and more.
        </p>
        <button
          @click="scrollToProducts"
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Shop Now
        </button>
      </div>
    </div>
  </section>
</template>
