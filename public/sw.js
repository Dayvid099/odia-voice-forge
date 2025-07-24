const CACHE_NAME = 'agent-lexi-v2';
const STATIC_CACHE = 'agent-lexi-static-v2';
const DYNAMIC_CACHE = 'agent-lexi-dynamic-v2';
const API_CACHE = 'agent-lexi-api-v2';

const urlsToCache = [
  '/',
  '/agent-lexi',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/screenshot-mobile.png',
  '/screenshot-desktop.png'
];

// Cache strategies
const CACHE_STRATEGIES = {
  NETWORK_FIRST: 'network-first',
  CACHE_FIRST: 'cache-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching App Shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Installed Successfully');
      })
      .catch((error) => {
        console.error('Service Worker: Install Failed', error);
      })
  );
  self.skipWaiting();
});

// Advanced fetch event with multiple cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests with appropriate caching strategies
  if (request.method !== 'GET') {
    return; // Don't cache non-GET requests
  }

  // API requests - Network first with API cache
  if (url.pathname.includes('/functions/') || url.pathname.includes('/api/')) {
    event.respondWith(networkFirstStrategy(request, API_CACHE));
    return;
  }

  // Static assets - Cache first
  if (request.destination === 'image' || 
      request.destination === 'script' || 
      request.destination === 'style' ||
      url.pathname.includes('/assets/') ||
      url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2)$/)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    return;
  }

  // HTML pages - Stale while revalidate
  if (request.destination === 'document') {
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
    return;
  }

  // Everything else - Network first
  event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
});

// Cache-first strategy for static assets
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    return getOfflineFallback(request);
  }
}

// Network-first strategy for dynamic content
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return getOfflineFallback(request);
  }
}

// Stale-while-revalidate strategy for HTML pages
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Offline fallback
function getOfflineFallback(request) {
  if (request.destination === 'document') {
    return caches.match('/') || new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Agent Lexi - Offline</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .offline { color: #666; }
          </style>
        </head>
        <body>
          <h1>You're Offline</h1>
          <p class="offline">Agent Lexi will be available when you reconnect.</p>
          <button onclick="window.location.reload()">Try Again</button>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
  
  if (request.destination === 'image') {
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="#f0f0f0" width="200" height="200"/><text y="50%" x="50%" text-anchor="middle" dy=".3em" fill="#999">Image Unavailable</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
  
  return new Response('Content not available offline', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Activate service worker and clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated Successfully');
      return self.clients.claim();
    })
  );
});

// Enhanced background sync for offline functionality
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'chat-messages') {
    event.waitUntil(syncChatMessages());
  } else if (event.tag === 'contact-forms') {
    event.waitUntil(syncContactForms());
  } else if (event.tag === 'demo-bookings') {
    event.waitUntil(syncDemoBookings());
  }
});

// Sync offline chat messages
async function syncChatMessages() {
  try {
    const db = await openDB();
    const messages = await getAllFromDB(db, 'offline_chats');
    
    for (const message of messages) {
      try {
        const response = await fetch('https://kwubyskxnflyvkqmvytf.supabase.co/functions/v1/chat-with-ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${message.token}`
          },
          body: JSON.stringify(message.data)
        });
        
        if (response.ok) {
          await deleteFromDB(db, 'offline_chats', message.id);
          console.log('Synced chat message:', message.id);
        }
      } catch (error) {
        console.error('Failed to sync chat message:', error);
        break;
      }
    }
  } catch (error) {
    console.error('Chat sync failed:', error);
  }
}

// Sync offline contact forms
async function syncContactForms() {
  try {
    const db = await openDB();
    const forms = await getAllFromDB(db, 'offline_contacts');
    
    for (const form of forms) {
      try {
        const response = await fetch('https://kwubyskxnflyvkqmvytf.supabase.co/functions/v1/submit-contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await deleteFromDB(db, 'offline_contacts', form.id);
          console.log('Synced contact form:', form.id);
        }
      } catch (error) {
        console.error('Failed to sync contact form:', error);
        break;
      }
    }
  } catch (error) {
    console.error('Contact sync failed:', error);
  }
}

// Sync offline demo bookings
async function syncDemoBookings() {
  try {
    const db = await openDB();
    const bookings = await getAllFromDB(db, 'offline_bookings');
    
    for (const booking of bookings) {
      try {
        const response = await fetch('https://kwubyskxnflyvkqmvytf.supabase.co/functions/v1/book-demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(booking.data)
        });
        
        if (response.ok) {
          await deleteFromDB(db, 'offline_bookings', booking.id);
          console.log('Synced demo booking:', booking.id);
        }
      } catch (error) {
        console.error('Failed to sync demo booking:', error);
        break;
      }
    }
  } catch (error) {
    console.error('Booking sync failed:', error);
  }
}

// IndexedDB helpers for offline storage
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AgentLexiOfflineDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('offline_chats')) {
        db.createObjectStore('offline_chats', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('offline_contacts')) {
        db.createObjectStore('offline_contacts', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('offline_bookings')) {
        db.createObjectStore('offline_bookings', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

function getAllFromDB(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

function deleteFromDB(db, storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

// Enhanced push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  let notificationData = {
    title: 'Agent Lexi',
    body: 'New message from your AI assistant',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      notificationData = { ...notificationData, ...payload };
    } catch (error) {
      notificationData.body = event.data.text();
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    image: notificationData.image,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    tag: 'agent-lexi-notification',
    renotify: true,
    requireInteraction: false,
    silent: false,
    data: {
      url: notificationData.url || '/agent-lexi',
      timestamp: Date.now(),
      ...notificationData.data
    },
    actions: [
      {
        action: 'open-chat',
        title: '💬 Open Chat',
        icon: '/icon-192.png'
      },
      {
        action: 'dismiss',
        title: '✖️ Dismiss',
        icon: '/icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Enhanced notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event.action);
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/agent-lexi';

  if (event.action === 'open-chat') {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          // Check if app is already open
          for (const client of clientList) {
            if (client.url.includes(urlToOpen) && 'focus' in client) {
              return client.focus();
            }
          }
          // Open new window if app is not open
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification (already handled above)
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.matchAll({ type: 'window' })
        .then((clientList) => {
          for (const client of clientList) {
            if ('focus' in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Service Worker: Notification dismissed');
  // Optional: Track notification dismissal for analytics
});

// Periodic background sync for cache maintenance
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(cleanupOldCaches());
  }
});

async function cleanupOldCaches() {
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE];
  const cacheNames = await caches.keys();
  
  await Promise.all(
    cacheNames.map((cacheName) => {
      if (!cacheWhitelist.includes(cacheName)) {
        console.log('Cleaning up old cache:', cacheName);
        return caches.delete(cacheName);
      }
    })
  );
}