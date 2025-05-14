/**
 * Theme definitions
 * 
 * This file contains the actual theme configurations that use the tokens
 * to create complete themes.
 */

import { colorTokens, baseTokens } from './tokens';

// Light theme (default)
export const lightTheme = {
  ...baseTokens,
  
  name: 'light',
  
  // Color scheme
  colors: {
    // Base
    background: colorTokens.white,
    foreground: colorTokens.gray[900],
    
    // Text
    text: {
      primary: colorTokens.gray[900],
      secondary: colorTokens.gray[700],
      tertiary: colorTokens.gray[500],
      disabled: colorTokens.gray[400],
      inverse: colorTokens.white,
    },
    
    // UI Elements
    border: {
      default: colorTokens.gray[200],
      hover: colorTokens.gray[300],
      focus: colorTokens.primary[300],
      disabled: colorTokens.gray[200],
    },
    
    // Interaction states
    state: {
      hover: colorTokens.gray[100],
      pressed: colorTokens.gray[200],
      selected: colorTokens.primary[50],
      disabled: colorTokens.gray[100],
    },
    
    // Divider/separator
    divider: colorTokens.gray[200],
    
    // Surfaces/Cards
    surface: {
      default: colorTokens.white,
      raised: colorTokens.white,
      overlay: colorTokens.white,
      sunken: colorTokens.gray[50],
    },
    
    // Brand colors
    brand: {
      primary: colorTokens.primary[600],
      primaryHover: colorTokens.primary[700],
      primaryActive: colorTokens.primary[800],
      secondary: colorTokens.secondary[600],
      secondaryHover: colorTokens.secondary[700],
      secondaryActive: colorTokens.secondary[800],
      accent: colorTokens.accent[500],
    },
    
    // Semantic colors
    semantic: {
      success: colorTokens.green[600],
      warning: colorTokens.yellow[500],
      error: colorTokens.red[600],
      info: colorTokens.blue[600],
      successLight: colorTokens.green[50],
      warningLight: colorTokens.yellow[50],
      errorLight: colorTokens.red[50],
      infoLight: colorTokens.blue[50],
    },
  },
  
  // Shadow colors are theme-specific
  boxShadowColor: {
    sm: 'rgba(0, 0, 0, 0.05)',
    default: 'rgba(0, 0, 0, 0.1)',
    md: 'rgba(0, 0, 0, 0.1)',
    lg: 'rgba(0, 0, 0, 0.15)',
    xl: 'rgba(0, 0, 0, 0.2)',
  },
};

// Dark theme
export const darkTheme = {
  ...baseTokens,
  
  name: 'dark',
  
  // Color scheme
  colors: {
    // Base
    background: colorTokens.gray[900],
    foreground: colorTokens.gray[100],
    
    // Text
    text: {
      primary: colorTokens.gray[100],
      secondary: colorTokens.gray[300],
      tertiary: colorTokens.gray[400],
      disabled: colorTokens.gray[600],
      inverse: colorTokens.gray[900],
    },
    
    // UI Elements
    border: {
      default: colorTokens.gray[700],
      hover: colorTokens.gray[600],
      focus: colorTokens.primary[700],
      disabled: colorTokens.gray[800],
    },
    
    // Interaction states
    state: {
      hover: colorTokens.gray[800],
      pressed: colorTokens.gray[700],
      selected: colorTokens.primary[900],
      disabled: colorTokens.gray[800],
    },
    
    // Divider/separator
    divider: colorTokens.gray[700],
    
    // Surfaces/Cards
    surface: {
      default: colorTokens.gray[800],
      raised: colorTokens.gray[800],
      overlay: colorTokens.gray[800],
      sunken: colorTokens.gray[850] || '#18181b', // Fallback if gray[850] is not defined
    },
    
    // Brand colors
    brand: {
      primary: colorTokens.primary[400],
      primaryHover: colorTokens.primary[300],
      primaryActive: colorTokens.primary[200],
      secondary: colorTokens.secondary[400],
      secondaryHover: colorTokens.secondary[300],
      secondaryActive: colorTokens.secondary[200],
      accent: colorTokens.accent[400],
    },
    
    // Semantic colors
    semantic: {
      success: colorTokens.green[400],
      warning: colorTokens.yellow[400],
      error: colorTokens.red[400],
      info: colorTokens.blue[400],
      successLight: colorTokens.green[900],
      warningLight: colorTokens.yellow[900],
      errorLight: colorTokens.red[900],
      infoLight: colorTokens.blue[900],
    },
  },
  
  // Shadow colors are theme-specific
  boxShadowColor: {
    sm: 'rgba(0, 0, 0, 0.3)',
    default: 'rgba(0, 0, 0, 0.4)',
    md: 'rgba(0, 0, 0, 0.5)',
    lg: 'rgba(0, 0, 0, 0.6)',
    xl: 'rgba(0, 0, 0, 0.7)',
  },
};