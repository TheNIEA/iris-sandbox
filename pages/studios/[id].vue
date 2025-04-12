<template>
  <div class="room-page p-4">
    <Title tag="h1">Room {{ roomId }}</Title>
    <p class="text-gray-400">Collaborate and create music together!</p>
    <!-- Placeholder for live streaming and collaboration tools -->
    <div class="collaboration-area mt-4 p-4 rounded-lg bg-gray-700 text-white">
      <p>Live collaboration tools will be integrated here.</p>
    </div>
    <NuxtLink to="/studios">
      <Button>Back to Studios</Button>
    </NuxtLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const roomId = route.params.id
</script>
