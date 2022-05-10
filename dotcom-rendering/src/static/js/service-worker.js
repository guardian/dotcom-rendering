console.log('Hello from service-worker.js');

const CACHE_NAMESPACE = 'GU-HAPPY-OFFLINE-v1'

/*, INSTALL */

self.addEventListener("install", (event) => {
  installHandler(event);
});

const installHandler = async (event) => {
  console.log('install event');
  event.waitUntil(self.skipWaiting());
};

/* ACTIVATE */

self.addEventListener('activate', (event) => {
  console.log('activate event');
  event.waitUntil(enableNavigationPreload());
});

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

/* FETCH */

self.addEventListener('fetch', (event) => {
  console.log('fetch event');
  event.respondWith(
    cacheFirst(event.request)
  );
});

const cacheFirst = async (request) => {
  // return new Response('<p>From service worker</p>');
  console.log(request.url, request.destination);
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    console.log('serving out of cache');
    return responseFromCache;
  }
  console.log('serving from network');
  const responseFromNetwork = await fetch(request);
  await putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAMESPACE);
  await cache.put(request, response);
}
