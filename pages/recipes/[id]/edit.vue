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
import type { Recipe } from '~/composables/useRecipes'
import EmptyState from '~/components/EmptyState.vue'
import PageHeader from '~/components/PageHeader.vue'
import Navbar from '~/components/Navbar.vue'

interface Step {
    description: string
    image?: string | File | undefined
}

interface Ingredient {
    name: string
    amount: string
    unit: string
}

interface FormData {
    title: string
    description: string
    country_id: number | null
    cooking_time: number | null
    tags: number[]
    ingredients: Ingredient[]
    steps: Step[]
    image?: File | string
}

const route = useRoute()
const router = useRouter()
const { loadRecipe, updateRecipe } = useRecipes()
const { showSuccess, showError } = useNotifications()
const { countries: countriesList, loadCountries } = useCountries()
const { tags: tagsList, loadTags } = useTags()

const recipe = ref<Recipe | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const submitting = ref(false)
const imageUrls = ref<string[]>([])

const form = ref<FormData>({
    title: '',
    description: '',
    country_id: null,
    cooking_time: null,
    tags: [],
    ingredients: [],
    steps: [],
    image: undefined
})

const getImageUrl = (image: File | string): string => {
    if (image instanceof File) {
        const url = URL.createObjectURL(image)
        imageUrls.value.push(url)
        return url
    }
    return image
}

const loadRecipeData = async () => {
    loading.value = true
    error.value = null
    try {
        const recipeId = parseInt(route.params.id as string)
        if (isNaN(recipeId)) {
            throw new Error('Неверный ID рецепта')
        }
        const loadedRecipe = await loadRecipe(recipeId)
        if (!loadedRecipe) {
            throw new Error('Рецепт не найден')
        }
        recipe.value = loadedRecipe
        form.value = {
            title: loadedRecipe.title,
            description: loadedRecipe.description,
            country_id: loadedRecipe.country_id,
            cooking_time: loadedRecipe.cooking_time,
            tags: loadedRecipe.tags.map(tag => tag.id),
            ingredients: loadedRecipe.ingredients.map(ing => ({
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit
            })),
            steps: loadedRecipe.steps.map(step => ({
                description: step.description,
                image: step.image || undefined
            })),
            image: loadedRecipe.image || undefined
        }
    } catch (e) {
        const err = e as Error
        error.value = err.message || 'Ошибка при загрузке рецепта'
        showError(error.value)
        console.error('Error loading recipe:', err)
    } finally {
        loading.value = false
    }
}

const handleImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files[0]) {
        form.value.image = target.files[0]
    }
}

const handleStepImageChange = (e: Event, index: number) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files[0]) {
        form.value.steps[index].image = target.files[0]
    }
}

const addIngredient = () => {
    form.value.ingredients.push({
        name: '',
        amount: '',
        unit: ''
    })
}

const removeIngredient = (index: number) => {
    form.value.ingredients.splice(index, 1)
}

const addStep = () => {
    form.value.steps.push({
        description: '',
        image: undefined
    })
}

const removeStep = (index: number) => {
    form.value.steps.splice(index, 1)
}

const submitForm = async () => {
    if (!recipe.value) return
    submitting.value = true
    try {
        const formData = new FormData()
        formData.append('title', form.value.title)
        formData.append('description', form.value.description)
        formData.append('country_id', form.value.country_id?.toString() || '')
        formData.append('cooking_time', form.value.cooking_time?.toString() || '')
        form.value.tags.forEach(tagId => {
            formData.append('tags[]', tagId.toString())
        })
        form.value.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][name]`, ingredient.name)
            formData.append(`ingredients[${index}][amount]`, ingredient.amount)
            formData.append(`ingredients[${index}][unit]`, ingredient.unit)
        })
        form.value.steps.forEach((step, index) => {
            formData.append(`steps[${index}][description]`, step.description)
            if (step.image instanceof File) {
                formData.append(`steps[${index}][image]`, step.image)
            } else if (typeof step.image === 'string') {
                formData.append(`steps[${index}][image]`, step.image)
            }
        })
        if (form.value.image instanceof File) {
            formData.append('image', form.value.image)
        }

        await updateRecipe(recipe.value.id, formData)
        showSuccess('Рецепт успешно обновлен')
        router.push(`/recipes/${recipe.value.id}`)
    } catch (e) {
        const err = e as Error
        showError('Ошибка при обновлении рецепта')
        console.error('Error updating recipe:', err)
    } finally {
        submitting.value = false
    }
}

onMounted(async () => {
    await Promise.all([
        loadCountries(),
        loadTags(),
        loadRecipeData()
    ])
})

onUnmounted(() => {
    imageUrls.value.forEach(url => URL.revokeObjectURL(url))
    imageUrls.value = []
})
</script> 