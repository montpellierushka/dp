<template>
  <div>
    <main class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div class="py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">Рецепты</h1>
          <NuxtLink
            to="/recipes/add"
            class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            <Icon name="plus" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Новый рецепт
          </NuxtLink>
        </div>
        
        <!-- Компонент фильтрации -->
        <div class="mb-4 sm:mb-6">
          <RecipeFilters @filter="handleFilter" />
        </div>
        
        <!-- Список рецептов -->
        <div v-if="filteredRecipes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <RecipeCard 
            v-for="recipe in filteredRecipes" 
            :key="recipe.id" 
            :recipe="recipe" 
          />
        </div>
        
        <!-- Сообщение, если рецепты не найдены -->
        <div v-else class="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 text-center">
          <Icon name="exclamation-circle" class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <p class="text-gray-500 text-base sm:text-lg">Рецепты не найдены</p>
          <p class="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">Попробуйте изменить параметры поиска</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRecipesStore } from '~/stores/recipes'

const recipesStore = useRecipesStore()

// Состояние фильтров
const filters = ref({
  search: '',
  country: '',
  tag: ''
})

// Обработчик изменения фильтров
const handleFilter = (newFilters) => {
  filters.value = newFilters
}

// Фильтрация рецептов
const filteredRecipes = computed(() => {
  return recipesStore.recipes.filter(recipe => {
    // Поиск по названию и описанию
    const matchesSearch = !filters.value.search || 
      recipe.title.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(filters.value.search.toLowerCase())
    
    // Фильтр по стране
    const matchesCountry = !filters.value.country || 
      recipe.country === filters.value.country
    
    // Фильтр по тегу
    const matchesTag = !filters.value.tag || 
      recipe.tags.includes(filters.value.tag)
    
    return matchesSearch && matchesCountry && matchesTag
  })
})
</script> 