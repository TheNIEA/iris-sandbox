/**
 * AWS Integration Plugin
 * 
 * This plugin initializes all AWS-related enhancements:
 * - Error monitoring and logging (CloudWatch)
 * - Performance optimizations
 * - Security measures
 */
import { defineNuxtPlugin } from '#app';
import { setupPerformanceOptimizations, getOptimizedImageUrl } from '~/aws/performance-config';
import { setupSecurityMeasures } from '~/aws/security-config';
import { useConfig } from '~/utils/config/useConfig';

export default defineNuxtPlugin((nuxtApp) => {
  const { isProduction } = useConfig();
  
  // Only run in client-side context
  if (process.client) {
    // Initialize performance optimizations
    setupPerformanceOptimizations();
    
    // Initialize security measures
    setupSecurityMeasures();
    
    // Log initialization
    console.log(`AWS integration initialized in ${isProduction() ? 'production' : 'development'} mode`);
  }
  
  // Make AWS utilities available throughout the app
  return {
    provide: {
      // Image optimization utility
      optimizeImage: getOptimizedImageUrl,
      
      // AWS deployment status
      isAWSDeployed: isProduction
    }
  };
});