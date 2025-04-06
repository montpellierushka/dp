<template>
    <div>
        <PageHeader>
            <template #title>Рецепты</template>
            <template #actions>
                <NuxtLink to="/recipes/new" class="btn btn-primary">
                    Добавить рецепт
                </NuxtLink>
            </template>
        </PageHeader>

        <PageContainer>
            <RecipeFilters
                v-model:country="filters.country"
                v-model:tags="filters.tags"
                v-model:cooking-time="filters.cookingTime"
                v-model:sort="filters.sort"
                v-model:direction="filters.direction"
                @update:country="loadRecipes"
                @update:tags="loadRecipes"
                @update:cooking-time="loadRecipes"
                @update:sort="loadRecipes"
                @update:direction="loadRecipes"
            />

            <div v-if="loading" class="text-center py-8">
                <div class="loading loading-spinner loading-lg"></div>
            </div>

            <div v-else-if="error" class="alert alert-error">
                {{ error }}
            </div>

            <div v-else-if="recipes.length === 0" class="text-center py-8">
                <p class="text-lg">Рецепты не найдены</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RecipeCard
                    v-for="recipe in recipes"
                    :key="recipe.id"
                    :recipe="recipe"
                    @favorite="toggleFavorite"
                />
            </div>

            <div v-if="totalPages > 1" class="flex justify-center mt-8">
                <div class="join">
                    <button
                        v-for="page in totalPages"
                        :key="page"
                        class="join-item btn"
                        :class="{ 'btn-active': currentPage === page }"
                        @click="changePage(page)"
                    >
                        {{ page }}
                    </button>
                </div>
            </div>
        </PageContainer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'

const api = useApi()

const loading = ref(false)
const error = ref('')
const recipes = ref([])
const currentPage = ref(1)
const totalPages = ref(1)

const filters = ref({
    country: null,
    tags: [],
    cookingTime: null,
    sort: 'created_at',
    direction: 'desc'
})

const loadRecipes = async () => {
    try {
        loading.value = true
        error.value = ''

        const params = {
            page: currentPage.value,
            ...filters.value
        }

        const response = await api.get('/recipes', { params })
        recipes.value = response.data.data
        totalPages.value = response.data.last_page
    } catch (e) {
        error.value = e.response?.data?.message || 'Произошла ошибка при загрузке рецептов'
        console.error('Error loading recipes:', e)
    } finally {
        loading.value = false
    }
}

const changePage = (page: number) => {
    currentPage.value = page
    loadRecipes()
}

const toggleFavorite = async (recipeId: number) => {
    try {
        const recipe = recipes.value.find(r => r.id === recipeId)
        if (!recipe) return

        if (recipe.favorites_count > 0) {
            await api.delete(`/favorites/recipes/${recipeId}`)
            recipe.favorites_count--
        } else {
            await api.post(`/favorites/recipes/${recipeId}`)
            recipe.favorites_count++
        }
    } catch (e) {
        console.error('Error toggling favorite:', e)
    }
}

onMounted(() => {
    loadRecipes()
})
</script> 