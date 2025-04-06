import { ref } from 'vue'
import { useApi } from './useApi'
import { API_ENDPOINTS } from '~/config/api'

export interface Recipe {
    id: number
    title: string
    description: string
    image_url: string
    cooking_time: number
    country: string
    tags: string[]
    ingredients: Array<{
        name: string
        quantity: string
        unit: string
    }>
    steps: Array<{
        description: string
        image_url?: string
    }>
    author: {
        id: number
        name: string
        photo_url: string
    }
    created_at: string
    updated_at: string
    is_favorite: boolean
}

export interface RecipeFilters {
    country_id?: number
    cooking_time?: number
    sort?: string
    direction?: string
    tags?: string
    [key: string]: string | number | undefined
}

export interface RecipeFormData {
    title: string
    description: string
    country_id: number
    cooking_time: number
    tags: number[]
    ingredients: {
        name: string
        quantity: string
        unit: string
    }[]
    steps: {
        description: string
        image?: File
    }[]
    image?: File
}

export const useRecipes = () => {
    const api = useApi()
    const recipes = ref<Recipe[]>([])
    const recipe = ref<Recipe | null>(null)
    const loading = ref(false)
    const error = ref('')

    const loadRecipes = async (filters: RecipeFilters = {}) => {
        try {
            const response = await api.get<Recipe[]>(API_ENDPOINTS.recipes.list, filters)
            recipes.value = response
        } catch (e) {
            console.error('Error loading recipes:', e)
            error.value = 'Ошибка при загрузке рецептов'
        }
    }

    const loadRecipe = async (id: number) => {
        try {
            const response = await api.get<Recipe>(`/api/recipes/${id}`)
            recipe.value = response
            return response
        } catch (e) {
            console.error('Error loading recipe:', e)
            throw e
        }
    }

    const createRecipe = async (data: FormData) => {
        try {
            const response = await api.post<Recipe>(API_ENDPOINTS.recipes.create, data)
            recipes.value.push(response)
            return response
        } catch (e) {
            console.error('Error creating recipe:', e)
            error.value = 'Ошибка при создании рецепта'
            throw e
        }
    }

    const updateRecipe = async (id: number, data: FormData) => {
        try {
            const response = await api.put<Recipe>(`/api/recipes/${id}`, data)
            return response
        } catch (e) {
            console.error('Error updating recipe:', e)
            throw e
        }
    }

    const deleteRecipe = async (id: number) => {
        try {
            await api.del(`/api/recipes/${id}`)
        } catch (e) {
            console.error('Error deleting recipe:', e)
            throw e
        }
    }

    const toggleFavorite = async (id: number) => {
        try {
            const response = await api.post<Recipe>(`/api/recipes/${id}/favorite`)
            return response
        } catch (e) {
            console.error('Error toggling favorite:', e)
            throw e
        }
    }

    const loadFavorites = async () => {
        try {
            const response = await api.get<Recipe[]>(API_ENDPOINTS.favorites.list)
            recipes.value = response
        } catch (e) {
            console.error('Error loading favorites:', e)
            error.value = 'Ошибка при загрузке избранного'
        }
    }

    const loadMyRecipes = async () => {
        try {
            const response = await api.get<Recipe[]>(API_ENDPOINTS.user.recipes)
            recipes.value = response
        } catch (e) {
            console.error('Error loading my recipes:', e)
            error.value = 'Ошибка при загрузке моих рецептов'
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
        loadFavorites,
        loadMyRecipes
    }
} 