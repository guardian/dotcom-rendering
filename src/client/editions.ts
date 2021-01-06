// import { Platform, PlatformMessageEvent } from './editionEvents';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import { ShareIcon } from 'components/editions/shareIcon';

// https://github.com/react-native-webview/react-native-webview/blob/master/src/WebViewTypes.ts#L963
declare global {
	interface Window {
		ReactNativeWebView?: {
			postMessage: (data: string) => void;
		};

		sendPing?: (detail: any) => void;
	}
}

const prettyLog = (message: string, data: any) => {
	const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
	console.log(
		`${message}
${JSON.stringify(parsedData, null, 2)}`,
	);
};

if (process.env.NODE_ENV === 'development') {
	const logMessage = '🕸 => 📲 Sending postMessage to React Native';
	if (window.ReactNativeWebView !== undefined) {
		window.ReactNativeWebView.postMessage = (data: string) => {
			prettyLog(logMessage, data);
			window.ReactNativeWebView?.postMessage(data);
		};
	} else {
		window.ReactNativeWebView = {
			postMessage: (data: string) => prettyLog(logMessage, data),
		};
	}
}

window.sendPing = (detail: any) => {
	if (process.env.NODE_ENV === 'development') {
		prettyLog('📱 => 🕸 Receiving ping from React Native', detail);
	}

	let customEvent = new CustomEvent('editionsPing', { detail });
	document.dispatchEvent(customEvent);
};

ReactDOM.render(h(ShareIcon), document.querySelector('.js-share-button'));

window.ReactNativeWebView?.postMessage(
	JSON.stringify({
		type: 'platform',
	}),
);

document.querySelector('.js-share-button')?.addEventListener('click', () => {
	window.ReactNativeWebView?.postMessage(
		JSON.stringify({
			type: 'share',
		}),
	);
});
