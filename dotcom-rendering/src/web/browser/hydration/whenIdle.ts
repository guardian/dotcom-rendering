export const whenIdle = (callback: () => void) => {
	if ('requestIdleCallback' in window) {
		window.requestIdleCallback(callback);
	} else {
		setTimeout(callback, 300);
	}
};
