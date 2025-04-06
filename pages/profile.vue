<template>
    <div>
        <PageHeader>
            <template #title>Профиль</template>
            <template #actions>
                <button
                    class="btn btn-primary"
                    @click="logout"
                >
                    Выйти
                </button>
            </template>
        </PageHeader>

        <PageContainer>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title">Мои рецепты</h2>
                            <div v-if="loading" class="text-center py-8">
                                <div class="loading loading-spinner loading-lg"></div>
                            </div>

                            <div v-else-if="error" class="alert alert-error">
                                {{ error }}
                            </div>

                            <div v-else-if="recipes.length === 0" class="text-center py-8">
                                <p class="text-lg">У вас пока нет рецептов</p>
                                <NuxtLink to="/recipes/new" class="btn btn-primary mt-4">
                                    Создать рецепт
                                </NuxtLink>
                            </div>

                            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <RecipeCard
                                    v-for="recipe in recipes"
                                    :key="recipe.id"
                                    :recipe="recipe"
                                    @favorite="toggleFavorite"
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
        </PageContainer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useApi } from '~/composables/useApi'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const api = useApi()
const { user, logout: authLogout } = useAuth()
const router = useRouter()

const loading = ref(false)
const error = ref('')
const recipes = ref([])

const favoritesCount = computed(() => {
    return recipes.value.reduce((count, recipe) => count + recipe.favorites_count, 0)
})

const loadRecipes = async () => {
    try {
        loading.value = true
        error.value = ''

        const response = await api.get('/recipes', {
            params: {
                user_id: user.value?.id
            }
        })
        recipes.value = response.data.data
    } catch (e) {
        error.value = e.response?.data?.message || 'Произошла ошибка при загрузке рецептов'
        console.error('Error loading recipes:', e)
    } finally {
        loading.value = false
    }
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

const logout = async () => {
    try {
        await authLogout()
        router.push('/')
    } catch (e) {
        console.error('Error logging out:', e)
    }
}

onMounted(() => {
    loadRecipes()
})
</script> 