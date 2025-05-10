<template>
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
      <!-- Grip area / Icon -->
      <div class="flex items-center justify-center h-full w-8 mr-1 text-white/70 flex-shrink-0">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
         </svg>
      </div>
      <!-- Profile Icon -->
      <div class="h-10 w-10 rounded-full border-2 border-white overflow-hidden mr-3">
        <img 
          :src="profileImage" 
          alt="User Profile" 
          class="h-full w-full object-cover"
        />
      </div>
      <!-- Name -->
      <span class="text-white font-medium whitespace-nowrap text-sm">
        {{ userName }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  userName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  onTabFullyDragged: {
    type: Function,
    default: () => {}
  }
});

const emit = defineEmits(['tab-action']);

const dragContainer = ref(null);
const dragPosition = ref(0); // 0 is default position
const isDragging = ref(false);
const startX = ref(0);
const startDragPos = ref(0);

// Reactive values for drag effect
const maxNegativeDrag = ref(-200); // How far to the left you can drag the tab

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
    // When fully dragged to the left - trigger action
    emit('tab-action');
    // Reset position
    dragPosition.value = 0;
  } else {
    dragPosition.value = 0; // Snap back to initial position
  }
};

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('touchmove', handleDrag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchend', endDrag);
});
</script>

<style scoped>
/* No additional styles needed, all styling is applied through Tailwind classes */
</style>