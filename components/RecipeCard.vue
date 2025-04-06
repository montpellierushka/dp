<template>
  <div class="card bg-base-100 shadow-xl">
    <figure class="px-4 pt-4">
      <img
        :src="recipe.image || '/images/placeholder.jpg'"
        :alt="recipe.title"
        class="rounded-xl h-48 w-full object-cover"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ recipe.title }}</h2>
      <p class="text-sm text-gray-500">{{ recipe.description }}</p>
      <div class="flex gap-2 mt-2">
        <span class="badge badge-primary">{{ recipe.country.name }}</span>
        <span class="badge badge-secondary">{{ recipe.cooking_time }} мин</span>
      </div>
      <div class="card-actions justify-between items-center mt-4">
        <div class="flex items-center gap-2">
          <button
            class="btn btn-ghost btn-sm"
            @click="toggleFavorite"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              :class="{ 'text-red-500': isFavorite }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{{ recipe.favorites_count }}</span>
          </button>
        </div>
        <NuxtLink
          :to="`/recipes/${recipe.id}`"
          class="btn btn-primary btn-sm"
        >
          Подробнее
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import type { Recipe } from '~/composables/useRecipes'

const props = defineProps<{
  recipe: Recipe
}>()

const { user } = useAuth()
const isFavorite = ref(false)

onMounted(() => {
  isFavorite.value = props.recipe.is_favorite
})

const toggleFavorite = async () => {
  try {
    const response = await $fetch(`/api/recipes/${props.recipe.id}/favorite`, {
      method: isFavorite.value ? 'DELETE' : 'POST'
    })
    isFavorite.value = !isFavorite.value
    props.recipe.favorites_count += isFavorite.value ? 1 : -1
  } catch (error) {
    console.error('Error toggling favorite:', error)
  }
}
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