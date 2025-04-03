<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Поиск -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск рецептов..."
          class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <Icon name="search" class="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

      <!-- Фильтр по стране -->
      <div>
        <select
          v-model="selectedCountry"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Все страны</option>
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>

      <!-- Фильтр по тегам -->
      <div>
        <select
          v-model="selectedTag"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Все теги</option>
          <option v-for="tag in tags" :key="tag" :value="tag">
            {{ tag }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRecipesStore } from '~/stores/recipes'

const recipesStore = useRecipesStore()

// Состояние фильтров
const searchQuery = ref('')
const selectedCountry = ref('')
const selectedTag = ref('')

// Вычисляемые свойства для списков фильтров
const countries = computed(() => {
  const uniqueCountries = new Set(recipesStore.recipes.map(recipe => recipe.country))
  return Array.from(uniqueCountries).sort()
})

const tags = computed(() => {
  const allTags = recipesStore.recipes.flatMap(recipe => recipe.tags)
  const uniqueTags = new Set(allTags)
  return Array.from(uniqueTags).sort()
})

// Отслеживаем изменения фильтров и эмитим событие
watch([searchQuery, selectedCountry, selectedTag], () => {
  emit('filter', {
    search: searchQuery.value,
    country: selectedCountry.value,
    tag: selectedTag.value
  })
})

const emit = defineEmits(['filter'])
</script> 