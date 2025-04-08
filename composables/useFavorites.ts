import { ref } from 'vue'
import { useApi } from './useApi'
import type { Recipe } from './useRecipes'
import { API_ENDPOINTS } from '~/config/api'

interface ApiResponseData<T> {
    data: T;
}

interface ApiResponse<T> {
    status: string;
    data: ApiResponseData<T>;
}

interface FavoritesListResponse {
    recipes: Recipe[];
}

interface RecipeResponse {
    recipe: Recipe;
}

export const useFavorites = () => {
    const api = useApi()
    const favorites = ref<Recipe[]>([])
    const loading = ref(false)
    const error = ref('')

    const loadFavorites = async () => {
        try {
            loading.value = true
            const { data } = await api.get<ApiResponse<FavoritesListResponse>>(API_ENDPOINTS.favorites.list)
            favorites.value = data.data.recipes
        } catch (e) {
            console.error('Error loading favorites:', e)
            error.value = 'Ошибка при загрузке избранного'
        } finally {
            loading.value = false
        }
    }

    const addToFavorites = async (recipeId: number) => {
        try {
            const { data } = await api.post<ApiResponse<RecipeResponse>>(API_ENDPOINTS.favorites.add(recipeId))
            return data.data.recipe
        } catch (e) {
            console.error('Error adding to favorites:', e)
            throw e
        }
    }

    const removeFromFavorites = async (recipeId: number) => {
        try {
            const { data } = await api.del<ApiResponse<RecipeResponse>>(API_ENDPOINTS.favorites.remove(recipeId))
            return data.data.recipe
        } catch (e) {
            console.error('Error removing from favorites:', e)
            throw e
        }
    }

    const toggleFavorite = async (recipeId: number) => {
        try {
            const recipe = favorites.value.find(r => r.id === recipeId)
            if (recipe) {
                return await removeFromFavorites(recipeId)
            } else {
                return await addToFavorites(recipeId)
            }
        } catch (e) {
            console.error('Error toggling favorite:', e)
            throw e
        }
    }

    return {
        favorites,
        loading,
        error,
        loadFavorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite
    }
} 