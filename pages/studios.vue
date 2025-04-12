<template>
  <div class="studios-page p-4">
    <Title tag="h1">Studios</Title>
    <div class="studios-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div v-for="room in rooms" :key="room.id" class="studio-card rounded-lg shadow-md p-4 bg-gray-800 text-white">
        <Title tag="h2">{{ room.name }}</Title>
        <p class="text-gray-400">{{ room.description }}</p>
        <Button @click="enterRoom(room.id)">Enter Room</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const rooms = ref([
  { id: 1, name: 'Room A', description: 'Acoustic Jam Session' },
  { id: 2, name: 'Room B', description: 'Electronic Beat Lab' },
  { id: 3, name: 'Room C', description: 'Vocal Collaboration Space' }
])

const router = useRouter()

const enterRoom = (roomId) => {
  router.push(`/studios/${roomId}`)
}
</script>

<style scoped>
.course-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
