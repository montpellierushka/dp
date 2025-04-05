<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-12">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center text-gray-500 text-sm">
          © 2024 CulinaryPassport. Все права защищены.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue'
</script> 