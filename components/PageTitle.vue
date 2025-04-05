<template>
  <div class="py-8">
    <div class="max-w-3xl">
      <h1 class="text-4xl font-light text-gray-900 mb-2">
        {{ title }}
      </h1>
      <div class="h-px w-16 bg-gray-200 mb-4"></div>
      <p class="text-lg text-gray-500">
        {{ description }}
      </p>
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
    required: true
  }
})
</script> 