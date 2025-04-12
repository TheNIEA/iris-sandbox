<template>
  <div class="relative h-screen w-screen">
    <canvas id="background-canvas" class="absolute inset-0 -z-10"></canvas>
    <div class="flex flex-col items-center justify-center h-full text-center">
      <Title>Welcome</Title>
      <p class="text-xl mb-8">Your landing page content here</p>
      <NuxtLink to="/course">
        <Button>Go to Course</Button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  const { initThreeJS } = await import('~/assets/script.js')
  initThreeJS()
})
</script>
