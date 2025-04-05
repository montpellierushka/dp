<template>
  <div class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ title }}</h1>
      <p v-if="description" class="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script> 