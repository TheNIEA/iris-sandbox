<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-purple-950 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header Section with glass morphism -->
      <div class="flex justify-between items-center mb-8 bg-white/5 backdrop-blur-md border border-blue-500/20 rounded-xl p-4 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
        <h1 class="text-3xl font-bold text-white">Skills Assessment</h1>
        <NuxtLink to="/profile" class="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Profile
        </NuxtLink>
      </div>
      
      <div v-if="activeView === 'list'" class="animate-fadeIn">
        <!-- Skills Grid with glass morphism cards -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <button 
            v-for="skill in skills" 
            :key="skill.id"
            @click="showSkillDetail(skill)"
            class="skill-card flex flex-col items-center p-6 rounded-xl transition-all border backdrop-blur-md"
            :class="[
              'bg-white/5 hover:bg-white/10 border-blue-500/20 hover:border-blue-500/50',
              'transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]'
            ]"
          >
            <div class="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <span class="text-3xl">{{ skill.icon }}</span>
            </div>
            <h3 class="text-lg font-medium text-white mb-1">{{ skill.name }}</h3>
            <div class="text-sm text-blue-300">{{ skill.category }}</div>
          </button>
        </div>
        
        <!-- Additional Content with glass morphism -->
        <div class="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <h2 class="text-xl font-bold text-white mb-4">Understanding Skill Value</h2>
          
          <div class="mb-6">
            <p class="text-gray-300 mb-3">
              You're viewing Khoury's skills and expertise—a collection of capabilities that represent stored potential to create value in your life and our community. Your honest assessment directly impacts their Envalumental Wealth.
            </p>
            <p class="text-gray-300">
              When rating these skills, consider how they could meaningfully impact <span class="italic">your</span> journey. Your evaluation acknowledges the real-world value of another person's knowledge and abilities.
            </p>
          </div>
          
          <h3 class="text-lg font-bold text-blue-300 mb-3">How Your Assessment Matters</h3>
          
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-start">
              <div class="mr-3 text-blue-400">•</div>
              <p><span class="font-medium text-blue-300">To Learn</span> – What would you pay to gain knowledge from Khoury about this skill? Value access to their expertise and guidance.</p>
            </li>
            <li class="flex items-start">
              <div class="mr-3 text-blue-400">•</div>
              <p><span class="font-medium text-blue-300">To Experience</span> – What is it worth to work alongside them, applying this skill in real situations? Consider the opportunity to collaborate.</p>
            </li>
            <li class="flex items-start">
              <div class="mr-3 text-blue-400">•</div>
              <p><span class="font-medium text-blue-300">To Master</span> – What would comprehensive mentorship in this skill be worth to you? Value the complete transfer of expertise.</p>
            </li>
            <li class="flex items-start">
              <div class="mr-3 text-blue-400">•</div>
              <p><span class="font-medium text-blue-300">Be Thoughtful</span> – Your assessment helps Khoury understand how their skills resonate with others and shapes their contribution potential.</p>
            </li>
            <li class="flex items-start">
              <div class="mr-3 text-blue-400">•</div>
              <p><span class="font-medium text-blue-300">Provide Context</span> – Explain why you value this skill—personal growth, career opportunities, community needs, or other insights.</p>
            </li>
          </ul>
          
          <div class="mt-6 bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
            <p class="text-blue-200 text-sm">
              <span class="font-bold">Remember:</span> Envalumental Wealth represents the stored potential of an individual's contributions to society. By recognizing the value in Khoury's skills, you're acknowledging their capacity to create positive change through knowledge sharing, mentorship, and collaboration.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Skill Detail View with glass morphism -->
      <div v-else-if="activeView === 'detail' && selectedSkill" class="animate-fadeIn">
        <div class="bg-white/5 backdrop-blur-md rounded-xl border border-blue-500/20 overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <!-- Skill Header -->
          <div class="p-6 border-b border-blue-800/30">
            <button @click="backToList" class="text-blue-400 hover:text-blue-300 transition-colors mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Skills
            </button>
            
            <div class="flex items-center">
              <div class="w-14 h-14 bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                <span class="text-3xl">{{ selectedSkill.icon }}</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white">{{ selectedSkill.name }}</h2>
                <div class="text-blue-300">{{ selectedSkill.category }}</div>
              </div>
              <!-- Add Value Button -->
              <button 
                @click="showAddValueForm"
                class="ml-auto p-2 rounded-full bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-white transition-colors border border-blue-500/30"
                :disabled="formActive"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Value Form (when active) with glass morphism -->
          <div v-if="formActive" class="p-6 border-b border-blue-800/30 bg-blue-900/10">
            <h3 class="text-xl font-semibold text-white mb-4">What Would You:</h3>
            
            <form @submit.prevent="submitAssessment" class="space-y-5">
              <!-- Value Inputs -->
              <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="space-y-2">
                    <label class="block text-sm text-gray-300">Pay to Learn ($)</label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        v-model="valueForm.learnValue" 
                        type="number" 
                        class="w-full pl-8 pr-4 py-2 rounded-lg bg-gray-800/80 border border-blue-700/30 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        min="0"
                        step="1"
                      />
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <label class="block text-sm text-gray-300">Pay to Experience ($)</label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        v-model="valueForm.applyValue" 
                        type="number" 
                        class="w-full pl-8 pr-4 py-2 rounded-lg bg-gray-800/80 border border-blue-700/30 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        min="0"
                        step="1"
                      />
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <label class="block text-sm text-gray-300">Pay to Master ($)</label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input 
                        v-model="valueForm.masterValue" 
                        type="number" 
                        class="w-full pl-8 pr-4 py-2 rounded-lg bg-gray-800/80 border border-blue-700/30 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        min="0"
                        step="1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Importance Slider -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-300">
                  How Valuable is This Skill to You: <span class="text-white font-medium">{{ valueForm.importance }}</span>
                </label>
                <input 
                  v-model="valueForm.importance" 
                  type="range" 
                  min="1" 
                  max="10" 
                  class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div class="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                </div>
              </div>
              
              <!-- Comment Box -->
              <div class="space-y-2">
                <label class="block text-sm text-gray-300">Why does this skill matter to you?</label>
                <textarea 
                  v-model="valueForm.comment" 
                  class="w-full px-4 py-2 rounded-lg bg-gray-800/80 border border-blue-700/30 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                  rows="4"
                  placeholder="Explain how this skill would add value..."
                ></textarea>
              </div>
              
              <!-- Submit Buttons -->
              <div class="flex justify-end space-x-4">
                <button 
                  type="button"
                  @click="cancelForm" 
                  class="px-4 py-2 bg-gray-700/60 hover:bg-gray-600/60 rounded-lg transition-colors text-white border border-gray-600/30"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 rounded-lg transition-colors text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  <span>Submit Assessment</span>
                </button>
              </div>
            </form>
          </div>
          
          <!-- Skill Overview -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-white mb-4">Skill Overview</h3>
            
            <div class="space-y-6">
              <!-- Skill Description -->
              <div>
                <h4 class="text-lg font-medium text-blue-300 mb-2">What is {{ selectedSkill.name }}?</h4>
                <p class="text-gray-300">{{ selectedSkill.description }}</p>
              </div>
              
              <!-- How it helps others -->
              <div>
                <h4 class="text-lg font-medium text-blue-300 mb-2">How it helps others</h4>
                <p class="text-gray-300">{{ selectedSkill.helpsOthers }}</p>
              </div>
              
              <!-- Personal development value -->
              <div>
                <h4 class="text-lg font-medium text-blue-300 mb-2">Adding value to your personal development</h4>
                <p class="text-gray-300">{{ selectedSkill.personalValue }}</p>
              </div>
              
              <!-- Skill Metrics -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-blue-800/30">
                  <div class="text-sm text-gray-400 mb-1">Current Envalumental Worth</div>
                  <div class="text-xl font-semibold text-blue-400">${{ formatNumber(selectedSkill.contribution) }}</div>
                </div>
                
                <div class="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-blue-800/30">
                  <div class="text-sm text-gray-400 mb-1">Community rating</div>
                  <div class="text-xl font-semibold text-blue-400">{{ selectedSkill.rating.toFixed(1) }} / 5.0</div>
                </div>
                
                <div class="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-blue-800/30">
                  <div class="text-sm text-gray-400 mb-1">Community demand</div>
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
              
              <!-- User Assessments (if any) -->
              <div v-if="userSkillAssessments[selectedSkill.id] && userSkillAssessments[selectedSkill.id].length > 0">
                <h4 class="text-lg font-medium text-blue-300 mb-3">Khoury's Assessments</h4>
                
                <div class="space-y-4">
                  <div 
                    v-for="(assessment, index) in userSkillAssessments[selectedSkill.id]" 
                    :key="index"
                    class="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-blue-800/30"
                  >
                    <div class="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <div class="text-xs text-gray-500">To Learn</div>
                        <div class="text-blue-400 font-medium">${{ assessment.learnValue }}</div>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500">To Apply</div>
                        <div class="text-blue-400 font-medium">${{ assessment.applyValue }}</div>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500">To Master</div>
                        <div class="text-blue-400 font-medium">${{ assessment.masterValue }}</div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <div class="text-xs text-gray-500">Importance: {{ assessment.importance }}/10</div>
                      <div class="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          class="h-full bg-gradient-to-r from-blue-400 to-cyan-400" 
                          :style="{ width: `${(assessment.importance / 10) * 100}%` }"
                        ></div>
                      </div>
                    </div>
                    <p class="text-sm text-gray-300 mt-2">"{{ assessment.comment }}"</p>
                    <div class="text-xs text-gray-500 mt-2">Added on {{ formatDate(assessment.date) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

// State management
const activeView = ref('list');
const selectedSkill = ref(null);
const formActive = ref(false);
const userSkillAssessments = ref({});

// Value form for assessments
const valueForm = reactive({
  learnValue: 20,
  applyValue: 50,
  masterValue: 100,
  importance: 5,
  comment: ''
});

// Skills data with extended information
const skills = [
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    icon: '🎨',
    category: 'Creative Arts',
    rating: 3.8,
    description: 'Graphic design is the craft of creating visual content to communicate messages. It involves applying visual hierarchy, typography, and strategic layout techniques to solve problems and communicate ideas.',
    helpsOthers: 'Graphic design helps others by translating complex ideas into digestible visual formats, making information more accessible and engaging for diverse audiences.',
    personalValue: 'Mastering graphic design enhances your ability to express ideas visually, which is valuable across many fields from marketing to education. It builds your creative problem-solving skills and attention to detail.',
    contribution: 21500,
    marketDemand: 4
  },
  {
    id: '3d-modeling',
    name: '3D Modeling',
    icon: '💎',
    category: 'Digital Creation',
    rating: 3.5,
    description: '3D modeling is the process of creating a mathematical representation of any object in three dimensions using specialized software, forming the foundation for visual effects, games, architecture, and manufacturing.',
    helpsOthers: "3D modeling helps visualize concepts that would be difficult to express through other means, allowing people to explore digital representations of physical objects before they're created.",
    personalValue: 'Learning 3D modeling develops your spatial reasoning and technical precision. It opens doors to careers in animation, game development, product design, and architectural visualization.',
    contribution: 19800,
    marketDemand: 3
  },
  {
    id: 'ai-llms',
    name: 'AI/LLMs',
    icon: '🤖',
    category: 'Technology',
    rating: 4.5,
    description: 'AI and Large Language Models (LLMs) involve creating and working with intelligent systems that can learn from data, recognize patterns, and make decisions or predictions with minimal human intervention.',
    helpsOthers: 'AI helps automate repetitive tasks, analyze vast amounts of data, and provide insights that would be impossible to discover manually, benefiting fields from healthcare to environmental science.',
    personalValue: 'Understanding AI/LLMs positions you at the forefront of technological innovation. This knowledge can be applied to virtually any field, enhancing your problem-solving capabilities and career prospects.',
    contribution: 38200,
    marketDemand: 5
  },
  {
    id: 'vr-ar',
    name: 'VR/AR Development',
    icon: '🥽',
    category: 'Immersive Technology',
    rating: 4.0,
    description: 'Virtual Reality (VR) and Augmented Reality (AR) development involves creating immersive digital experiences that either replace the real world entirely (VR) or enhance it with digital elements (AR).',
    helpsOthers: 'VR/AR creates new ways to learn, train, and experience environments that might otherwise be inaccessible, dangerous, or nonexistent, revolutionizing education, healthcare, and entertainment.',
    personalValue: 'Developing VR/AR applications builds a diverse skill set including 3D design, programming, and user experience design, preparing you for the future of human-computer interaction.',
    contribution: 32500,
    marketDemand: 4
  },
  {
    id: 'marketing',
    name: 'Marketing Techniques',
    icon: '📈',
    category: 'Business',
    rating: 3.7,
    description: 'Marketing techniques encompass strategies and methods used to identify, create, and maintain satisfying relationships with customers, promoting products or services to target audiences.',
    helpsOthers: 'Effective marketing connects people with solutions to their problems, helping businesses grow while ensuring consumers find products and services that meet their needs.',
    personalValue: 'Marketing skills are versatile and transferable to many contexts, from promoting yourself professionally to launching your own ventures. They enhance your understanding of human psychology and communication.',
    contribution: 24600,
    marketDemand: 4
  },
  {
    id: 'finance',
    name: 'Financial Analysis',
    icon: '💹',
    category: 'Economics',
    rating: 3.9,
    description: 'Financial analysis involves examining financial data to assess performance, make forecasts, and inform decision-making for businesses, investments, and economic planning.',
    helpsOthers: 'Financial analysis helps individuals and organizations make informed decisions about resource allocation, investments, and planning, contributing to financial stability and growth.',
    personalValue: 'Understanding financial analysis improves your personal financial literacy and decision-making. It\'s a highly sought-after skill in business that demonstrates analytical thinking and practical judgment.',
    contribution: 28900,
    marketDemand: 3
  }
];

// Navigation functions
const showSkillDetail = (skill) => {
  selectedSkill.value = skill;
  activeView.value = 'detail';
};

const backToList = () => {
  activeView.value = 'list';
  selectedSkill.value = null;
  formActive.value = false;
};

// Form management
const showAddValueForm = () => {
  formActive.value = true;
  // Reset form values
  valueForm.learnValue = 20;
  valueForm.applyValue = 50;
  valueForm.masterValue = 100;
  valueForm.importance = 5;
  valueForm.comment = '';
};

const cancelForm = () => {
  formActive.value = false;
};

// Handle form submission
const submitAssessment = () => {
  if (!selectedSkill.value) return;
  
  const skillId = selectedSkill.value.id;
  
  // Initialize array for this skill if it doesn't exist
  if (!userSkillAssessments.value[skillId]) {
    userSkillAssessments.value[skillId] = [];
  }
  
  // Add new assessment with current date
  userSkillAssessments.value[skillId].push({
    learnValue: valueForm.learnValue,
    applyValue: valueForm.applyValue,
    masterValue: valueForm.masterValue,
    importance: valueForm.importance,
    comment: valueForm.comment,
    date: new Date()
  });
  
  // Save to localStorage for persistence
  localStorage.setItem('userSkillAssessments', JSON.stringify(userSkillAssessments.value));
  
  // Close the form
  formActive.value = false;
};

// Utility functions
const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Load previously saved assessments
onMounted(() => {
  const savedAssessments = localStorage.getItem('userSkillAssessments');
  if (savedAssessments) {
    userSkillAssessments.value = JSON.parse(savedAssessments);
  }
});
</script>

<style scoped>
.shadow-blue-glow {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Custom slider styling */
input[type="range"]::-webkit-slider-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}

input[type="range"]::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}
</style>