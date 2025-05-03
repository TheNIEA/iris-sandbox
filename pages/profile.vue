<template>
  <div class="min-h-screen bg-gray-900 py-12 px-4">
    <div class="max-w-md mx-auto">
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
      
      <!-- 
      <div class="mt-8 p-6 bg-gray-800 rounded-xl text-white" v-if="currentView === 'profile'">
        <h2 class="text-xl font-bold mb-4">About Envalumental Wealth</h2>
        <p class="text-gray-300 mb-4">
          Your Envalumental Wealth score represents the value of your contributions to the NIEA knowledge ecosystem. 
          As you share information, verify data, and participate in the community, your wealth grows.
        </p>
        <p class="text-gray-300">
          The rating system (4.0/5.0) reflects the quality and impact of your contributions, 
          influencing your wealth multiplier for future activities.
        </p>
        
        <div class="mt-6">
          <button 
            @click="showSkillsView()"
            class="w-full py-3 px-4 bg-blue-700 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors flex items-center justify-center"
          >
            <span>View My Skills</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    -->
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
</style>