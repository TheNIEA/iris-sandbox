<template>
  <Modal
    v-model="isOpen"
    :title="title"
    :variant="variant"
    :persistent="persistent"
    :size="size"
    @close="onClose"
  >
    <div class="flex items-start space-x-4">
      <!-- Icon based on variant -->
      <div v-if="showIcon" class="flex-shrink-0">
        <!-- Success Icon -->
        <svg v-if="variant === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <!-- Error Icon -->
        <svg v-else-if="variant === 'danger'" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <!-- Warning Icon -->
        <svg v-else-if="variant === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        
        <!-- Info Icon -->
        <svg v-else-if="variant === 'info'" xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <!-- Default Icon -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <!-- Message content -->
      <div class="text-gray-300">
        <slot>
          {{ message }}
        </slot>
      </div>
    </div>
    
    <template #footer>
      <div class="flex justify-end">
        <button
          @click="onClose"
          class="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
        >
          {{ buttonText }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { computed, watch, onBeforeUnmount } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'OK'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'danger', 'warning', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'sm'
  },
  persistent: {
    type: Boolean,
    default: false
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0 // 0 means no auto close
  }
});

const emit = defineEmits(['update:modelValue', 'close']);

// Sync with v-model
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Handle close action
const onClose = () => {
  emit('close');
  isOpen.value = false;
};

// Set up auto close timer if specified
if (props.autoClose > 0) {
  let timer;
  
  watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
      // Clear any existing timer
      if (timer) clearTimeout(timer);
      
      // Set new timer
      timer = setTimeout(() => {
        onClose();
      }, props.autoClose);
    } else if (timer) {
      clearTimeout(timer);
    }
  }, { immediate: true });
  
  onBeforeUnmount(() => {
    if (timer) clearTimeout(timer);
  });
}
</script>