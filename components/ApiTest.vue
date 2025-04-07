<template>
  <div class="p-4 space-y-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold text-gray-800">Тест API</h2>
    
    <!-- Получение рецептов -->
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <button 
          @click="testGetRecipes" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="inline-block animate-spin mr-2">⟳</span>
          Получить рецепты
        </button>
        <span v-if="isLoading" class="text-sm text-gray-500">Загрузка...</span>
      </div>
      <div v-if="getResponse" class="p-2 bg-gray-100 rounded max-h-60 overflow-auto">
        <pre class="text-xs">{{ JSON.stringify(getResponse, null, 2) }}</pre>
      </div>
    </div>

    <!-- Создание рецепта -->
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <button 
          @click="testCreateRecipe" 
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="inline-block animate-spin mr-2">⟳</span>
          Создать тестовый рецепт
        </button>
        <span v-if="isLoading" class="text-sm text-gray-500">Загрузка...</span>
      </div>
      <div v-if="postResponse" class="p-2 bg-gray-100 rounded max-h-60 overflow-auto">
        <pre class="text-xs">{{ JSON.stringify(postResponse, null, 2) }}</pre>
      </div>
    </div>

    <!-- Удаление рецепта -->
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <input 
          v-model="recipeIdToDelete" 
          type="number" 
          placeholder="ID рецепта для удаления" 
          class="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        <button 
          @click="testDeleteRecipe" 
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          :disabled="isLoading || !recipeIdToDelete"
        >
          <span v-if="isLoading" class="inline-block animate-spin mr-2">⟳</span>
          Удалить рецепт
        </button>
        <span v-if="isLoading" class="text-sm text-gray-500">Загрузка...</span>
      </div>
      <div v-if="deleteResponse" class="p-2 bg-gray-100 rounded max-h-60 overflow-auto">
        <pre class="text-xs">{{ JSON.stringify(deleteResponse, null, 2) }}</pre>
      </div>
    </div>

    <!-- Тест CORS -->
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <button 
          @click="testCors" 
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="inline-block animate-spin mr-2">⟳</span>
          Тест CORS
        </button>
        <span v-if="isLoading" class="text-sm text-gray-500">Загрузка...</span>
      </div>
      <div v-if="corsResponse" class="p-2 bg-gray-100 rounded max-h-60 overflow-auto">
        <pre class="text-xs">{{ JSON.stringify(corsResponse, null, 2) }}</pre>
      </div>
    </div>

    <!-- Ошибки -->
    <div v-if="error" class="p-3 bg-red-100 text-red-700 rounded border border-red-200">
      <div class="font-bold">Ошибка:</div>
      <div>{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { API_ENDPOINTS, API_BASE_URL } from '~/config/api'

const { $api } = useNuxtApp()
const getResponse = ref<any>(null)
const postResponse = ref<any>(null)
const deleteResponse = ref<any>(null)
const corsResponse = ref<any>(null)
const error = ref('')
const isLoading = ref(false)
const recipeIdToDelete = ref('')

const testGetRecipes = async () => {
  try {
    isLoading.value = true
    error.value = ''
    console.log('Начало запроса к API...')
    const response = await $api.get(API_ENDPOINTS.recipes.list)
    console.log('Ответ от API:', response)
    getResponse.value = response
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
  } finally {
    isLoading.value = false
  }
}

const testCreateRecipe = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    const formData = new FormData()
    formData.append('title', 'Тестовый рецепт')
    formData.append('description', 'Это тестовый рецепт для проверки API')
    formData.append('country', 'Россия')
    formData.append('cooking_time', '30')
    formData.append('servings', '4')
    formData.append('tags', JSON.stringify(['тест', 'api']))
    formData.append('ingredients', JSON.stringify([
      { name: 'Ингредиент 1', quantity: '100', unit: 'г' },
      { name: 'Ингредиент 2', quantity: '200', unit: 'г' }
    ]))
    formData.append('steps', JSON.stringify([
      { description: 'Шаг 1' },
      { description: 'Шаг 2' }
    ]))

    console.log('Начало запроса к API...')
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.recipes.create}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || `Ошибка при создании рецепта: ${response.status}`)
    }

    const data = await response.json()
    postResponse.value = data
  } catch (e: unknown) {
    console.error('Полная ошибка:', e)
    if (e instanceof Error) {
      error.value = `Ошибка при создании рецепта: ${e.message}`
    } else {
      error.value = 'Произошла неизвестная ошибка при создании рецепта'
    }
  } finally {
    isLoading.value = false
  }
}

const testDeleteRecipe = async () => {
  if (!recipeIdToDelete.value) {
    error.value = 'Введите ID рецепта для удаления'
    return
  }

  try {
    isLoading.value = true
    error.value = ''
    
    console.log('Начало запроса к API...')
    const response = await $api.delete(API_ENDPOINTS.recipes.delete(Number(recipeIdToDelete.value)))
    console.log('Ответ от API:', response)
    deleteResponse.value = response
  } catch (e: unknown) {
    console.error('Полная ошибка:', e)
    if (e instanceof Error) {
      if ('response' in e) {
        const axiosError = e as any
        error.value = `Ошибка при удалении рецепта: ${axiosError.response?.data?.message || e.message}`
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
        error.value = `Ошибка при удалении рецепта: ${e.message}`
      }
    } else {
      error.value = 'Произошла неизвестная ошибка при удалении рецепта'
    }
  } finally {
    isLoading.value = false
  }
}

const testCors = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    console.log('Начало запроса к API...')
    const response = await $api.get(API_ENDPOINTS.recipes.list)
    console.log('Ответ от API:', response)
    corsResponse.value = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    }
  } catch (e: unknown) {
    console.error('Полная ошибка:', e)
    if (e instanceof Error) {
      if ('response' in e) {
        const axiosError = e as any
        error.value = `Ошибка при проверке CORS: ${axiosError.response?.data?.message || e.message}`
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
        error.value = `Ошибка при проверке CORS: ${e.message}`
      }
    } else {
      error.value = 'Произошла неизвестная ошибка при проверке CORS'
    }
  } finally {
    isLoading.value = false
  }
}
</script>