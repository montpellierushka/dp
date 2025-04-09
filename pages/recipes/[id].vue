<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/10">
    <!-- Загрузка -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="loading loading-spinner loading-lg text-primary"></div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="container mx-auto px-4 py-8">
      <div class="alert alert-error shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Рецепт не найден -->
    <div v-else-if="!recipe" class="container mx-auto px-4 py-8">
      <EmptyState
        title="Рецепт не найден"
        description="Попробуйте найти другой рецепт"
      />
    </div>

    <!-- Рецепт -->
    <div v-else class="pb-16">
      <!-- Герой-секция с изображением -->
      <div class="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <div v-if="recipe.image_url" class="absolute inset-0">
          <img :src="recipe.image_url" :alt="recipe.title" class="w-full h-full object-cover transform scale-105 transition-transform duration-10000 hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        </div>
        <div v-else class="absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span class="text-9xl text-white opacity-20 font-serif">{{ recipe.title.charAt(0) }}</span>
        </div>
        
        <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div class="container mx-auto">
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <div class="badge bg-primary border-none text-white px-5 py-3 text-base font-medium shadow-lg">{{ recipe.country?.name || 'Не указана' }}</div>
              <div class="badge bg-secondary border-none text-white px-5 py-3 text-base font-medium shadow-lg">{{ recipe.cooking_time }} мин</div>
              <div class="badge bg-accent border-none text-white px-5 py-3 text-base font-medium shadow-lg">{{ recipe.servings }} порций</div>
            </div>
            <h1 class="text-5xl md:text-6xl font-bold mb-6 font-serif text-white drop-shadow-lg">{{ recipe.title }}</h1>
            <div class="flex items-center gap-4">
              <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-14 h-14 ring-2 ring-white shadow-lg">
                  <span class="text-2xl">{{ recipe.author?.name?.charAt(0) || 'U' }}</span>
                </div>
              </div>
              <div>
                <p class="font-medium text-xl text-white drop-shadow-md">{{ recipe.author?.name || 'Пользователь' }}</p>
                <p class="text-sm text-white/80">{{ new Date(recipe.created_at).toLocaleDateString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Основной контент -->
      <div class="container mx-auto px-4 -mt-16 relative z-10">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Левая колонка: описание и кнопки -->
          <div class="lg:w-1/3 space-y-6">
            <!-- Описание -->
            <div class="card bg-white shadow-xl rounded-2xl border border-base-200">
              <div class="card-body p-6">
                <h2 class="card-title text-xl font-bold flex items-center gap-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Описание
                </h2>
                <div class="divider my-2"></div>
                <p class="text-lg leading-relaxed text-gray-700">{{ recipe.description }}</p>
                
                <div class="divider my-4"></div>
                
                <div class="flex flex-col gap-4">
                  <button
                    class="btn bg-blue-600 hover:bg-blue-700 bg-gradient-to-r from-primary to-primary-focus border-none text-white w-full h-14 text-lg rounded-md shadow-lg hover:shadow-xl transition-all"
                    @click="handleToggleFavorite"
                  >
                    <span v-if="isFavorite" class="text-yellow-300 text-2xl mr-2">★</span>
                    <span v-else class="text-2xl mr-2">☆</span>
                    {{ isFavorite ? 'В избранном' : 'В избранное' }}
                  </button>
                  
                  <button
                    v-if="user && user.id === recipe.author.id"
                    class="btn bg-gradient-to-r from-error to-error-focus border-none text-white w-full h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                    @click="handleDeleteRecipe"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    Удалить рецепт
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Ингредиенты -->
            <div class="card bg-white shadow-xl rounded-2xl border border-base-200 sticky top-4">
              <div class="card-body p-6">
                <h2 class="card-title text-xl font-bold flex items-center gap-2 text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Ингредиенты
                </h2>
                <div class="divider my-2"></div>
                <ul class="space-y-4">
                  <li v-for="(ingredient, index) in recipe.ingredients" :key="index" class="flex items-center gap-4 p-4 rounded-xl hover:bg-base-200 transition-colors border border-base-200">
                    <div class="w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                      <span class="text-white text-xs font-bold">{{ index + 1 }}</span>
                    </div>
                    <span class="font-medium flex-grow text-lg text-gray-700">{{ ingredient.name }}</span>
                    <span class="text-secondary font-bold whitespace-nowrap text-lg px-3 py-1 bg-secondary/10 rounded-lg">{{ ingredient.amount }} {{ ingredient.unit }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Правая колонка: шаги приготовления -->
          <div class="lg:w-2/3 space-y-6">
            <!-- Шаги приготовления -->
            <div class="card bg-white shadow-xl rounded-2xl border border-base-200">
              <div class="card-body p-6">
                <h2 class="card-title text-xl font-bold flex items-center gap-2 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Шаги приготовления
                </h2>
                <div class="divider my-2"></div>
                <ol class="space-y-10">
                  <li v-for="(step, index) in recipe.steps" :key="index" class="flex gap-6">
                    <div class="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-focus text-white flex items-center justify-center font-bold text-xl shadow-lg ring-2 ring-white">
                      {{ index + 1 }}
                    </div>
                    <div class="flex-grow">
                      <p class="text-xl mb-4 leading-relaxed text-gray-700">{{ step.description }}</p>
                      <div v-if="step.image_url" class="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                        <img :src="step.image_url" :alt="`Шаг ${index + 1}`" class="w-full h-auto max-h-96 object-cover" />
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            
            <!-- Теги -->
            <div class="card bg-white shadow-xl rounded-2xl border border-base-200">
              <div class="card-body p-6">
                <h2 class="card-title text-xl font-bold flex items-center gap-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Теги
                </h2>
                <div class="divider my-2"></div>
                <div class="flex flex-wrap gap-3">
                  <div v-for="(tag, index) in recipe.tags" :key="index" class="badge bg-primary/10 text-primary border-none px-5 py-3 text-base font-medium rounded-xl">
                    {{ tag.name }}
                  </div>
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useRecipes } from '~/composables/useRecipes'
import { useFavorites } from '~/composables/useFavorites'
import { useNotifications } from '~/composables/useNotifications'
import type { Recipe } from '~/composables/useRecipes'
import EmptyState from '~/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const { user } = useAuth()
const { loadRecipe, deleteRecipe } = useRecipes()
const { favorites, toggleFavorite: toggleFavoriteApi, loadFavorites } = useFavorites()
const { showSuccess, showError } = useNotifications()

const recipe = ref<Recipe | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const isFavorite = computed(() => {
    if (!recipe.value) return false
    return favorites.value.some(f => f.id === recipe.value?.id)
})

const handleToggleFavorite = async () => {
    if (!recipe.value) return
    try {
        const success = await toggleFavoriteApi(recipe.value.id)
        if (success) {
            // Обновляем список избранного
            await loadFavorites()
            // Обновляем состояние рецепта
            recipe.value.is_favorite = !recipe.value.is_favorite
            showSuccess(recipe.value.is_favorite ? 'Рецепт добавлен в избранное' : 'Рецепт удален из избранного')
        }
    } catch (e) {
        showError('Произошла ошибка при изменении избранного')
        console.error('Error toggling favorite:', e)
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

onMounted(async () => {
    try {
        loading.value = true
        error.value = null
        const recipeId = Number(route.params.id)
        
        if (isNaN(recipeId)) {
            throw new Error('Неверный ID рецепта')
        }
        
        const loadedRecipe = await loadRecipe(recipeId)
        if (!loadedRecipe) {
            throw new Error('Рецепт не найден')
        }
        recipe.value = loadedRecipe
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Произошла ошибка при загрузке рецепта'
        showError(error.value)
        console.error('Error loading recipe:', e)
    } finally {
        loading.value = false
    }
})
</script> 