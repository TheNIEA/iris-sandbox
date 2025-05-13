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
        <div class="flex flex-col mt-1">
          <!-- Contribution scale slider -->
          <div class="flex items-center">
            <div class="w-32 h-2 bg-gray-700 rounded-full mr-2 relative">
              <!-- The filled portion of the slider based on contribution percentage -->
              <div class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  :style="{ width: `${contributionPercentage}%` }"></div>
              <!-- The indicator dot that moves along the slider -->
              <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform -translate-x-1/2"
                  :style="{ left: `${contributionPercentage}%` }"></div>
            </div>
            <span class="text-gray-400 text-sm">{{ userContributions }} contributions</span>
          </div>
          <p class="text-blue-400 text-sm mt-1">{{ userRole }}</p>
        </div>
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
  userContributions: {
    type: Number,
    default: 0
  },
  globalContributions: {
    type: Number,
    default: 100
  },
  contributionPercentage: {
    type: Number,
    default: 50 // Default to middle of scale (50%)
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