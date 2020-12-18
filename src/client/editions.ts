declare module 'ReactNativeWebView' {
	global {
		interface Window {
			ReactNativeWebView: {
				postMessage: (data: string) => void;
			};
		}
	}
}

document.querySelector('.js-share-button')?.addEventListener('click', () => {
	window.ReactNativeWebView.postMessage(
		JSON.stringify({
			type: 'share',
		}),
	);
});
