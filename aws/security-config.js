/**
 * AWS Security Configurations
 * 
 * This file provides security utilities and configurations
 * for protecting the application when deployed to AWS.
 */

import { useConfig } from '~/utils/config/useConfig';

/**
 * Sets up security measures for the application
 */
export const setupSecurityMeasures = () => {
  if (process.client) {
    // Setup Content Security Policy
    setupCSP();
    
    // Add security headers
    addSecurityHeaders();
    
    // Set up CSRF protection
    setupCSRFProtection();
    
    // Monitor for common security issues
    detectSecurityVulnerabilities();
  }
};

/**
 * Sets up Content Security Policy
 */
const setupCSP = () => {
  const { isProduction } = useConfig();
  
  // Only apply strict CSP in production
  if (isProduction()) {
    // The actual CSP headers should be configured on the server or CDN level
    // This is just a client-side fallback using meta tag
    const cspContent = [
      "default-src 'self'",
      "script-src 'self' https://cdn.amazonaws.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https://*.cloudfront.net",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.amazonaws.com https://*.execute-api.*.amazonaws.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'"
    ].join('; ');
    
    // Add CSP meta tag if not already present
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = cspContent;
      document.head.appendChild(meta);
    }
  }
};

/**
 * Adds additional security headers
 * Note: Best practice is to configure these at the CDN or server level,
 * but we include this as a fallback for development
 */
const addSecurityHeaders = () => {
  if (process.server) {
    // This would ideally be configured at the CDN or server level
    // For development purposes, we could use a Nuxt server middleware
  }
};

/**
 * Sets up CSRF protection for API calls
 */
const setupCSRFProtection = () => {
  if (!process.client) return;
  
  // Generate a CSRF token if not already present
  let csrfToken = localStorage.getItem('csrf_token');
  if (!csrfToken) {
    csrfToken = generateRandomToken();
    localStorage.setItem('csrf_token', csrfToken);
  }
  
  // Add CSRF token to all fetch/XHR requests
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    // Only add for same-origin requests that modify data
    if (
      !url.startsWith('http') || 
      url.startsWith(window.location.origin)
    ) {
      if (!options.headers) {
        options.headers = {};
      }
      
      // Add CSRF token for non-GET requests
      if (!options.method || options.method !== 'GET') {
        options.headers['X-CSRF-Token'] = csrfToken;
      }
    }
    
    return originalFetch.call(this, url, options);
  };
  
  // Also patch XMLHttpRequest
  const originalXhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    const xhr = this;
    originalXhrOpen.apply(xhr, arguments);
    
    if ((method.toLowerCase() !== 'get') && 
        (!url.startsWith('http') || url.startsWith(window.location.origin))) {
      xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    }
  };
};

/**
 * Generates a cryptographically strong random token
 */
const generateRandomToken = () => {
  const array = new Uint8Array(24);
  crypto.getRandomValues(array);
  return Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join('');
};

/**
 * Detects common client-side security vulnerabilities
 */
const detectSecurityVulnerabilities = () => {
  if (!process.client) return;
  
  // Check for XSS vulnerabilities in localStorage
  checkLocalStorageSecurity();
  
  // Check for secure cookies
  checkCookieSecurity();
  
  // Check for outdated libraries with known vulnerabilities
  // This is more of a build-time check but we can add runtime checks
  checkLibraryVersions();
  
  // Set up listeners for potential DOM-based XSS attacks
  monitorDOMForXSS();
};

/**
 * Checks localStorage for potential security issues
 */
const checkLocalStorageSecurity = () => {
  try {
    // Check for sensitive data in localStorage
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'credit'];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      
      // Check for unencrypted sensitive data
      sensitiveKeys.forEach(sensitiveKey => {
        if (
          key.toLowerCase().includes(sensitiveKey) && 
          !isEncrypted(value) &&
          key !== 'csrf_token' // Allow CSRF token
        ) {
          console.warn(`Potentially sensitive data found in localStorage: ${key}`);
          // In production, you might want to report this
        }
      });
    }
  } catch (error) {
    console.error('Error checking localStorage security:', error);
  }
};

/**
 * Basic check if a string appears to be encrypted
 */
const isEncrypted = (str) => {
  if (!str || typeof str !== 'string') return false;
  
  // Check for common encryption patterns
  // JWT token format
  if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(str)) {
    return true;
  }
  
  // Base64 encoded data that's not plain text
  if (/^[A-Za-z0-9+/=]{20,}$/.test(str) && !/^[A-Za-z0-9\s.,?!-]{10,}$/.test(atob(str))) {
    return true;
  }
  
  return false;
};

/**
 * Checks for cookie security issues
 */
const checkCookieSecurity = () => {
  const { isProduction } = useConfig();
  
  if (isProduction() && document.cookie) {
    // Check if cookies are set without secure and httpOnly flags
    if (document.cookie && window.location.protocol === 'https:') {
      if (!document.cookie.includes('secure')) {
        console.warn('Cookies may not be using the secure flag on HTTPS');
      }
    }
  }
};

/**
 * Check for known outdated libraries
 * This is better done at build time, but we add some basic runtime checks
 */
const checkLibraryVersions = () => {
  // Example: check for jQuery versions with known vulnerabilities
  if (window.jQuery) {
    const version = window.jQuery.fn.jquery;
    const vulnerableVersions = ['1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7'];
    
    if (vulnerableVersions.some(v => version.startsWith(v))) {
      console.warn(`Using potentially vulnerable jQuery version: ${version}`);
    }
  }
};

/**
 * Monitors the DOM for potential XSS attacks
 */
const monitorDOMForXSS = () => {
  // Use a MutationObserver to detect potentially dangerous DOM changes
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // Check for script injections
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.tagName === 'SCRIPT' && !node.hasAttribute('data-safe')) {
            console.warn('Potential XSS detected: Dynamic script element added to DOM', node);
          }
          
          // Check for dangerous inline event handlers
          if (node.nodeType === 1) { // Element node
            Array.from(node.attributes || []).forEach(attr => {
              if (attr.name.startsWith('on') && attr.value.includes('javascript:')) {
                console.warn('Potential XSS detected: Inline event handler with javascript: URL', node);
              }
            });
          }
        });
      }
    });
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'href', 'onclick', 'onload', 'onerror']
  });
};