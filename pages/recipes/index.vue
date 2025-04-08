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
                    <i class="i-heroicons-plus mr-2"></i>
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
                @click="router.push('/recipes/new')"
            >
                <i class="i-heroicons-plus mr-2"></i>
                Создать рецепт
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="recipe in recipes"
                :key="recipe.id"
                class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl overflow-hidden"
            >
                <figure class="relative h-72 overflow-hidden">
                    <img
                        :src="recipe.image_url || '/images/placeholder.webp'"
                        :alt="recipe.title"
                        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div class="absolute top-4 right-4 flex gap-2">
                        <button 
                            class="btn btn-circle btn-sm bg-white/20 backdrop-blur-sm hover:bg-white/40 border-none transition-all duration-300 hover:scale-110"
                            :class="recipe.is_favorite ? 'text-red-500' : 'text-white'"
                            @click.stop="toggleFavorite(recipe.id)"
                        >
                            <i :class="recipe.is_favorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"></i>
                        </button>
                    </div>
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
                    <div class="card-actions justify-between items-center mt-2 pt-4 border-t border-gray-100">
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
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading" class="flex justify-center py-8">
            <div class="loading loading-spinner loading-lg"></div>
        </div>

        <div v-else-if="error" class="alert alert-error">
            <i class="i-heroicons-exclamation-circle mr-2"></i>
            <span>{{ error }}</span>
        </div>

        <div v-else-if="recipes.length === 0" class="text-center py-8">
            <i class="i-heroicons-book-open text-4xl text-gray-400 mb-4"></i>
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
const { loadRecipes, toggleFavorite } = useRecipes()

const recipes = ref<Recipe[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const loadRecipesData = async (): Promise<void> => {
    loading.value = true
    error.value = null
    try {
        const loadedRecipes = await loadRecipes()
        if (!Array.isArray(loadedRecipes)) {
            throw new Error('Ошибка при загрузке рецептов: неверный формат данных')
        }
        recipes.value = loadedRecipes
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Ошибка при загрузке рецептов'
        console.error('Error loading recipes:', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadRecipesData()
})
</script> 