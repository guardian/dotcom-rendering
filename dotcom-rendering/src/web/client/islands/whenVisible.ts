type WhenVisibleOptions = {
	rootMargin?: string;
};

/**
 * Use this function to delay execution of something until an element
 * is within some distance of the viewport.
 *
 * @param element : The html element that we want to observe;
 * @param callback : This is fired when the element is visible in the viewport
 * @param options.rootMargin - The root margin used to control lazy loading
 * See https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
 */
export const whenVisible = (
	element: HTMLElement,
	callback: () => void,
	{ rootMargin }: WhenVisibleOptions = { rootMargin: '100px' },
): void => {
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				// Disconnect this IntersectionObserver once seen
				io.disconnect();
				callback();
			},
			{ rootMargin },
		);

		io.observe(element);
	} else {
		// IntersectionObserver is not supported so failover to calling back at the end of the call stack
		setTimeout(() => callback(), 0);
	}
};
