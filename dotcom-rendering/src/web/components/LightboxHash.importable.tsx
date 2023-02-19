import { log } from '@guardian/libs';
import { useEffect } from 'react';

/**
 * This snippet of javascript is executed at page load to check if the url
 * contains an image hash, such as '#img-12'. If it does, it triggers a
 * synthetic click event on the lightbox button for that image. This click
 * event hydrates and opens the lightbox, displaying the image referenced
 * by the hash
 */
export const LightboxHash = () => {
	useEffect(() => {
		const hash = window.location.hash;
		if (hash.startsWith('#img-')) {
			const position = hash.substring(5);
			const lightboxButton = document.querySelector(
				`[id="img-${position}"] gu-island button`,
			);
			log('dotcom', `💡 Simulating click on image ${position}`);
			lightboxButton?.dispatchEvent(
				new MouseEvent('click', { bubbles: true }),
			);
		}
	}, []);
	// Nothing is rendered by this component
	return null;
};
