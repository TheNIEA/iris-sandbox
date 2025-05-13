/**
 * Composable utilities for Vue components
 */

import { ref, onMounted, onUnmounted } from 'vue';

// Counter for generating unique IDs
let idCounter = 0;

/**
 * Generates a unique ID with an optional prefix
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} A unique ID string
 */
export function useId(prefix = 'id') {
  const id = ref(`${prefix}-${++idCounter}`);
  return id.value;
}

/**
 * Manages a collection of modals with stacking support
 * @returns {Object} Modal management functions and state
 */
export function useModalManager() {
  const openModals = ref(new Set());
  
  // Add a modal to the stack
  const registerModal = (id) => {
    openModals.value.add(id);
  };
  
  // Remove a modal from the stack
  const unregisterModal = (id) => {
    openModals.value.delete(id);
  };
  
  // Check if a modal is active (top of the stack)
  const isTopModal = (id) => {
    const modals = Array.from(openModals.value);
    return modals.length > 0 && modals[modals.length - 1] === id;
  };
  
  // Get the current modal stack size
  const stackSize = () => {
    return openModals.value.size;
  };
  
  // Calculate z-index based on stack position
  const getZIndex = (id) => {
    const baseZIndex = 50;
    const modals = Array.from(openModals.value);
    const position = modals.indexOf(id);
    return position >= 0 ? baseZIndex + position : baseZIndex;
  };
  
  return {
    registerModal,
    unregisterModal,
    isTopModal,
    stackSize,
    getZIndex,
    openModals
  };
}

/**
 * Creates a debounced version of a function
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function useDebounce(fn, delay) {
  let timeout;
  
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Hook for detecting clicks outside an element
 * @param {Function} callback - Function to call when clicked outside
 * @returns {Object} ref to add to the element
 */
export function useClickOutside(callback) {
  const element = ref(null);
  
  const handleClick = (event) => {
    if (element.value && !element.value.contains(event.target)) {
      callback(event);
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClick);
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClick);
  });
  
  return element;
}