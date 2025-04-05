<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppHeader />
    
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="text-center text-gray-500 text-xs sm:text-sm">
          © 2024 CulinaryPassport. Все права защищены.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue'
</script>

<style>
.container {
  max-width: 1280px;
  width: 100%;
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1025px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style> 