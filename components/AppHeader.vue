<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 sm:py-6">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-xl sm:text-2xl font-light text-gray-800 tracking-tight hover:text-gray-900 transition-colors">
          CulinaryPassport
        </NuxtLink>
        
        <!-- Мобильное меню -->
        <button 
          @click="isMenuOpen = !isMenuOpen" 
          class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Открыть меню"
        >
          <svg 
            class="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              v-if="!isMenuOpen" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div class="hidden lg:flex items-center space-x-8">
          <nav class="flex items-center space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm px-2 py-1 rounded-md hover:bg-gray-100"
              active-class="text-gray-900 font-medium bg-gray-100"
            >
              Главная
            </NuxtLink>
            <NuxtLink 
              to="/recipes" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm px-2 py-1 rounded-md hover:bg-gray-100"
              active-class="text-gray-900 font-medium bg-gray-100"
            >
              Рецепты
            </NuxtLink>
            <NuxtLink 
              to="/favorites" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm px-2 py-1 rounded-md hover:bg-gray-100"
              active-class="text-gray-900 font-medium bg-gray-100"
            >
              Избранное
            </NuxtLink>
            <NuxtLink 
              to="/recipes/add" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm px-2 py-1 rounded-md hover:bg-gray-100"
              active-class="text-gray-900 font-medium bg-gray-100"
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

      <!-- Мобильное меню (выпадающее) -->
      <div 
        v-show="isMenuOpen" 
        class="lg:hidden mt-4 pb-4 transition-all duration-300 ease-in-out"
        :class="{'opacity-100 translate-y-0': isMenuOpen, 'opacity-0 -translate-y-4': !isMenuOpen}"
      >
        <nav class="flex flex-col space-y-4">
          <NuxtLink 
            to="/" 
            class="text-gray-600 hover:text-gray-900 transition-colors text-sm px-2 py-1 rounded-md hover:bg-gray-100"
            active-class="text-gray-900 font-medium bg-gray-100"
            @click="isMenuOpen = false"
          >
            Главная
          </NuxtLink>
          <NuxtLink 
            to="/recipes" 
            class="text-gray-600 hover:text-gray-900 transition-colors text-sm px-2 py-1 rounded-md hover:bg-gray-100"
            active-class="text-gray-900 font-medium bg-gray-100"
            @click="isMenuOpen = false"
          >
            Рецепты
          </NuxtLink>
          <NuxtLink 
            to="/favorites" 
            class="text-gray-600 hover:text-gray-900 transition-colors text-sm px-2 py-1 rounded-md hover:bg-gray-100"
            active-class="text-gray-900 font-medium bg-gray-100"
            @click="isMenuOpen = false"
          >
            Избранное
          </NuxtLink>
          <NuxtLink 
            to="/recipes/add" 
            class="text-gray-600 hover:text-gray-900 transition-colors text-sm px-2 py-1 rounded-md hover:bg-gray-100"
            active-class="text-gray-900 font-medium bg-gray-100"
            @click="isMenuOpen = false"
          >
            Добавить рецепт
          </NuxtLink>
        </nav>

        <div v-if="user" class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center space-x-2 px-2">
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
        
        <div v-else class="mt-4 pt-4 border-t border-gray-200 px-2 text-sm text-gray-500">
          Не авторизован
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { API_ENDPOINTS } from '~/config/api'

const router = useRouter()
const user = ref(null)
const isMenuOpen = ref(false)

const validateInitData = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.webApp.validateInitData, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ initData: initData.value })
    })

    if (!response.ok) {
      throw new Error('Ошибка валидации initData')
    }

    const userResponse = await fetch(API_ENDPOINTS.webApp.userInfo, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${initData.value}`
      }
    })

    if (!userResponse.ok) {
      throw new Error('Ошибка получения информации о пользователе')
    }

    const userData = await userResponse.json()
    user.value = userData
  } catch (error) {
    console.error('Ошибка при инициализации:', error)
    showError('Ошибка при инициализации приложения')
  }
}

onMounted(async () => {
  try {
    // Проверяем, есть ли initData в URL
    const initData = new URLSearchParams(window.location.search).get('initData')
    if (!initData) {
      console.log('No initData found')
      return
    }

    await validateInitData()
  } catch (error) {
    console.error('Auth error:', error)
    router.push('/error')
  }
})
</script>

<style scoped>
@media (max-width: 640px) {
  .container {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style> 