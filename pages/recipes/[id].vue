<template>
  <div>
    <main class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div class="py-4 sm:py-6">
        <!-- Заголовок и кнопки -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">{{ recipe.title }}</h1>
          <div class="flex gap-2 sm:gap-3">
            <button
              @click="toggleFavorite"
              class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              <Icon :name="isFavorite ? 'heart-solid' : 'heart'" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {{ isFavorite ? 'В избранном' : 'В избранное' }}
            </button>
            <NuxtLink
              :to="`/recipes/${recipe.id}/edit`"
              class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              <Icon name="pencil" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Редактировать
            </NuxtLink>
          </div>
        </div>

        <!-- Основная информация -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Изображение -->
          <div class="relative aspect-video rounded-lg overflow-hidden">
            <img
              :src="recipe.image"
              :alt="recipe.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Детали рецепта -->
          <div class="space-y-4 sm:space-y-6">
            <div class="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h2 class="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Описание</h2>
              <p class="text-gray-600 text-sm sm:text-base">{{ recipe.description }}</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 text-center">
                <Icon name="clock" class="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-auto mb-2 sm:mb-3" />
                <p class="text-gray-500 text-sm sm:text-base">{{ recipe.cookingTime }} мин</p>
              </div>
              <div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 text-center">
                <Icon name="map-marker" class="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-auto mb-2 sm:mb-3" />
                <p class="text-gray-500 text-sm sm:text-base">{{ recipe.country }}</p>
              </div>
              <div class="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 text-center">
                <Icon name="tag" class="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-auto mb-2 sm:mb-3" />
                <div class="flex flex-wrap justify-center gap-1 sm:gap-2">
                  <span
                    v-for="tag in recipe.tags"
                    :key="tag"
                    class="text-xs sm:text-sm text-gray-500"
                  >{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ингредиенты и шаги -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Ингредиенты -->
          <div class="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Ингредиенты</h2>
            <ul class="space-y-2 sm:space-y-3">
              <li
                v-for="(ingredient, index) in recipe.ingredients"
                :key="index"
                class="flex items-center gap-2 sm:gap-3"
              >
                <Icon name="check" class="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span class="text-gray-600 text-sm sm:text-base">{{ ingredient }}</span>
              </li>
            </ul>
          </div>

          <!-- Шаги приготовления -->
          <div class="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h2 class="text-lg sm:text-xl font-medium text-gray-900 mb-3 sm:mb-4">Шаги приготовления</h2>
            <ol class="space-y-3 sm:space-y-4">
              <li
                v-for="(step, index) in recipe.steps"
                :key="index"
                class="flex gap-3 sm:gap-4"
              >
                <span class="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm sm:text-base">
                  {{ index + 1 }}
                </span>
                <p class="text-gray-600 text-sm sm:text-base">{{ step }}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRecipesStore } from '~/stores/recipes'
import { useFavoritesStore } from '~/stores/favorites'

// Указываем, что страница использует макет по умолчанию
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const recipesStore = useRecipesStore()
const favoritesStore = useFavoritesStore()

const recipe = computed(() => {
  return recipesStore.getRecipeById(Number(route.params.id))
})

const isFavorite = computed(() => {
  return favoritesStore.favorites?.includes(Number(route.params.id)) || false
})

const toggleFavorite = () => {
  if (isFavorite.value) {
    favoritesStore.removeFavorite(Number(route.params.id))
  } else {
    favoritesStore.addFavorite(Number(route.params.id))
  }
}
</script> 