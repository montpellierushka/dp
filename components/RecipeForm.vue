<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{{ isEdit ? 'Редактировать рецепт' : 'Создать рецепт' }}</h2>
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

                <div class="flex justify-end gap-4">
                    <button
                        type="button"
                        class="btn btn-ghost"
                        @click="router.back()"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="submitting"
                    >
                        <span v-if="submitting" class="loading loading-spinner"></span>
                        {{ submitting ? 'Сохранение...' : 'Сохранить' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipes } from '~/composables/useRecipes'
import { useNotifications } from '~/composables/useNotifications'
import { useCountries } from '~/composables/useCountries'
import { useTags } from '~/composables/useTags'
import type { RecipeFormData } from '~/composables/useRecipes'
import type { Tag } from '~/composables/useTags'

const router = useRouter()
const { createRecipe, updateRecipe, loadRecipe } = useRecipes()
const { showSuccess, showError } = useNotifications()
const { countries: countriesList, loadCountries } = useCountries()
const { tags: tagsList, loadTags } = useTags()

const props = defineProps<{
    isEdit?: boolean
    recipeId?: number
}>()

const emit = defineEmits<{
    (e: 'success'): void
}>()

const submitting = ref(false)
const form = ref<RecipeFormData>({
    title: '',
    description: '',
    country_id: 0,
    cooking_time: 0,
    tags: [],
    ingredients: [],
    steps: [],
    image: undefined
})

const getImageUrl = (file: File | string): string => {
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

const submitForm = async (): Promise<void> => {
    submitting.value = true
    try {
        const formData = new FormData()
        
        // Добавляем текстовые поля
        formData.append('title', form.value.title)
        formData.append('description', form.value.description)
        formData.append('country_id', form.value.country_id.toString())
        formData.append('cooking_time', form.value.cooking_time.toString())
        
        // Добавляем массивы и объекты как JSON
        formData.append('tags', JSON.stringify(form.value.tags))
        formData.append('ingredients', JSON.stringify(form.value.ingredients))
        formData.append('steps', JSON.stringify(form.value.steps.map(step => ({
            description: step.description
        }))))
        
        // Добавляем файлы
        if (form.value.image) {
            formData.append('image', form.value.image)
        }
        
        // Добавляем изображения для шагов
        form.value.steps.forEach((step, index) => {
            if (step.image) {
                formData.append(`step_images[${index}]`, step.image)
            }
        })

        if (props.recipeId) {
            await updateRecipe(props.recipeId, formData)
            showSuccess('Рецепт успешно обновлен')
        } else {
            await createRecipe(formData)
            showSuccess('Рецепт успешно создан')
        }
        emit('success')
        router.push('/recipes')
    } catch (e) {
        showError('Произошла ошибка при сохранении рецепта')
        console.error('Error saving recipe:', e)
    } finally {
        submitting.value = false
    }
}

onMounted(async () => {
    await Promise.all([loadCountries(), loadTags()])
    if (props.isEdit && props.recipeId) {
        const recipe = await loadRecipe(props.recipeId)
        if (recipe) {
            const country = countriesList.value.find(c => c.id === recipe.country.id)
            const tagIds = recipe.tags.map((tag: Tag) => tag.id)

            form.value = {
                title: recipe.title,
                description: recipe.description,
                country_id: country?.id || 0,
                cooking_time: recipe.cooking_time,
                tags: tagIds,
                ingredients: recipe.ingredients,
                steps: recipe.steps.map((step: { description: string }) => ({
                    description: step.description,
                    image: undefined
                }))
            }
        }
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