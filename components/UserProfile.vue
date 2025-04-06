<template>
    <div class="space-y-8">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title">Информация о пользователе</h3>
                <div class="space-y-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Имя</span>
                        </label>
                        <input type="text" class="input input-bordered w-full" v-model="user.name" disabled />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="email" class="input input-bordered w-full" v-model="user.email" disabled />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Telegram ID</span>
                        </label>
                        <input type="text" class="input input-bordered w-full" v-model="user.telegram_id" disabled />
                    </div>
                </div>
            </div>
        </div>

        <div class="stats shadow">
            <div class="stat">
                <div class="stat-title">Рецептов</div>
                <div class="stat-value">{{ stats.recipes_count }}</div>
            </div>
            <div class="stat">
                <div class="stat-title">В избранном</div>
                <div class="stat-value">{{ stats.favorites_count }}</div>
            </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title">Мои рецепты</h3>
                <div v-if="loading" class="flex justify-center items-center py-8">
                    <LoadingSpinner />
                </div>
                <div v-else-if="error" class="py-8">
                    <ErrorMessage :message="error" />
                </div>
                <div v-else-if="recipes.length === 0" class="py-8">
                    <EmptyState
                        title="У вас пока нет рецептов"
                        description="Создайте свой первый рецепт"
                    >
                        <template #action>
                            <NuxtLink to="/recipes/new" class="btn btn-primary">Создать рецепт</NuxtLink>
                        </template>
                    </EmptyState>
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <RecipeCard
                        v-for="recipe in recipes"
                        :key="recipe.id"
                        :recipe="recipe"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()
const loading = ref(false)
const error = ref('')
const recipes = ref([])
const stats = ref({
    recipes_count: 0,
    favorites_count: 0
})

const loadRecipes = async () => {
    loading.value = true
    error.value = ''
    try {
        const response = await $fetch('/api/recipes/my')
        recipes.value = response
        stats.value.recipes_count = response.length
    } catch (e) {
        error.value = 'Ошибка при загрузке рецептов'
        console.error('Error loading recipes:', e)
    } finally {
        loading.value = false
    }
}

const loadStats = async () => {
    try {
        const response = await $fetch('/api/users/stats')
        stats.value = response
    } catch (e) {
        console.error('Error loading stats:', e)
    }
}

onMounted(() => {
    loadRecipes()
    loadStats()
})
</script> 