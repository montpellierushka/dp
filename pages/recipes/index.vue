<template>
    <div>
        <PageHeader
            title="Рецепты"
            description="Список всех рецептов"
        >
        </PageHeader>
    </div>
    <div class="container mx-auto px-4 py-8">
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="loading loading-spinner loading-lg text-primary"></div>
        </div>
        <div v-else-if="error" class="alert alert-error">
            <span>{{ error }}</span>
        </div>
        <div v-else-if="recipes.length === 0" class="text-center py-12">
            <h3 class="text-xl font-medium text-gray-700">Рецепты не найдены</h3>
            <p class="mt-2 text-gray-500">Попробуйте изменить параметры поиска</p>
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
import { useFavorites } from '~/composables/useFavorites'
import { useNotifications } from '~/composables/useNotifications'
import { useRecipes } from '~/composables/useRecipes'
import type { Recipe } from '~/composables/useRecipes'

const router = useRouter()
const { showSuccess, showError } = useNotifications()
const { loadRecipes } = useRecipes()
const recipes = ref<Recipe[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const loadRecipesData = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
        const loadedRecipes = await loadRecipes()
        if (!Array.isArray(loadedRecipes)) {
            throw new Error('Ошибка при загрузке рецептов: неверный формат данных')
        }
        recipes.value = loadedRecipes
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Ошибка при загрузке рецептов'
        console.error('Error loading recipes:', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadRecipesData()
})
</script> 