<template>
  <PageContainer>
    <template #header>
      <PageTitle
        title="Избранные рецепты"
        description="Ваша личная коллекция любимых рецептов со всего мира"
      />
    </template>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div 
        v-for="recipe in favoriteRecipes" 
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
            class="text-red-500 hover:text-red-600 transition-colors"
          >
            <Icon name="heart" class="w-5 h-5" />
          </button>
        </div>
        <p class="text-sm text-gray-600 mb-2">{{ recipe.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">{{ recipe.cookingTime }} мин</span>
          <span class="text-sm text-gray-500">{{ recipe.country }}</span>
        </div>
      </div>
    </div>

    <div v-if="favoriteRecipes.length === 0" class="text-center py-12">
      <Icon name="heart-outline" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">У вас пока нет избранных рецептов</h3>
      <p class="text-gray-600 mb-4">Начните добавлять рецепты в избранное, чтобы они появились здесь</p>
      <NuxtLink 
        to="/recipes" 
        class="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
      >
        Перейти к рецептам
        <Icon name="arrow-right" class="ml-2 w-4 h-4" />
      </NuxtLink>
    </div>
  </PageContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import PageContainer from '~/components/PageContainer.vue'
import PageTitle from '~/components/PageTitle.vue'

const { $api } = useNuxtApp()
const favoriteRecipes = ref([])

onMounted(async () => {
  try {
    const response = await $api.get('/favorites')
    favoriteRecipes.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке избранных рецептов:', error)
  }
})

const toggleFavorite = async (recipe) => {
  try {
    await $api.post(`/recipes/${recipe.id}/toggle-favorite`)
    favoriteRecipes.value = favoriteRecipes.value.filter(r => r.id !== recipe.id)
  } catch (error) {
    console.error('Ошибка при удалении из избранного:', error)
  }
}
</script> 