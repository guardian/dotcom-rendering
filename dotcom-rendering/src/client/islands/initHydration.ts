import type { EmotionCache } from '@emotion/cache';
import { isUndefined } from '@guardian/libs';
import { schedule } from '../../lib/scheduler';
import { doHydration } from './doHydration';
import { getConfig } from './getConfig';
import { getName } from './getName';
import { getPriority } from './getPriority';
import { getProps } from './getProps';
import { onInteraction } from './onInteraction';
import { onNavigation } from './onNavigation';
import { whenIdle } from './whenIdle';
import { whenVisible } from './whenVisible';

/**
 * The hash values that we want to use to trigger hydration are different
 * for lightbox. Instead of using the name of the component, we look for
 * the img- text at the start.
 */
function hasLightboxHash(name: string) {
	return (
		name === 'LightboxJavascript' &&
		window.location.hash.startsWith('#img-')
	);
}

/**
 * Partial Hydration / React Islands
 *
 * The code here looks for parts of the dom that have been marked using the `gu-island`
 * marker, hydrating/rendering each one using the following properties:
 *
 * deferUntil - Used to optionally defer execution
 * name - The name of the component. Used to dynamically import the code
 * props - The data for the component that has been serialised in the dom
 * element - The `gu-island` custom element which is wrapping the content
 */
export const initHydration = async (
	element: HTMLElement,
	emotionCache: EmotionCache,
): Promise<void> => {
	const name = getName(element);
	const props = getProps(element);
	const config = getConfig(element);
	const priority = getPriority(element);

	if (!name) return;
	if (isUndefined(priority)) return;

	const scheduleHydration = () =>
		schedule(
			name,
			() => doHydration(name, props, element, emotionCache, config),
			{ priority },
		);

	const deferUntil = element.getAttribute('deferuntil');
	switch (deferUntil) {
		case 'idle': {
			whenIdle(() => void scheduleHydration());
			return;
		}
		case 'visible': {
			const rootMargin = element.getAttribute('rootmargin') ?? undefined;
			whenVisible(element, () => void scheduleHydration(), {
				rootMargin,
			});
			return;
		}
		case 'interaction': {
			onInteraction(element, async (targetElement) => {
				await scheduleHydration();
				targetElement.dispatchEvent(new MouseEvent('click'));
			});
			return;
		}
		case 'hash': {
			if (window.location.hash.includes(name) || hasLightboxHash(name)) {
				return scheduleHydration();
			} else {
				// If we didn't find a matching hash on page load, set a
				// listener so that we check again each time the reader
				// navigates within the page (changes the hash on the url)
				onNavigation(() => {
					if (
						window.location.hash.includes(name) ||
						hasLightboxHash(name)
					) {
						void scheduleHydration();
					}
				});
			}
			return;
		}
		default: {
			return scheduleHydration();
		}
	}
};
