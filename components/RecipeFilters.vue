<template>
  <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Фильтры</h3>
    
    <div class="space-y-6">
      <!-- Поиск -->
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
          Поиск
        </label>
        <div class="relative">
          <input
            id="search"
            v-model="filters.search"
            type="text"
            placeholder="Название рецепта..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          >
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Кухня -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Кухня
        </label>
        <select
          v-model="filters.cuisine"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
        >
          <option value="">Все кухни</option>
          <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
            {{ cuisine }}
          </option>
        </select>
      </div>

      <!-- Время приготовления -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Время приготовления
        </label>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-gray-500 mb-1">От</label>
            <input
              v-model="filters.minTime"
              type="number"
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            >
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">До</label>
            <input
              v-model="filters.maxTime"
              type="number"
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            >
          </div>
        </div>
      </div>

      <!-- Сложность -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Сложность
        </label>
        <div class="space-y-2">
          <label v-for="level in difficultyLevels" :key="level" class="flex items-center">
            <input
              type="radio"
              v-model="filters.difficulty"
              :value="level"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            >
            <span class="ml-2 text-sm text-gray-700">{{ level }}</span>
          </label>
        </div>
      </div>

      <!-- Кнопки -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          @click="applyFilters"
          class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors text-sm sm:text-base"
        >
          Применить
        </button>
        <button
          @click="resetFilters"
          class="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors text-sm sm:text-base"
        >
          Сбросить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const filters = ref({
  search: '',
  cuisine: '',
  minTime: '',
  maxTime: '',
  difficulty: ''
})

const cuisines = ['Русская', 'Итальянская', 'Японская', 'Китайская', 'Мексиканская']
const difficultyLevels = ['Легкая', 'Средняя', 'Сложная']

const emit = defineEmits(['filter'])

const applyFilters = () => {
  emit('filter', filters.value)
}

const resetFilters = () => {
  filters.value = {
    search: '',
    cuisine: '',
    minTime: '',
    maxTime: '',
    difficulty: ''
  }
  emit('filter', filters.value)
}
</script> 