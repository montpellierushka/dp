<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          Ошибка авторизации
        </h1>
        <p class="text-gray-600 mb-8">
          Не удалось авторизоваться через Telegram. Пожалуйста, попробуйте открыть приложение через бота.
        </p>
        <a 
          :href="botUrl" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Открыть в Telegram
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const botUrl = 'https://t.me/your_bot_username'
</script> 