import axios from 'axios'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const API_URL = config.public.apiUrl || 'https://montpellierushka-backend-7c0b.twc1.net'

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Добавляем перехватчики для обработки ошибок
$api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Обработка ошибок от сервера
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      // Ошибка сети
      console.error('Network Error:', error.request)
    } else {
      // Другие ошибки
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)