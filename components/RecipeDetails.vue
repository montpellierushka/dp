<template>
    <div>
        <div v-if="loading" class="flex justify-center items-center py-8">
            <LoadingSpinner />
        </div>
        <div v-else-if="error" class="py-8">
            <ErrorMessage :message="error" />
        </div>
        <div v-else-if="recipe" class="space-y-8">
            <div class="card bg-base-100 shadow-xl">
                <figure class="px-4 pt-4">
                    <img :src="recipe.image_url || '/images/placeholder.webp'" :alt="recipe.title" class="rounded-xl h-96 w-full object-cover" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ recipe.title }}</h2>
                    <p class="text-lg">{{ recipe.description }}</p>
                    <div class="flex gap-2 mt-4">
                        <span class="badge badge-primary">{{ recipe.country?.name || 'Не указана' }}</span>
                        <span class="badge badge-secondary">{{ recipe.cooking_time }} мин</span>
                    </div>
                    <div class="card-actions justify-between items-center mt-4">
                        <div class="flex items-center gap-2">
                            <button class="btn btn-ghost" @click="handleToggleFavorite">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'text-red-500': recipe.is_favorite }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{{ recipe.favorites_count ?? 0 }}</span>
                            </button>
                        </div>
                        <div v-if="isOwner" class="flex gap-2">
                            <NuxtLink :to="`/recipes/${recipe.id}/edit`" class="btn btn-primary">Редактировать</NuxtLink>
                            <button class="btn btn-error" @click="deleteRecipe">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title">Ингредиенты</h3>
                        <div class="space-y-2">
                            <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="flex justify-between">
                                <span>{{ ingredient.name }}</span>
                                <span>{{ ingredient.amount }} {{ ingredient.unit }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title">Шаги приготовления</h3>
                        <div class="space-y-4">
                            <div v-for="(step, index) in recipe.steps" :key="index" class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                    {{ index + 1 }}
                                </div>
                                <div class="flex-grow">
                                    <p>{{ step.description }}</p>
                                    <img v-if="step.image_url" :src="step.image_url" :alt="`Шаг ${index + 1}`" class="mt-2 rounded-lg h-48 w-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h3 class="card-title">Теги</h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in recipe.tags" :key="tag.id" class="badge badge-outline">
                            {{ tag.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useFavorites } from '~/composables/useFavorites'
import { useNotifications } from '~/composables/useNotifications'
import type { Recipe } from '~/composables/useRecipes'

interface RecipeWithFavorites extends Recipe {
    favorites_count?: number
}

const props = defineProps<{
    recipeId: string | number
}>()

const { user } = useAuth()
const { favorites, toggleFavorite: toggleFavoriteApi, loading: favoritesLoading, isFavorite, loadFavorites } = useFavorites()
const { showSuccess, showError } = useNotifications()
const recipe = ref<RecipeWithFavorites | null>(null)
const loading = ref(false)
const error = ref('')
const isFavoriteValue = computed(() => recipe.value ? isFavorite(recipe.value.id) : false)
const isOwner = ref(false)

const loadRecipe = async () => {
    loading.value = true
    error.value = ''
    try {
        const response = await $fetch<{ data: RecipeWithFavorites }>(`/api/recipes/${props.recipeId}`)
        recipe.value = response.data
        isOwner.value = response.data.author.id === user.value?.id
    } catch (e) {
        error.value = 'Ошибка при загрузке рецепта'
        console.error('Error loading recipe:', e)
    } finally {
        loading.value = false
    }
}

const handleToggleFavorite = async () => {
    if (!recipe.value) return
    try {
        const success = await toggleFavoriteApi(recipe.value.id)
        if (success) {
            recipe.value.is_favorite = !recipe.value.is_favorite
            recipe.value.favorites_count = (recipe.value.favorites_count ?? 0) + (recipe.value.is_favorite ? 1 : -1)
        }
    } catch (e) {
        console.error('Error toggling favorite:', e)
    }
}

const deleteRecipe = async () => {
    if (!recipe.value) return
    if (!confirm('Вы уверены, что хотите удалить этот рецепт?')) return
    
    try {
        await $fetch(`/api/recipes/${props.recipeId}`, {
            method: 'DELETE'
        })
        navigateTo('/recipes')
    } catch (error) {
        console.error('Error deleting recipe:', error)
    }
}

onMounted(async () => {
    await Promise.all([
        loadRecipe(),
        loadFavorites()
    ])
})
</script> 