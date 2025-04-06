<template>
  <div>
    <PageHeader>
      <template #title>Избранные рецепты</template>
    </PageHeader>

    <PageContainer>
      <div v-if="loading" class="text-center py-8">
        <div class="loading loading-spinner loading-lg"></div>
      </div>

      <div v-else-if="error" class="alert alert-error">
        {{ error }}
      </div>

      <div v-else-if="recipes.length === 0" class="text-center py-8">
        <p class="text-lg">У вас пока нет избранных рецептов</p>
        <NuxtLink to="/recipes" class="btn btn-primary mt-4">
          Найти рецепты
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
          @favorite="toggleFavorite"
        />
      </div>
    </PageContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'

const api = useApi()

const loading = ref(false)
const error = ref('')
const recipes = ref([])

const loadFavorites = async () => {
  try {
    loading.value = true
    error.value = ''

    const response = await api.get('/favorites/recipes')
    recipes.value = response.data
  } catch (e) {
    error.value = e.response?.data?.message || 'Произошла ошибка при загрузке избранных рецептов'
    console.error('Error loading favorites:', e)
  } finally {
    loading.value = false
  }
}

const toggleFavorite = async (recipeId: number) => {
  try {
    const recipe = recipes.value.find(r => r.id === recipeId)
    if (!recipe) return

    if (recipe.favorites_count > 0) {
      await api.delete(`/favorites/recipes/${recipeId}`)
      recipe.favorites_count--
      recipes.value = recipes.value.filter(r => r.id !== recipeId)
    } else {
      await api.post(`/favorites/recipes/${recipeId}`)
      recipe.favorites_count++
    }
  } catch (e) {
    console.error('Error toggling favorite:', e)
  }
}

onMounted(() => {
  loadFavorites()
})
</script> 