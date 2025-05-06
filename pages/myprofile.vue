<template>
  <div class="min-h-screen bg-gray-900 py-12 px-4 relative">
    <div class="max-w-md mx-auto">
      <!-- Main Profile Content -->
      <UserProfilePanel 
        ref="profilePanelRef"
        userName="Khoury Howell"
        :wealthAmount="577900"
        :rating="4.0"
        profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        @show-skills="showSkillsPanel"
      />
    </div>

    <!-- Draggable Tab (Positioned fixed on the screen) -->
    <div
      ref="dragContainer"
      class="fixed top-1/4 right-2 transform -translate-y-1/2 z-30 cursor-grab active:cursor-grabbing"
      :class="{ 'transition-transform duration-300 ease-out': !isDragging }"
      :style="{ transform: `translateX(${dragPosition}px)` }"
      @mousedown="startDrag"
      @touchstart.prevent="startDrag"
    >
      <!-- The Rounded Rectangle Tab -->
      <div class="flex items-center h-16 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-l-xl shadow-lg pl-3 pr-4">
        <!-- Profile Icon -->
        <div class="h-10 w-10 rounded-full border-2 border-white overflow-hidden mr-3">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User Profile" 
            class="h-full w-full object-cover"
          />
        </div>
        <!-- Name -->
        <span class="text-white font-medium whitespace-nowrap text-sm">
          Khoury Howell
        </span>
      </div>
    </div>

    <!-- Sliding Panel Container -->
    <div 
      class="sliding-panel fixed top-0 right-0 bottom-0 w-full max-w-md bg-gray-950 shadow-2xl z-50 transition-transform duration-500 ease-in-out"
      :class="{ 'translate-x-0': isPanelOpen, 'translate-x-full': !isPanelOpen }"
    >
      <!-- Panel Close Button -->
      <button
        @click="closePanel"
        class="absolute top-5 left-5 z-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <!-- Dynamic Panel Content -->
      <transition name="fade" mode="out-in">
        <SkillsAssessmentPanel 
          v-if="panelView === 'skills'"
          :initialSkillId="currentSkillId"
          @back="closePanel"
        />
      </transition>
    </div>

    <!-- Panel Backdrop -->
    <div 
      v-if="isPanelOpen"
      class="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
      @click="closePanel"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import UserProfilePanel from '~/components/profile/UserProfilePanel.vue';
import SkillsAssessmentPanel from '~/components/profile/SkillsAssessmentPanel.vue';

// State variables for sliding panel
const isPanelOpen = ref(false);
const panelView = ref(null);
const currentSkillId = ref('vr-ar');
const profilePanelRef = ref(null);

// State for draggable tab
const dragContainer = ref(null);
const dragPosition = ref(0); // 0 is default position
const isDragging = ref(false);
const startX = ref(0);
const startDragPos = ref(0);

// Reactive values for drag effect
const maxNegativeDrag = ref(-200); // How far to the left you can drag the tab

// Handle opening skills panel
const showSkillsPanel = (skillId = 'vr-ar') => {
  currentSkillId.value = skillId;
  panelView.value = 'skills';
  isPanelOpen.value = true;
};

// Close sliding panel
const closePanel = () => {
  isPanelOpen.value = false;
};

// Setup dragging functionality
const startDrag = (event) => {
  isDragging.value = true;
  document.body.style.userSelect = 'none'; // Prevent text selection while dragging
  
  // Get starting positions
  startX.value = event.clientX || event.touches[0].clientX;
  startDragPos.value = dragPosition.value;
  
  // Add event listeners for drag movement and end
  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('touchmove', handleDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
};

const handleDrag = (event) => {
  if (!isDragging.value) return;
  
  // Calculate new position
  const clientX = event.clientX || event.touches[0].clientX;
  const deltaX = clientX - startX.value;
  let newPosition = startDragPos.value + deltaX;
  
  // Apply constraints to the drag position
  newPosition = Math.min(0, Math.max(maxNegativeDrag.value, newPosition));
  
  dragPosition.value = newPosition;
};

const endDrag = () => {
  isDragging.value = false;
  document.body.style.userSelect = '';
  
  // Remove event listeners
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('touchmove', handleDrag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchend', endDrag);
  
  // Snap to either fully revealed or fully hidden
  if (dragPosition.value < maxNegativeDrag.value * 0.4) {
    // When fully dragged to the left
    // Instead of showing the mockup, we can navigate to another page or show a panel
    // For now, let's just snap it back
    dragPosition.value = 0;
  } else {
    dragPosition.value = 0; // Snap back to initial position
  }
};

// Reset panel view when panel closes
watch(isPanelOpen, (isOpen) => {
  if (!isOpen) {
    // Set timeout to match the transition duration
    setTimeout(() => {
      if (!isPanelOpen.value) {
        panelView.value = null;
      }
    }, 500);
  }
});

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('touchmove', handleDrag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchend', endDrag);
});
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

/* Add responsive styles for the sliding panel */
@media (min-width: 768px) {
  .sliding-panel {
    max-width: 420px;
  }
}

/* Animation for particles */
@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-10px) scale(1.1);
    opacity: 1;
  }
}
</style>