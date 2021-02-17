// ----- Imports ----- //

import { metrics } from 'client/metrics';
import { metricsClient } from 'native/nativeApi';
import interactives from './interactives';

// ----- Procedures ----- //

function twitter(): void {
	const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
		.matches;
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

function setup(): void {
	performanceMetrics();
	interactives();
	twitter();
}

// ----- Exports ----- //

export default setup;
