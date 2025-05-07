<template>
  <div class="skills-assessment-panel w-full max-w-md mx-auto rounded-xl overflow-hidden">
    <!-- Background gradient matching user profile panel -->
    <div class="bg-gradient-to-b from-blue-900 to-purple-900 p-6">
      
      <!-- Header Bar -->
      <div class="flex items-center mb-8">
        <button 
          @click="$emit('back')" 
          class="p-2 rounded-full hover:bg-blue-800/30 transition-colors mr-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-white">Skill</h1>
      </div>
      
      <!-- Skill List -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <button 
          v-for="skill in skills" 
          :key="skill.id"
          @click="selectSkill(skill)"
          class="skill-button p-4 rounded-xl border transition-all flex flex-col items-center"
          :class="[
            selectedSkill.id === skill.id 
              ? 'border-blue-400 bg-blue-800/30 shadow-glow' 
              : 'border-gray-700 bg-gray-800/30 hover:border-blue-600/50'
          ]"
        >
          <div 
            class="w-12 h-12 mb-3 rounded-full flex items-center justify-center"
            :class="[
              selectedSkill.id === skill.id 
                ? 'bg-blue-600/30 text-blue-300' 
                : 'bg-gray-700/50 text-gray-300'
            ]"
          >
            <span class="text-2xl" v-html="skill.icon"></span>
          </div>
          <span 
            class="text-sm font-medium"
            :class="[
              selectedSkill.id === skill.id 
                ? 'text-white' 
                : 'text-gray-300'
            ]"
          >{{ skill.name }}</span>
        </button>
      </div>
      
      <!-- Evaluation Section -->
      <div class="border border-blue-800 rounded-xl p-6 bg-blue-900/20 mb-6">
        <h3 class="text-lg text-gray-300 mb-3">How valuable is this skill to society?</h3>
        
        <!-- Rating display (similar to the user profile rating) -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="relative w-14 h-14 mr-4">
              <svg class="absolute inset-0" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="rgba(59, 130, 246, 0.2)" 
                  stroke-width="8"
                />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="rgba(59, 130, 246, 0.8)" 
                  stroke-width="8"
                  stroke-linecap="round"
                  :stroke-dasharray="calculateCircumference(45)"
                  :stroke-dashoffset="calculateDashOffset(45, selectedSkill.rating / 5)"
                />
              </svg>
              
              <!-- Rating value -->
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-xl font-bold text-white">{{ convertToLetterGrade(selectedSkill.rating) }}</span>
              </div>
            </div>
            <div>
              <div class="font-semibold text-white text-lg">{{ selectedSkill.name }}</div>
              <div class="text-sm text-blue-300">{{ selectedSkill.category }}</div>
            </div>
          </div>
          
          <!-- Forward arrow -->
          <button 
            @click="nextSkill"
            class="p-2 rounded-full hover:bg-blue-600/30 transition-colors text-blue-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Description Section -->
      <div class="border border-gray-800 rounded-xl p-6 bg-gray-800/20">
        <h3 class="text-lg font-medium text-white mb-3">Skill Impact</h3>
        <p class="text-gray-300 mb-4">{{ selectedSkill.description }}</p>
        
        <div class="flex items-center justify-between text-sm">
          <div>
            <div class="text-gray-400">Contribution to wealth:</div>
            <div class="text-blue-300 font-semibold">+${{ formatNumber(selectedSkill.contribution) }}</div>
          </div>
          <div>
            <div class="text-gray-400">Market demand:</div>
            <div class="flex mt-1">
              <div v-for="i in 5" :key="i" 
                class="w-2 h-6 mx-0.5 rounded-full"
                :class="[
                  i <= selectedSkill.marketDemand 
                    ? 'bg-blue-500' 
                    : 'bg-gray-700'
                ]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatNumber, formatCurrency, convertToLetterGrade } from '~/utils/formatter';

const props = defineProps({
  initialSkillId: {
    type: String,
    default: 'vr-ar'
  }
});

defineEmits(['back']);

const skills = [
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    icon: '🎨',
    category: 'Creative Arts',
    rating: 3.8,
    description: 'Visual communication skills that combine images, typography, and colors to convey ideas and messages effectively.',
    contribution: 21500,
    marketDemand: 4
  },
  {
    id: '3d-modeling',
    name: '3D Modeling',
    icon: '💎',
    category: 'Digital Creation',
    rating: 3.5,
    description: 'Creating three-dimensional digital representations of physical objects or abstract concepts for various applications.',
    contribution: 19800,
    marketDemand: 3
  },
  {
    id: 'ai-llms',
    name: 'AI/LLMs',
    icon: '🤖',
    category: 'Technology',
    rating: 4.5,
    description: 'Working with artificial intelligence and large language models to develop intelligent systems and applications.',
    contribution: 38200,
    marketDemand: 5
  },
  {
    id: 'vr-ar',
    name: 'VR/AR Development',
    icon: '🥽',
    category: 'Immersive Technology',
    rating: 4.0,
    description: 'Creating virtual and augmented reality experiences that enhance how we interact with digital content.',
    contribution: 32500,
    marketDemand: 4
  },
  {
    id: 'marketing',
    name: 'Marketing Techniques',
    icon: '📈',
    category: 'Business',
    rating: 3.7,
    description: 'Strategies for promoting products, services, or ideas to target audiences through various channels.',
    contribution: 24600,
    marketDemand: 4
  },
  {
    id: 'finance',
    name: 'Financial Analysis',
    icon: '💹',
    category: 'Economics',
    rating: 3.9,
    description: 'Evaluating businesses, projects, budgets, and other finance-related entities for profitability and stability.',
    contribution: 28900,
    marketDemand: 3
  }
];

const selectedSkill = ref(skills.find(skill => skill.id === props.initialSkillId) || skills[3]);

const selectSkill = (skill) => {
  selectedSkill.value = skill;
};

const nextSkill = () => {
  const currentIndex = skills.findIndex(skill => skill.id === selectedSkill.value.id);
  const nextIndex = (currentIndex + 1) % skills.length;
  selectedSkill.value = skills[nextIndex];
};

const calculateCircumference = (radius) => {
  return 2 * Math.PI * radius;
};

const calculateDashOffset = (radius, percentage) => {
  const circumference = calculateCircumference(radius);
  return circumference * (1 - percentage);
};
</script>

<style scoped>
.shadow-glow {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
}

.skill-button {
  transition: all 0.3s ease;
}

.skill-button:hover {
  transform: translateY(-2px);
}
</style>