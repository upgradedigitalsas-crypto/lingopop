/* LingoPop: network-first PWA shell so updated lessons and themes reach installed devices */
const CACHE='lingopop-offline-v3';
const APP_ASSETS=['/','/index.html','/styles.css','/courses.js','/app.js','/manifest.webmanifest','/icons/icon-192.png','/icons/icon-512.png','/icons/apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request=event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
  event.respondWith(
    fetch(request).then(response=>{
      if(response.ok){
        const clone=response.clone();
        event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,clone)));
      }
      return response;
    }).catch(()=>caches.match(request).then(cached=>cached||(request.mode==='navigate'?caches.match('/index.html'):Response.error())))
  );
});
