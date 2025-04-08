<template>
  <div>
    <Navbar />
    <PageHeader
      title="Редактирование рецепта"
      description="Внесите необходимые изменения в рецепт"
    >
      <template #actions>
        <button
          class="btn btn-ghost"
          @click="router.push(`/recipes/${route.params.id}`)"
        >
          Отмена
        </button>
        <button
          class="btn btn-primary"
          @click="submitForm"
          :disabled="submitting"
        >
          <span v-if="submitting" class="loading loading-spinner"></span>
          {{ submitting ? 'Сохранение...' : 'Сохранить' }}
        </button>
      </template>
    </PageHeader>

    <div class="container mx-auto px-4 py-8">
      <div v-if="loading" class="flex justify-center py-8">
        <div class="loading loading-spinner loading-lg"></div>
      </div>

      <div v-else-if="error" class="alert alert-error">
        <span>{{ error }}</span>
      </div>

      <div v-else-if="!recipe">
        <EmptyState
          title="Рецепт не найден"
          description="Попробуйте найти другой рецепт"
        />
      </div>

      <div v-else class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Название</span>
              </label>
              <input
                v-model="form.title"
                type="text"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Описание</span>
              </label>
              <textarea
                v-model="form.description"
                class="textarea textarea-bordered h-24"
                required
              ></textarea>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Страна</span>
              </label>
              <select
                v-model="form.country_id"
                class="select select-bordered w-full"
                required
              >
                <option value="">Выберите страну</option>
                <option
                  v-for="country in countriesList"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Время приготовления (минуты)</span>
              </label>
              <input
                v-model.number="form.cooking_time"
                type="number"
                class="input input-bordered w-full"
                required
                min="1"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Теги</span>
              </label>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tag in tagsList"
                  :key="tag.id"
                  class="form-control"
                >
                  <label class="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      :value="tag.id"
                      v-model="form.tags"
                      class="checkbox"
                    />
                    <span class="label-text">{{ tag.name }}</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Изображение</span>
              </label>
              <input
                type="file"
                accept="image/*"
                @change="handleImageChange"
                class="file-input file-input-bordered w-full"
              />
              <div v-if="form.image" class="mt-4">
                <img
                  :src="getImageUrl(form.image)"
                  alt="Preview"
                  class="max-w-xs rounded-lg"
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Ингредиенты</span>
              </label>
              <div
                v-for="(ingredient, index) in form.ingredients"
                :key="index"
                class="flex gap-4 mb-4"
              >
                <input
                  v-model="ingredient.name"
                  type="text"
                  placeholder="Название"
                  class="input input-bordered flex-1"
                  required
                />
                <input
                  v-model="ingredient.amount"
                  type="text"
                  placeholder="Количество"
                  class="input input-bordered w-32"
                  required
                />
                <input
                  v-model="ingredient.unit"
                  type="text"
                  placeholder="Единица измерения"
                  class="input input-bordered w-32"
                  required
                />
                <button
                  type="button"
                  class="btn btn-error"
                  @click="removeIngredient(index)"
                >
                  Удалить
                </button>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click="addIngredient"
              >
                Добавить ингредиент
              </button>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Шаги приготовления</span>
              </label>
              <div
                v-for="(step, index) in form.steps"
                :key="index"
                class="space-y-4 mb-6"
              >
                <textarea
                  v-model="step.description"
                  class="textarea textarea-bordered w-full"
                  placeholder="Описание шага"
                  required
                ></textarea>
                <input
                  type="file"
                  accept="image/*"
                  @change="(e) => handleStepImageChange(e, index)"
                  class="file-input file-input-bordered w-full"
                />
                <div v-if="step.image" class="mt-4">
                  <img
                    :src="getImageUrl(step.image)"
                    :alt="`Шаг ${index + 1}`"
                    class="max-w-xs rounded-lg"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-error"
                  @click="removeStep(index)"
                >
                  Удалить шаг
                </button>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click="addStep"
              >
                Добавить шаг
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecipes } from '~/composables/useRecipes'
import { useNotifications } from '~/composables/useNotifications'
import { useCountries } from '~/composables/useCountries'
import { useTags } from '~/composables/useTags'
import type { Recipe, RecipeFormData } from '~/composables/useRecipes'
import EmptyState from '~/components/EmptyState.vue'
import PageHeader from '~/components/PageHeader.vue'
import Navbar from '~/components/Navbar.vue'

