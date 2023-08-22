import type { EmotionCache } from '@emotion/cache';
import { doHydration } from './doHydration';
import { getName } from './getName';
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

	if (!name) return;

	const deferUntil = element.getAttribute('deferuntil');
	switch (deferUntil) {
		case 'idle': {
			whenIdle(() => {
				void doHydration(name, props, element, emotionCache);
			});
			return;
		}
		case 'visible': {
			const rootMargin = element.getAttribute('rootmargin') ?? undefined;
			whenVisible(
				element,
				() => {
					void doHydration(name, props, element, emotionCache);
				},
				{ rootMargin },
			);
			return;
		}
		case 'interaction': {
			onInteraction(element, (targetElement) => {
				void doHydration(name, props, element, emotionCache).then(
					() => {
						targetElement.dispatchEvent(new MouseEvent('click'));
					},
				);
			});
			return;
		}
		case 'hash': {
			if (window.location.hash.includes(name) || hasLightboxHash(name)) {
				void doHydration(name, props, element, emotionCache);
			} else {
				// If we didn't find a matching hash on page load, set a
				// listener so that we check again each time the reader
				// navigates within the page (changes the hash on the url)
				onNavigation(() => {
					if (
						window.location.hash.includes(name) ||
						hasLightboxHash(name)
					) {
						void doHydration(name, props, element, emotionCache);
					}
				});
			}
			return;
		}
		default: {
			return doHydration(name, props, element, emotionCache);
		}
	}
};
