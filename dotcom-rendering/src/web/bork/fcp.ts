export const fcp = (): void => {
	try {
		const hashKey = 'bork-fcp-';
		const hash = window.location.hash.substring(1);
		if (
			hash.startsWith(hashKey) &&
			CSS.supports('animation-duration', 'var(--fake-var)')
		) {
			const root = document.documentElement;
			root.style.setProperty(
				'--bork-fcp-amount',
				hash.replace(hashKey, '') + 'ms',
			);
			root.classList.add('bork-fcp');
		}
	} catch (e) {
		// do nothing
	}
};
