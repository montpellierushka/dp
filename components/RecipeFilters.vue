<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Фильтры</h2>
      <div class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Страна</span>
          </label>
          <select
            class="select select-bordered w-full"
            v-model="filters.country_id"
          >
            <option value="">Все страны</option>
            <option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Время приготовления</span>
          </label>
          <select
            class="select select-bordered w-full"
            v-model="filters.cooking_time"
          >
            <option value="">Любое время</option>
            <option value="15">До 15 минут</option>
            <option value="30">До 30 минут</option>
            <option value="45">До 45 минут</option>
            <option value="60">До 1 часа</option>
            <option value="120">До 2 часов</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Сортировка</span>
          </label>
          <select
            class="select select-bordered w-full"
            v-model="filters.sort"
          >
            <option value="created_at">По дате</option>
            <option value="favorites_count">По популярности</option>
            <option value="cooking_time">По времени</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Направление</span>
          </label>
          <select
            class="select select-bordered w-full"
            v-model="filters.direction"
          >
            <option value="desc">По убыванию</option>
            <option value="asc">По возрастанию</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Теги</span>
          </label>
          <div class="flex flex-wrap gap-2">
            <label
              class="label cursor-pointer gap-2"
              v-for="tag in tags"
              :key="tag.id"
            >
              <input
                type="checkbox"
                class="checkbox checkbox-primary"
                :value="tag.id"
                v-model="filters.tags"
              />
              <span class="label-text">{{ tag.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const countries = ref([])
const tags = ref([])
const filters = ref({
  country_id: '',
  cooking_time: '',
  sort: 'created_at',
  direction: 'desc',
  tags: []
})

const emit = defineEmits(['update:filters'])

onMounted(async () => {
  try {
    const [countriesResponse, tagsResponse] = await Promise.all([
      $fetch('/api/countries'),
      $fetch('/api/tags')
    ])
    countries.value = countriesResponse
    tags.value = tagsResponse
  } catch (error) {
    console.error('Error loading filters:', error)
  }
})

watch(filters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })
</script> 