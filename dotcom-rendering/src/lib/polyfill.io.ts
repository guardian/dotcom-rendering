/** Polyfill.io script URL configuration */
export const polyfillIO = new URL(
	'https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?' +
		new URLSearchParams({
			rum: String(0),
			features: [
				'es6',
				'es7',
				'es2017',
				'es2018',
				'es2019',
				'default-3.6',
				'HTMLPictureElement',
				'IntersectionObserver',
				'IntersectionObserverEntry',
				'URLSearchParams',
				'fetch',
				'NodeList.prototype.forEach',
				'navigator.sendBeacon',
				'performance.now',
				'Promise.allSettled',
			].join(','),
			flags: 'gated',
			callback: 'guardianPolyfilled',
			unknown: 'polyfill',
			cacheClear: String(1),
		}).toString(),
).toString();
