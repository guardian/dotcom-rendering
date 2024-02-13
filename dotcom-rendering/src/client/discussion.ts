import { doHydration } from './islands/doHydration';
import { getEmotionCache } from './islands/emotion';
import { getConfig } from './islands/getConfig';
import { getProps } from './islands/getProps';

const forceHydration = async (): Promise<void> => {
	try {
		// Select the Discussion island element
		const [guElement, ...rest] = document.querySelectorAll<HTMLElement>(
			`gu-island[name=DiscussionWeb],gu-island[name=DiscussionApps]`,
		);

		// If no discussion island is found, or if there are multiple discussion islands, then we don't want to force hydration
		if (!guElement) return;
		if (rest.length > 0) return;

		const name = guElement.getAttribute('name');
		if (!name) return;

		// Read the props and config from where they have been serialised in the dom using an Island
		const props = getProps(guElement);
		const config = getConfig(guElement);

		// Now that we have the props as an object, tell Discussion we want it to expand itself
		props.expanded = true;

		// Force hydration
		await doHydration(name, props, guElement, getEmotionCache(), config);
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
