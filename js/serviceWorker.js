const cacheName = "wsap-sinAgendar-v1.121";
const staticAssets = [
  "/",
  "/index.html",
  // "/css/app.css",
  // "/js/app.js",
  // "/FL_negro.ico",
  // "/images/Logo_AzulGrisOscuro.png",
  // "/images/icons/icon-72x72.png",
  // "/images/icons/icon-96x96.png",
  // "/images/icons/icon-128x128.png",
  // "/images/icons/icon-144x144.png",
  // "/images/icons/icon-152x152.png",
  // "/images/icons/icon-192x192.png",
  // "/images/icons/icon-384x384.png",
  // "/images/icons/icon-512x512.png"
];

self.addEventListener('install', async e => {
   const cache = await caches.open(cacheName);
   await cache.addAll(staticAssets);
   return self.skipWaiting();
});

self.addEventListener('fetch', async e => {
   const req = e.request;
   const url = new URL(req.url);

   if (url.origin === location.origin) {
       e.respondWith(cacheFirst(req));
   } else {
       e.respondWith(networkAndCache(req));
   }
});

async function cacheFirst(req) {
   const cache = await caches.open(cacheName);
   const cached = await cache.match(req);
   return cached || fetch(req);
}

async function networkAndCache(req) {
   const cache = await caches.open(cacheName);
   try {
       const fresh = await fetch(req);
       await cache.put(req, fresh.clone());
       return fresh;
   } catch (e) {
       const cached = await cache.match(req);
       return cached;
   }
}