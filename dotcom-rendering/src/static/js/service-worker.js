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
	event.respondWith(
		cacheFirst(event.request)
	);
});

const cacheFirst = async (request) => {
	const responseFromCache = await caches.match(request);
	if (responseFromCache) {
		return responseFromCache;
	}
	try {
		const responseFromNetwork = await fetch(request);
		putInCache(request, responseFromNetwork.clone());
		return responseFromNetwork;
	} catch (e) {
		if (request.destination === 'image') {
			const fallbackImage = '<svg xmlns="http://www.w3.org/2000/svg" width="680.765" height="528.355" viewBox="0 0 180.119 139.794" xmlns:v="https://vecta.io/nano"><path d="M0 0h180.119v139.794H0z" fill="#d0d0d0" paint-order="fill markers stroke"/><g fill="#fff"><path d="M104.916 66.875l-34.249 34.249-15.968-15.968-41.938 41.938h31.936 51.939 68.498z" opacity=".675" paint-order="fill markers stroke"/><circle cx="44.626" cy="41.916" r="11.773" opacity=".675" paint-order="fill markers stroke"/></g></svg>'
			return new Response(fallbackImage, { headers: { 'Content-Type': 'image/svg+xml' } });
		} else {
			return new Response('', { headers: request.headers });
		}
	}
};

const putInCache = async (request, response) => {
	const cache = await caches.open(CACHE_NAMESPACE);
	if (request.method === 'GET') {
		await cache.put(request, response);
	}
}
