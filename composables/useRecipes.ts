import { ref } from 'vue'
import { useApi } from './useApi'
import { API_ENDPOINTS } from '~/config/api'

export interface Recipe {
    id: number
    title: string
    description: string
    image_url: string
    cooking_time: number
    servings: number
    difficulty: 'easy' | 'medium' | 'hard'
    country: {
        id: number
        name: string
        code: string
        flag: string
        description: string
        created_at: string
        updated_at: string
    }
    tags: Array<{
        id: number
        name: string
        slug: string
        description: string
        created_at: string
        updated_at: string
        pivot: {
            recipe_id: number
            tag_id: number
        }
    }>
    ingredients: Array<{
        name: string
        amount: string
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
    favorites_count?: number
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
    servings: number
    difficulty: 'easy' | 'medium' | 'hard'
    tags: number[]
    ingredients: {
        name: string
        amount: string
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
            const response = await api.get<{
                current_page: number
                data: Recipe[]
                first_page_url: string
                from: number
                last_page: number
                last_page_url: string
                links: Array<{ url: string | null; label: string; active: boolean }>
                next_page_url: string | null
                path: string
                per_page: number
                prev_page_url: string | null
                to: number
                total: number
            }>(API_ENDPOINTS.recipes.list, filters)
            
            if (!response?.data || !Array.isArray(response.data)) {
                throw new Error('Неверный формат данных от API')
            }
            
            recipes.value = response.data
            return response.data
        } catch (e) {
            error.value = 'Ошибка при загрузке рецептов'
            throw e
        }
    }

    const loadRecipe = async (id: number) => {
        try {
            const response = await api.get<Recipe>(API_ENDPOINTS.recipes.get(id))
            
            if (!response) {
                throw new Error('Неверный формат данных от API')
            }
            
            recipe.value = response
            return response
        } catch (error) {
            console.error('Ошибка при загрузке рецепта:', error)
            throw error
        }
    }

    const createRecipe = async (data: FormData) => {
        try {
            const response = await api.post<Recipe>(API_ENDPOINTS.recipes.create, data)
            recipes.value.push(response)
            return response
        } catch (e) {
            error.value = 'Ошибка при создании рецепта'
            throw e
        }
    }

    const updateRecipe = async (id: number, data: FormData) => {
        try {
            const response = await api.put<Recipe>(API_ENDPOINTS.recipes.update(id), data)
            return response
        } catch (e) {
            throw e
        }
    }

    const deleteRecipe = async (id: number) => {
        try {
            await api.del(API_ENDPOINTS.recipes.delete(id))
        } catch (e) {
            throw e
        }
    }

    const toggleFavorite = async (id: number) => {
        try {
            const response = await api.post<Recipe>(API_ENDPOINTS.favorites.add(id))
            return response
        } catch (e) {
            throw e
        }
    }

    const loadFavorites = async () => {
        try {
            const response = await api.get<Recipe[]>(API_ENDPOINTS.favorites.list)
            recipes.value = response
        } catch (e) {
            error.value = 'Ошибка при загрузке избранного'
        }
    }

    const loadMyRecipes = async () => {
        try {
            const response = await api.get<Recipe[]>(API_ENDPOINTS.user.recipes)
            recipes.value = response
        } catch (e) {
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