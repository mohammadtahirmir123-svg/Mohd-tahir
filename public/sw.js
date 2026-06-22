const CACHE_NAME = 'mohdtahir-portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching client-side files & structural layers...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Erasing deprecated cache storage:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Bypass third-party integrations, chrome extensions, and any non-GET operations
  if (event.request.method !== 'GET') {
    return;
  }

  // Bypass core POST/GET dynamic micro-services
  if (requestUrl.pathname.startsWith('/api/')) {
    return;
  }

  // Avoid processing browser extension schemes
  if (event.request.url.startsWith('chrome-extension:') || event.request.url.includes('extension')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Stale-while-revalidate for faster performance
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {
          // Suppress error when offline since serving cached content is normal
        });
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || (networkResponse.status !== 200 && networkResponse.type !== 'opaque')) {
          return networkResponse;
        }

        // Cache dynamic assets on the fly
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch((err) => {
        // If navigating offline, serve the main root page (App Shell)
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
        console.warn('[Service Worker] Offline fallback resource not active:', err);
      });
    })
  );
});

// Real-time Push API Listener for native system push events
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push event received:', event);
  
  let data = {
    title: '🧠 TAHIR SYSTEMS',
    body: 'Telemetry alert push broadcast channel is online.',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [150, 100, 150]
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/favicon.ico',
    badge: data.badge || '/favicon.ico',
    vibrate: data.vibrate || [150, 100, 150],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// PostMessage Notification router hook for cross-layer synchronization fallback (e.g. in sandbox)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TRIGGER_PUSH_NOTIFICATION') {
    const { title, body, icon, badge, vibrate } = event.data.payload;
    
    self.registration.showNotification(title, {
      body: body || 'Event dispatch telemetry successful.',
      icon: icon || '/favicon.ico',
      badge: badge || '/favicon.ico',
      vibrate: vibrate || [120, 80, 120],
      data: {
        dateOfArrival: Date.now()
      }
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
