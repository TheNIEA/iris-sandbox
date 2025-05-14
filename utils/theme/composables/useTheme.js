/**
 * Theme composable
 * 
 * Provides theme switching functionality and persists user preference
 */
import { ref, computed, watch, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
import { lightTheme, darkTheme } from '../themes';

export const useTheme = () => {
  // Use local storage to persist theme preference
  const storedTheme = useStorage('user-theme', 'system');
  const currentTheme = ref(storedTheme.value);
  const systemThemeIsDark = ref(false);

  // Computed property to get the actual theme object
  const theme = computed(() => {
    if (currentTheme.value === 'dark' || 
       (currentTheme.value === 'system' && systemThemeIsDark.value)) {
      return darkTheme;
    }
    
    return lightTheme;
  });

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  };

  // Function to set a specific theme
  const setTheme = (themeName) => {
    if (['light', 'dark', 'system'].includes(themeName)) {
      currentTheme.value = themeName;
    }
  };

  // Check if system prefers dark mode
  const checkSystemTheme = () => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      systemThemeIsDark.value = mediaQuery.matches;

      // Listen for changes in system theme
      mediaQuery.addEventListener('change', (e) => {
        systemThemeIsDark.value = e.matches;
      });
    }
  };

  // Watch for theme changes to update the document
  watch(theme, (newTheme) => {
    if (typeof document !== 'undefined') {
      // Remove previous theme class
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      // Add new theme class
      document.documentElement.classList.add(`theme-${newTheme.name}`);
    }
  }, { immediate: true });

  // Initialize on component mount
  onMounted(() => {
    checkSystemTheme();
  });

  return {
    currentTheme,
    theme,
    toggleTheme,
    setTheme,
    isSystemTheme: computed(() => currentTheme.value === 'system'),
    isDarkTheme: computed(() => theme.value.name === 'dark'),
    isLightTheme: computed(() => theme.value.name === 'light')
  };
};