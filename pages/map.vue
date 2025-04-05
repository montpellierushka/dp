<template>
  <PageContainer>
    <template #header>
      <PageTitle
        title="Кулинарная карта мира"
        description="Исследуйте кулинарные традиции разных стран на интерактивной карте"
      />
    </template>

    <div class="h-[600px] md:h-[800px]">
      <RecipeMap :recipes="recipes" />
    </div>
  </PageContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import RecipeMap from '~/components/RecipeMap.vue'
import PageContainer from '~/components/PageContainer.vue'
import PageTitle from '~/components/PageTitle.vue'

const { $api } = useNuxtApp()
const recipes = ref([])

onMounted(async () => {
  try {
    const response = await $api.get('/recipes')
    recipes.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке рецептов:', error)
  }
})
</script> 