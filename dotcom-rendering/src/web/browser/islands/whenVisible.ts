/**
 * Use this function to delay execution of something until an element is visible
 * in the viewport
 *
 * @param element : The html element that we want to observe;
 * @param callback : This is fired when the element is visible in the viewport
 */
export const whenVisible = (
	element: HTMLElement,
	callback: () => void,
): void => {
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver(([entry]) => {
			if (!entry || !entry.isIntersecting) return;
			// Disconnect this IntersectionObserver once seen
			io.disconnect();
			callback();
		});

		io.observe(element);
	} else {
		// IntersectionObserver is not supported so failover to calling back at the end of the call stack
		setTimeout(() => callback(), 0);
	}
};
