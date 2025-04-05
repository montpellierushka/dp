<template>
  <div>
    <main class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div class="py-4 sm:py-6">
        <h1 class="text-2xl sm:text-3xl font-light text-gray-900 mb-4 sm:mb-6">Избранные рецепты</h1>
        
        <div v-if="favoriteRecipes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <RecipeCard 
            v-for="recipe in favoriteRecipes" 
            :key="recipe.id" 
            :recipe="recipe" 
          />
        </div>
        
        <div v-else class="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 text-center">
          <Icon name="star" class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <p class="text-gray-500 text-base sm:text-lg">У вас пока нет избранных рецептов</p>
          <NuxtLink 
            to="/recipes" 
            class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mt-3 sm:mt-4 text-sm"
          >
            Перейти к рецептам
            <Icon name="arrow-right" class="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
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