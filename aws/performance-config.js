/**
 * AWS Performance Optimizations
 * 
 * This file contains configuration and utilities for optimizing 
 * the performance of the application when deployed to AWS.
 */

import { useConfig } from '~/utils/config/useConfig';

/**
 * Sets up performance optimization strategies
 */
export const setupPerformanceOptimizations = () => {
  const { isProduction, aws } = useConfig();
  
  if (process.client) {
    // Only apply aggressive optimizations in production
    if (isProduction()) {
      // Implement resource hints for faster loading
      addResourceHints();
      
      // Set up lazy loading for images
      setupLazyLoading();
      
      // Configure service worker for offline caching if supported
      registerServiceWorker();
      
      // Set up performance monitoring
      setupPerformanceMonitoring();
    }
  }
};

/**
 * Adds resource hints to improve loading performance
 */
const addResourceHints = () => {
  if (!process.client) return;
  
  // Preconnect to CloudFront and API domains
  const { aws, apiBaseUrl } = useConfig();
  const domains = [
    aws.cloudfrontUrl, 
    apiBaseUrl,
    'https://fonts.googleapis.com', 
    'https://fonts.gstatic.com'
  ].filter(Boolean);
  
  domains.forEach(domain => {
    if (!domain) return;
    
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
    
    // DNS prefetch as fallback
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = domain;
    document.head.appendChild(dnsLink);
  });
};

/**
 * Sets up lazy loading for images and iframes
 */
const setupLazyLoading = () => {
  if (!process.client) return;
  
  // Use Intersection Observer to lazy load images
  if ('IntersectionObserver' in window) {
    const lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyElement = entry.target;
          
          // Handle different element types
          if (lazyElement.tagName.toLowerCase() === 'img') {
            if (lazyElement.dataset.src) {
              lazyElement.src = lazyElement.dataset.src;
              delete lazyElement.dataset.src;
            }
          } else if (lazyElement.tagName.toLowerCase() === 'iframe') {
            if (lazyElement.dataset.src) {
              lazyElement.src = lazyElement.dataset.src;
              delete lazyElement.dataset.src;
            }
          }
          
          lazyLoadObserver.unobserve(lazyElement);
        }
      });
    });
    
    // Observe all elements with data-src attribute
    document.querySelectorAll('[data-src]').forEach(element => {
      lazyLoadObserver.observe(element);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    // Simply load all images
    document.querySelectorAll('[data-src]').forEach(element => {
      if (element.dataset.src) {
        element.src = element.dataset.src;
      }
    });
  }
};

/**
 * Registers a service worker for offline caching
 */
const registerServiceWorker = () => {
  if (!process.client) return;
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
    });
  }
};

/**
 * Sets up performance monitoring using Web Vitals
 */
const setupPerformanceMonitoring = () => {
  if (!process.client) return;
  
  // Use setTimeout to ensure this runs after the page is fully loaded
  setTimeout(() => {
    try {
      // Report Core Web Vitals
      const { getLCP, getFID, getCLS } = require('web-vitals');
      
      // Define reporting function
      const reportWebVital = ({ name, value, id }) => {
        // Log to console in development
        console.log(`Web Vital: ${name} = ${value}`);
        
        // Send to analytics in production
        const { isProduction } = useConfig();
        if (isProduction()) {
          // Code to send to CloudWatch or other monitoring service
          const analyticsData = {
            metric: name,
            value: Math.round(value),
            id: id,
            page: window.location.pathname,
            timestamp: Date.now()
          };
          
          // Send metrics to backend
          fetch('/api/metrics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(analyticsData),
            // Don't wait for response, use "fire and forget"
            keepalive: true
          }).catch(error => {
            console.error('Error sending performance metrics:', error);
          });
        }
      };
      
      // Monitor Core Web Vitals
      getLCP(reportWebVital);
      getFID(reportWebVital);
      getCLS(reportWebVital);
    } catch (error) {
      console.error('Failed to set up performance monitoring:', error);
    }
  }, 3000);
};

/**
 * Creates optimized image URL using CloudFront image optimization (if available)
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  const { isProduction, aws } = useConfig();
  
  // Default options
  const {
    width = null,
    height = null,
    quality = 80,
    format = 'auto',
  } = options;
  
  // Only use CloudFront image optimization in production
  if (isProduction() && aws.cloudfrontUrl && url) {
    // Check if URL is already absolute
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // URL is already absolute, but might need to be routed through CloudFront
      // This depends on your specific CloudFront setup
      return url;
    } else {
      // Relative URL, prepend CloudFront domain
      let optimizedUrl = `${aws.cloudfrontUrl}${url.startsWith('/') ? '' : '/'}${url}`;
      
      // Add image optimization parameters if supported by your CloudFront setup
      // This depends on your specific CloudFront configuration
      // You might be using Lambda@Edge or CloudFront Functions for this
      const params = [];
      if (width) params.push(`w=${width}`);
      if (height) params.push(`h=${height}`);
      if (quality) params.push(`q=${quality}`);
      if (format) params.push(`f=${format}`);
      
      if (params.length > 0) {
        optimizedUrl += `?${params.join('&')}`;
      }
      
      return optimizedUrl;
    }
  }
  
  // Fallback to original URL
  return url;
};