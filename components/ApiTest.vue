<template>
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-bold">Тест API</h2>
    
    <div class="space-y-2">
      <button 
        @click="testGetRecipes" 
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Получить рецепты
      </button>
      <div v-if="getResponse" class="p-2 bg-gray-100 rounded">
        <pre>{{ JSON.stringify(getResponse, null, 2) }}</pre>
      </div>
    </div>

    <div class="space-y-2">
      <button 
        @click="testCreateRecipe" 
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Создать тестовый рецепт
      </button>
      <div v-if="postResponse" class="p-2 bg-gray-100 rounded">
        <pre>{{ JSON.stringify(postResponse, null, 2) }}</pre>
      </div>
    </div>

    <div v-if="error" class="p-2 bg-red-100 text-red-700 rounded">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()
const getResponse = ref(null)
const postResponse = ref(null)
const error = ref('')

const testGetRecipes = async () => {
  try {
    console.log('Начало запроса к API...')
    const response = await $api.get('/recipes')
    console.log('Ответ от API:', response)
    getResponse.value = response.data
    error.value = ''
  } catch (e: unknown) {
    console.error('Полная ошибка:', e)
    if (e instanceof Error) {
      if ('response' in e) {
        const axiosError = e as any
        error.value = `Ошибка при получении рецептов: ${axiosError.response?.data?.message || e.message}`
        console.error('Детали ошибки:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          headers: axiosError.response?.headers
        })
      } else if ('request' in e) {
        const axiosError = e as any
        error.value = `Ошибка сети: ${e.message}`
        console.error('Детали запроса:', {
          request: axiosError.request,
          config: axiosError.config
        })
      } else {
        error.value = `Ошибка при получении рецептов: ${e.message}`
      }
    } else {
      error.value = 'Произошла неизвестная ошибка при получении рецептов'
    }
  }
}

const testCreateRecipe = async () => {
  try {
    const testRecipe = {
      title: 'Тестовый рецепт',
      description: 'Это тестовый рецепт для проверки API',
      country: 'Россия',
      cookingTime: 30,
      servings: 4,
      ingredients: [
        { name: 'Ингредиент 1', amount: '100г' },
        { name: 'Ингредиент 2', amount: '200г' }
      ],
      instructions: ['Шаг 1', 'Шаг 2'],
      tags: ['тест', 'api'],
      imageUrl: ''
    }

    const response = await $api.post('/recipes', testRecipe)
    postResponse.value = response.data
    error.value = ''
  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = `Ошибка при создании рецепта: ${e.message}`
    } else {
      error.value = 'Произошла неизвестная ошибка при создании рецепта'
    }
    console.error(e)
  }
}
</script>