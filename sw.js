const CACHE_NAME = 'nibi-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './main.js',
    './style.css',
    './ink-effect.js',
    'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
