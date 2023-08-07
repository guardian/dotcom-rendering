/** Polyfill.io script URL @see https://polyfill.io/v3/api#request */
export const polyfillIO = `https://assets.guim.co.uk/polyfill.io/v3/polyfill.min.js?${new URLSearchParams(
	{
		/** Undocumented; probably opting out of real user monitoring… */
		rum: String(0),
		/**
		 * Comma-separated list of the polyfills which you want to include
		 * in the response if the requesting browser does not support
		 * the feature natively.
		 *
		 * Available feature names are shown on the [features page][].
		 *
		 * [features page]: https://polyfill.io/v3/url-builder
		 */
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
		/**
		 * Configuration settings for every polyfill being requested.
		 * Possible values are `always` and `gated`.
		 * Setting `always` will return all requested polyfills to every browser.
		 * Setting `gated` will wrap every polyfill within a feature detection,
		 * only adding the polyfill if the feature was not detected.
		 * To enable both settings, separate them with a comma
		 * E.G. `always,gated`.
		 */
		flags: 'gated',
		/**
		 * Name of the JavaScript function to call
		 * after the polyfill bundle is loaded.
		 */
		callback: 'guardianPolyfilled',
		/**
		 * What to do for browsers which are not supported.
		 * Possible values are `ignore` and `polyfill`.
		 * Setting to `ignore` will return no polyfills to unsuported browsers.
		 * Setting to `polyfill` will return all requested polyfills to unsupported
		 * browsers. Default is `polyfill`.
		 */
		unknown: 'polyfill',
		/** Undocumented; probably a cache-buster… */
		cacheClear: String(1),
	},
).toString()}`;
