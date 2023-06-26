/**
 * Will callback each time the reader navigates back or forward in
 * their browser
 *
 * @param callback : This is fired when the popstate event is fired
 */
export const onNavigation = (callback: () => void): void => {
	window.addEventListener('popstate', callback, { once: false });
};
