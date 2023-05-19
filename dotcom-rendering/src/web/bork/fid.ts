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

		/**
		 * A value in the 0ms - 1000ms range.
		 * The upper bound of 1s matches our current 99th percentile for FID.
		 */
		const delay = Math.floor(Math.random() * 1000);

		if (
			typeof window.performance === 'object' &&
			typeof window.performance.now === 'function'
		) {
			window.guardian.borkWebVitals.fid = String(delay);

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
