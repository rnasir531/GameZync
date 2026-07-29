const CACHE_NAME = 'gamezync-pwa-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests, API routes, hot-reload, extension requests
  if (
    event.request.method !== 'GET' ||
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('_next/webpack-hmr') ||
    !url.protocol.startsWith('http')
  ) {
    return;
  }

  // Network-First Strategy with Safe Fallback Response
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        const offlinePage = await caches.match('/');
        return offlinePage || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      })
  );
});
