import { ref } from 'vue'
import { useApi } from './useApi'

export interface Recipe {
    id: number
    title: string
    description: string
    image: string
    country_id: number
    cooking_time: number
    user_id: number
    favorites_count: number
    is_favorite: boolean
    country: {
        id: number
        name: string
    }
    tags: {
        id: number
        name: string
    }[]
    ingredients: {
        id: number
        name: string
        amount: number
        unit: string
    }[]
    steps: {
        id: number
        description: string
        image: string
    }[]
}

interface RecipeFilters {
    country_id?: number
    cooking_time?: number
    sort?: string
    direction?: string
    tags?: number[]
}

export const useRecipes = () => {
    const api = useApi()
    const recipes = ref<Recipe[]>([])
    const recipe = ref<Recipe | null>(null)

    const loadRecipes = async (filters: RecipeFilters = {}) => {
        try {
            const response = await api.get<Recipe[]>('/api/recipes', filters)
            recipes.value = response
        } catch (e) {
            console.error('Error loading recipes:', e)
            throw e
        }
    }

    const loadRecipe = async (id: number) => {
        try {
            const response = await api.get<Recipe>(`/api/recipes/${id}`)
            recipe.value = response
        } catch (e) {
            console.error('Error loading recipe:', e)
            throw e
        }
    }

    const createRecipe = async (data: FormData) => {
        try {
            const response = await api.post<Recipe>('/api/recipes', data)
            return response
        } catch (e) {
            console.error('Error creating recipe:', e)
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
            const response = await api.get<Recipe[]>('/api/recipes/favorites')
            recipes.value = response
        } catch (e) {
            console.error('Error loading favorites:', e)
            throw e
        }
    }

    const loadMyRecipes = async () => {
        try {
            const response = await api.get<Recipe[]>('/api/recipes/my')
            recipes.value = response
        } catch (e) {
            console.error('Error loading my recipes:', e)
            throw e
        }
    }

    return {
        recipes,
        recipe,
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