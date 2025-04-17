<template>
  <nav class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg px-3 py-2 rounded-full z-50 shadow-lg border border-gray-800/50">
    <div class="flex items-center space-x-1 md:space-x-2">
      <NuxtLink 
        v-for="link in links" 
        :key="link.to" 
        :to="link.to"
        class="p-2 md:p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all flex flex-col items-center"
        :title="link.text"
      >
        <div class="h-6 w-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" :d="link.iconPath" />
          </svg>
        </div>
        <span class="text-[10px] mt-1 hidden md:inline">{{ link.text }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const links = [
  { 
    to: '/', 
    text: 'Home',
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  { 
    to: '/course', 
    text: 'Course',
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  { 
    to: '/studios', 
    text: 'Studios',
    iconPath: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
  },
  { 
    to: '/community', 
    text: 'Community',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  }
]
</script>

<style scoped>
.router-link-active {
  @apply text-white bg-white/10;
}
</style>
