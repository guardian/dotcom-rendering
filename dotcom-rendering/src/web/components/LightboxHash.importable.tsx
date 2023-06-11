import { log } from '@guardian/libs';
import { useEffect } from 'react';

function checkUrlForHash() {
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
		lightboxButton?.dispatchEvent(
			new MouseEvent('click', { bubbles: true }),
		);
	}
}

/**
 * This snippet of javascript checks if the url contains an image hash, such as
 * '#img-12'. If it does, it triggers a synthetic click event on the lightbox
 * button for that image. This click event hydrates and opens the lightbox, displaying
 * the image referenced by the hash
 *
 * This code is run:
 *
 * 1) At page load, checking if a user copied a url with #img-12 at the end and
 * 2) Each time the `popstate` is fired, checking if a user is navigating back
 *    and forth through the browser history
 */
export const LightboxHash = () => {
	useEffect(() => {
		// Run once at page load
		checkUrlForHash();
		// Set a listener for page navigation
		window.addEventListener('popstate', checkUrlForHash);

		return () => {
			window.removeEventListener('popstate', checkUrlForHash);
		};
	}, []);

	// Nothing is rendered by this component
	return null;
};
