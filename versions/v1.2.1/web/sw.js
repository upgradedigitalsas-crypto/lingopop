/* LingoPop: network-first PWA shell so updated lessons and themes reach installed devices */
const CACHE='lingopop-offline-v8-world-path-fix-20261018';
const APP_ASSETS=['/','/index.html','/styles.css','/courses.js','/app.js','/manifest.webmanifest','/icons/icon-192.png','/icons/icon-512.png','/icons/apple-touch-icon.png','/iconography/lessons.webp','/iconography/speaking.webp','/iconography/listening.webp','/iconography/flashcards.webp','/iconography/quiz.webp','/iconography/streak.webp','/iconography/trophy.webp','/iconography/progress.webp','/iconography/conversation.webp','/iconography/vocabulary.webp','/iconography/languages.webp','/iconography/notifications.webp','/iconography/download.webp','/iconography/settings.webp','/iconography/favorites.webp','/iconography/profile.webp','/iconography/profesora-lingopop.webp','/iconography/profesora-hero.webp','/iconography/lingopop-promo.webp','/world/index.html','/world/world.js','/world/world.css'];
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
    }).catch(()=>caches.match(request).then(cached=>cached||(request.mode==='navigate'?caches.match(new URL(request.url).pathname.startsWith('/world')?'/world/index.html':'/index.html'):Response.error())))
  );
});
