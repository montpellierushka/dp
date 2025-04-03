<template>
  <div>
    <section class="mb-16">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-light text-gray-900 mb-6">Добро пожаловать в CulinaryPassport</h1>
        <p class="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          Ваш гид по кулинарным путешествиям по всему миру. Откройте для себя новые вкусы и традиции разных стран.
        </p>
      </div>
    </section>

    <section>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div class="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors">
          <div class="mb-6">
            <Icon name="book-open" class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-xl font-light text-gray-900 mb-3">Рецепты</h3>
          <p class="text-gray-600 mb-6">Изучите традиционные рецепты со всего мира</p>
          <NuxtLink 
            to="/recipes" 
            class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            Перейти к рецептам
            <Icon name="arrow-right" class="w-4 h-4 ml-2" />
          </NuxtLink>
        </div>

        <div class="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors">
          <div class="mb-6">
            <Icon name="map" class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-xl font-light text-gray-900 mb-3">Карта</h3>
          <p class="text-gray-600 mb-6">Откройте кулинарные маршруты на интерактивной карте</p>
          <NuxtLink 
            to="/map" 
            class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            Исследовать карту
            <Icon name="arrow-right" class="w-4 h-4 ml-2" />
          </NuxtLink>
        </div>

        <div class="bg-white rounded-lg p-8 border border-gray-200 hover:border-gray-300 transition-colors">
          <div class="mb-6">
            <Icon name="globe" class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-xl font-light text-gray-900 mb-3">Путешествия</h3>
          <p class="text-gray-600 mb-6">Планируйте свои гастрономические приключения</p>
          <NuxtLink 
            to="/travel" 
            class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            Начать планирование
            <Icon name="arrow-right" class="w-4 h-4 ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Логика компонента будет добавлена позже
</script> 