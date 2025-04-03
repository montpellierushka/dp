<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="recipe" class="max-w-4xl mx-auto">
      <div class="mb-8">
        <div class="relative h-96 rounded-lg overflow-hidden">
          <img 
            v-if="recipe.imageUrl" 
            :src="recipe.imageUrl" 
            :alt="recipe.title"
            class="w-full h-full object-cover"
          >
          <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400 text-lg">Нет изображения</span>
          </div>
          <div class="absolute top-4 right-4 flex space-x-4">
            <button 
              @click="toggleFavorite"
              class="p-3 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <Icon 
                :name="isFavorite ? 'heart-solid' : 'heart'" 
                class="w-6 h-6"
                :class="isFavorite ? 'text-red-500' : 'text-gray-500'"
              />
            </button>
            <NuxtLink 
              :to="`/recipes/${recipe.id}/edit`"
              class="p-3 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <Icon name="pencil" class="w-6 h-6 text-gray-500" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <h1 class="text-3xl font-bold mb-4">{{ recipe.title }}</h1>
          <p class="text-gray-600 mb-6">{{ recipe.description }}</p>
          
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Ингредиенты</h2>
            <ul class="space-y-2">
              <li 
                v-for="(ingredient, index) in recipe.ingredients" 
                :key="index"
                class="flex items-center"
              >
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {{ ingredient }}
              </li>
            </ul>
          </div>

          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Шаги приготовления</h2>
            <ol class="space-y-4">
              <li 
                v-for="(step, index) in recipe.steps" 
                :key="index"
                class="flex"
              >
                <span class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                  {{ index + 1 }}
                </span>
                <span>{{ step }}</span>
              </li>
            </ol>
          </div>
        </div>

        <div class="md:col-span-1">
          <div class="bg-gray-50 rounded-lg p-6">
            <div class="space-y-4">
              <div class="flex items-center">
                <Icon name="map-marker" class="w-5 h-5 text-gray-500 mr-2" />
                <span class="text-gray-600">{{ recipe.country }}</span>
              </div>
              <div class="flex items-center">
                <Icon name="clock" class="w-5 h-5 text-gray-500 mr-2" />
                <span class="text-gray-600">{{ recipe.cookingTime }} минут</span>
              </div>
              <div class="flex items-center">
                <Icon name="star" class="w-5 h-5 text-yellow-400 mr-2" />
                <span class="text-gray-600">{{ recipe.rating?.toFixed(1) || 'Нет оценок' }}</span>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="text-lg font-semibold mb-3">Теги</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in recipe.tags" 
                  :key="tag"
                  class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12">
        <RecipeReviews :recipe-id="recipe.id" />
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-gray-500">Рецепт не найден</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecipesStore } from '~/stores/recipes'
import { useFavoritesStore } from '~/stores/favorites'

// Указываем, что страница использует макет по умолчанию
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const recipesStore = useRecipesStore()
const favoritesStore = useFavoritesStore()

const recipe = computed(() => {
  return recipesStore.getRecipeById(Number(route.params.id))
})

const isFavorite = computed(() => {
  return favoritesStore.favorites?.includes(Number(route.params.id)) || false
})

const toggleFavorite = () => {
  if (isFavorite.value) {
    favoritesStore.removeFavorite(Number(route.params.id))
  } else {
    favoritesStore.addFavorite(Number(route.params.id))
  }
}
</script> 