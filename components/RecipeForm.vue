<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{{ isEdit ? 'Редактировать рецепт' : 'Создать рецепт' }}</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4">
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
                        min="1"
                        required
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
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Ингредиенты</span>
                    </label>
                    <div class="space-y-2">
                        <div
                            v-for="(ingredient, index) in form.ingredients"
                            :key="index"
                            class="flex gap-2"
                        >
                            <input
                                v-model="ingredient.name"
                                type="text"
                                class="input input-bordered flex-1"
                                placeholder="Название"
                                required
                            />
                            <input
                                v-model="ingredient.amount"
                                type="text"
                                class="input input-bordered w-24"
                                placeholder="Количество"
                                required
                            />
                            <input
                                v-model="ingredient.unit"
                                type="text"
                                class="input input-bordered w-24"
                                placeholder="Ед. изм."
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
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Шаги приготовления</span>
                    </label>
                    <div class="space-y-2">
                        <div
                            v-for="(step, index) in form.steps"
                            :key="index"
                            class="space-y-2"
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
                </div>

                <div class="card-actions justify-end">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="isSubmitting"
                    >
                        {{ isEdit ? 'Сохранить' : 'Создать' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCountries } from '~/composables/useCountries'
import { useTags } from '~/composables/useTags'
import { useRecipes } from '~/composables/useRecipes'
import { useNotifications } from '~/composables/useNotifications'
import type { RecipeFormData } from '~/composables/useRecipes'

interface Step {
    description: string
    image?: File
}

interface Ingredient {
    name: string
    amount: string
    unit: string
}

interface FormData {
    title: string
    description: string
    country_id: number
    cooking_time: number
    tags: number[]
    ingredients: Ingredient[]
    steps: Step[]
    image?: File
}

const props = defineProps<{
    isEdit?: boolean
    recipeId?: number
}>()

const emit = defineEmits<{
    (e: 'success'): void
}>()

const { countries: countriesList, loadCountries } = useCountries()
const { tags: tagsList, loadTags } = useTags()
const { createRecipe, updateRecipe, loadRecipe } = useRecipes()
const { showSuccess, showError } = useNotifications()

const isSubmitting = ref(false)
const form = ref<FormData>({
    title: '',
    description: '',
    country_id: 0,
    cooking_time: 0,
    tags: [],
    ingredients: [],
    steps: []
})

const handleImageChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    if (input.files && input.files[0]) {
        form.value.image = input.files[0]
    }
}

const handleStepImageChange = (e: Event, index: number) => {
    const input = e.target as HTMLInputElement
    if (input.files && input.files[0]) {
        form.value.steps[index].image = input.files[0]
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
        description: ''
    })
}

const removeStep = (index: number) => {
    form.value.steps.splice(index, 1)
}

const handleSubmit = async () => {
    try {
        isSubmitting.value = true
        const formData = new FormData()
        
        Object.entries(form.value).forEach(([key, value]) => {
            if (key === 'ingredients' || key === 'steps' || key === 'tags') {
                formData.append(key, JSON.stringify(value))
            } else if (key === 'image' && value) {
                formData.append(key, value as File)
            } else {
                formData.append(key, String(value))
            }
        })

        if (props.isEdit && props.recipeId) {
            await updateRecipe(props.recipeId, formData)
            showSuccess('Рецепт успешно обновлен')
        } else {
            await createRecipe(formData)
            showSuccess('Рецепт успешно создан')
        }
        
        emit('success')
    } catch (e) {
        showError('Произошла ошибка при сохранении рецепта')
        console.error('Error submitting form:', e)
    } finally {
        isSubmitting.value = false
    }
}

onMounted(async () => {
    await Promise.all([
        loadCountries(),
        loadTags()
    ])

    if (props.isEdit && props.recipeId) {
        try {
            const recipe = await loadRecipe(props.recipeId)
            if (recipe) {
                form.value = {
                    title: recipe.title,
                    description: recipe.description,
                    country_id: recipe.country_id,
                    cooking_time: recipe.cooking_time,
                    tags: recipe.tags.map(tag => tag.id),
                    ingredients: recipe.ingredients.map(ing => ({
                        name: ing.name,
                        amount: ing.amount,
                        unit: ing.unit
                    })),
                    steps: recipe.steps.map(step => ({
                        description: step.description
                    }))
                }
            }
        } catch (e) {
            showError('Произошла ошибка при загрузке рецепта')
            console.error('Error loading recipe:', e)
        }
    }
})
</script> 