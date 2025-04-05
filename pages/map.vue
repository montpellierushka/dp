<template>
  <div>
    <main class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div class="py-4 sm:py-6">
        <h1 class="text-2xl sm:text-3xl font-light text-gray-900 mb-4 sm:mb-6">Кулинарная карта мира</h1>
        
        <!-- Фильтры для мобильных и планшетов -->
        <div class="lg:hidden mb-4 sm:mb-6">
          <div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-base sm:text-lg font-medium text-gray-900">Фильтры</h2>
              <button 
                @click="showFilters = !showFilters"
                class="text-gray-400 hover:text-gray-500"
              >
                <Icon :name="showFilters ? 'chevron-up' : 'chevron-down'" class="w-5 h-5" />
              </button>
            </div>
            
            <div v-if="showFilters" class="space-y-3">
              <div>
                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Страна</label>
                <select 
                  v-model="selectedCountry"
                  class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <option value="">Все страны</option>
                  <option v-for="country in countries" :key="country" :value="country">
                    {{ country }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Теги</label>
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
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Мин. время</label>
                  <input
                    v-model="minTime"
                    type="number"
                    min="0"
                    class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <div>
                  <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Макс. время</label>
                  <input
                    v-model="maxTime"
                    type="number"
                    min="0"
                    class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 h-[400px] sm:h-[500px] md:h-[600px]">
          <RecipeMap :recipes="filteredRecipes" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRecipesStore } from '~/stores/recipes'

const recipesStore = useRecipesStore()
const recipes = computed(() => recipesStore.recipes)

// Состояние фильтров
const showFilters = ref(false)
const selectedCountry = ref('')
const selectedTags = ref([])
const minTime = ref('')
const maxTime = ref('')

// Тестовые данные
const countries = ['Италия', 'Франция', 'Испания', 'Япония', 'Таиланд', 'Греция', 'Индия', 'Мексика', 'Китай', 'Россия']
const tags = ['Завтрак', 'Обед', 'Ужин', 'Десерт', 'Вегетарианское', 'Острое', 'Сладкое', 'Соленое']

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

// Переключение тега
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}
</script> 