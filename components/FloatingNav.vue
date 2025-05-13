<template>
  <nav class="fixed top-8 right-8 bg-black/80 backdrop-blur-lg p-4 rounded-2xl z-50">
    <NuxtLink 
      v-for="link in links" 
      :key="link.to" 
      :to="link.to"
      :external="link.external"
      class="px-4 py-2 mx-2 rounded-lg text-white hover:bg-white/10 transition-colors inline-block"
    >
      {{ link.text }}
    </NuxtLink>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from '#app';

// Make sure router is available
const router = useRouter();

// Define links with explicit paths and external property
const links = computed(() => [
  { to: '/', text: 'Home', external: false },
  { to: '/course', text: 'Course', external: false },
  { to: '/studios', text: 'Studios', external: false },
  { to: '/community', text: 'Community', external: false }
]);
</script>
