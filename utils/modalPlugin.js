import { createApp, defineComponent, h, ref, nextTick } from 'vue';
import AlertModal from '../components/ui/AlertModal.vue';
import ConfirmModal from '../components/ui/ConfirmModal.vue';

// Only initialize the container in client-side environments
let modalContainer = null;

// Initialize modal container only in browser environment
if (process.client) {
  modalContainer = (() => {
    const container = document.createElement('div');
    container.id = 'modal-container';
    document.body.appendChild(container);
    return container;
  })();
}

// A simple counter to generate unique IDs for modals
let modalCounter = 0;

/**
 * Creates a modal instance and mounts it to the DOM
 * @param {Object} options - Configuration options for the modal
 * @param {Object} ModalComponent - The modal component to use
 * @returns {Object} Modal instance with functions to control it
 */
const createModalInstance = (options, ModalComponent) => {
  // Only proceed in client-side environment
  if (!process.client) {
    return {
      open: () => console.warn('Attempting to open modal in non-browser environment'),
      close: () => console.warn('Attempting to close modal in non-browser environment')
    };
  }
  
  const modalId = `modal-${++modalCounter}`;
  
  // Create a Vue instance for the modal
  const ModalInstance = defineComponent({
    setup() {
      const isOpen = ref(false);
      
      // Combine default and user-provided options
      const modalProps = {
        ...options,
        modelValue: isOpen
      };
      
      return () => h(ModalComponent, {
        ...modalProps,
        'onUpdate:modelValue': (val) => {
          isOpen.value = val;
          if (!val) {
            // Handle modal closure
            setTimeout(() => {
              app.unmount();
              const modalEl = document.getElementById(modalId);
              if (modalEl) modalEl.remove();
              
              if (options.onClose) options.onClose();
            }, 300); // Wait for transition to finish
          }
        },
        onClose: () => {
          if (options.onClose) options.onClose();
        },
        onConfirm: () => {
          if (options.onConfirm) options.onConfirm();
        },
        onCancel: () => {
          if (options.onCancel) options.onCancel();
        }
      });
    }
  });
  
  // Create modal container element
  const modalElement = document.createElement('div');
  modalElement.id = modalId;
  modalContainer.appendChild(modalElement);
  
  // Mount the Vue component to the container
  const app = createApp(ModalInstance);
  app.mount(modalElement);
  
  // Return controller object
  return {
    open: () => {
      nextTick(() => {
        const instance = app._instance.proxy;
        instance.isOpen = true;
      });
    },
    close: () => {
      nextTick(() => {
        const instance = app._instance.proxy;
        instance.isOpen = false;
      });
    }
  };
};

// Main modal service object
const ModalService = {
  // Alert modal
  alert(options) {
    if (!process.client) return { close: () => {} };
    
    if (typeof options === 'string') {
      options = { message: options };
    }
    
    const instance = createModalInstance(options, AlertModal);
    instance.open();
    return instance;
  },
  
  // Success alert
  success(options) {
    if (!process.client) return { close: () => {} };
    
    if (typeof options === 'string') {
      options = { message: options };
    }
    
    return this.alert({
      title: 'Success',
      variant: 'success',
      ...options
    });
  },
  
  // Error alert
  error(options) {
    if (!process.client) return { close: () => {} };
    
    if (typeof options === 'string') {
      options = { message: options };
    }
    
    return this.alert({
      title: 'Error',
      variant: 'danger',
      ...options
    });
  },
  
  // Warning alert
  warning(options) {
    if (!process.client) return { close: () => {} };
    
    if (typeof options === 'string') {
      options = { message: options };
    }
    
    return this.alert({
      title: 'Warning',
      variant: 'warning',
      ...options
    });
  },
  
  // Info alert
  info(options) {
    if (!process.client) return { close: () => {} };
    
    if (typeof options === 'string') {
      options = { message: options };
    }
    
    return this.alert({
      title: 'Information',
      variant: 'info',
      ...options
    });
  },
  
  // Confirmation modal
  confirm(options) {
    if (!process.client) return Promise.resolve(false);
    
    if (typeof options === 'string') {
      options = { message: options };
    }
    
    return new Promise((resolve) => {
      const instance = createModalInstance({
        ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
        onClose: () => resolve(false)
      }, ConfirmModal);
      
      instance.open();
    });
  },
  
  // Prompt modal
  prompt(options) {
    // Implementation for a prompt modal would go here
    // This would be similar to confirm but with an input field
    if (!process.client) return Promise.resolve(null);
  }
};

// Vue plugin for modals
export default {
  install(app) {
    // Only register the plugin in client-side environment
    if (process.client) {
      app.config.globalProperties.$modal = ModalService;
      app.provide('modal', ModalService);
    } else {
      // Provide a no-op version for SSR
      const noopService = {
        alert: () => ({ close: () => {} }),
        success: () => ({ close: () => {} }),
        error: () => ({ close: () => {} }),
        warning: () => ({ close: () => {} }),
        info: () => ({ close: () => {} }),
        confirm: () => Promise.resolve(false),
        prompt: () => Promise.resolve(null)
      };
      
      app.config.globalProperties.$modal = noopService;
      app.provide('modal', noopService);
    }
  }
};

// Export the service for direct usage
export { ModalService };