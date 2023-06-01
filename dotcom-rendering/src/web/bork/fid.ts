/** synthetically bork FID https://web.dev/fid/ */
export const fid = (delay: number): void => {
	try {
		/** @see https://github.com/GoogleChrome/web-vitals/blob/v3.1.1/src/lib/polyfills/firstInputPolyfill.ts#L172 */
		const eventTypes = [
			'mousedown',
			'keydown',
			'touchstart',
			'pointerdown',
		];

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
