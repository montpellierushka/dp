<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="relative">
      <img 
        :src="recipe.image" 
        :alt="recipe.title"
        class="w-full h-48 sm:h-56 md:h-64 object-cover"
      >
      <div class="absolute top-2 right-2">
        <button 
          @click="toggleFavorite"
          class="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <svg 
            class="w-5 h-5" 
            :class="{'text-red-500': isFavorite, 'text-gray-400': !isFavorite}"
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="p-4 sm:p-6">
      <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
        {{ recipe.title }}
      </h3>
      
      <div class="flex items-center space-x-2 mb-3">
        <div class="flex items-center">
          <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="ml-1 text-sm text-gray-600">{{ recipe.rating }}</span>
        </div>
        <span class="text-gray-400">•</span>
        <span class="text-sm text-gray-600">{{ recipe.cookingTime }} мин</span>
      </div>

      <p class="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
        {{ recipe.description }}
      </p>

      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in recipe.tags" 
          :key="tag"
          class="px-2 py-1 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded-full"
        >
          {{ tag }}
        </span>
      </div>

      <div class="flex items-center justify-between">
        <NuxtLink 
          :to="`/recipes/${recipe.id}`"
          class="text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium transition-colors"
        >
          Подробнее
        </NuxtLink>
        <span class="text-sm text-gray-500">
          {{ recipe.author }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecipesStore } from '~/stores/recipes'
import { useFavoritesStore } from '~/stores/favorites'

const props = defineProps<{
  recipe: {
    id: number
    title: string
    description: string
    country: string
    cookingTime: number
    tags: string[]
    rating?: number
    imageUrl?: string
  }
}>()

const recipesStore = useRecipesStore()
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => {
  return favoritesStore.favorites?.includes(props.recipe.id) || false
})

const toggleFavorite = () => {
  if (isFavorite.value) {
    favoritesStore.removeFavorite(props.recipe.id)
  } else {
    favoritesStore.addFavorite(props.recipe.id)
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 