interface Step {
    description: string
    image?: File
}

interface Ingredient {
    name: string
    amount: string
    unit: string
}

const route = useRoute()
const router = useRouter()
const { loadRecipe, updateRecipe } = useRecipes()
const { showSuccess, showError } = useNotifications()
const { countries: countriesList, loadCountries } = useCountries()
const { tags: tagsList, loadTags } = useTags()

const recipe = ref<Recipe | null>(null)
const form = ref<RecipeFormData>({
    title: '',
    description: '',
    country_id: 0,
    cooking_time: 0,
    servings: 4,
    difficulty: 'medium',
    tags: [],
    ingredients: [],
    steps: [],
    image: undefined
})
const loading = ref(false)
const submitting = ref(false)
const error = ref<string | null>(null)

const getImageUrl = (file: File | string | undefined): string => {
    if (!file) return '/images/placeholder.jpg'
    if (typeof file === 'string') {
        return file
    }
    return URL.createObjectURL(file)
}

const handleImageChange = (event: Event): void => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        form.value.image = input.files[0]
    }
}

const handleStepImageChange = (event: Event, index: number): void => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        if (!form.value.steps[index]) {
            form.value.steps[index] = { description: '' }
        }
        form.value.steps[index].image = input.files[0]
    }
}

const addIngredient = (): void => {
    form.value.ingredients.push({
        name: '',
        amount: '',
        unit: ''
    })
}

const removeIngredient = (index: number): void => {
    form.value.ingredients.splice(index, 1)
}

const addStep = (): void => {
    form.value.steps.push({
        description: ''
    })
}

const removeStep = (index: number): void => {
    form.value.steps.splice(index, 1)
}

const submitForm = async () => {
    if (!recipe.value) return
    submitting.value = true
    error.value = ''

    try {
        const formData = new FormData()
        formData.append('title', form.value.title)
        formData.append('description', form.value.description)
        formData.append('country_id', form.value.country_id.toString())
        formData.append('cooking_time', form.value.cooking_time.toString())
        formData.append('servings', form.value.servings.toString())
        formData.append('difficulty', form.value.difficulty)
        formData.append('tags', JSON.stringify(form.value.tags))
        formData.append('ingredients', JSON.stringify(form.value.ingredients))
        formData.append('steps', JSON.stringify(form.value.steps))

        if (form.value.image) {
            formData.append('image', form.value.image)
        }

        await updateRecipe(recipe.value.id, formData)
        router.push(`/recipes/${recipe.value.id}`)
    } catch (e) {
        error.value = 'Ошибка при сохранении рецепта'
        console.error('Error updating recipe:', e)
    } finally {
        submitting.value = false
    }
}

onMounted(async () => {
    try {
        loading.value = true
        const recipeId = Number(route.params.id)
        const loadedRecipe = await loadRecipe(recipeId)
        if (!loadedRecipe) {
            throw new Error('Рецепт не найден')
        }
        recipe.value = loadedRecipe
        
        // Находим ID страны по имени
        const country = countriesList.value.find(c => c.name === loadedRecipe.country.name)
        
        form.value = {
            title: loadedRecipe.title,
            description: loadedRecipe.description,
            country_id: country?.id || 0,
            cooking_time: loadedRecipe.cooking_time,
            servings: loadedRecipe.servings,
            difficulty: loadedRecipe.difficulty || 'medium',
            tags: loadedRecipe.tags.map(tag => tag.id),
            ingredients: loadedRecipe.ingredients,
            steps: loadedRecipe.steps.map(step => ({
                description: step.description,
                image: undefined
            })),
            image: undefined
        }
        await Promise.all([loadCountries(), loadTags()])
    } catch (e) {
        error.value = 'Произошла ошибка при загрузке рецепта'
        showError(error.value)
        console.error('Error loading recipe:', e)
    } finally {
        loading.value = false
    }
})

onUnmounted(() => {
    // Очистка URL-ов для превью изображений
    form.value.steps.forEach(step => {
        if (step.image && typeof step.image !== 'string') {
            URL.revokeObjectURL(URL.createObjectURL(step.image))
        }
    })
    if (form.value.image && typeof form.value.image !== 'string') {
        URL.revokeObjectURL(URL.createObjectURL(form.value.image))
    }
})
</script> 