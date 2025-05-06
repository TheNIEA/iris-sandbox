<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-purple-950 py-12 px-4 relative overflow-hidden">
    <!-- Wireframe globe background effect - Enlarged to eliminate visible edges -->
    <div class="absolute inset-0 z-0 opacity-40 pointer-events-none wireframe-globe-bg" style="transform-origin: center center; width: 200%; height: 200%; left: -50%; top: -50%;">
      <!-- Horizontal lines - Increased number and spacing adjusted -->
      <div v-for="i in 40" :key="`h-${i}`" class="absolute w-full h-px bg-blue-400/30"
           :style="{ top: `${(i * 2.5)}%` }"></div>
      
      <!-- Vertical lines - Increased number and spacing adjusted -->
      <div v-for="i in 40" :key="`v-${i}`" class="absolute h-full w-px bg-blue-400/30"
           :style="{ left: `${(i * 2.5)}%` }"></div>
      
      <!-- Curved lines to simulate globe effect - Made larger -->
      <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path d="M0,50 Q50,0 100,50 Q50,100 0,50" 
              fill="none" stroke="rgba(59, 130, 246, 0.1)" stroke-width="1"></path>
        <path d="M0,50 Q50,20 100,50 Q50,80 0,50" 
              fill="none" stroke="rgba(59, 130, 246, 0.15)" stroke-width="1"></path>
        <path d="M0,50 Q50,30 100,50 Q50,70 0,50" 
              fill="none" stroke="rgba(59, 130, 246, 0.2)" stroke-width="1"></path>
        <!-- Additional curved lines for a more complete globe effect -->
        <path d="M0,40 Q50,0 100,40 Q50,80 0,40" 
              fill="none" stroke="rgba(59, 130, 246, 0.1)" stroke-width="1"></path>
        <path d="M0,60 Q50,20 100,60 Q50,100 0,60" 
              fill="none" stroke="rgba(59, 130, 246, 0.1)" stroke-width="1"></path>
      </svg>
      
      <!-- Animated dots to represent nodes - Increased number with wider distribution -->
      <div v-for="i in 80" :key="`dot-${i}`" 
           class="absolute rounded-full bg-blue-400/50 animate-floatSlow"
           :style="{
             width: `${2 + Math.random() * 4}px`,
             height: `${2 + Math.random() * 4}px`,
             top: `${Math.random() * 100}%`,
             left: `${Math.random() * 100}%`,
             animationDuration: `${30 + Math.random() * 40}s`,
             animationDelay: `${Math.random() * 10}s`
           }"></div>
    </div>

    <div class="max-w-md mx-auto relative z-10">
      <transition name="fade" mode="out-in">
        <UserProfilePanel 
          v-if="currentView === 'profile'"
          userName="Khoury Howell"
          :wealthAmount="577900"
          :rating="4.0"
          profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          @show-skills="showSkillsView"
        />
        <SkillsAssessmentPanel 
          v-else-if="currentView === 'skills'"
          :initialSkillId="currentSkillId"
          @back="showProfileView"
        />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserProfilePanel from '~/components/profile/UserProfilePanel.vue';
import SkillsAssessmentPanel from '~/components/profile/SkillsAssessmentPanel.vue';

const currentView = ref('profile');
const currentSkillId = ref('vr-ar');

const showProfileView = () => {
  currentView.value = 'profile';
};

const showSkillsView = (skillId = 'vr-ar') => {
  currentSkillId.value = skillId;
  currentView.value = 'skills';
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-floatSlow {
  animation: floatSlow 20s infinite ease-in-out;
}

@keyframes floatSlow {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-15px) translateX(10px);
  }
  50% {
    transform: translateY(-5px) translateX(25px);
  }
  75% {
    transform: translateY(10px) translateX(-15px);
  }
}

.wireframe-globe-bg {
  animation: rotateGlobeBg 180s linear infinite; /* Slowed down rotation for smoother effect */
}

@keyframes rotateGlobeBg {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>