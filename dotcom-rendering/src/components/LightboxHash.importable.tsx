import { log } from '@guardian/libs';
import { useEffect } from 'react';

function checkUrlForHash(options: { initialPageLoad?: boolean }) {
	const hash = window.location.hash;
	const lightbox = document.querySelector<HTMLElement>('#gu-lightbox');
	if (
		hash.startsWith('#img-') &&
		lightbox &&
		!lightbox.hasAttribute('open')
	) {
		log('dotcom', '💡 An img hash was found, opening lightbox...');
		const position = hash.substring(5);
		const lightboxButton = document.querySelector(
			`[id="img-${position}"] gu-island button`,
		);
		log('dotcom', `💡 Simulating click on image ${position}`);
		// This is different in different browsers but this synthetic event may not have
		// Transient Activation state so browsers might not allow fullscreen to open
		// https://developer.mozilla.org/en-US/docs/Glossary/Transient_activation
		lightboxButton?.dispatchEvent(
			new MouseEvent('click', { bubbles: true }),
		);
		if (options.initialPageLoad) {
			/**
			 * Because we close the lightbox by going back, we need to make sure we
			 * have an entry in the history state to go back to when the initial url
			 * at page load itself contains the img hash, so we create one here. If
			 * we didn't do this then you'd end up back where you were when you pasted
			 * the url into the browser
			 */
			history.replaceState(
				{},
				'',
				window.location.pathname + window.location.search,
			);
			window.history.pushState({}, '', `#img-${position}`);
		}
	}
}

/**
 * This snippet of javascript checks if the url contains an image hash, such as
 * '#img-12'. If it does, it triggers a synthetic click event on the lightbox
 * button for that image. This click event hydrates and opens the lightbox, displaying
 * the image referenced by the hash.
 *
 * This code is run at page load and on each subsequent navigation
 *
 */
export const LightboxHash = () => {
	useEffect(() => {
		// Run once at page load
		checkUrlForHash({ initialPageLoad: true });
		// Set a listener for page navigation
		const checkHashOnNavigation = () =>
			checkUrlForHash({ initialPageLoad: false });
		window.addEventListener('popstate', checkHashOnNavigation);
		return () => {
			window.removeEventListener('popstate', checkHashOnNavigation);
		};
	}, []);
	// Nothing is rendered by this component
	return null;
};
