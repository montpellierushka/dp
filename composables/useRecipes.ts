import { ref } from 'vue'
import type { Recipe, RecipeStep } from '~/types/api'

interface RecipeFilters {
    search?: string
    country_id?: number
    tags?: number[]
    difficulty?: string
    cooking_time?: number
}

interface RecipeFormData {
    title: string
    description: string
    country_id: number
    cooking_time: number
    servings: number
    difficulty: string
    tags: number[]
    ingredients: Array<{
        name: string
        amount: number
        unit: string
    }>
    steps: Array<{
        description: string
        image?: File | null
    }>
    image?: File | null
}

export function useRecipes() {
    const { $recipeApi } = useNuxtApp()
    const recipes = ref<Recipe[]>([])
    const recipe = ref<Recipe | null>(null)
    const loading = ref(false)
    const error = ref('')

    const loadRecipes = async (filters?: RecipeFilters) => {
        loading.value = true
        error.value = ''
        try {
            const response = await $recipeApi.getRecipes(filters)
            recipes.value = response.data
        } catch (e) {
            error.value = 'Ошибка при загрузке рецептов'
            console.error('Error loading recipes:', e)
        } finally {
            loading.value = false
        }
    }

    const loadRecipe = async (id: number) => {
        loading.value = true
        error.value = ''
        try {
            const response = await $recipeApi.getRecipe(id)
            recipe.value = response.data
        } catch (e) {
            error.value = 'Ошибка при загрузке рецепта'
            console.error('Error loading recipe:', e)
        } finally {
            loading.value = false
        }
    }

    const createRecipe = async (data: RecipeFormData) => {
        loading.value = true
        error.value = ''
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'ingredients' || key === 'steps' || key === 'tags') {
                    formData.append(key, JSON.stringify(value))
                } else if (value instanceof File) {
                    formData.append(key, value)
                } else {
                    formData.append(key, String(value))
                }
            })

            const response = await $recipeApi.createRecipe(formData)
            recipes.value.unshift(response.data)
            return response.data
        } catch (e) {
            error.value = 'Ошибка при создании рецепта'
            console.error('Error creating recipe:', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    const updateRecipe = async (id: number, data: Partial<RecipeFormData>) => {
        loading.value = true
        error.value = ''
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (value === null || value === undefined) return
                if (key === 'ingredients' || key === 'steps' || key === 'tags') {
                    formData.append(key, JSON.stringify(value))
                } else if (value instanceof File) {
                    formData.append(key, value)
                } else {
                    formData.append(key, String(value))
                }
            })

            const response = await $recipeApi.updateRecipe(id, formData)
            const index = recipes.value.findIndex((r: Recipe) => r.id === id)
            if (index !== -1) {
                recipes.value[index] = response.data
            }
            if (recipe.value?.id === id) {
                recipe.value = response.data
            }
            return response.data
        } catch (e) {
            error.value = 'Ошибка при обновлении рецепта'
            console.error('Error updating recipe:', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    const deleteRecipe = async (id: number) => {
        loading.value = true
        error.value = ''
        try {
            await $recipeApi.deleteRecipe(id)
            recipes.value = recipes.value.filter((r: Recipe) => r.id !== id)
            if (recipe.value?.id === id) {
                recipe.value = null
            }
        } catch (e) {
            error.value = 'Ошибка при удалении рецепта'
            console.error('Error deleting recipe:', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    const toggleFavorite = async (id: number) => {
        try {
            const { $favoriteApi } = useNuxtApp()
            const response = await $favoriteApi.addRecipe(id)
            const index = recipes.value.findIndex((r: Recipe) => r.id === id)
            if (index !== -1) {
                recipes.value[index] = response.data
            }
            if (recipe.value?.id === id) {
                recipe.value = response.data
            }
            return response.data
        } catch (e) {
            console.error('Error toggling favorite:', e)
            throw e
        }
    }

    const loadUserRecipes = async (userId: number) => {
        loading.value = true
        error.value = ''
        try {
            const { $api } = useNuxtApp()
            const response = await $api.get(`/users/${userId}/recipes`)
            recipes.value = response.data.data
        } catch (e) {
            error.value = 'Ошибка при загрузке рецептов пользователя'
            console.error('Error loading user recipes:', e)
        } finally {
            loading.value = false
        }
    }

    return {
        recipes,
        recipe,
        loading,
        error,
        loadRecipes,
        loadRecipe,
        createRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavorite,
        loadUserRecipes
    }
} 