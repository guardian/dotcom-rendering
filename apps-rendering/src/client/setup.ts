// ----- Imports ----- //

import interactives from './interactives';
import newsletterEmbeds from './newsletterEmbeds';

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
	interactives();
	twitter();
	platformCSS();
	newsletterEmbeds();
}

// ----- Exports ----- //

export default setup;
