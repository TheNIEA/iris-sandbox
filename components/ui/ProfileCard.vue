<template>
  <div 
    ref="cardRef" 
    id="share-card" 
    class="w-full max-w-sm bg-gradient-to-b from-blue-950 to-purple-950 border border-blue-500/30 rounded-lg p-6 mb-4" 
    :style="customStyle"
  >
    <div class="flex items-center mb-4">
      <div class="relative w-16 h-16 mr-4">
        <div class="absolute inset-0 rounded-full bg-blue-500/20 blur-md"></div>
        <img 
          :src="profileImage" 
          alt="User Profile" 
          class="w-16 h-16 rounded-full object-cover border-2 border-blue-400 relative z-10"
        />
      </div>
      <div>
        <h3 class="text-white text-xl font-bold">{{ userName }}</h3>
        <div class="flex items-center">
          <span class="text-xs text-blue-300">{{ skillsCount }} Skills</span>
          <span class="mx-2 text-gray-500">•</span>
          <span class="text-xs text-blue-300">{{ ratingsCount }} Ratings</span>
        </div>
      </div>
    </div>
    
    <!-- Envalumental Wealth - Made more prominent -->
    <div class="flex flex-col items-center justify-center bg-black/30 rounded-lg p-5 mb-6">
      <div class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400 drop-shadow-[0_0_3px_rgba(255,255,255,0.3)] envalumental-wealth-amount">
        ${{ formatNumber(wealthAmount) }}
      </div>
      <span class="text-sm text-blue-300 mt-1">In Envalumental Wealth</span>
    </div>
    
    <!-- Top Skills -->
    <div v-if="skills && skills.length">
      <h4 class="text-sm font-medium text-blue-300 mb-2">Top Skills</h4>
      <div class="space-y-2">
        <div v-for="skill in skills.slice(0, 3)" :key="skill.id" 
          class="flex items-center justify-between p-2 rounded-lg border"
          :class="skill.category === 'Design' ? 'border-blue-500/30 bg-blue-900/20' : 'border-purple-500/30 bg-purple-900/20'"
        >
          <span class="text-white text-sm">{{ skill.name }}</span>
          <span class="text-xs font-medium rounded px-1.5 py-0.5"
              :class="skill.category === 'Design' ? 'bg-blue-800/40 text-blue-300' : 'bg-purple-800/40 text-purple-300'"
          >
            {{ skill.rating.toFixed(1) }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Additional profile stats -->
    <div class="mt-6 bg-black/20 p-3 rounded-lg">
      <div class="text-sm font-medium text-blue-300 mb-2">{{ statsTitle }}</div>
      <div class="grid grid-cols-2 gap-3">
        <div class="text-center">
          <div class="text-white text-sm">${{ formatNumber(skillValue) }}</div>
          <div class="text-xs text-gray-400">Skill Value</div>
        </div>
        <div class="text-center">
          <div class="text-white text-sm">${{ formatNumber(knowledgeValue) }}</div>
          <div class="text-xs text-gray-400">Knowledge</div>
        </div>
      </div>
    </div>
    
    <div class="mt-6 text-center">
      <div class="text-sm font-medium text-blue-300 mb-2">Community Impact</div>
      <div class="flex justify-center space-x-1">
        <div v-for="i in 5" :key="i" class="w-5 h-1.5 rounded-full"
          :class="i <= Math.round(rating) ? 'bg-blue-500' : 'bg-gray-700'"
        ></div>
      </div>
      <div class="text-xs text-gray-400 mt-1">{{ rating }}/5 Rating</div>
    </div>
    
    <div class="mt-6 text-center text-xs text-gray-400 border-t border-gray-700 pt-3">
      Generated on {{ generatedDate }} • via Envalument Network
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { formatNumber, formatCurrency } from '~/utils/formatter';

const props = defineProps({
  userName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  wealthAmount: {
    type: [Number, String],
    required: true
  },
  rating: {
    type: [Number, String],
    default: 4.0
  },
  skills: {
    type: Array,
    default: () => []
  },
  skillsCount: {
    type: [Number, String],
    default: 0
  },
  ratingsCount: {
    type: [Number, String],
    default: 0
  },
  skillValue: {
    type: [Number, String],
    default: 0
  },
  knowledgeValue: {
    type: [Number, String],
    default: 0
  },
  statsTitle: {
    type: String,
    default: 'Envalumental Contributions'
  },
  generatedDate: {
    type: String,
    default: () => new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
});

// External reference to the component's root element for use with html2canvas
const cardRef = ref(null);

// Expose the element reference for parent components
defineExpose({
  cardRef
});
</script>

<style scoped>
.envalumental-wealth-amount {
  text-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
}

:deep(.shadow-glow-blue) {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.15);
}

:deep(.shadow-glow-purple) {
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.15);
}
</style>