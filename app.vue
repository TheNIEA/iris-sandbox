<template>
  <div class="dark-theme">
    <FloatingNav />
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'

onMounted(async () => {
  await nextTick()
  const { initThreeJS } = await import('~/assets/script.js')
  initThreeJS()
})
</script>

<style>
.dark-theme {
  min-height: 100vh;
  width: 100%;
}
</style>
