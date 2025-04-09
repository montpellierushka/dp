<template>
   <div>
      <PageHeader
          title="Избранное"
          description="Список избранных рецептов"
      >
      </PageHeader>
  </div>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="loading loading-spinner loading-lg text-primary"></div>
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
        :removeFromList="true"
        @remove="handleRemoveRecipe"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFavorites } from '~/composables/useFavorites'
import { useNotifications } from '~/composables/useNotifications'
import type { Recipe } from '~/composables/useRecipes'

const { favorites, loadFavorites } = useFavorites()
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

// Функция для удаления рецепта из списка
const handleRemoveRecipe = (recipeId: number) => {
  recipes.value = recipes.value.filter(r => r.id !== recipeId)
}

onMounted(() => {
  loadRecipes()
})
</script> 