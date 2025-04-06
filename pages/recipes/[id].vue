<template>
  <PageContainer>
    <template #header>
      <PageTitle
        :title="recipe?.title || ''"
        :description="recipe?.description || ''"
      />
    </template>

    <div v-if="recipe" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Основная информация -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Изображение -->
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="aspect-w-16 aspect-h-9">
            <img :src="recipe.image_url" :alt="recipe.title" class="rounded-lg object-cover" />
          </div>
        </div>

        <!-- Ингредиенты -->
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <h2 class="text-xl font-medium text-gray-900 mb-4">Ингредиенты</h2>
          <ul class="space-y-2">
            <li 
              v-for="ingredient in recipe.ingredients" 
              :key="ingredient.name"
              class="flex items-center justify-between"
            >
              <span class="text-gray-900">{{ ingredient.name }}</span>
              <span class="text-gray-500">{{ ingredient.amount }}</span>
            </li>
          </ul>
        </div>

        <!-- Инструкции -->
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <h2 class="text-xl font-medium text-gray-900 mb-4">Инструкции</h2>
          <ol class="space-y-4">
            <li 
              v-for="(step, index) in recipe.instructions" 
              :key="index"
              class="flex"
            >
              <span class="flex-shrink-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mr-4">
                {{ index + 1 }}
              </span>
              <span class="text-gray-600">{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>

      <!-- Боковая панель -->
      <div class="space-y-6">
        <!-- Информация о рецепте -->
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-medium text-gray-900">Информация</h2>
            <button 
              @click="toggleFavorite"
              class="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Icon :name="isFavorite ? 'heart' : 'heart-outline'" class="w-6 h-6" />
            </button>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <Icon name="clock" class="w-5 h-5 text-gray-400 mr-2" />
              <span class="text-gray-600">{{ recipe.cookingTime }} минут</span>
            </div>
            <div class="flex items-center">
              <Icon name="map-pin" class="w-5 h-5 text-gray-400 mr-2" />
              <span class="text-gray-600">{{ recipe.country }}</span>
            </div>
            <div class="flex items-center">
              <Icon name="user" class="w-5 h-5 text-gray-400 mr-2" />
              <span class="text-gray-600">{{ recipe.servings }} порций</span>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-200">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Теги</h3>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="tag in recipe.tags" 
                :key="tag"
                class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Кнопки действий -->
        <div class="space-y-2">
          <button 
            @click="shareRecipe"
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
          >
            <Icon name="share" class="w-4 h-4 mr-2" />
            Поделиться
          </button>
          <button 
            @click="printRecipe"
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
          >
            <Icon name="printer" class="w-4 h-4 mr-2" />
            Распечатать
          </button>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { useRoute } from 'vue-router'
import PageContainer from '~/components/PageContainer.vue'
import PageTitle from '~/components/PageTitle.vue'
import type { Recipe } from '~/types/recipe'

const { $api } = useNuxtApp()
const route = useRoute()
const recipe = ref<Recipe | null>(null)
const isFavorite = ref(false)

onMounted(async () => {
  try {
    const response = await $api.get<{ data: Recipe }>(`/recipes/${route.params.id}`)
    recipe.value = response.data.data
    isFavorite.value = response.data.data.is_favorite || false
  } catch (error) {
    console.error('Ошибка при загрузке рецепта:', error)
  }
})

const toggleFavorite = async () => {
  if (!recipe.value) return
  try {
    await $api.post(`/recipes/${recipe.value.id}/toggle-favorite`)
    isFavorite.value = !isFavorite.value
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
  }
}

const shareRecipe = () => {
  if (!recipe.value) return
  if (navigator.share) {
    navigator.share({
      title: recipe.value.title,
      text: recipe.value.description,
      url: window.location.href
    })
  }
}

const printRecipe = () => {
  window.print()
}
</script> 