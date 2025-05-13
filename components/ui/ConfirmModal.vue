<template>
  <Modal
    v-model="isOpen"
    :title="title"
    :variant="variant"
    :persistent="persistent"
    :size="size"
    @close="onCancel"
  >
    <div class="text-gray-300">
      <slot>
        {{ message }}
      </slot>
    </div>
    
    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          v-if="showCancelButton"
          @click="onCancel"
          class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
        >
          {{ cancelText }}
        </button>
        <button
          @click="onConfirm"
          :class="[
            'px-4 py-2 rounded text-white transition-colors',
            variant === 'danger' ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
          ]"
        >
          {{ confirmText }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirmation'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'danger', 'warning', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'sm'
  },
  persistent: {
    type: Boolean,
    default: false
  },
  showCancelButton: {
    type: Boolean, 
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

// Sync with v-model
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Handle confirm action
const onConfirm = () => {
  emit('confirm');
  isOpen.value = false;
};

// Handle cancel action
const onCancel = () => {
  emit('cancel');
  isOpen.value = false;
};
</script>