<template>
  <div>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-light text-gray-900 mb-6">Избранные рецепты</h1>
        
        <div v-if="favoriteRecipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RecipeCard 
            v-for="recipe in favoriteRecipes" 
            :key="recipe.id" 
            :recipe="recipe" 
          />
        </div>
        
        <div v-else class="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Icon name="star" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500 text-lg">У вас пока нет избранных рецептов</p>
          <NuxtLink 
            to="/recipes" 
            class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mt-4"
          >
            Перейти к рецептам
            <Icon name="arrow-right" class="w-4 h-4 ml-2" />
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRecipesStore } from '~/stores/recipes'
import { useFavoritesStore } from '~/stores/favorites'

const recipesStore = useRecipesStore()
const favoritesStore = useFavoritesStore()

// Инициализируем избранное при монтировании страницы
onMounted(() => {
  favoritesStore.initializeFromLocalStorage()
})

const favoriteRecipes = computed(() => {
  return recipesStore.recipes.filter(recipe => 
    favoritesStore.favoriteRecipes.includes(recipe.id)
  )
})
</script> 