import { log } from '@guardian/libs';
import { useEffect } from 'react';

/**
 * This small snippet of javascript is executed at page load. It checks to
 * see if the url that was initially loaded contains a hash matching the `#img-`
 * pattern.
 *
 * If it finds one, it means the reader has clicked a link pointing directly at an
 * image so the lightbox will immediately open. But because we close the lightbox
 * by going back, we need to make sure we have an entry in the history state to
 * go back to, so we create one here.
 *
 * If we didn't do this then you'd end up back where you were when you pasted the
 * url into the browser and unable to access the article under the lightbox.
 *
 * ## Why does this need to be an Island?
 *
 * This behaviour is entirely client-side.
 *
 * ---
 *
 * Does not render **anything**.
 */
export const LightboxHash = () => {
	useEffect(() => {
		const hash = window.location.hash;
		if (hash.startsWith('#img-')) {
			log(
				'dotcom',
				'💡 An img hash was found on the url during page load, opening lightbox...',
			);
			const position = hash.substring(5);
			history.replaceState(
				{},
				'',
				window.location.pathname + window.location.search,
			);
			history.pushState({}, '', `#img-${position}`);
		}
	}, []);

	return null;
};
