/** synthetically bork FCP https://web.dev/fcp/ */
export const fcp = (): void => {
	try {
		/**
		 * A value in the 0ms - 4000ms range.
		 * The upper bound of 4s matches our current 99th percentile for FCP.
		 */
		const delay = Math.floor(Math.random() * 4000);

		if (CSS.supports('animation-duration', 'var(--fake-var)')) {
			window.guardian.borkWebVitals.fcp = String(delay);
			// eslint-disable-next-line no-console -- we want to apologise, in the name of science!
			console.info(`🍊 Delaying first paint by ${delay}ms, sorry`);

			const root = document.documentElement;
			root.style.setProperty('--bork-fcp-amount', `${delay}ms`);
			root.classList.add('bork-fcp');
		}
	} catch (e) {
		// do nothing
	}
};
