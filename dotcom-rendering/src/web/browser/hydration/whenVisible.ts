/**
 * Use this function to delay execution of something until an element is visible
 * in the viewport
 *
 * @param marker : The html element that we want to observe;
 * @param callback : This is fired when the marker is visible in the viewport
 */
export const whenVisible = (marker: HTMLElement, callback: () => void) => {
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			// Disconnect this IntersectionObserver once seen
			io.disconnect();
			callback();
		});

		io.observe(marker);
	} else {
		// IntersectionObserver is not supported so failover to calling back at the end of the call stack
		setTimeout(() => callback(), 0);
	}
};
