<template>
  <PageContainer>
    <template #header>
      <PageTitle
        title="Кулинарные путешествия по всему миру"
        description="Откройте для себя уникальные рецепты, создавайте маршруты гастрономических путешествий и сохраняйте свои любимые блюда"
      />
    </template>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Кулинарная карта мира -->
      <NuxtLink 
        to="/map"
        class="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="aspect-w-16 aspect-h-9">
          <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80"
            alt="Кулинарная карта мира"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="p-4">
          <h2 class="text-xl font-medium text-gray-900 mb-2">Кулинарная карта мира</h2>
          <p class="text-gray-600">Исследуйте рецепты разных стран на интерактивной карте</p>
        </div>
      </NuxtLink>

      <!-- Кулинарные путешествия -->
      <NuxtLink 
        to="/travel"
        class="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="aspect-w-16 aspect-h-9">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80"
            alt="Кулинарные путешествия"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="p-4">
          <h2 class="text-xl font-medium text-gray-900 mb-2">Кулинарные путешествия</h2>
          <p class="text-gray-600">Создавайте и сохраняйте свои маршруты кулинарных путешествий</p>
        </div>
      </NuxtLink>

      <!-- Избранные рецепты -->
      <NuxtLink 
        to="/favorites"
        class="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="aspect-w-16 aspect-h-9">
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450&q=80"
            alt="Избранные рецепты"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="p-4">
          <h2 class="text-xl font-medium text-gray-900 mb-2">Избранные рецепты</h2>
          <p class="text-gray-600">Сохраняйте понравившиеся рецепты для быстрого доступа</p>
        </div>
      </NuxtLink>
    </div>
  </PageContainer>
</template>

<script setup>
import PageContainer from '~/components/PageContainer.vue'
import PageTitle from '~/components/PageTitle.vue'
</script> 