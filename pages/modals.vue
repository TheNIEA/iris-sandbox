<template>
  <div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">Modal System Demo</h1>
        <p class="text-lg text-gray-300">A comprehensive and reusable modal system for your application</p>
      </div>

      <!-- Demo Sections -->
      <div class="space-y-12">
        <!-- Basic Modals Section -->
        <section class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 shadow-lg">
          <h2 class="text-2xl font-bold text-blue-400 mb-6">Basic Modals</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Component-based Modal -->
            <div class="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
              <h3 class="text-xl font-semibold text-white mb-4">Component-based Modal</h3>
              <p class="text-gray-300 mb-6">Use modals directly in your components with v-model</p>
              
              <button @click="showComponentModal = true" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white transition-colors">
                Open Component Modal
              </button>
              
              <Modal v-model="showComponentModal" title="Component Modal" size="md">
                <p class="text-gray-300">This modal is used directly in the template with v-model binding.</p>
                <p class="text-gray-300 mt-2">Use this approach when you need tight integration with your component's state.</p>
              </Modal>
            </div>
            
            <!-- Programmatic Modal -->
            <div class="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
              <h3 class="text-xl font-semibold text-white mb-4">Programmatic Modal</h3>
              <p class="text-gray-300 mb-6">Show modals from your code using the modal service</p>
              
              <button @click="openProgrammaticModal" class="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md text-white transition-colors">
                Open Programmatic Modal
              </button>
            </div>
          </div>
        </section>
        
        <!-- Alert Modals Section -->
        <section class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 shadow-lg">
          <h2 class="text-2xl font-bold text-blue-400 mb-6">Alert Modals</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button @click="showSuccessModal" class="p-4 bg-green-900/40 hover:bg-green-800/40 border border-green-700/30 rounded-lg text-white transition-colors">
              Success Modal
            </button>
            
            <button @click="showErrorModal" class="p-4 bg-red-900/40 hover:bg-red-800/40 border border-red-700/30 rounded-lg text-white transition-colors">
              Error Modal
            </button>
            
            <button @click="showWarningModal" class="p-4 bg-amber-900/40 hover:bg-amber-800/40 border border-amber-700/30 rounded-lg text-white transition-colors">
              Warning Modal
            </button>
            
            <button @click="showInfoModal" class="p-4 bg-cyan-900/40 hover:bg-cyan-800/40 border border-cyan-700/30 rounded-lg text-white transition-colors">
              Info Modal
            </button>
          </div>
        </section>
        
        <!-- Confirmation Modals Section -->
        <section class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 shadow-lg">
          <h2 class="text-2xl font-bold text-blue-400 mb-6">Confirmation Modals</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Confirm -->
            <div class="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
              <h3 class="text-xl font-semibold text-white mb-4">Basic Confirmation</h3>
              <p class="text-gray-300 mb-6">Simple confirm dialog with promise-based response</p>
              
              <button @click="showBasicConfirm" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white transition-colors">
                Show Confirmation
              </button>
              
              <p v-if="confirmResult !== null" class="mt-4 p-3 rounded-md" :class="confirmResult ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'">
                User {{ confirmResult ? 'confirmed' : 'cancelled' }} the action
              </p>
            </div>
            
            <!-- Danger Confirm -->
            <div class="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
              <h3 class="text-xl font-semibold text-white mb-4">Danger Confirmation</h3>
              <p class="text-gray-300 mb-6">Confirm dialog for critical actions with custom styling</p>
              
              <button @click="showDangerConfirm" class="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md text-white transition-colors">
                Delete Something
              </button>
              
              <ConfirmModal
                v-model="showConfirmModal"
                title="Delete Confirmation"
                message="Are you sure you want to delete this item? This action cannot be undone."
                confirm-text="Delete"
                cancel-text="Cancel"
                variant="danger"
                @confirm="handleConfirm"
                @cancel="handleCancel"
              />
            </div>
          </div>
        </section>
        
        <!-- Custom Sized Modals -->
        <section class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 shadow-lg">
          <h2 class="text-2xl font-bold text-blue-400 mb-6">Custom Sized Modals</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button @click="openSizedModal('sm')" class="p-4 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 rounded-lg text-white transition-colors">
              Small Modal
            </button>
            
            <button @click="openSizedModal('md')" class="p-4 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 rounded-lg text-white transition-colors">
              Medium Modal
            </button>
            
            <button @click="openSizedModal('lg')" class="p-4 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 rounded-lg text-white transition-colors">
              Large Modal
            </button>
            
            <button @click="openSizedModal('xl')" class="p-4 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 rounded-lg text-white transition-colors">
              XL Modal
            </button>
            
            <button @click="openSizedModal('2xl')" class="p-4 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 rounded-lg text-white transition-colors">
              2XL Modal
            </button>
            
            <button @click="openSizedModal('full')" class="p-4 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 rounded-lg text-white transition-colors">
              Full Width Modal
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '~/components/ui/Modal.vue';
import ConfirmModal from '~/components/ui/ConfirmModal.vue';
import AlertModal from '~/components/ui/AlertModal.vue';
import { useModal } from '~/utils/useModal';

// Component-based modal state
const showComponentModal = ref(false);

// Confirmation modal state
const showConfirmModal = ref(false);
const confirmResult = ref(null);

// Get modal service via composable
const { alert, success, error, warning, info, confirm, modal } = useModal();

// Open a modal programmatically
const openProgrammaticModal = () => {
  modal.alert({
    title: 'Programmatic Modal',
    message: 'This modal was opened programmatically from your code. No template required!',
    variant: 'default'
  });
};

// Show different alert types
const showSuccessModal = () => {
  success({
    title: 'Operation Successful',
    message: 'The operation was completed successfully.',
    buttonText: 'Great!'
  });
};

const showErrorModal = () => {
  error({
    message: 'An error occurred while processing your request.',
    buttonText: 'Try Again'
  });
};

const showWarningModal = () => {
  warning({
    message: 'This action might have unexpected consequences.',
    buttonText: 'I Understand'
  });
};

const showInfoModal = () => {
  info({
    message: 'Your session will expire in 5 minutes.',
    buttonText: 'Got It'
  });
};

// Show basic confirmation modal
const showBasicConfirm = async () => {
  confirmResult.value = await confirm({
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed with this action?'
  });
};

// Show danger confirmation modal
const showDangerConfirm = () => {
  showConfirmModal.value = true;
};

const handleConfirm = () => {
  confirmResult.value = true;
};

const handleCancel = () => {
  confirmResult.value = false;
};

// Open modals with different sizes
const openSizedModal = (size) => {
  modal.alert({
    title: `${size.toUpperCase()} Modal`,
    message: `This is a ${size} sized modal example.`,
    size: size
  });
};
</script>