/**
 * AWS CloudWatch Configuration
 * 
 * This file provides utilities for logging, monitoring, and error tracking
 * when the application is deployed to AWS.
 */

import { useConfig } from '~/utils/config/useConfig';

// Set up error tracking and logging
export const setupCloudWatchMonitoring = () => {
  const { isProduction, isDevelopment, aws } = useConfig();
  
  // Only enable in non-development environments, or if explicitly configured
  if (!isDevelopment() || process.env.NUXT_PUBLIC_FORCE_MONITORING === 'true') {
    // Define the log group and stream names
    const logGroupName = `mayo-test-sandbox-${process.env.NUXT_PUBLIC_APP_MODE}`;
    const logStreamName = `frontend-logs-${new Date().toISOString().split('T')[0]}`;
    
    // Set up error handler
    window.addEventListener('error', (event) => {
      const errorDetails = {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error ? event.error.stack : undefined,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };
      
      console.error('Application error:', errorDetails);
      
      // In a real implementation, this would send to CloudWatch
      // Using AWS SDK or a serverless function
      if (isProduction()) {
        sendErrorToCloudWatch(errorDetails, logGroupName, logStreamName);
      }
    });
    
    // Set up unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      const rejectionDetails = {
        message: event.reason ? event.reason.message : 'Unknown promise rejection',
        stack: event.reason ? event.reason.stack : undefined,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };
      
      console.error('Unhandled promise rejection:', rejectionDetails);
      
      // In a real implementation, this would send to CloudWatch
      if (isProduction()) {
        sendErrorToCloudWatch(rejectionDetails, logGroupName, logStreamName);
      }
    });
    
    console.log(`CloudWatch monitoring initialized for ${logGroupName}`);
  }
};

// Function to send errors to CloudWatch
const sendErrorToCloudWatch = async (errorData, logGroupName, logStreamName) => {
  try {
    // In a production implementation, you would use AWS SDK or serverless function
    // to send logs to CloudWatch
    // This is a placeholder for the actual implementation
    
    // Example implementation using a serverless function:
    const response = await fetch('/api/log-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        logGroupName,
        logStreamName,
        message: JSON.stringify(errorData),
        timestamp: new Date().getTime(),
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to send error to CloudWatch:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending log to CloudWatch:', error);
  }
};

// Custom logger that sends to CloudWatch in production
export const logger = {
  info: (message, data = {}) => {
    console.info(message, data);
    logToCloudWatch('INFO', message, data);
  },
  warn: (message, data = {}) => {
    console.warn(message, data);
    logToCloudWatch('WARN', message, data);
  },
  error: (message, data = {}) => {
    console.error(message, data);
    logToCloudWatch('ERROR', message, data);
  },
  debug: (message, data = {}) => {
    console.debug(message, data);
    // Only log debug messages to CloudWatch in non-production or if debug is enabled
    const { isProduction, features } = useConfig();
    if (!isProduction() || features.debugMode) {
      logToCloudWatch('DEBUG', message, data);
    }
  },
}

// Helper function to send logs to CloudWatch
const logToCloudWatch = (level, message, data) => {
  const { isProduction } = useConfig();
  
  // Only send to CloudWatch in production
  if (isProduction()) {
    try {
      // In a real implementation, this would send to CloudWatch
      // This is just a placeholder
      const logData = {
        level,
        message,
        data,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : 'server-side',
      };
      
      // Actual implementation would go here
    } catch (error) {
      console.error('Failed to send log to CloudWatch:', error);
    }
  }
};