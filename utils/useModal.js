import { inject } from 'vue';
import { ModalService } from './modalPlugin';

/**
 * Composable for accessing modal functionality within components
 * @returns {Object} Modal functions and utilities
 */
export function useModal() {
  // Try to get the injected modal service, otherwise use the imported one
  const modal = inject('modal', ModalService);
  
  return {
    // Show an alert modal with a message
    alert: (options) => modal.alert(options),
    
    // Show a success modal
    success: (options) => modal.success(options),
    
    // Show an error modal
    error: (options) => modal.error(options),
    
    // Show a warning modal
    warning: (options) => modal.warning(options),
    
    // Show an info modal
    info: (options) => modal.info(options),
    
    // Show a confirmation modal that returns a promise
    confirm: (options) => modal.confirm(options),
    
    // General modal service reference
    modal
  };
}