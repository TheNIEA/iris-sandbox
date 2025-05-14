<template>
  <div class="theme-toggle">
    <div class="theme-selector">
      <button 
        class="theme-button" 
        :class="{ active: isLightTheme }" 
        @click="setTheme('light')"
        aria-label="Light theme"
      >
        <span class="icon">☀️</span>
        <span class="label">Light</span>
      </button>
      
      <button 
        class="theme-button" 
        :class="{ active: isDarkTheme }" 
        @click="setTheme('dark')"
        aria-label="Dark theme"
      >
        <span class="icon">🌙</span>
        <span class="label">Dark</span>
      </button>
      
      <button 
        class="theme-button" 
        :class="{ active: isSystemTheme }" 
        @click="setTheme('system')"
        aria-label="System theme"
      >
        <span class="icon">⚙️</span>
        <span class="label">System</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '~/utils/theme/composables/useTheme';

const { 
  currentTheme, 
  setTheme, 
  isLightTheme, 
  isDarkTheme, 
  isSystemTheme 
} = useTheme();
</script>

<style scoped>
.theme-toggle {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.theme-selector {
  display: flex;
  background-color: var(--color-surface-02);
  border-radius: var(--radius-md);
  padding: 0.25rem;
}

.theme-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.theme-button:hover {
  background-color: var(--color-surface-03);
  color: var(--color-text-primary);
}

.theme-button.active {
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
}

.icon {
  font-size: 1rem;
}

.label {
  font-weight: var(--font-weight-medium);
}
</style>