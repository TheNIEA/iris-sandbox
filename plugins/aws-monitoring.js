/**
 * AWS CloudWatch Monitoring Plugin
 * 
 * Initializes error monitoring and logging capabilities
 * during application startup.
 */
import { defineNuxtPlugin } from '#app';
import { setupCloudWatchMonitoring, logger } from '~/aws/cloudwatch-config';

export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client-side
  if (process.client) {
    // Initialize error monitoring
    setTimeout(() => {
      setupCloudWatchMonitoring();
    }, 0);
    
    // Log application start
    logger.info('Application started', { 
      timestamp: new Date().toISOString(),
      appVersion: nuxtApp.$config.public.appVersion || '1.0.0',
      env: nuxtApp.$config.public.appMode || 'unknown'
    });
  }
  
  // Make logger available throughout the app
  return {
    provide: {
      logger
    }
  };
});