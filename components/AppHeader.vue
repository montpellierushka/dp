<template>
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-light text-gray-800 tracking-tight">
          CulinaryPassport
        </NuxtLink>
        
        <div class="flex items-center space-x-8">
          <nav class="flex items-center space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              active-class="text-gray-900 font-medium"
            >
              Главная
            </NuxtLink>
            <NuxtLink 
              to="/recipes" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              active-class="text-gray-900 font-medium"
            >
              Рецепты
            </NuxtLink>
            <NuxtLink 
              to="/favorites" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              active-class="text-gray-900 font-medium"
            >
              Избранное
            </NuxtLink>
            <NuxtLink 
              to="/recipes/add" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              active-class="text-gray-900 font-medium"
            >
              Добавить рецепт
            </NuxtLink>
          </nav>

          <div v-if="user" class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img 
                  v-if="user.photo_url" 
                  :src="user.photo_url" 
                  :alt="user.first_name"
                  class="w-full h-full object-cover"
                >
                <div v-else class="w-full h-full flex items-center justify-center bg-blue-500 text-white font-medium">
                  {{ user.first_name?.[0] || '?' }}
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-900">
                  {{ user.first_name }} {{ user.last_name }}
                </span>
                <span v-if="user.username" class="text-xs text-gray-500">
                  @{{ user.username }}
                </span>
              </div>
            </div>
          </div>
          
          <div v-else class="text-sm text-gray-500">
            Не авторизован
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  try {
    // Проверяем, есть ли initData в URL
    const initData = new URLSearchParams(window.location.search).get('initData')
    if (!initData) {
      console.log('No initData found')
      return
    }

    // Валидируем initData на бэкенде
    const response = await fetch('/api/web-app/validate-init-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Telegram-Init-Data': initData
      }
    })

    if (!response.ok) {
      throw new Error('Invalid init data')
    }

    // Получаем информацию о пользователе
    const userResponse = await fetch('/api/web-app/user-info', {
      headers: {
        'X-Telegram-Init-Data': initData
      }
    })

    if (userResponse.ok) {
      const userData = await userResponse.json()
      user.value = userData.data
    }
  } catch (error) {
    console.error('Auth error:', error)
    router.push('/error')
  }
})
</script> 