<template>
  <div class="user-profile-panel w-full max-w-md mx-auto rounded-xl overflow-hidden">
    <!-- Background gradient -->
    <div class="relative bg-gradient-to-b from-blue-900 to-purple-900 p-6 pt-10">
      
      <!-- Profile Header -->
      <div class="flex flex-col items-center mb-6">
        <div class="relative w-24 h-24 mb-4">
          <div class="absolute inset-0 rounded-full bg-blue-500/20 blur-md"></div>
          <img 
            :src="props.profileImage" 
            alt="User Profile" 
            class="w-24 h-24 rounded-full object-cover border-2 border-blue-400 relative z-10"
          />
        </div>
        <h1 class="text-white text-2xl font-bold">{{ props.userName }}</h1>
        <div class="mt-3 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          ${{ formatNumber(props.wealthAmount) }}
        </div>
      </div>
      
      <!-- Rating Indicator -->
      <div class="flex flex-col items-center mb-4">
        <div class="relative w-32 h-32">
          <!-- Outer circle -->
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
              :stroke-dashoffset="calculateDashOffset(45, parseFloat(props.rating) / 5)"
              class="transition-all duration-1000 ease-out"
            >
              <animateTransform 
                attributeName="transform" 
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="60s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          
          <!-- Star decoration inside circle -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="stars-container absolute inset-0">
              <div v-for="i in 5" :key="i" class="absolute star opacity-70"
                :style="{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                  transform: `scale(${0.5 + Math.random() * 0.5})`,
                }"
              >
                ★
              </div>
            </div>
            
            <!-- Rating value -->
            <div class="relative z-10 flex flex-col items-center justify-center">
              <span class="text-3xl font-bold text-white">{{ parseFloat(props.rating).toFixed(1) }}</span>
            </div>
          </div>
        </div>
        <p class="text-blue-300 mt-2">Envalumental Wealth</p>
      </div>
      
      <!-- Skills Button -->
      <div class="flex justify-center mb-6">
        <button 
          @click="$emit('show-skills')" 
          class="flex items-center px-4 py-2 bg-blue-700/50 hover:bg-blue-600/50 rounded-lg text-white transition-colors border border-blue-500/30 mr-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Skill Assessment
        </button>
        
        <NuxtLink 
          to="/skills" 
          class="flex items-center px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg text-white transition-colors border border-blue-500/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Skills Page
        </NuxtLink>
      </div>
      
      <!-- Navigation Bar -->
      <div class="flex justify-around items-center pt-4 pb-2 border-t border-blue-800">
        <button 
          class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
          :class="{ 'text-white': activeTab === 'dashboard' }"
          @click="setActiveTab('dashboard')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs mt-1">Home</span>
        </button>
        <button 
          class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
          :class="{ 'text-white': activeTab === 'documentation' }"
          @click="setActiveTab('documentation')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="text-xs mt-1">Documentation</span>
        </button>
        <button 
          class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
          :class="{ 'text-white': activeTab === 'value' }"
          @click="setActiveTab('value')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs mt-1">Value</span>
        </button>
        <button 
          class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
          :class="{ 'text-white': activeTab === 'profile' }"
          @click="setActiveTab('profile')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-xs mt-1">Profile</span>
        </button>
      </div>
      
      <!-- Position Indicator for Navigation -->
      <div class="flex justify-around items-center">
        <div v-for="(tab, index) in tabs" :key="tab" 
          class="h-1 rounded-full transition-all duration-300 ease-in-out"
          :class="[
            activeTab === tab ? 'w-8 bg-blue-400' : 'w-3 bg-blue-800',
          ]"
        ></div>
      </div>
      
      <!-- Tab Content Panels -->
      <div class="mt-6">
        <!-- Documentation Tab Panel - Assessments List -->
        <div v-if="activeTab === 'documentation'" class="px-2 py-4">
          <h3 class="text-lg font-semibold text-white mb-4">Envalumental Assessments</h3>
          
          <div v-if="assessmentList.length > 0" class="space-y-4">
            <div v-for="(assessment, index) in assessmentList" :key="index" 
              class="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50"
            >
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h4 class="font-medium text-white">{{ assessment.skill }}</h4>
                  <p class="text-sm text-blue-300">by {{ assessment.user }}</p>
                </div>
                <div class="bg-blue-800/50 px-2 py-1 rounded text-sm font-medium text-blue-300">
                  {{ assessment.rating }}/5
                </div>
              </div>
              <div class="mb-2">
                <div class="text-sm text-gray-400 mb-1">Value Assessment</div>
                <div class="flex space-x-3 text-sm">
                  <div>
                    <span class="text-gray-500">Learn:</span>
                    <span class="text-white">${{ assessment.values.learn }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Apply:</span>
                    <span class="text-white">${{ assessment.values.apply }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Master:</span>
                    <span class="text-white">${{ assessment.values.master }}</span>
                  </div>
                </div>
              </div>
              <p class="text-gray-300 text-sm mt-2 italic">
                "{{ assessment.comment }}"
              </p>
              <div class="text-xs text-gray-400 mt-2">
                {{ assessment.date }}
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-8">
            <div class="w-16 h-16 mx-auto bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-gray-400">No assessments available yet</p>
            <NuxtLink to="/skills" class="mt-4 inline-block px-4 py-2 bg-blue-600/50 hover:bg-blue-600/70 rounded-lg text-white text-sm">
              Create an Assessment
            </NuxtLink>
          </div>
        </div>
        
        <!-- Value Tab Content (Previously Wallet) -->
        <div v-if="activeTab === 'value'" class="px-2 py-4">
          <h3 class="text-lg font-semibold text-white mb-4">Value Breakdown</h3>
          
          <div class="space-y-4">
            <div class="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <div class="flex justify-between items-center mb-3">
                <div class="font-medium text-white">Total Envalumental Wealth</div>
                <div class="text-xl font-semibold text-blue-300">${{ formatNumber(props.wealthAmount) }}</div>
              </div>
              <div class="w-full h-1 bg-blue-800/40 rounded-full mb-4"></div>
              
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Skill Contributions</span>
                  <span class="text-white">${{ formatNumber(skillContributionValue) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Knowledge Sharing</span>
                  <span class="text-white">${{ formatNumber(knowledgeSharingValue) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Community Participation</span>
                  <span class="text-white">${{ formatNumber(communityParticipationValue) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Verification Activities</span>
                  <span class="text-white">${{ formatNumber(verificationValue) }}</span>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50">
              <div class="text-sm font-medium text-white mb-2">Recent Activity</div>
              
              <div class="space-y-2">
                <div class="flex justify-between items-center py-1 border-b border-blue-800/30">
                  <div class="text-sm">
                    <div class="text-gray-300">Skill Assessment: VR/AR</div>
                    <div class="text-xs text-gray-500">April 29, 2025</div>
                  </div>
                  <div class="text-green-400">+$3,200</div>
                </div>
                
                <div class="flex justify-between items-center py-1 border-b border-blue-800/30">
                  <div class="text-sm">
                    <div class="text-gray-300">Knowledge Verification</div>
                    <div class="text-xs text-gray-500">April 27, 2025</div>
                  </div>
                  <div class="text-green-400">+$1,400</div>
                </div>
                
                <div class="flex justify-between items-center py-1">
                  <div class="text-sm">
                    <div class="text-gray-300">Community Contribution</div>
                    <div class="text-xs text-gray-500">April 25, 2025</div>
                  </div>
                  <div class="text-green-400">+$600</div>
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
import { ref, computed } from 'vue';

const props = defineProps({
  userName: {
    type: String,
    default: 'Khoury Howell'
  },
  profileImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  wealthAmount: {
    type: [Number, String],
    default: 577900
  },
  rating: {
    type: [Number, String],
    default: 4.0
  }
});

defineEmits(['show-skills']);

// Updated tabs array to reflect new tab names
const tabs = ['dashboard', 'documentation', 'value', 'profile'];
const activeTab = ref('documentation');

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const calculateCircumference = (radius) => {
  return 2 * Math.PI * radius;
};

const calculateDashOffset = (radius, percentage) => {
  const circumference = calculateCircumference(radius);
  return circumference * (1 - percentage);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(parseInt(num));
};

// Sample data for value breakdown
const skillContributionValue = 289500;
const knowledgeSharingValue = 153400;
const communityParticipationValue = 85000;
const verificationValue = 50000;

// Sample assessment data for the documentation tab
const assessmentList = [
  {
    skill: 'Graphic Design',
    user: 'Maya Johnson',
    rating: 4.2,
    values: {
      learn: 25,
      apply: 60,
      master: 120
    },
    comment: 'Essential for visual communication in today\'s digital landscape. I use this daily for my marketing projects.',
    date: 'April 28, 2025'
  },
  {
    skill: '3D Modeling',
    user: 'Alex Chen',
    rating: 3.8,
    values: {
      learn: 35,
      apply: 80,
      master: 150
    },
    comment: 'Crucial for product visualization and VR/AR applications. Takes time to master but worth the investment.',
    date: 'April 25, 2025'
  },
  {
    skill: 'AI/LLMs',
    user: 'Sarah Williams',
    rating: 4.7,
    values: {
      learn: 45,
      apply: 100,
      master: 200
    },
    comment: 'The future of productivity. Learning this has dramatically improved my workflow and problem-solving abilities.',
    date: 'April 22, 2025'
  },
  {
    skill: 'VR/AR Development',
    user: 'Khoury Howell',
    rating: 4.0,
    values: {
      learn: 40,
      apply: 90,
      master: 180
    },
    comment: 'Critical for creating immersive experiences. I believe this will transform education and training in the next decade.',
    date: 'April 20, 2025'
  }
];
</script>

<style scoped>
.user-profile-panel {
  box-shadow: 0 4px 20px rgba(0, 0, 255, 0.2);
}

.star {
  color: #60a5fa;
  font-size: 14px;
  animation: twinkle infinite ease-in-out;
}

@keyframes twinkle {
  0% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}
</style>