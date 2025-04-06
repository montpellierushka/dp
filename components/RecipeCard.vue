<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img 
      :src="recipe.imageUrl" 
      :alt="recipe.title"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">{{ recipe.title }}</h2>
      <p class="text-gray-600 mb-4">{{ recipe.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500">
          {{ recipe.country }}
        </span>
        <div class="flex space-x-2">
          <button 
            @click="toggleFavorite"
            class="text-gray-500 hover:text-red-500"
          >
            <Icon 
              :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" 
              size="24"
            />
          </button>
          <button 
            @click="likeRecipe"
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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useApi } from '~/composables/useApi';
import { useTelegram } from '~/composables/useTelegram';

interface Recipe {
  id: number;
  title: string;
  description: string;
  country: string;
  cookingTime: number;
  tags: string[];
  rating?: number;
  imageUrl?: string;
  is_liked?: boolean;
}

const props = defineProps<{
  recipe: Recipe;
}>();

const { user } = useTelegram();
const { post, delete: del } = useApi();

const isFavorite = computed(() => {
  return user.value?.favorites?.includes(props.recipe.id) || false;
});

const toggleFavorite = async () => {
  try {
    if (isFavorite.value) {
      await del(`/favorites/recipes/${props.recipe.id}`);
      user.value?.favorites?.splice(user.value.favorites.indexOf(props.recipe.id), 1);
    } else {
      await post(`/favorites/recipes/${props.recipe.id}`);
      user.value?.favorites?.push(props.recipe.id);
    }
  } catch (err) {
    console.error('Ошибка при изменении избранного:', err);
  }
};

const likeRecipe = async () => {
  try {
    await post(`/likes/recipes/${props.recipe.id}`);
    props.recipe.is_liked = !props.recipe.is_liked;
  } catch (err) {
    console.error('Ошибка при лайке рецепта:', err);
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 