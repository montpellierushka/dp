<template>
  <PageContainer>
    <template #header>
      <PageTitle
        title="Ошибка"
        description="Что-то пошло не так"
      />
    </template>

    <div class="text-center py-12">
      <Icon name="alert-circle" class="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 class="text-2xl font-medium text-gray-900 mb-2">{{ error.statusCode }}</h2>
      <p class="text-gray-600 mb-6">{{ error.message }}</p>
      <NuxtLink 
        to="/" 
        class="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
      >
        Вернуться на главную
        <Icon name="arrow-right" class="ml-2 w-4 h-4" />
      </NuxtLink>
    </div>
  </PageContainer>
</template>

<script setup>
import PageContainer from '~/components/PageContainer.vue'
import PageTitle from '~/components/PageTitle.vue'

defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
@media (max-width: 640px) {
  .container {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style> 