import axios from 'axios'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const API_URL = config.public.apiUrl || 'https://montpellierushka-backend-7c0b.twc1.net/'

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
    console.error('API Error:', error)
    return Promise.reject(error)
  }
) 