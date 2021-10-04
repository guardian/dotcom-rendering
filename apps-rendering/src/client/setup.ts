// ----- Imports ----- //

import { metrics } from 'client/metrics';
import { metricsClient } from 'native/nativeApi';
import interactives from './interactives';

// ----- Procedures ----- //

function twitter(): void {
	const isDarkMode = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches;
	const themeMeta = document.getElementById('twitter-theme');

	if (isDarkMode) {
		themeMeta?.setAttribute('content', 'dark');
	}
}

function performanceMetrics(): void {
	window.addEventListener(
		'load',
		() => {
			const metricsToSend = metrics(performance.getEntries());
			void metricsClient.sendMetrics(metricsToSend);
		},
		{ once: true },
	);
}

function platformCSS(): void {
	const getPlatformClass = (): string => {
		const ua = navigator.userAgent;
		if (/android/i.test(ua)) {
			return 'js-android';
		}
		return 'js-ios';
	};
	document.body.classList.add(getPlatformClass());
}

function setup(): void {
	performanceMetrics();
	interactives();
	twitter();
	platformCSS();
}

// ----- Exports ----- //

export default setup;
