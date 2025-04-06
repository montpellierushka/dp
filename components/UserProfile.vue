<template>
    <div class="space-y-8">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title">Профиль</h3>
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="avatar">
                            <div class="w-24 rounded-full">
                                <img :src="user.photo_url || '/images/avatar.jpg'" :alt="user.name" />
                            </div>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold">{{ user.name }}</h4>
                            <p class="text-gray-500">{{ user.email }}</p>
                            <p class="text-gray-500">Telegram ID: {{ user.telegram_id }}</p>
                        </div>
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Имя</span>
                        </label>
                        <input type="text" v-model="form.name" class="input input-bordered" required />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="email" v-model="form.email" class="input input-bordered" required />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Telegram ID</span>
                        </label>
                        <input type="text" v-model="form.telegram_id" class="input input-bordered" required />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Фото профиля</span>
                        </label>
                        <input type="file" @change="handleImageChange" accept="image/*" class="file-input file-input-bordered w-full" />
                        <img v-if="form.photo_url" :src="form.photo_url" class="mt-2 rounded-lg h-48 w-full object-cover" />
                    </div>

                    <div class="card-actions justify-end">
                        <button class="btn btn-primary" @click="updateProfile" :disabled="loading">
                            <span v-if="loading" class="loading loading-spinner"></span>
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title">Мои рецепты</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="recipe in recipes" :key="recipe.id" class="card bg-base-100 shadow-xl">
                        <figure class="px-4 pt-4">
                            <img :src="recipe.image_url || '/images/placeholder.jpg'" :alt="recipe.title" class="rounded-xl h-48 w-full object-cover" />
                        </figure>
                        <div class="card-body">
                            <h4 class="card-title">{{ recipe.title }}</h4>
                            <p class="text-gray-500">{{ recipe.cooking_time }} мин</p>
                            <div class="card-actions justify-end">
                                <NuxtLink :to="`/recipes/${recipe.id}`" class="btn btn-primary">Подробнее</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '~/composables/useAuth'
import type { Recipe } from '~/composables/useRecipes'
import { API_ENDPOINTS } from '~/config/api'

interface UserForm {
    name: string
    email: string
    telegram_id: string
    photo_url: string | null
}

const props = defineProps<{
    user: User
}>()

const form = ref<UserForm>({
    name: props.user.name,
    email: props.user.email,
    telegram_id: props.user.telegram_id,
    photo_url: props.user.photo_url
})

const recipes = ref<Recipe[]>([])
const loading = ref(false)

const handleImageChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
            form.value.photo_url = e.target?.result as string
        }
        reader.readAsDataURL(input.files[0])
    }
}

const updateProfile = async () => {
    loading.value = true
    try {
        const formData = new FormData()
        formData.append('name', form.value.name)
        formData.append('email', form.value.email)
        formData.append('telegram_id', form.value.telegram_id)

        if (form.value.photo_url && typeof form.value.photo_url === 'string' && form.value.photo_url.startsWith('data:')) {
            const response = await fetch(form.value.photo_url)
            const blob = await response.blob()
            formData.append('photo', blob, 'photo.jpg')
        }

        const response = await $fetch<{ data: User }>(API_ENDPOINTS.user.profile, {
            method: 'PUT',
            body: formData
        })

        form.value.photo_url = response.data.photo_url
    } catch (error) {
        console.error('Error updating profile:', error)
    } finally {
        loading.value = false
    }
}

const loadRecipes = async () => {
    try {
        const response = await $fetch<{ data: Recipe[] }>(API_ENDPOINTS.user.recipes)
        recipes.value = response.data
    } catch (error) {
        console.error('Error loading recipes:', error)
    }
}

onMounted(() => {
    loadRecipes()
})
</script> 