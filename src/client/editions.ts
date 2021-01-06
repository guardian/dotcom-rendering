import { Platform, PlatformMessageEvent } from './editionEvents';
import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import { ShareIcon } from 'components/editions/shareIcon';

// https://github.com/react-native-webview/react-native-webview/blob/master/src/WebViewTypes.ts#L963
declare global {
	interface Window {
		ReactNativeWebView?: {
			postMessage: (data: string) => void;
		};
	}
}

if (process.env.NODE_ENV === 'development') {
	const prettyLog = (data: string) =>
		console.log(
			'🕸 => 📲 Sending postMessage to React Native\n',
			JSON.stringify(JSON.parse(data), undefined, 2),
		);
	if (window.ReactNativeWebView !== undefined) {
		window.ReactNativeWebView.postMessage = (data: string) => {
			prettyLog(data);
			window.ReactNativeWebView?.postMessage(data);
		};
	} else {
		window.ReactNativeWebView = {
			postMessage: (data: string) => prettyLog(data),
		};
	}
}

const updatePlatform = (
	event: MessageEventInit<PlatformMessageEvent>,
): void => {
	if (event.data?.type === 'platform' && event.data?.value in Platform) {
		const shareButtonContainer = document.querySelector('.js-share-button');
		ReactDOM.render(
			h(ShareIcon, { platform: event.data.value }),
			shareButtonContainer,
		);
	} else {
		const shareButtonContainer = document.querySelector('.js-share-button');
		ReactDOM.render(
			h(ShareIcon, { platform: Platform.android }),
			shareButtonContainer,
		);
	}
};

window.ReactNativeWebView?.postMessage(
	JSON.stringify({
		type: 'platform',
	}),
);

document.addEventListener('message', updatePlatform);

document.querySelector('.js-share-button')?.addEventListener('click', () => {
	window.ReactNativeWebView?.postMessage(
		JSON.stringify({
			type: 'share',
		}),
	);
});

// TODO:
// Check if it's better to render the share icon component inside a useEffect instead of here
