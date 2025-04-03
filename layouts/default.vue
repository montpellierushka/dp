<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-2xl font-light text-gray-800 tracking-tight">
            CulinaryPassport
          </NuxtLink>
          <nav class="flex items-center space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              active-class="text-gray-900 font-medium"
            >
              Главная
            </NuxtLink>
            <NuxtLink 
              to="/recipes" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              active-class="text-gray-900 font-medium"
            >
              Рецепты
            </NuxtLink>
            <NuxtLink 
              to="/favorites" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              active-class="text-gray-900 font-medium"
            >
              Избранное
            </NuxtLink>
            <NuxtLink 
              to="/recipes/add" 
              class="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              active-class="text-gray-900 font-medium"
            >
              Добавить рецепт
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-12">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center text-gray-500 text-sm">
          © 2024 CulinaryPassport. Все права защищены.
        </div>
      </div>
    </footer>
  </div>
</template> 