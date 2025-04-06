<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Рецепты</h1>
        
        <div v-if="isLoading" class="flex justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>

        <div v-else-if="error" class="text-red-500">
            {{ error }}
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="recipe in recipes" :key="recipe.id" class="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                    :src="recipe.image_url" 
                    :alt="recipe.title"
                    class="w-full h-48 object-cover"
                />
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2">{{ recipe.title }}</h2>
                    <p class="text-gray-600 mb-4">{{ recipe.description }}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-500">
                            {{ recipe.country?.name || 'Без страны' }}
                        </span>
                        <div class="flex space-x-2">
                            <button 
                                @click="toggleFavorite(recipe)"
                                class="text-gray-500 hover:text-red-500"
                            >
                                <Icon 
                                    :name="isFavorite(recipe) ? 'mdi:heart' : 'mdi:heart-outline'" 
                                    size="24"
                                />
                            </button>
                            <button 
                                @click="likeRecipe(recipe)"
                                class="text-gray-500 hover:text-blue-500"
                            >
                                <Icon 
                                    :name="recipe.is_liked ? 'mdi:thumb-up' : 'mdi:thumb-up-outline'" 
                                    size="24"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import { useTelegram } from '~/composables/useTelegram';

interface Recipe {
    id: number;
    title: string;
    description: string;
    image_url: string;
    country?: {
        name: string;
    };
    is_liked?: boolean;
}

const { user } = useTelegram();
const { get, post, delete: del, isLoading, error } = useApi();

const recipes = ref<Recipe[]>([]);
const favorites = ref(new Set<number>());

const fetchRecipes = async () => {
    try {
        const response = await get<{ data: Recipe[] }>('/recipes');
        recipes.value = response.data;
    } catch (err) {
        console.error('Ошибка при загрузке рецептов:', err);
    }
};

const isFavorite = (recipe: Recipe) => {
    return favorites.value.has(recipe.id);
};

const toggleFavorite = async (recipe: Recipe) => {
    try {
        if (isFavorite(recipe)) {
            await del(`/favorites/recipes/${recipe.id}`);
            favorites.value.delete(recipe.id);
        } else {
            await post(`/favorites/recipes/${recipe.id}`);
            favorites.value.add(recipe.id);
        }
    } catch (err) {
        console.error('Ошибка при изменении избранного:', err);
    }
};

const likeRecipe = async (recipe: Recipe) => {
    try {
        await post(`/likes/recipes/${recipe.id}`);
        recipe.is_liked = !recipe.is_liked;
    } catch (err) {
        console.error('Ошибка при лайке рецепта:', err);
    }
};

onMounted(async () => {
    if (user.value) {
        await fetchRecipes();
        // Загрузка избранного
        try {
            const response = await get<{ data: { recipes: Recipe[] } }>('/favorites');
            favorites.value = new Set(response.data.recipes.map(r => r.id));
        } catch (err) {
            console.error('Ошибка при загрузке избранного:', err);
        }
    }
});
</script> 