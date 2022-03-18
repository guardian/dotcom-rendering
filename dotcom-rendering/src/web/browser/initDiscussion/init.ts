import '../webpackPublicPath';
import { startup } from '../startup';
import { getProps } from '../islands/getProps';
import { doHydration } from '../islands/doHydration';
import { getName } from '../islands/getName';

async function forceHydration() {
	try {
		// Select the Discussion island element
		const guElement = document.querySelector<HTMLElement>(
			'gu-island[name=DiscussionContainer]',
		);
		if (!guElement) return;

		// Read the props from where they have been serialised in the dom using an Island
		const props = getProps(guElement);
		const name = getName(guElement);

		// Ensure we have name
		if (!name) return;

		// Now that we have the props as an object, tell Discussion we want it to expand itself
		props.expanded = true;

		// Force hydration
		await doHydration(name, props, guElement);
	} catch (err) {
		// Do nothing
	}
}

const init = (): Promise<void> => {
	/**
	 * If we have either a #comment-123456 permalink or the #comments link in the url
	 * then we want to hydrate and expand the discussion without waiting for the
	 * reader to scroll down to it
	 *
	 */
	const hashLink = window.location.hash;
	if (hashLink && hashLink.includes('comment')) return forceHydration();

	return Promise.resolve();
};

startup('initDiscussion', null, init);
