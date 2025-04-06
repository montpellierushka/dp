<template>
  <div>
    <PageHeader>
      <template #title>Новый рецепт</template>
    </PageHeader>

    <PageContainer>
      <form @submit.prevent="submitForm" class="space-y-8">
        <!-- Основная информация -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Основная информация</h2>
            <div class="space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Название</span>
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  class="input input-bordered"
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
                  <span class="label-text">Изображение</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  class="file-input file-input-bordered w-full"
                  @change="handleImageUpload"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Страна</span>
                  </label>
                  <select
                    v-model="form.country_id"
                    class="select select-bordered"
                    required
                  >
                    <option value="">Выберите страну</option>
                    <option
                      v-for="country in countries"
                      :key="country.id"
                      :value="country.id"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Время приготовления (мин)</span>
                  </label>
                  <input
                    v-model="form.cooking_time"
                    type="number"
                    min="1"
                    class="input input-bordered"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ингредиенты -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex justify-between items-center">
              <h2 class="card-title">Ингредиенты</h2>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="addIngredient"
              >
                Добавить
              </button>
            </div>
            <div class="space-y-4">
              <div
                v-for="(ingredient, index) in form.ingredients"
                :key="index"
                class="flex gap-4"
              >
                <div class="form-control flex-1">
                  <input
                    v-model="ingredient.name"
                    type="text"
                    class="input input-bordered"
                    placeholder="Название"
                    required
                  />
                </div>
                <div class="form-control w-32">
                  <input
                    v-model="ingredient.amount"
                    type="number"
                    min="0.1"
                    step="0.1"
                    class="input input-bordered"
                    placeholder="Количество"
                    required
                  />
                </div>
                <div class="form-control w-32">
                  <input
                    v-model="ingredient.unit"
                    type="text"
                    class="input input-bordered"
                    placeholder="Ед. изм."
                    required
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-ghost btn-sm"
                  @click="removeIngredient(index)"
                >
                  <Icon name="mdi:delete" size="20" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Шаги приготовления -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex justify-between items-center">
              <h2 class="card-title">Шаги приготовления</h2>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="addStep"
              >
                Добавить
              </button>
            </div>
            <div class="space-y-4">
              <div
                v-for="(step, index) in form.steps"
                :key="index"
                class="space-y-4"
              >
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-medium">Шаг {{ index + 1 }}</h3>
                  <button
                    type="button"
                    class="btn btn-ghost btn-sm"
                    @click="removeStep(index)"
                  >
                    <Icon name="mdi:delete" size="20" />
                  </button>
                </div>
                <div class="form-control">
                  <textarea
                    v-model="step.description"
                    class="textarea textarea-bordered h-24"
                    placeholder="Описание шага"
                    required
                  ></textarea>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Изображение (опционально)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    class="file-input file-input-bordered w-full"
                    @change="(e) => handleStepImageUpload(e, index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Теги -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Теги</h2>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="tag in tags"
                :key="tag.id"
                class="form-control"
              >
                <label class="label cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    :value="tag.id"
                    v-model="form.tags"
                    class="checkbox checkbox-primary"
                  />
                  <span class="label-text">{{ tag.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопки -->
        <div class="flex justify-end gap-4">
          <NuxtLink to="/recipes" class="btn btn-ghost">Отмена</NuxtLink>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner"></span>
            Создать рецепт
          </button>
        </div>
      </form>
    </PageContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'
import { useRouter } from 'vue-router'

const api = useApi()
const router = useRouter()

const loading = ref(false)
const countries = ref([])
const tags = ref([])

const form = ref({
  title: '',
  description: '',
  image: null,
  country_id: '',
  cooking_time: '',
  ingredients: [
    { name: '', amount: '', unit: '' }
  ],
  steps: [
    { description: '', image: null }
  ],
  tags: []
})

const loadCountries = async () => {
  try {
    const response = await api.get('/countries')
    countries.value = response.data
  } catch (e) {
    console.error('Error loading countries:', e)
  }
}

const loadTags = async () => {
  try {
    const response = await api.get('/tags')
    tags.value = response.data
  } catch (e) {
    console.error('Error loading tags:', e)
  }
}

const addIngredient = () => {
  form.value.ingredients.push({ name: '', amount: '', unit: '' })
}

const removeIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1)
}

const addStep = () => {
  form.value.steps.push({ description: '', image: null })
}

const removeStep = (index: number) => {
  form.value.steps.splice(index, 1)
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    form.value.image = input.files[0]
  }
}

const handleStepImageUpload = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    form.value.steps[index].image = input.files[0]
  }
}

const submitForm = async () => {
  try {
    loading.value = true

    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('country_id', form.value.country_id)
    formData.append('cooking_time', form.value.cooking_time)
    formData.append('ingredients', JSON.stringify(form.value.ingredients))
    formData.append('steps', JSON.stringify(form.value.steps))
    formData.append('tags', JSON.stringify(form.value.tags))

    if (form.value.image) {
      formData.append('image', form.value.image)
    }

    form.value.steps.forEach((step, index) => {
      if (step.image) {
        formData.append(`step_images[${index}]`, step.image)
      }
    })

    const response = await api.post('/recipes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    router.push(`/recipes/${response.data.id}`)
  } catch (e) {
    console.error('Error creating recipe:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCountries()
  loadTags()
})
</script> 