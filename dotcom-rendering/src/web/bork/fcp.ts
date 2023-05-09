/** synthetically bork FCP https://web.dev/fcp/ */
export const fcp = (): void => {
	try {
		const hashKey = 'bork-fcp-';
		const hash = window.location.hash.substring(1);
		if (
			hash.startsWith(hashKey) &&
			CSS.supports('animation-duration', 'var(--fake-var)')
		) {
			const delay = hash.replace(hashKey, '');
			// eslint-disable-next-line no-console -- we want to apologise, in the name of science!
			console.info(`🍊 Delaying first paint by ${delay}ms, sorry`);

			const root = document.documentElement;
			root.style.setProperty('--bork-fcp-amount', delay + 'ms');
			root.classList.add('bork-fcp');
		}
	} catch (e) {
		// do nothing
	}
};
