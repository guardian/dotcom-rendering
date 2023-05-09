/** synthetically bork FID https://web.dev/fid/ */
export const fid = (): void => {
	try {
		/** @see https://github.com/GoogleChrome/web-vitals/blob/v3.1.1/src/lib/polyfills/firstInputPolyfill.ts#L172 */
		const eventTypes = [
			'mousedown',
			'keydown',
			'touchstart',
			'pointerdown',
		];

		const key = 'bork-fid-';
		const hash = window.location.hash.slice(1);
		if (
			hash.startsWith(key) &&
			typeof window.performance === 'object' &&
			typeof window.performance.now === 'function'
		) {
			const delay = parseInt(hash.replace(key, ''), 10);
			if (isNaN(delay)) return;

			const bork = () => {
				// eslint-disable-next-line no-console -- we want to apologise, in the name of science!
				console.info(`🍊 Delaying first click by ${delay}ms, sorry`);

				const start = performance.now();
				eventTypes.forEach((eventType) => {
					removeEventListener(eventType, bork);
				});
				while (performance.now() - start < delay) {
					// throttling
				}
			};

			eventTypes.forEach((eventType) => {
				addEventListener(eventType, bork);
			});
		}
	} catch (_) {
		// do nothing
	}
};
