<template>
    <div>
        <PageHeader
            title="Рецепты"
            description="Список всех рецептов"
        >
            <template #actions>
                <button
                    v-if="user"
                    class="btn btn-primary"
                    @click="router.push('/recipes/new')"
                >
                    Создать рецепт
                </button>
            </template>
        </PageHeader>
    </div>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold">Рецепты</h1>
            <button
                v-if="user"
                class="btn btn-primary"
                @click="router.push('/recipes/create')"
            >
                Создать рецепт
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="recipe in recipes"
                :key="recipe.id"
                class="card bg-base-100 shadow-xl"
            >
                <figure class="px-4 pt-4">
                    <img
                        :src="recipe.image || '/images/placeholder.jpg'"
                        :alt="recipe.title"
                        class="rounded-xl h-48 w-full object-cover"
                    />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ recipe.title }}</h2>
                    <p class="text-gray-500">{{ recipe.country.name }}</p>
                    <p class="text-gray-500">
                        Время приготовления: {{ recipe.cooking_time }} мин.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            v-for="tag in recipe.tags"
                            :key="tag.id"
                            class="badge badge-primary"
                        >
                            {{ tag.name }}
                        </span>
                    </div>
                    <div class="card-actions justify-end mt-4">
                        <button
                            class="btn btn-primary"
                            @click="router.push(`/recipes/${recipe.id}`)"
                        >
                            Подробнее
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" class="flex justify-center py-8">
            <div class="loading loading-spinner loading-lg"></div>
        </div>

        <div v-else-if="error" class="alert alert-error">
            <span>{{ error }}</span>
        </div>

        <div v-else-if="recipes.length === 0" class="text-center py-8">
            <p class="text-gray-500">Рецепты не найдены</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRecipes } from '~/composables/useRecipes'
import { useAuth } from '~/composables/useAuth'
import type { Recipe } from '~/composables/useRecipes'
import PageHeader from '~/components/PageHeader.vue'
import Navbar from '~/components/Navbar.vue'

const router = useRouter()
const { user } = useAuth()
const { loadRecipes } = useRecipes()

const recipes = ref<Recipe[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const loadRecipesData = async () => {
    loading.value = true
    error.value = null
    try {
        const loadedRecipes = await loadRecipes()
        if (Array.isArray(loadedRecipes)) {
            recipes.value = loadedRecipes
        } else {
            throw new Error('Ошибка при загрузке рецептов: неверный формат данных')
        }
    } catch (e) {
        const err = e as Error
        error.value = err.message || 'Ошибка при загрузке рецептов'
        console.error('Error loading recipes:', err)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadRecipesData()
})
</script> 