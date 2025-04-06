<template>
  <div>
    <PageHeader>
      <template #title>Рецепт</template>
      <template #actions>
        <NuxtLink
          v-if="recipe?.user_id === user?.id"
          :to="`/recipes/${recipe?.id}/edit`"
          class="btn btn-primary"
        >
          Редактировать
        </NuxtLink>
      </template>
    </PageHeader>

    <PageContainer>
      <div v-if="loading" class="text-center py-8">
        <div class="loading loading-spinner loading-lg"></div>
      </div>

      <div v-else-if="error" class="alert alert-error">
        {{ error }}
      </div>

      <div v-else-if="recipe" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="card bg-base-100 shadow-xl">
            <figure>
              <img
                :src="recipe.image || '/images/placeholder.jpg'"
                :alt="recipe.title"
                class="w-full h-96 object-cover"
              />
            </figure>
            <div class="card-body">
              <h1 class="card-title text-3xl">{{ recipe.title }}</h1>
              <div class="flex items-center gap-4 mt-4">
                <span class="badge badge-outline">
                  {{ recipe.country?.name || 'Без страны' }}
                </span>
                <span class="badge badge-outline">
                  {{ recipe.cooking_time }} мин
                </span>
                <button
                  class="btn btn-ghost"
                  :class="{ 'text-red-500': recipe.favorites_count > 0 }"
                  @click="toggleFavorite"
                >
                  <Icon
                    :name="recipe.favorites_count > 0 ? 'mdi:heart' : 'mdi:heart-outline'"
                    size="24"
                  />
                  <span class="ml-1">{{ recipe.favorites_count }}</span>
                </button>
              </div>
              <p class="mt-4">{{ recipe.description }}</p>
            </div>
          </div>

          <div class="mt-8">
            <h2 class="text-2xl font-bold mb-4">Ингредиенты</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="ingredient in recipe.ingredients"
                :key="ingredient.id"
                class="card bg-base-100 shadow-sm"
              >
                <div class="card-body p-4">
                  <div class="flex justify-between items-center">
                    <span>{{ ingredient.name }}</span>
                    <span class="font-medium">
                      {{ ingredient.amount }} {{ ingredient.unit }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <h2 class="text-2xl font-bold mb-4">Шаги приготовления</h2>
            <div class="space-y-4">
              <div
                v-for="(step, index) in recipe.steps"
                :key="step.id"
                class="card bg-base-100 shadow-sm"
              >
                <div class="card-body">
                  <div class="flex gap-4">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                      {{ index + 1 }}
                    </div>
                    <div>
                      <p>{{ step.description }}</p>
                      <img
                        v-if="step.image"
                        :src="step.image"
                        :alt="`Шаг ${index + 1}`"
                        class="mt-4 rounded-lg max-w-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Теги</h2>
              <div class="flex flex-wrap gap-2 mt-4">
                <span
                  v-for="tag in recipe.tags"
                  :key="tag.id"
                  class="badge badge-outline"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const api = useApi()
const { user } = useAuth()

const loading = ref(false)
const error = ref('')
const recipe = ref(null)

const loadRecipe = async () => {
  try {
    loading.value = true
    error.value = ''

    const response = await api.get(`/recipes/${route.params.id}`)
    recipe.value = response.data
  } catch (e) {
    error.value = e.response?.data?.message || 'Произошла ошибка при загрузке рецепта'
    console.error('Error loading recipe:', e)
  } finally {
    loading.value = false
  }
}

const toggleFavorite = async () => {
  try {
    if (!recipe.value) return

    if (recipe.value.favorites_count > 0) {
      await api.delete(`/favorites/recipes/${recipe.value.id}`)
      recipe.value.favorites_count--
    } else {
      await api.post(`/favorites/recipes/${recipe.value.id}`)
      recipe.value.favorites_count++
    }
  } catch (e) {
    console.error('Error toggling favorite:', e)
  }
}

onMounted(() => {
  loadRecipe()
})
</script> 