<template>
  <Teleport to="body">
    <transition
      name="modal"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        @click="onBackdropClick"
        @keydown.esc="close"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
      >
        <!-- Backdrop with blur effect -->
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>
        
        <!-- Modal container -->
        <div
          ref="modalRef"
          class="relative z-10 w-full max-w-md transform transition-all"
          :class="[
            size === 'sm' && 'max-w-sm',
            size === 'md' && 'max-w-md',
            size === 'lg' && 'max-w-lg',
            size === 'xl' && 'max-w-xl',
            size === '2xl' && 'max-w-2xl',
            size === 'full' && 'max-w-full mx-4',
          ]"
          @click.stop
        >
          <!-- Modal content with customizable styles -->
          <div 
            class="relative overflow-hidden rounded-xl border shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            :class="[
              variant === 'default' && 'bg-gradient-to-b from-gray-900 via-blue-950/90 to-purple-950/90 border-blue-500/30',
              variant === 'success' && 'bg-gradient-to-b from-gray-900 to-green-950/90 border-green-500/40',
              variant === 'danger' && 'bg-gradient-to-b from-gray-900 to-red-950/90 border-red-500/40',
              variant === 'warning' && 'bg-gradient-to-b from-gray-900 to-amber-950/90 border-amber-500/40',
              variant === 'info' && 'bg-gradient-to-b from-gray-900 to-cyan-950/90 border-cyan-500/40',
            ]"
          >
            <!-- Header section with title and close button -->
            <header v-if="$slots.header || title" class="flex items-center justify-between p-6 pb-0">
              <slot name="header">
                <h2 :id="titleId" class="text-xl font-bold" :class="textColorClass">{{ title }}</h2>
              </slot>
              
              <button
                v-if="showClose"
                @click="close"
                class="p-1 rounded-full hover:bg-gray-800/40 transition-colors text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </header>
            
            <!-- Main content area -->
            <div class="p-6 space-y-4">
              <slot></slot>
            </div>
            
            <!-- Footer section for buttons -->
            <footer v-if="$slots.footer" class="p-6 pt-0">
              <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useId } from '../../utils/composables'; // We'll create this utility later

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'danger', 'warning', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', '2xl', 'full'].includes(value)
  },
  persistent: {
    type: Boolean,
    default: false
  },
  showClose: {
    type: Boolean,
    default: true
  },
  escToClose: {
    type: Boolean,
    default: true
  },
  clickOutsideToClose: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'close', 'after-enter', 'after-leave']);

const modalRef = ref(null);
const titleId = useId('modal-title');
const previousActiveElement = ref(null);

// Computed text color based on variant
const textColorClass = computed(() => {
  const variantMap = {
    'default': 'text-blue-300',
    'success': 'text-green-300',
    'danger': 'text-red-300',
    'warning': 'text-amber-300',
    'info': 'text-cyan-300'
  };
  
  return variantMap[props.variant] || 'text-blue-300';
});

// Close the modal
const close = async () => {
  if (props.beforeClose) {
    const canClose = await props.beforeClose();
    if (!canClose) return;
  }
  
  emit('update:modelValue', false);
  emit('close');
};

// Handle backdrop click
const onBackdropClick = () => {
  if (props.clickOutsideToClose && !props.persistent) {
    close();
  }
};

// Focus management and accessibility
const trapFocus = (event) => {
  if (!modalRef.value || !props.modelValue) return;
  
  const focusable = modalRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];
  
  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }
  
  if (event.key === 'Escape' && props.escToClose && !props.persistent) {
    close();
  }
};

// Event handlers for the transition
const onAfterEnter = () => {
  emit('after-enter');
  nextTick(() => {
    // Store the current active element
    previousActiveElement.value = document.activeElement;
    
    // Focus the first focusable element in the modal
    if (modalRef.value) {
      const focusable = modalRef.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length) {
        focusable[0].focus();
      } else {
        modalRef.value.focus();
      }
    }
  });
};

const onAfterLeave = () => {
  emit('after-leave');
  
  // Restore focus to the previously active element
  if (previousActiveElement.value) {
    previousActiveElement.value.focus();
  }
};

// Setup event listeners
onMounted(() => {
  document.addEventListener('keydown', trapFocus);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', trapFocus);
});

// Prevent body scrolling when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
}, { immediate: true });
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Apply additional styles for persistent modals */
.modal-persistent {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}
</style>