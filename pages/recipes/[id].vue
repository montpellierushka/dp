<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Загрузка -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-pulse flex flex-col items-center gap-4">
        <div class="w-20 h-20 bg-primary rounded-full animate-bounce"></div>
        <span class="text-gray-600 font-medium">Загружаем рецепт...</span>
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="container mx-auto px-4 py-8">
      <div class="p-6 bg-red-50 rounded-xl border border-red-200 flex items-center gap-4">
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <div class="text-red-600">{{ error }}</div>
      </div>
    </div>

    <!-- Рецепт не найден -->
    <div v-else-if="!recipe" class="container mx-auto px-4 py-8">
      <div class="text-center py-20">
        <div class="mb-8 text-9xl text-gray-200">🍳</div>
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Рецепт не найден</h1>
        <p class="text-gray-600">Попробуйте найти другой рецепт</p>
      </div>
    </div>

    <!-- Рецепт -->
    <div v-else class="pb-16">
      <!-- Герой-секция -->
      <div class="relative h-96 bg-gray-900 overflow-hidden">
        <div class="absolute inset-0 opacity-90">
          <img v-if="recipe.image_url" :src="recipe.image_url" class="w-full h-full object-cover transform scale-110 blur-sm"/>
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent"></div>
        </div>
        
        <div class="relative h-full flex items-end pb-12 container mx-auto px-4">
          <div class="max-w-4xl">
            <div class="flex gap-3 mb-6">
              <div class="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm text-white">
                🕒 {{ recipe.cooking_time }} мин
              </div>
              <div class="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm text-white">
                👨🍳 {{ recipe.servings }} порций
              </div>
            </div>
            <h1 class="text-5xl font-bold text-white mb-6">{{ recipe.title }}</h1>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <span class="text-white text-xl">{{ recipe.author?.name?.charAt(0) || 'U' }}</span>
              </div>
              <div>
                <p class="text-white font-medium">{{ recipe.author?.name || 'Пользователь' }}</p>
                <p class="text-sm text-white/80">{{ new Date(recipe.created_at).toLocaleDateString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Основной контент -->
      <div class="container mx-auto px-4 mt-12">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Левая колонка -->
          <div class="lg:col-span-1 space-y-8">
            <!-- Действия -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <button @click="handleToggleFavorite" 
                class="w-full flex items-center justify-center gap-2 py-4 rounded-xl transition-all"
                :class="isFavorite ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
                {{ isFavorite ? 'В избранном' : 'Добавить в избранное' }}
              </button>

              <button v-if="user && user.id === recipe.author.id" 
                @click="handleDeleteRecipe"
                class="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Удалить рецепт
              </button>
            </div>

            <!-- Ингредиенты -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">🥕</span>
                Ингредиенты
              </h2>
              <ul class="space-y-4">
                <li v-for="(ingredient, index) in recipe.ingredients" :key="index" 
                  class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span class="text-blue-600 font-bold">#{{ index + 1 }}</span>
                  <span class="flex-grow">{{ ingredient.name }}</span>
                  <span class="text-gray-600 font-medium">{{ ingredient.amount }} {{ ingredient.unit }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Описание -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">📝</span>
                Описание
              </h2>
              <p class="text-gray-600 leading-relaxed">{{ recipe.description }}</p>
            </div>

            <!-- Шаги приготовления -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">👨🍳</span>
                Приготовление
              </h2>
              <div class="space-y-8">
                <div v-for="(step, index) in recipe.steps" :key="index" class="flex gap-6">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      {{ index + 1 }}
                    </div>
                  </div>
                  <div class="flex-grow">
                    <p class="text-gray-600 mb-4">{{ step.description }}</p>
                    <img v-if="step.image_url" :src="step.image_url" class="rounded-xl border border-gray-100">
                  </div>
                </div>
              </div>
            </div>

            <!-- Теги -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                <span class="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">🏷</span>
                Теги
              </h2>
              <div class="flex flex-wrap gap-2">
                <div v-for="(tag, index) in recipe.tags" :key="index" 
                  class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {{ tag.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Логика остается без изменений
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useRecipes } from '~/composables/useRecipes'
import { useFavorites } from '~/composables/useFavorites'
import { useNotifications } from '~/composables/useNotifications'
import type { Recipe } from '~/composables/useRecipes'

const route = useRoute()
const router = useRouter()
const { user } = useAuth()
const { loadRecipe, deleteRecipe } = useRecipes()
const { favorites, toggleFavorite: toggleFavoriteApi, loadFavorites } = useFavorites()
const { showSuccess, showError } = useNotifications()

const recipe = ref<Recipe | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const isFavorite = computed(() => recipe.value?.is_favorite || false)

const handleToggleFavorite = async () => {
  if (!recipe.value) return
  
  try {
    await toggleFavoriteApi(recipe.value)
    if (recipe.value) {
      recipe.value.is_favorite = !recipe.value.is_favorite
    }
    showSuccess(recipe.value.is_favorite ? 'Рецепт добавлен в избранное' : 'Рецепт удален из избранного')
  } catch (err) {
    showError('Не удалось обновить статус избранного')
  }
}

const handleDeleteRecipe = async () => {
    if (!recipe.value) return
    try {
        await deleteRecipe(recipe.value.id)
        showSuccess('Рецепт успешно удален')
        router.push('/recipes')
    } catch (e) {
        showError('Произошла ошибка при удалении рецепта')
        console.error('Error deleting recipe:', e)
    }
}

const loadRecipeData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const recipeId = Number(route.params.id)
    const recipeData = await loadRecipe(recipeId)
    recipe.value = recipeData
    await loadFavorites()
    if (recipe.value) {
      recipe.value.is_favorite = favorites.value.some(f => f.id === recipeId)
    }
  } catch (err) {
    error.value = 'Не удалось загрузить рецепт'
    console.error('Ошибка при загрузке рецепта:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadRecipeData()
})
</script>

<style>
.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid #111827;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>