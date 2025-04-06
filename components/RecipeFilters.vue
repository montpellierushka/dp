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
            v-model="filters.country_id"
            class="select select-bordered w-full"
          >
            <option value="">Все страны</option>
            <option
              v-for="country in countriesList"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Время приготовления (до)</span>
          </label>
          <input
            v-model.number="filters.cooking_time"
            type="number"
            class="input input-bordered w-full"
            min="1"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Теги</span>
          </label>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tag in tagsList"
              :key="tag.id"
              class="form-control"
            >
              <label class="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  :value="tag.id"
                  v-model="filters.tags"
                  class="checkbox"
                />
                <span class="label-text">{{ tag.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Сортировка</span>
          </label>
          <select
            v-model="filters.sort"
            class="select select-bordered w-full"
          >
            <option value="">По умолчанию</option>
            <option value="title">По названию</option>
            <option value="cooking_time">По времени приготовления</option>
            <option value="favorites_count">По количеству избранного</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Направление сортировки</span>
          </label>
          <select
            v-model="filters.direction"
            class="select select-bordered w-full"
          >
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>

        <div class="card-actions justify-end">
          <button
            class="btn btn-primary"
            @click="applyFilters"
          >
            Применить
          </button>
          <button
            class="btn btn-ghost"
            @click="resetFilters"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCountries } from '~/composables/useCountries'
import { useTags } from '~/composables/useTags'
import type { RecipeFilters } from '~/composables/useRecipes'

const { countries: countriesList, loadCountries } = useCountries()
const { tags: tagsList, loadTags } = useTags()

const filters = ref<RecipeFilters>({
  country_id: undefined,
  cooking_time: undefined,
  sort: undefined,
  direction: undefined,
  tags: undefined
})

const emit = defineEmits<{
  (e: 'update', filters: RecipeFilters): void
}>()

const applyFilters = () => {
  emit('update', filters.value)
}

const resetFilters = () => {
  filters.value = {
    country_id: undefined,
    cooking_time: undefined,
    sort: undefined,
    direction: undefined,
    tags: undefined
  }
  emit('update', filters.value)
}

onMounted(async () => {
  await Promise.all([
    loadCountries(),
    loadTags()
  ])
})
</script> 