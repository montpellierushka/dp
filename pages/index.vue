<template>
  <div>
    <section class="mb-8 sm:mb-16 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4 sm:mb-6">Добро пожаловать в CulinaryPassport</h1>
        <p class="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Ваш гид по кулинарным путешествиям по всему миру. Откройте для себя новые вкусы и традиции разных стран.
        </p>
      </div>
    </section>

    <section class="px-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 border border-gray-200 hover:border-gray-300 transition-colors">
          <div class="mb-4 sm:mb-6">
            <Icon name="book-open" class="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h3 class="text-lg sm:text-xl font-light text-gray-900 mb-2 sm:mb-3">Рецепты</h3>
          <p class="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Изучите традиционные рецепты со всего мира</p>
          <NuxtLink 
            to="/recipes" 
            class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm"
          >
            Перейти к рецептам
            <Icon name="arrow-right" class="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          </NuxtLink>
        </div>

        <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 border border-gray-200 hover:border-gray-300 transition-colors">
          <div class="mb-4 sm:mb-6">
            <Icon name="map" class="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h3 class="text-lg sm:text-xl font-light text-gray-900 mb-2 sm:mb-3">Карта</h3>
          <p class="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Откройте кулинарные маршруты на интерактивной карте</p>
          <NuxtLink 
            to="/map" 
            class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm"
          >
            Исследовать карту
            <Icon name="arrow-right" class="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          </NuxtLink>
        </div>

        <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 border border-gray-200 hover:border-gray-300 transition-colors">
          <div class="mb-4 sm:mb-6">
            <Icon name="globe" class="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h3 class="text-lg sm:text-xl font-light text-gray-900 mb-2 sm:mb-3">Путешествия</h3>
          <p class="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Планируйте свои гастрономические приключения</p>
          <NuxtLink 
            to="/travel" 
            class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm"
          >
            Начать планирование
            <Icon name="arrow-right" class="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Логика компонента будет добавлена позже
</script> 