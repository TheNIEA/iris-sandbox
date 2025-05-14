// Service Worker for Mayo Test Sandbox
// Provides offline caching and performance optimizations

const CACHE_NAME = 'mayo-test-cache-v1';
const RUNTIME_CACHE = 'mayo-runtime-cache';

// Resources to pre-cache
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.ico',
  // Add other critical resources here
];

// Install event - precache static resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service worker pre-caching resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache if available, otherwise fetch and cache
self.addEventListener('fetch', event => {
  // Skip cross-origin and non-GET requests
  if (
    event.request.method !== 'GET' ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }
  
  // For HTML requests - use network-first approach
  if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If successful, clone and cache
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If offline, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For assets - use cache-first approach
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // If in cache, serve from cache
        return cachedResponse;
      }
      
      // If not in cache, fetch from network
      return fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            // Don't cache bad responses or non-basic responses
            return response;
          }
          
          // Clone response to cache it and return it
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        })
        .catch(error => {
          console.error('Fetch failed:', error);
          throw error;
        });
    })
  );
});

// Handle push notifications (if needed)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'New notification',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: {
        url: data.url || '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Mayo Test App', options)
    );
  } catch (error) {
    console.error('Push notification error:', error);
  }
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});