/**
 * Base API Client
 * Handles HTTP requests with built-in error handling, retries, and request management
 */

// Configuration defaults
const API_CONFIG = {
  baseURL: process.env.API_BASE_URL || 'https://api.example.com', // Replace with your actual API URL
  timeout: 30000,
  retries: 2,
  retryDelay: 1000,
  credentials: 'include', // For handling cookies/auth
};

// Cache for request deduplication
const requestCache = new Map();

/**
 * Creates unique cache key for a request
 */
const createCacheKey = (endpoint, options) => {
  const method = options.method || 'GET';
  const body = options.body ? JSON.stringify(options.body) : '';
  return `${method}:${endpoint}:${body}`;
};

/**
 * Parse response based on content type
 */
const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  
  if (contentType.includes('application/json')) {
    return response.json();
  }
  
  if (contentType.includes('text/')) {
    return response.text();
  }
  
  if (contentType.includes('form-data') || contentType.includes('multipart')) {
    return response.formData();
  }
  
  return response.blob();
};

/**
 * Handle API errors
 */
const handleError = async (error, endpoint, options) => {
  // Network errors
  if (!error.response) {
    console.error(`Network error for: ${options.method || 'GET'} ${endpoint}`, error);
    return {
      error: true,
      message: 'Network error. Please check your connection.',
      status: 0,
      type: 'NETWORK_ERROR',
    };
  }

  // Try to parse error response
  let errorData = {};
  try {
    errorData = await parseResponse(error.response);
  } catch (e) {
    errorData = { message: error.response.statusText };
  }

  // Create standardized error object
  return {
    error: true,
    ...errorData,
    status: error.response.status,
    type: getErrorType(error.response.status),
  };
};

/**
 * Maps HTTP status codes to error types
 */
const getErrorType = (status) => {
  if (status >= 400 && status < 500) {
    if (status === 401) return 'UNAUTHORIZED';
    if (status === 403) return 'FORBIDDEN';
    if (status === 404) return 'NOT_FOUND';
    if (status === 429) return 'RATE_LIMITED';
    return 'CLIENT_ERROR';
  }
  
  if (status >= 500) {
    return 'SERVER_ERROR';
  }
  
  return 'UNKNOWN_ERROR';
};

/**
 * Core request function with retry capability and caching
 */
const request = async (endpoint, options = {}) => {
  const config = { ...API_CONFIG, ...options };
  let retries = config.retries;
  let lastError = null;
  const url = endpoint.startsWith('http') ? endpoint : `${config.baseURL}${endpoint}`;

  // For caching GET requests or when cache is explicitly enabled
  const shouldCache = (options.method === 'GET' || options.method === undefined) && options.cache !== false;
  const cacheKey = shouldCache ? createCacheKey(endpoint, options) : null;

  // Return cached response if available
  if (shouldCache && requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  // If it's a cacheable request, store the promise to avoid duplicate requests
  const requestPromise = (async () => {
    while (retries >= 0) {
      try {
        // Prepare headers
        const headers = {
          'Content-Type': 'application/json',
          ...options.headers,
        };

        // If token exists in localStorage, add it to headers (for client-side requests)
        if (typeof window !== 'undefined' && localStorage.getItem('authToken')) {
          headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`;
        }

        // Prepare request options
        const fetchOptions = {
          method: options.method || 'GET',
          headers,
          credentials: config.credentials,
        };

        // Add body if present
        if (options.body) {
          fetchOptions.body = JSON.stringify(options.body);
        }

        // Execute fetch
        const response = await fetch(url, fetchOptions);

        // Handle unsuccessful responses
        if (!response.ok) {
          throw { response };
        }

        // Parse and return successful response
        const data = await parseResponse(response);
        return data;
      } catch (error) {
        lastError = error;
        if (retries > 0) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, config.retryDelay));
          retries--;
        } else {
          // No more retries, handle error
          return handleError(error, endpoint, options);
        }
      }
    }
  })();

  // Cache the request promise if it's cacheable
  if (shouldCache) {
    requestCache.set(cacheKey, requestPromise);
    
    // Add a timeout to clear this entry from cache (default 1 minute)
    const cacheExpiry = options.cacheExpiry || 60000;
    setTimeout(() => {
      requestCache.delete(cacheKey);
    }, cacheExpiry);
  }

  return requestPromise;
};

/**
 * Convenience methods for HTTP verbs
 */
export const apiClient = {
  // Core request function
  request,
  
  // GET request
  async get(endpoint, options = {}) {
    return request(endpoint, { ...options, method: 'GET' });
  },
  
  // POST request
  async post(endpoint, data, options = {}) {
    return request(endpoint, { ...options, method: 'POST', body: data });
  },
  
  // PUT request
  async put(endpoint, data, options = {}) {
    return request(endpoint, { ...options, method: 'PUT', body: data });
  },
  
  // PATCH request
  async patch(endpoint, data, options = {}) {
    return request(endpoint, { ...options, method: 'PATCH', body: data });
  },
  
  // DELETE request
  async delete(endpoint, options = {}) {
    return request(endpoint, { ...options, method: 'DELETE' });
  },
  
  // Clear all cache
  clearCache() {
    requestCache.clear();
  },
  
  // Clear specific cache entry
  clearCacheFor(endpoint, options = {}) {
    const cacheKey = createCacheKey(endpoint, options);
    requestCache.delete(cacheKey);
  },
  
  // Configure global API settings
  configure(options) {
    Object.assign(API_CONFIG, options);
  },
};

export default apiClient;