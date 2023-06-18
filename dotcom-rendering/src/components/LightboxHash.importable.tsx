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
 * the image referenced by the hash.
 *
 * This code is run at page load
 *
 */
export const LightboxHash = () => {
	useEffect(() => {
		// Run once at page load
		checkUrlForHash();
	}, []);
	// Nothing is rendered by this component
	return null;
};
