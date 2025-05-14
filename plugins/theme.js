/**
 * Theme plugin
 * 
 * Makes theme functionality available globally in the application
 * Applies theme CSS variables and handles theme transitions
 */
import { defineNuxtPlugin, useHead } from '#app';
import { useTheme } from '~/utils/theme/composables/useTheme';

export default defineNuxtPlugin((nuxtApp) => {
  const { theme, currentTheme, setTheme } = useTheme();
  
  // Convert theme object to CSS variables
  const generateCssVariables = (themeObj, prefix = '') => {
    let cssVars = '';
    
    for (const [key, value] of Object.entries(themeObj)) {
      if (typeof value === 'object' && value !== null) {
        // Recursively process nested objects
        cssVars += generateCssVariables(value, `${prefix}${key}-`);
      } else {
        // Add CSS variable
        cssVars += `--${prefix}${key}: ${value};\n`;
      }
    }
    
    return cssVars;
  };
  
  // Generate component-specific semantic variables
  // This allows components to use semantic variables without knowing the theme implementation
  const generateSemanticVariables = () => {
    return `
      /* Component semantic variables */
      --card-bg: var(--surface-default);
      --card-border: var(--border-default);
      --btn-primary-bg: var(--brand-primary);
      --btn-primary-hover: var(--brand-primaryHover);
      --btn-primary-text: var(--text-inverse);
      --input-border: var(--border-default);
      --input-focus: var(--border-focus);
      --tooltip-bg: var(--surface-overlay);
      --tooltip-text: var(--text-primary);
    `;
  };
  
  // Add theme class and CSS variables to document
  useHead({
    htmlAttrs: {
      class: () => `theme-${theme.value.name}`
    },
    style: [{
      children: () => `
        :root {
          /* Base theme transition for smooth theme changes */
          --theme-transition-duration: 0.3s;
          --theme-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
          --theme-transition: var(--theme-transition-duration) var(--theme-transition-timing);
          
          /* Apply theme variables globally regardless of active theme */
          ${generateCssVariables(theme.value)}
          
          /* Semantic component variables */
          ${generateSemanticVariables()}
        }
        
        body {
          background-color: var(--background);
          color: var(--text-primary);
          transition: background-color var(--theme-transition), 
                     color var(--theme-transition),
                     border-color var(--theme-transition),
                     box-shadow var(--theme-transition);
        }
        
        /* Ensure specific theme variables are also available */
        .theme-${theme.value.name} {
          ${generateCssVariables(theme.value)}
        }
        
        /* Apply transitions to common elements for smooth theme changes */
        button, a, input, textarea, select, .card, .modal, .sidebar {
          transition: background-color var(--theme-transition),
                     color var(--theme-transition),
                     border-color var(--theme-transition),
                     box-shadow var(--theme-transition);
        }
      `
    }]
  });

  // Expose theme management to the Vue instance - this is the only way we should provide theme functionality
  return {
    provide: {
      theme,
      currentTheme,
      setTheme
    }
  };
});