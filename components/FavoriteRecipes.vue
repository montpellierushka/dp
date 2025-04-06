<template>
    <div>
        <div v-if="loading" class="flex justify-center items-center py-8">
            <LoadingSpinner />
        </div>
        <div v-else-if="error" class="py-8">
            <ErrorMessage :message="error" />
        </div>
        <div v-else-if="recipes.length === 0" class="py-8">
            <EmptyState
                title="У вас пока нет избранных рецептов"
                description="Добавьте рецепты в избранное, чтобы они появились здесь"
            />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RecipeCard
                v-for="recipe in recipes"
                :key="recipe.id"
                :recipe="recipe"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Recipe } from '~/composables/useRecipes'
import { API_ENDPOINTS } from '~/config/api'

const recipes = ref<Recipe[]>([])
const loading = ref(false)
const error = ref('')

const loadFavorites = async () => {
    loading.value = true
    error.value = ''
    try {
        const response = await $fetch<{ data: Recipe[] }>(API_ENDPOINTS.favorites.list)
        recipes.value = response.data
    } catch (e) {
        console.error('Error loading favorites:', e)
        showError('Ошибка при загрузке избранного')
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadFavorites()
})
</script> 