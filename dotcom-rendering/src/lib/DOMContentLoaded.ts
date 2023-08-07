/**
 * @returns a Promise that resolves when the DOM is ready.
 *
 * @see [MDN – Checking whether loading is already complete](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event#checking_whether_loading_is_already_complete)
 */
export const DOMContentLoaded = new Promise<void>((resolve) => {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => resolve(), {
			once: true,
		});
	} else {
		resolve();
	}
});
