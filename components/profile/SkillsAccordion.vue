<template>
  <div class="mb-6">
    <!-- Toggle Button -->
    <div class="text-center mb-3">
      <button 
        @click="toggleSkillsAccordion" 
        class="flex items-center px-4 py-2 bg-blue-700/20 hover:bg-blue-600/30 rounded-lg text-white transition-colors border border-blue-500/30 backdrop-blur-sm mx-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        My Skills
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transition-transform" 
          :class="{'transform rotate-180': showSkillsAccordion}"
          viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <!-- Skills List Accordion -->
    <div v-if="showSkillsAccordion" class="animate-slideDown space-y-3">
      <!-- Add New Skill Button -->
      <div class="flex justify-center mb-3">
        <button 
          @click="addNewSkill" 
          class="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 hover:from-blue-600/40 hover:to-purple-600/40 rounded-lg text-white transition-colors border border-blue-500/30 backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Skill
        </button>
      </div>
      
      <!-- Individual glass-like skill buttons -->
      <div v-for="skill in skills" :key="skill.id" class="mb-2 last:mb-0">
        <!-- Skill Header - Always visible (glass-like) -->
        <div 
          @click="toggleSkill(skill.id)" 
          class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 
                 backdrop-blur-md border"
          :class="[
            expandedSkill === skill.id 
              ? skill.category === 'Design' 
                ? 'bg-blue-600/20 border-blue-500/30 shadow-glow-blue' 
                : 'bg-purple-600/20 border-purple-500/30 shadow-glow-purple'
              : 'bg-gray-800/30',
            skill.category === 'Design' 
              ? 'border-blue-500/20 hover:border-blue-500/40' 
              : 'border-purple-500/20 hover:border-purple-500/40'
          ]"
        >
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-lg"
              :class="skill.category === 'Design' 
                ? 'bg-blue-800/30' 
                : 'bg-purple-800/30'"
            >
              <span v-html="skill.icon"></span>
            </div>
            <div>
              <div class="text-white font-medium">{{ skill.name }}</div>
              <div class="text-xs"
                :class="skill.category === 'Design' 
                  ? 'text-blue-300' 
                  : 'text-purple-300'"
              >{{ skill.category }}</div>
            </div>
          </div>
          
          <div class="flex items-center">
            <div class="text-sm font-medium mr-2"
              :class="skill.category === 'Design' 
                ? 'text-blue-300' 
                : 'text-purple-300'"
            >{{ skill.rating.toFixed(1) }}</div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 transition-transform" 
              :class="{'transform rotate-180': expandedSkill === skill.id}" 
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        
        <!-- Skill Details - Expanded view with accordion animation -->
        <transition name="accordion">
          <div v-if="expandedSkill === skill.id" class="mt-1 pl-14 pr-3 pb-3 overflow-hidden">
            <!-- Value to Society -->
            <div class="mb-3">
              <div class="text-xs text-gray-400 mb-1">How valuable this skill is to my community:</div>
              <div class="flex justify-between items-center">
                <div class="flex">
                  <div v-for="i in 5" :key="i" class="w-5 h-1 rounded-full mr-1"
                    :class="[
                      i <= Math.round(skill.rating)
                        ? skill.category === 'Design' ? 'bg-blue-500' : 'bg-purple-500'
                        : 'bg-gray-700'
                    ]"
                  ></div>
                </div>
                <div class="text-white text-xs font-medium rounded px-2 py-0.5"
                  :class="skill.category === 'Design' 
                    ? 'bg-blue-800/40' 
                    : 'bg-purple-800/40'"
                >
                  {{ skill.rating.toFixed(1) }}/5
                </div>
              </div>
            </div>
            
            <!-- Skill Impact -->
            <div class="rounded-lg bg-gray-800/20 border border-gray-700/50 p-3 backdrop-blur-sm">
              <div class="text-xs text-gray-400 mb-1">Skill Impact:</div>
              <p class="text-sm text-gray-300 mb-2">{{ skill.description }}</p>
              
              <div class="flex justify-between text-xs">
                <div>
                  <span class="text-gray-500">Envalumental Worth: </span>
                  <span :class="skill.category === 'Design' 
                    ? 'text-blue-300' 
                    : 'text-purple-300'"
                  >${{ formatNumber(skill.contribution) }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Demand:</span>
                  <span :class="skill.category === 'Design' 
                    ? 'text-blue-300' 
                    : 'text-purple-300'"
                  >{{ skill.marketDemand }}/5</span>
                </div>
              </div>
            </div>
            
            <!-- Add/Assess Button -->
            <div class="flex justify-end mt-2">
              <button 
                @click="assessSkill(skill)" 
                class="flex items-center px-2 py-1 rounded text-xs text-white transition-colors border backdrop-blur-sm"
                :class="skill.category === 'Design' 
                  ? 'bg-blue-700/40 hover:bg-blue-600/50 border-blue-500/30' 
                  : 'bg-purple-700/40 hover:bg-purple-600/50 border-purple-500/30'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Rate Skill
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatNumber } from '~/utils/formatter';

const props = defineProps({
  skills: {
    type: Array,
    default: () => ([
      // Default empty array, should be populated by parent component
    ])
  }
});

const emit = defineEmits(['assess', 'add-skill']);

const showSkillsAccordion = ref(false);
const expandedSkill = ref(null);

const toggleSkillsAccordion = () => {
  showSkillsAccordion.value = !showSkillsAccordion.value;
  if (!showSkillsAccordion.value) {
    expandedSkill.value = null;
  }
};

const toggleSkill = (skillId) => {
  expandedSkill.value = expandedSkill.value === skillId ? null : skillId;
};

const assessSkill = (skill) => {
  emit('assess', skill);
};

// Method to handle adding a new skill
const addNewSkill = () => {
  emit('add-skill');
};

// Computed property for grouped skills
const skillsByCategory = computed(() => {
  const grouped = {};
  props.skills.forEach(skill => {
    if (!grouped[skill.category]) {
      grouped[skill.category] = [];
    }
    grouped[skill.category].push(skill);
  });
  return grouped;
});
</script>

<style scoped>
.animate-slideDown {
  animation: slideDown 0.3s ease-out forwards;
  overflow: hidden;
}

@keyframes slideDown {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
}

.shadow-glow-blue {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
}

.shadow-glow-purple {
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  opacity: 1;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}
</style>