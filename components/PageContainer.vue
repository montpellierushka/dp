<template>
  <div class="min-h-screen bg-gray-50">
    <slot name="header" />
    <main class="max-w-7xl mx-auto py-4 sm:py-6">
      <div class="space-y-4 sm:space-y-6">
        <slot />
      </div>
    </main>
  </div>
</template> 