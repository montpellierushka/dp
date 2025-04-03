<template>
  <div>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-light text-gray-900">Рецепты</h1>
          <NuxtLink
            to="/recipes/add"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Icon name="plus" class="w-5 h-5 mr-2" />
            Новый рецепт
          </NuxtLink>
        </div>
        
        <!-- Компонент фильтрации -->
        <RecipeFilters @filter="handleFilter" />
        
        <!-- Список рецептов -->
        <div v-if="filteredRecipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RecipeCard 
            v-for="recipe in filteredRecipes" 
            :key="recipe.id" 
            :recipe="recipe" 
          />
        </div>
        
        <!-- Сообщение, если рецепты не найдены -->
        <div v-else class="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Icon name="exclamation-circle" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500 text-lg">Рецепты не найдены</p>
          <p class="text-gray-400 mt-2">Попробуйте изменить параметры поиска</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
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