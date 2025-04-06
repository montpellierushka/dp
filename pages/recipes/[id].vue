<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center py-8">
      <div class="loading loading-spinner loading-lg"></div>
    </div>

    <div v-else-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>

    <div v-else-if="!recipe">
      <EmptyState
        title="Рецепт не найден"
        description="Попробуйте найти другой рецепт"
      />
    </div>

    <div v-else class="space-y-8">
      <div class="card bg-base-100 shadow-xl">
        <figure v-if="recipe.image_url" class="px-10 pt-10">
          <img :src="recipe.image_url" :alt="recipe.title" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h1 class="card-title text-3xl">{{ recipe.title }}</h1>
          <div class="flex flex-wrap gap-4 mt-4">
            <div class="badge badge-primary">
              {{ recipe.country }}
            </div>
            <div class="badge badge-secondary">
              {{ recipe.cooking_time }} мин
            </div>
          </div>
          <div class="divider"></div>
          <div class="prose max-w-none">
            <h2>Ингредиенты</h2>
            <ul>
              <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ ingredient.name }} - {{ ingredient.quantity }} {{ ingredient.unit }}
              </li>
            </ul>
            <h2>Шаги приготовления</h2>
            <ol>
              <li v-for="(step, index) in recipe.steps" :key="index">
                {{ step.description }}
                <img v-if="step.image_url" :src="step.image_url" :alt="`Шаг ${index + 1}`" class="mt-2 rounded-lg" />
              </li>
            </ol>
          </div>
          <div class="card-actions justify-end mt-4">
            <button
              class="btn btn-primary"
              @click="handleToggleFavorite"
            >
              {{ isFavorite ? 'Удалить из избранного' : 'Добавить в избранное' }}
            </button>
            <button
              v-if="user && user.id === recipe.author.id"
              class="btn btn-error"
              @click="handleDeleteRecipe"
            >
              Удалить рецепт
            </button>
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
const { favorites, toggleFavorite: toggleFavoriteApi } = useFavorites()
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
        await toggleFavoriteApi(recipe.value.id)
        showSuccess(isFavorite.value ? 'Рецепт добавлен в избранное' : 'Рецепт удален из избранного')
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
        const recipeId = Number(route.params.id)
        const loadedRecipe = await loadRecipe(recipeId)
        if (!loadedRecipe) {
            throw new Error('Рецепт не найден')
        }
        recipe.value = loadedRecipe
    } catch (e) {
        error.value = 'Произошла ошибка при загрузке рецепта'
        showError(error.value)
        console.error('Error loading recipe:', e)
    } finally {
        loading.value = false
    }
})
</script> 