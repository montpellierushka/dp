<template>
  <div class="layout">
    <Navbar />
    <main class="main bg-gray-50">
      <slot />
    </main>
    <Notifications />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
import Notifications from '~/components/Notifications.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  
}
</style> 