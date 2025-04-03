<template>
  <div class="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors overflow-hidden">
    <div class="relative h-48">
      <img 
        v-if="recipe.imageUrl" 
        :src="recipe.imageUrl" 
        :alt="recipe.title"
        class="w-full h-full object-cover"
      >
      <div v-else class="w-full h-full bg-gray-50 flex items-center justify-center">
        <Icon name="photo" class="w-12 h-12 text-gray-300" />
      </div>
      <button 
        @click="toggleFavorite"
        class="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
      >
        <Icon 
          :name="isFavorite ? 'heart-solid' : 'heart'" 
          class="w-5 h-5"
          :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
        />
      </button>
    </div>
    <div class="p-6">
      <h3 class="text-lg font-light text-gray-900 mb-2">{{ recipe.title }}</h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ recipe.description }}</p>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-gray-500 text-sm">
            <Icon name="map-marker" class="w-4 h-4 mr-1" />
            {{ recipe.country }}
          </div>
          <div class="flex items-center text-gray-500 text-sm">
            <Icon name="clock" class="w-4 h-4 mr-1" />
            {{ recipe.cookingTime }} мин
          </div>
        </div>
        <div class="flex items-center text-gray-500 text-sm">
          <Icon name="star" class="w-4 h-4 mr-1" />
          {{ recipe.rating?.toFixed(1) || 'Нет оценок' }}
        </div>
      </div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in recipe.tags.slice(0, 3)" 
          :key="tag"
          class="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full"
        >
          {{ tag }}
        </span>
      </div>
      <NuxtLink 
        :to="`/recipes/${recipe.id}`"
        class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
      >
        Подробнее
        <Icon name="arrow-right" class="w-4 h-4 ml-2" />
      </NuxtLink>
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