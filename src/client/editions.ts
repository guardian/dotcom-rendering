declare module 'ReactNativeWebView' {
	global {
		interface Window {
			ReactNativeWebView: {
				postMessage: (data: string) => void;
			};
		}
	}
}
