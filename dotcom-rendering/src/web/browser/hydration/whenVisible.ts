export const whenVisible = (marker: HTMLElement, callback: () => void) => {
	const io = new IntersectionObserver(([entry]) => {
		if (!entry.isIntersecting) return;
		// Disconnect this IntersectionObserver once seen
		io.disconnect();
		callback();
	});

	io.observe(marker);
};
