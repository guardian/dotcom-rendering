// Based on https://github.com/JedWatson/exenv

const canUseDom = (): boolean =>
    !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

export { canUseDom };
