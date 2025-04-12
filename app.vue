<template>
  <div id="landing-page">
    <canvas id="background-canvas"></canvas>
    <div class="content">
      <h1>Welcome to NIEA</h1>
      <p>Innovating the future, one step at a time.</p>
      <button>Learn More</button>
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
