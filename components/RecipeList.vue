<template>
    <div class="space-y-8">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold">Рецепты</h2>
            <NuxtLink to="/recipes/new" class="btn btn-primary">Создать рецепт</NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RecipeCard
                v-for="recipe in recipes"
                :key="recipe.id"
                :recipe="recipe"
            />
        </div>

        <div v-if="loading" class="flex justify-center items-center py-8">
            <LoadingSpinner />
        </div>

        <div v-if="error" class="py-8">
            <ErrorMessage :message="error" />
        </div>

        <div v-if="!loading && recipes.length === 0" class="py-8">
            <EmptyState
                title="Рецепты не найдены"
                description="Попробуйте изменить параметры поиска"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Recipe } from '~/composables/useRecipes'

defineProps<{
    recipes: Recipe[]
    loading: boolean
    error: string
}>()
</script> 