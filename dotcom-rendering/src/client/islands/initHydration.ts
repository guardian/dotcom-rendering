import { doHydration } from './doHydration.tsx';
import { getEmotionCache } from './emotion.ts';
import { getName } from './getName.ts';
import { getProps } from './getProps.ts';
import { onInteraction } from './onInteraction.ts';
import { onNavigation } from './onNavigation.ts';
import { whenIdle } from './whenIdle.ts';
import { whenVisible } from './whenVisible.ts';

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

export const initHydration = (elements: NodeListOf<Element>): void => {
	// Get the emotion cache which is shared between islands
	const emotionCache = getEmotionCache();

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
	elements.forEach((element) => {
		if (element instanceof HTMLElement) {
			const name = getName(element);
			const props = getProps(element);

			if (!name) return;

			const deferUntil = element.getAttribute('deferuntil');
			switch (deferUntil) {
				case 'idle': {
					whenIdle(() => {
						void doHydration(name, props, element, emotionCache);
					});
					break;
				}
				case 'visible': {
					const rootMargin =
						element.getAttribute('rootmargin') ?? undefined;
					whenVisible(
						element,
						() => {
							void doHydration(
								name,
								props,
								element,
								emotionCache,
							);
						},
						{ rootMargin },
					);
					break;
				}
				case 'interaction': {
					onInteraction(element, (targetElement) => {
						void doHydration(
							name,
							props,
							element,
							emotionCache,
						).then(() => {
							targetElement.dispatchEvent(
								new MouseEvent('click'),
							);
						});
					});
					break;
				}
				case 'hash': {
					if (
						window.location.hash.includes(name) ||
						hasLightboxHash(name)
					) {
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
								void doHydration(
									name,
									props,
									element,
									emotionCache,
								);
							}
						});
					}
					break;
				}
				default: {
					void doHydration(name, props, element, emotionCache);
				}
			}
		}
	});
};
