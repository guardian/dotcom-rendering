/**
 * whenIdle exectures the given callback when the browser is 'idle'
 *
 * @param callback Fired when requestIdleCallback runs or after 300ms
 */
export const whenIdle = (callback: () => void) => {
	if ('requestIdleCallback' in window) {
		window.requestIdleCallback(callback);
	} else {
		setTimeout(callback, 300);
	}
};
