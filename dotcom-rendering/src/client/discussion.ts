import { doHydration } from './islands/doHydration';
import { getEmotionCache } from './islands/emotion';
import { getProps } from './islands/getProps';

const forceHydration = async (): Promise<void> => {
	try {
		const name = 'DiscussionContainer';

		// Select the Discussion island element
		const guElement = document.querySelector<HTMLElement>(
			`gu-island[name=${name}]`,
		);
		if (!guElement) return;

		// Read the props from where they have been serialised in the dom using an Island
		const props = getProps(guElement);

		// Now that we have the props as an object, tell Discussion we want it to expand itself
		props.expanded = true;

		// Force hydration
		await doHydration(name, props, guElement, getEmotionCache());
	} catch (err) {
		// Do nothing
	}
};

/**
 * If we have either a #comment-123456 permalink or the #comments link in the url
 * then we want to hydrate and expand the discussion without waiting for the
 * reader to scroll down to it
 *
 */
export const discussion = async (): Promise<void> => {
	if (window.location.hash.startsWith('#comment')) await forceHydration();
};
