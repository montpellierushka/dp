<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Избранные рецепты</h1>

    <div v-if="loading" class="flex justify-center">
      <div class="loading loading-spinner loading-lg"></div>
    </div>

    <div v-else-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>

    <div v-else-if="recipes.length === 0">
      <EmptyState
        title="Нет избранных рецептов"
        description="Добавьте рецепты в избранное, чтобы они появились здесь"
      />
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        @favorite="toggleFavorite"
        @delete="deleteRecipe"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFavorites } from '~/composables/useFavorites'
import { useNotifications } from '~/composables/useNotifications'
import type { Recipe } from '~/composables/useRecipes'

const { favorites, loadFavorites, toggleFavorite } = useFavorites()
const { showSuccess, showError } = useNotifications()
const recipes = ref<Recipe[]>([])
const loading = ref(false)
const error = ref('')

const loadRecipes = async () => {
  loading.value = true
  error.value = ''
  try {
    await loadFavorites()
    recipes.value = favorites.value
  } catch (e) {
    const err = e as Error
    error.value = 'Ошибка при загрузке избранных рецептов'
    showError(error.value)
    console.error('Error loading favorites:', err)
  } finally {
    loading.value = false
  }
}

const deleteRecipe = async (id: number) => {
  try {
    const recipe = recipes.value.find(r => r.id === id)
    if (recipe) {
      recipes.value = recipes.value.filter(r => r.id !== id)
      showSuccess('Рецепт удален из избранного')
    }
  } catch (e) {
    const err = e as Error
    error.value = 'Ошибка при удалении рецепта'
    showError(error.value)
    console.error('Error deleting recipe:', err)
  }
}

const handleToggleFavorite = async (recipe: Recipe) => {
  try {
    await toggleFavorite(recipe.id)
    showSuccess('Рецепт успешно удален из избранного')
    await loadFavorites()
  } catch (e) {
    showError('Произошла ошибка при удалении рецепта из избранного')
    console.error('Error toggling favorite:', e)
  }
}

onMounted(() => {
  loadRecipes()
})
</script> 