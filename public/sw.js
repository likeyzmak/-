const CACHE = 'puzzle-v1';
const ASSETS = ['/', '/static/style.css', '/static/app.js', '/static/icon-192.png', '/static/icon-512.png', '/static/default.jpg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
