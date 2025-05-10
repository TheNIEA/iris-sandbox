<template>
  <div class="profile-header mb-6">
    <div class="flex items-center">
      <!-- Profile image with glow effect -->
      <div class="relative">
        <div class="absolute inset-0 bg-blue-500/30 rounded-full filter blur-md animate-pulse"></div>
        <div class="relative h-20 w-20 rounded-full border-2 border-blue-400/50 overflow-hidden">
          <img 
            :src="profileImage" 
            :alt="userName" 
            class="h-full w-full object-cover"
          />
        </div>
      </div>
      
      <!-- User info -->
      <div class="ml-4">
        <h2 class="text-2xl font-bold text-white">{{ userName }}</h2>
        <div class="flex items-center mt-1">
          <!-- Star rating display -->
          <div class="flex">
            <div v-for="i in 5" :key="i" class="text-lg">
              <span v-if="i <= Math.floor(rating)" class="text-yellow-400">★</span>
              <span v-else-if="i - rating < 1 && i - rating > 0" class="text-yellow-400">★</span>
              <span v-else class="text-gray-600">★</span>
            </div>
          </div>
          <span class="ml-2 text-gray-400 text-sm">{{ rating.toFixed(1) }}</span>
        </div>
        <p class="text-blue-400 text-sm mt-1">{{ userRole }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    default: 'Knowledge Contributor'
  }
});
</script>

<style scoped>
/* No additional styles needed */
</style>