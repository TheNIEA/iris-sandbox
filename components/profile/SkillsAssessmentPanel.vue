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
import { ref, computed, onMounted } from 'vue';
import { formatNumber, convertToLetterGrade } from '~/utils/formatter';

// Props with default empty values instead of hardcoded data
const props = defineProps({
  initialSkillId: {
    type: String,
    default: ''
  }
});

// Events
const emit = defineEmits(['back']);

// State variables
const currentSkillId = ref(props.initialSkillId || '');
const skillRatings = ref({}); // Will store user ratings for skills
const expanded = ref(false);
const assessmentMode = ref(false);
const showAssessmentSuccessModal = ref(false);
const pendingAssessmentId = ref(null);

// Empty data structures that will be populated via API calls
const skills = ref([]); // Will be populated with skills from API
const assessments = ref([]); // Will be populated with assessments from API

// Selected skill details
const selectedSkill = computed(() => {
  return skills.value.find(skill => skill.id === currentSkillId.value) || null;
});

// Get average rating for current skill
const averageRating = computed(() => {
  if (!selectedSkill.value) return 0;
  
  // Calculate average or return default if no assessments
  const relevantAssessments = assessments.value.filter(a => a.skillId === currentSkillId.value);
  if (relevantAssessments.length === 0) return 0;
  
  const sum = relevantAssessments.reduce((acc, curr) => acc + curr.rating, 0);
  return sum / relevantAssessments.length;
});

// Get letter grade for current skill
const letterGrade = computed(() => {
  return convertToLetterGrade(averageRating.value);
});

// Format ratings for display
const formattedRatings = computed(() => {
  if (!selectedSkill.value) return { learn: 0, apply: 0, master: 0, total: 0 };
  
  // Calculate or provide default values if no assessments
  const relevantAssessments = assessments.value.filter(a => a.skillId === currentSkillId.value);
  if (relevantAssessments.length === 0) {
    return { learn: 0, apply: 0, master: 0, total: 0 };
  }
  
  // Calculate average for each category
  const learn = relevantAssessments.reduce((acc, curr) => acc + curr.learnValue, 0) / relevantAssessments.length;
  const apply = relevantAssessments.reduce((acc, curr) => acc + curr.applyValue, 0) / relevantAssessments.length;
  const master = relevantAssessments.reduce((acc, curr) => acc + curr.masterValue, 0) / relevantAssessments.length;
  const total = learn + apply + master;
  
  return { learn, apply, master, total };
});

// Fetch skills from API
const fetchSkills = async () => {
  try {
    // In a real implementation, this would be an API call
    // const response = await fetch('/api/skills');
    // skills.value = await response.json();
    
    // For testing, we'll leave this empty for now
    skills.value = [];
  } catch (error) {
    console.error('Failed to fetch skills:', error);
  }
};

// Fetch assessments for current skill
const fetchAssessments = async () => {
  try {
    // In a real implementation, this would be an API call
    // const response = await fetch(`/api/skills/${currentSkillId.value}/assessments`);
    // assessments.value = await response.json();
    
    // For testing, we'll leave this empty for now
    assessments.value = [];
  } catch (error) {
    console.error('Failed to fetch assessments:', error);
  }
};

// Toggle expanded view
const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

// Navigate to a different skill
const navigateToSkill = (skillId) => {
  currentSkillId.value = skillId;
  expanded.value = false;
  
  // In a real implementation, we'd fetch new data for the selected skill
  fetchAssessments();
};

// Start assessment for current skill
const startAssessment = () => {
  assessmentMode.value = true;
  
  // Initialize ratings for the current skill
  skillRatings.value = {
    learn: 3,
    apply: 3, 
    master: 3,
    importance: 5,
    comment: ''
  };
};

// Cancel assessment
const cancelAssessment = () => {
  assessmentMode.value = false;
};

// Submit assessment
const submitAssessment = async () => {
  try {
    // In a real implementation, this would be an API call
    // const response = await fetch('/api/skills/assess', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     skillId: currentSkillId.value,
    //     ...skillRatings.value
    //   }),
    // });
    
    // const result = await response.json();
    // if (result.success) {
    //   pendingAssessmentId.value = result.assessmentId;
    //   showAssessmentSuccessModal.value = true;
    // }
    
    // For testing, we'll simulate success
    pendingAssessmentId.value = 'test-assessment-id';
    showAssessmentSuccessModal.value = true;
  } catch (error) {
    console.error('Failed to submit assessment:', error);
  }
  
  // Reset assessment mode
  assessmentMode.value = false;
};

// Calculate total assessment value
const calculateTotalValue = computed(() => {
  if (!skillRatings.value) return 0;
  return (
    skillRatings.value.learn + 
    skillRatings.value.apply + 
    skillRatings.value.master
  );
});

// Calculate impact value
const calculateImpact = computed(() => {
  return calculateTotalValue.value * (skillRatings.value?.importance / 10 || 0.5);
});

// Go back to previous view
const goBack = () => {
  emit('back');
};

// Close success modal
const closeSuccessModal = () => {
  showAssessmentSuccessModal.value = false;
  pendingAssessmentId.value = null;
  
  // Refresh assessments
  fetchAssessments();
};

// Check if there are any existing assessments
const hasAssessments = computed(() => {
  return assessments.value.length > 0;
});

// Initialize component
onMounted(() => {
  // Fetch necessary data
  fetchSkills();
  fetchAssessments();
});
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