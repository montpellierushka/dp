<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">
      <div class="text-center">
        <div class="mb-4 sm:mb-6">
          <svg 
            class="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Ошибка авторизации
        </h1>
        <p class="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Не удалось авторизоваться через Telegram. Пожалуйста, попробуйте открыть приложение через бота.
        </p>
        <a 
          :href="botUrl" 
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 w-full sm:w-auto"
        >
          <svg 
            class="h-5 w-5 mr-2" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
          </svg>
          Открыть в Telegram
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const botUrl = 'https://t.me/your_bot_username'
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