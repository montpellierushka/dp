<template>
    <form @submit.prevent="submitForm" class="space-y-8">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title">Основная информация</h3>
                <div class="space-y-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Название</span>
                        </label>
                        <input type="text" class="input input-bordered w-full" v-model="form.title" required />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Описание</span>
                        </label>
                        <textarea class="textarea textarea-bordered h-24" v-model="form.description" required></textarea>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Изображение</span>
                        </label>
                        <input type="file" class="file-input file-input-bordered w-full" @change="handleImageUpload" accept="image/*" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Страна</span>
                        </label>
                        <select class="select select-bordered w-full" v-model="form.country_id" required>
                            <option v-for="country in countries" :key="country.id" :value="country.id">
                                {{ country.name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Время приготовления (минуты)</span>
                        </label>
                        <input type="number" class="input input-bordered w-full" v-model="form.cooking_time" required min="1" />
                    </div>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title">Ингредиенты</h3>
                <div class="space-y-4">
                    <div v-for="(ingredient, index) in form.ingredients" :key="index" class="flex gap-4">
                        <div class="flex-grow">
                            <input type="text" class="input input-bordered w-full" v-model="ingredient.name" placeholder="Название" required />
                        </div>
                        <div class="w-32">
                            <input type="number" class="input input-bordered w-full" v-model="ingredient.amount" placeholder="Количество" required min="0.1" step="0.1" />
                        </div>
                        <div class="w-32">
                            <input type="text" class="input input-bordered w-full" v-model="ingredient.unit" placeholder="Единица" required />
                        </div>
                        <button type="button" class="btn btn-ghost" @click="removeIngredient(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <button type="button" class="btn btn-outline" @click="addIngredient">
                        Добавить ингредиент
                    </button>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title">Шаги приготовления</h3>
                <div class="space-y-4">
                    <div v-for="(step, index) in form.steps" :key="index" class="space-y-4">
                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                {{ index + 1 }}
                            </div>
                            <div class="flex-grow">
                                <textarea class="textarea textarea-bordered w-full" v-model="step.description" placeholder="Описание шага" required></textarea>
                                <input type="file" class="file-input file-input-bordered w-full mt-2" @change="(e) => handleStepImageUpload(e, index)" accept="image/*" />
                            </div>
                            <button type="button" class="btn btn-ghost" @click="removeStep(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline" @click="addStep">
                        Добавить шаг
                    </button>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title">Теги</h3>
                <div class="flex flex-wrap gap-2">
                    <label class="label cursor-pointer gap-2" v-for="tag in tags" :key="tag.id">
                        <input type="checkbox" class="checkbox checkbox-primary" :value="tag.id" v-model="form.tags" />
                        <span class="label-text">{{ tag.name }}</span>
                    </label>
                </div>
            </div>
        </div>

        <div class="flex justify-end gap-4">
            <NuxtLink to="/recipes" class="btn btn-ghost">Отмена</NuxtLink>
            <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading" class="loading loading-spinner"></span>
                {{ isEdit ? 'Сохранить' : 'Создать' }}
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
    recipe: {
        type: Object,
        default: null
    }
})

const isEdit = !!props.recipe
const loading = ref(false)
const countries = ref([])
const tags = ref([])
const form = ref({
    title: '',
    description: '',
    image: null,
    country_id: '',
    cooking_time: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    steps: [{ description: '', image: null }],
    tags: []
})

if (props.recipe) {
    form.value = {
        ...props.recipe,
        ingredients: props.recipe.ingredients || [{ name: '', amount: '', unit: '' }],
        steps: props.recipe.steps || [{ description: '', image: null }],
        tags: props.recipe.tags?.map(tag => tag.id) || []
    }
}

const loadCountries = async () => {
    try {
        const response = await $fetch('/api/countries')
        countries.value = response
    } catch (error) {
        console.error('Error loading countries:', error)
    }
}

const loadTags = async () => {
    try {
        const response = await $fetch('/api/tags')
        tags.value = response
    } catch (error) {
        console.error('Error loading tags:', error)
    }
}

const handleImageUpload = (event) => {
    form.value.image = event.target.files[0]
}

const handleStepImageUpload = (event, index) => {
    form.value.steps[index].image = event.target.files[0]
}

const addIngredient = () => {
    form.value.ingredients.push({ name: '', amount: '', unit: '' })
}

const removeIngredient = (index) => {
    form.value.ingredients.splice(index, 1)
}

const addStep = () => {
    form.value.steps.push({ description: '', image: null })
}

const removeStep = (index) => {
    form.value.steps.splice(index, 1)
}

const submitForm = async () => {
    loading.value = true
    try {
        const formData = new FormData()
        formData.append('title', form.value.title)
        formData.append('description', form.value.description)
        formData.append('country_id', form.value.country_id)
        formData.append('cooking_time', form.value.cooking_time)
        if (form.value.image) formData.append('image', form.value.image)
        
        form.value.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][name]`, ingredient.name)
            formData.append(`ingredients[${index}][amount]`, ingredient.amount)
            formData.append(`ingredients[${index}][unit]`, ingredient.unit)
        })
        
        form.value.steps.forEach((step, index) => {
            formData.append(`steps[${index}][description]`, step.description)
            if (step.image) formData.append(`steps[${index}][image]`, step.image)
        })
        
        form.value.tags.forEach((tagId, index) => {
            formData.append(`tags[${index}]`, tagId)
        })
        
        if (isEdit) {
            await $fetch(`/api/recipes/${props.recipe.id}`, {
                method: 'PUT',
                body: formData
            })
        } else {
            await $fetch('/api/recipes', {
                method: 'POST',
                body: formData
            })
        }
        
        navigateTo('/recipes')
    } catch (error) {
        console.error('Error submitting form:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadCountries()
    loadTags()
})
</script> 