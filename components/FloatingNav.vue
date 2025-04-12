<template>
  <nav class="fixed top-8 right-8 bg-black/80 backdrop-blur-lg p-4 rounded-2xl z-50">
    <NuxtLink 
      v-for="link in links" 
      :key="link.to" 
      :to="link.to"
      class="px-4 py-2 mx-2 rounded-lg text-white hover:bg-white/10 transition-colors"
    >
      {{ link.text }}
    </NuxtLink>
  </nav>
</template>

<script setup>
const links = [
  { to: '/', text: 'Home' },
  { to: '/course', text: 'Course' },
  { to: '/studios', text: 'Studios' },
  { to: '/community', text: 'Community' }
]
</script>
