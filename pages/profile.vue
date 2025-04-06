<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold">Профиль</h1>
            <button
                class="btn btn-primary"
                @click="logout"
            >
                Выйти
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Мои рецепты</h2>
                        <div v-if="loading" class="flex justify-center py-8">
                            <div class="loading loading-spinner loading-lg"></div>
                        </div>

                        <div v-else-if="error" class="alert alert-error">
                            <span>{{ error }}</span>
                        </div>

                        <div v-else-if="recipes.length === 0">
                            <EmptyState
                                title="Нет рецептов"
                                description="Создайте свой первый рецепт"
                            />
                        </div>

                        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RecipeCard
                                v-for="recipe in recipes"
                                :key="recipe.id"
                                :recipe="recipe"
                                @favorite="toggleFavorite"
                                @delete="handleDeleteRecipe"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Информация</h2>
                        <div class="space-y-4">
                            <div>
                                <label class="label">
                                    <span class="label-text">Имя</span>
                                </label>
                                <input
                                    v-if="user"
                                    v-model="user.name"
                                    type="text"
                                    class="input input-bordered w-full"
                                    disabled
                                />
                            </div>
                            <div>
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input
                                    v-if="user"
                                    v-model="user.email"
                                    type="email"
                                    class="input input-bordered w-full"
                                    disabled
                                />
                            </div>
                            <div>
                                <label class="label">
                                    <span class="label-text">Telegram ID</span>
                                </label>
                                <input
                                    v-if="user"
                                    v-model="user.telegram_id"
                                    type="text"
                                    class="input input-bordered w-full"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card bg-base-100 shadow-xl mt-8">
                    <div class="card-body">
                        <h2 class="card-title">Статистика</h2>
                        <div class="stats stats-vertical shadow">
                            <div class="stat">
                                <div class="stat-title">Рецептов</div>
                                <div class="stat-value">{{ recipes.length }}</div>
                            </div>
                            <div class="stat">
                                <div class="stat-title">Избранных</div>
                                <div class="stat-value">{{ favoritesCount }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRecipes } from '~/composables/useRecipes'
import { useNotifications } from '~/composables/useNotifications'
import type { Recipe } from '~/composables/useRecipes'
import EmptyState from '~/components/EmptyState.vue'

const { user, logout: authLogout } = useAuth()
const { recipes, loadMyRecipes, toggleFavorite, deleteRecipe } = useRecipes()
const { showSuccess, showError } = useNotifications()
const loading = ref(false)
const error = ref('')

const favoritesCount = computed(() => {
    return recipes.value.filter(recipe => recipe.is_favorite).length
})

const loadRecipes = async () => {
    loading.value = true
    error.value = ''
    try {
        await loadMyRecipes()
    } catch (e) {
        const err = e as Error
        error.value = 'Ошибка при загрузке рецептов'
        showError(error.value)
        console.error('Error loading recipes:', err)
    } finally {
        loading.value = false
    }
}

const logout = async () => {
    try {
        await authLogout()
    } catch (e) {
        const err = e as Error
        showError('Ошибка при выходе')
        console.error('Error logging out:', err)
    }
}

const handleDeleteRecipe = async (id: number) => {
    try {
        await deleteRecipe(id)
        showSuccess('Рецепт успешно удален')
        await loadMyRecipes()
    } catch (e) {
        showError('Произошла ошибка при удалении рецепта')
        console.error('Error deleting recipe:', e)
    }
}

onMounted(() => {
    loadRecipes()
})
</script> 