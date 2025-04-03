<template>
  <div>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-light text-gray-900 mb-6">Кулинарная карта мира</h1>
        <div class="bg-white rounded-lg border border-gray-200 p-6 h-[600px]">
          <RecipeMap :recipes="recipes" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRecipesStore } from '~/stores/recipes'

const recipesStore = useRecipesStore()
const recipes = computed(() => recipesStore.recipes)
</script> 