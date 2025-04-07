<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Тестирование API</h1>
        <p class="mt-2 text-gray-600">Инструмент для тестирования API и отладки CORS-запросов</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Информация о запросах</h2>
          <div class="space-y-2 text-sm text-gray-600">
            <p><span class="font-medium">Базовый URL:</span> {{ apiBaseUrl }}</p>
            <p><span class="font-medium">Метод запроса:</span> <span class="font-mono">fetch</span> с <span class="font-mono">credentials: 'include'</span></p>
            <p><span class="font-medium">Заголовки:</span> <span class="font-mono">Accept: application/json</span>, <span class="font-mono">X-Requested-With: XMLHttpRequest</span></p>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Советы по отладке</h2>
          <ul class="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>Проверьте, что сервер разрешает CORS-запросы с вашего домена</li>
            <li>Убедитесь, что сервер принимает заголовок <span class="font-mono">X-Requested-With: XMLHttpRequest</span></li>
            <li>Для запросов с <span class="font-mono">credentials: 'include'</span> сервер должен установить <span class="font-mono">Access-Control-Allow-Credentials: true</span></li>
            <li>Проверьте, что сервер разрешает методы <span class="font-mono">GET</span>, <span class="font-mono">POST</span>, <span class="font-mono">DELETE</span></li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8">
        <ApiTest />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ApiTest from '~/components/ApiTest.vue'
import { API_BASE_URL } from '~/config/api'

const apiBaseUrl = API_BASE_URL
</script> 