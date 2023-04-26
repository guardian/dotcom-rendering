export const fcp = (): void => {
	try {
		const hashKey = 'bork-fcp-';
		const hash = window.location.hash.substring(1);
		if (hash.startsWith(hashKey)) {
			const root = document.documentElement;
			root.style.setProperty(
				'--bork-fcp-amount',
				hash.replace(hashKey, '') + 'ms',
			);
			document.documentElement.classList.add('bork-fcp');
		}
	} catch (e) {
		// do nothing
	}
};
