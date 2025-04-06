<template>
    <div>
        <div v-if="loading" class="flex justify-center items-center py-8">
            <LoadingSpinner />
        </div>
        <div v-else-if="error" class="py-8">
            <ErrorMessage :message="error" />
        </div>
        <div v-else-if="recipes.length === 0" class="py-8">
            <EmptyState
                title="Рецепты не найдены"
                description="Попробуйте изменить параметры поиска или создать новый рецепт"
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
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    filters: {
        type: Object,
        required: true
    }
})

const recipes = ref([])
const loading = ref(false)
const error = ref('')

const loadRecipes = async () => {
    loading.value = true
    error.value = ''
    try {
        const query = new URLSearchParams()
        if (props.filters.country_id) query.append('country_id', props.filters.country_id)
        if (props.filters.cooking_time) query.append('cooking_time', props.filters.cooking_time)
        if (props.filters.sort) query.append('sort', props.filters.sort)
        if (props.filters.direction) query.append('direction', props.filters.direction)
        if (props.filters.tags.length) query.append('tags', props.filters.tags.join(','))
        
        const response = await $fetch(`/api/recipes?${query.toString()}`)
        recipes.value = response
    } catch (e) {
        error.value = 'Ошибка при загрузке рецептов'
        console.error('Error loading recipes:', e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadRecipes()
})

watch(() => props.filters, () => {
    loadRecipes()
}, { deep: true })
</script> 