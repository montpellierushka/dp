<template>
  <PageContainer>
    <template #header>
      <PageTitle
        title="Рецепты"
        description="Исследуйте кулинарные традиции разных стран"
      />
    </template>

    <!-- Фильтры -->
    <div class="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900">Фильтры</h2>
        <button 
          @click="showFilters = !showFilters"
          class="text-gray-400 hover:text-gray-500"
        >
          <Icon :name="showFilters ? 'chevron-up' : 'chevron-down'" class="w-5 h-5" />
        </button>
      </div>
      
      <div v-if="showFilters" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Страна</label>
          <select 
            v-model="selectedCountry"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <option value="">Все страны</option>
            <option v-for="country in countries" :key="country" :value="country">
              {{ country }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Теги</label>
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="tag in tags" 
              :key="tag"
              class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full cursor-pointer hover:bg-gray-200"
              :class="{ 'bg-gray-800 text-white': selectedTags.includes(tag) }"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Мин. время</label>
          <input
            v-model="minTime"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Макс. время</label>
          <input
            v-model="maxTime"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>
    </div>

    <!-- Список рецептов -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div 
        v-for="recipe in filteredRecipes" 
        :key="recipe.id"
        class="bg-white rounded-lg border border-gray-200 p-4"
      >
        <div class="aspect-w-16 aspect-h-9 mb-4">
          <img :src="recipe.image" :alt="recipe.title" class="rounded-lg object-cover" />
        </div>
        <div class="flex items-start justify-between mb-2">
          <h3 class="text-lg font-medium text-gray-900">{{ recipe.title }}</h3>
          <button 
            @click="toggleFavorite(recipe)"
            class="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Icon :name="isFavorite(recipe.id) ? 'heart' : 'heart-outline'" class="w-5 h-5" />
          </button>
        </div>
        <p class="text-sm text-gray-600 mb-2">{{ recipe.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">{{ recipe.cookingTime }} мин</span>
          <span class="text-sm text-gray-500">{{ recipe.country }}</span>
        </div>
        <NuxtLink 
          :to="`/recipes/${recipe.id}`"
          class="mt-4 inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm w-full justify-center"
        >
          Открыть рецепт
          <Icon name="arrow-right" class="ml-2 w-4 h-4" />
        </NuxtLink>
      </div>
    </div>

    <!-- Кнопка добавления рецепта -->
    <div class="mt-6 text-center">
      <NuxtLink 
        to="/recipes/add"
        class="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
      >
        <Icon name="plus" class="mr-2 w-4 h-4" />
        Добавить рецепт
      </NuxtLink>
    </div>
  </PageContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { useRecipesStore } from '~/stores/recipes'
import PageContainer from '~/components/PageContainer.vue'
import PageTitle from '~/components/PageTitle.vue'

const { $api } = useNuxtApp()
const recipes = ref([])
const showFilters = ref(true)
const selectedCountry = ref('')
const selectedTags = ref([])
const minTime = ref('')
const maxTime = ref('')

// Тестовые данные
const countries = ['Италия', 'Франция', 'Испания', 'Япония', 'Таиланд', 'Греция', 'Индия', 'Мексика', 'Китай', 'Россия']
const tags = ['Завтрак', 'Обед', 'Ужин', 'Десерт', 'Вегетарианское', 'Острое', 'Сладкое', 'Соленое']

onMounted(async () => {
  try {
    const response = await $api.get('/recipes')
    recipes.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке рецептов:', error)
  }
})

// Фильтрация рецептов
const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => {
    if (selectedCountry.value && recipe.country !== selectedCountry.value) return false
    if (selectedTags.value.length > 0 && !selectedTags.value.some(tag => recipe.tags.includes(tag))) return false
    if (minTime.value && recipe.cookingTime < parseInt(minTime.value)) return false
    if (maxTime.value && recipe.cookingTime > parseInt(maxTime.value)) return false
    return true
  })
})

// Избранное
const isFavorite = (recipeId) => {
  return favoriteRecipes.value.includes(recipeId)
}

const toggleFavorite = async (recipe) => {
  try {
    await $api.post(`/recipes/${recipe.id}/toggle-favorite`)
    const index = favoriteRecipes.value.indexOf(recipe.id)
    if (index === -1) {
      favoriteRecipes.value.push(recipe.id)
    } else {
      favoriteRecipes.value.splice(index, 1)
    }
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
  }
}

const favoriteRecipes = ref([])
</script> 