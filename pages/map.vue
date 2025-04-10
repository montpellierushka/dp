<template>
  <PageContainer>
    <template #header>
      <PageTitle
        title="Кулинарный паспорт"
        description="Отмечайте страны, в которых вы приготовили блюда, и получайте достижения"
      />
    </template>

    <div class="h-[calc(100vh-12rem)]">
      <Map
        v-if="!loading"
        :countries="countries"
        :user-progress="userProgress"
        :map-stats="mapStats"
      />
      
      <div v-else class="flex items-center justify-center h-full">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PageContainer from '~/components/PageContainer.vue'
import PageTitle from '~/components/PageTitle.vue'
import Map from '~/components/Map.vue'
import { useMap } from '~/composables/useMap'

const {
  countries,
  userProgress,
  mapStats,
  loading,
  error,
  loadMapData
} = useMap()

onMounted(async () => {
  await loadMapData()
})
</script> 