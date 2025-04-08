<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Логотип и мобильное меню -->
        <div class="flex items-center">
          <!-- Мобильное меню -->
          <div class="flex-shrink-0 flex items-center lg:hidden">
            <a href="/test-api">тест</a>
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen" 
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              :aria-expanded="isMobileMenuOpen"
            >
              <span class="sr-only">Открыть меню</span>
              <svg class="h-6 w-6" :class="{ 'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg class="h-6 w-6" :class="{ 'hidden': !isMobileMenuOpen, 'block': isMobileMenuOpen }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Логотип -->
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
              Кулинарная книга
            </NuxtLink>
          </div>
        </div>

        <!-- Десктопное меню -->
        <div class="hidden lg:flex lg:items-center lg:space-x-8">
          <NuxtLink 
            v-for="link in mainLinks" 
            :key="link.path" 
            :to="link.path"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            :class="{ 'text-blue-600 bg-gray-50': isActive(link.path) }"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <!-- Правая часть навбара -->
        <div class="flex items-center">
          <template>
            <div class="hidden sm:flex sm:items-center sm:space-x-4">
              <NuxtLink to="/auth/login" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Войти
              </NuxtLink>
              <NuxtLink to="/auth/register" class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                Регистрация
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Мобильное меню -->
    <div 
      v-show="isMobileMenuOpen" 
      class="lg:hidden"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="mobile-menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink 
          v-for="link in mainLinks" 
          :key="link.path" 
          :to="link.path"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          :class="{ 'text-blue-600 bg-gray-50': isActive(link.path) }"
          role="menuitem"
        >
          {{ link.name }}
        </NuxtLink>
        
        <!-- Мобильные кнопки авторизации -->
        <template>
          <NuxtLink 
            to="/auth/login" 
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            role="menuitem"
          >
            Войти
          </NuxtLink>
          <NuxtLink 
            to="/auth/register" 
            class="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
            role="menuitem"
          >
            Регистрация
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)

const mainLinks = [
  { name: 'Рецепты', path: '/recipes' },
  { name: 'Создать рецепт', path: '/recipes/new' },
  { name: 'Избранное', path: '/favorites' }
]

const isActive = (path: string) => {
  return route.path === path
}

// Закрываем меню при клике вне его
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      isProfileMenuOpen.value = false
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('click', () => {})
})
</script>

<style scoped>
nav {
  @apply transition-all duration-300;
}

nav:hover {
  @apply shadow-xl;
}

.router-link-active {
  @apply text-blue-600;
}

/* Анимации для мобильного меню */
.lg\:hidden {
  @apply transition-all duration-300 ease-in-out;
}

/* Улучшенные стили для мобильных устройств */
@media (max-width: 640px) {
  .text-xl {
    @apply text-lg;
  }
  
  .px-4 {
    @apply px-3;
  }
}
</style> 