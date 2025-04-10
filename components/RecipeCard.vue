<template>
  <div class="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl border border-base-200 group">
    <!-- Изображение -->
    <figure class="relative h-72 overflow-hidden">
     <img
          :src="recipe.image_url || '/images/placeholder.webp'"
          :alt="recipe.title"
          :class="{
            'w-full': true,
            'h-full': true,
            'object-cover': recipe.image_url,
            'object-contain': !recipe.image_url,
            'transition-transform': true,
            'duration-500': true,
            'hover:scale-110': true
          }"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <h2 class="card-title text-2xl font-bold text-white mb-3 drop-shadow-md">{{ recipe.title }}</h2>
          <div class="flex items-center gap-1 text-white/90 text-sm">
            <div class="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <i class="i-heroicons-map-marker mr-1"></i>
                <span>{{ recipe.country?.name || 'Не указана' }}</span>
                <span v-if="recipe.country?.flag" class="ml-1">{{ recipe.country.flag }}</span>
            </div>
            <div class="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <i class="i-heroicons-clock mr-1"></i>
                <span>{{ recipe.cooking_time }} мин.</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1 text-sm text-white mb-2">
            <div class="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <span class="font-normal">{{ recipe.author?.name || 'Аноним' }}</span>
        </div>
      </div>
    </figure>
    <div class="card-body p-6">
      <p class="text-gray-600 line-clamp-2 mb-4">{{ recipe.description }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
          <span
              v-for="tag in recipe.tags"
              :key="tag.id"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 shadow-sm"
          >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {{ tag.name }}
          </span>
      </div>
      <div class="card-actions flex justify-between items-center mt-2 pt-4 border-t border-gray-100 w-full">
          <button
              class="group relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-out shadow-md hover:shadow-lg"
              @click="router.push(`/recipes/${recipe.id}`)"
          >
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-700 group-hover:translate-x-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
              </span>
              <span class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Подробнее
              </span>
              <span class="relative invisible">Подробнее</span>
          </button>
          <!-- Кнопка избранного -->
          <button 
            @click="handleToggleFavorite"
            class="flex items-center btn btn-circle btn-ghost bg-transparent text-2xl transition-all duration-300"
            :class="{ 'text-yellow-400': recipe.is_favorite }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'fill-current': recipe.is_favorite }" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span v-if="recipe.favorites_count !== undefined && recipe.favorites_count > 0" class="text-sm ml-1">{{ recipe.favorites_count }}</span>
          </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavorites } from '~/composables/useFavorites'
import { useNotifications } from '~/composables/useNotifications'
import type { Recipe } from '~/composables/useRecipes'

const props = defineProps<{
  recipe: Recipe,
  // Добавляем опциональный параметр для указания, нужно ли удалять рецепт из списка
  removeFromList?: boolean
}>()
const router = useRouter()
const { toggleFavorite: toggleFavoriteApi } = useFavorites()
const { showSuccess, showError } = useNotifications()

const emit = defineEmits(['favorite', 'remove'])

const handleToggleFavorite = async () => {
  try {
    // Вызываем API для изменения статуса избранного
    const result = await toggleFavoriteApi(props.recipe)
    
    if (result) {
      // Обновляем состояние рецепта только после успешного вызова API
      props.recipe.is_favorite = !props.recipe.is_favorite
      props.recipe.favorites_count = (props.recipe.favorites_count || 0) + (props.recipe.is_favorite ? 1 : -1)
      
      // Отправляем событие родительскому компоненту
      emit('favorite', props.recipe.id)
      
      // Если рецепт удален из избранного и нужно удалить его из списка
      if (!props.recipe.is_favorite && props.removeFromList) {
        emit('remove', props.recipe.id)
      }
      
      if (props.recipe.is_favorite) {
        showSuccess('Рецепт добавлен в избранное')
      } else {
        showSuccess('Рецепт удален из избранного')
      }
    } else {
      showError('Не удалось изменить статус избранного')
    }
  } catch (e) {
    showError('Произошла ошибка при изменении статуса избранного')
    console.error('Error toggling favorite:', e)
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