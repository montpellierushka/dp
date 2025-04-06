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
                description="Найдите интересные рецепты и добавьте их в избранное"
            >
                <template #action>
                    <NuxtLink to="/recipes" class="btn btn-primary">Найти рецепты</NuxtLink>
                </template>
            </EmptyState>
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

const loading = ref(false)
const error = ref('')
const recipes = ref([])

const loadRecipes = async () => {
    loading.value = true
    error.value = ''
    try {
        const response = await $fetch('/api/recipes/favorites')
        recipes.value = response
    } catch (e) {
        error.value = 'Ошибка при загрузке избранных рецептов'
        console.error('Error loading favorite recipes:', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadRecipes()
})
</script> 