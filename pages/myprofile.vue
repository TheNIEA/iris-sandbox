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