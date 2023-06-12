import { doHydration } from './doHydration';
import { getEmotionCache } from './emotion';
import { getName } from './getName';
import { getProps } from './getProps';
import { onInteraction } from './onInteraction';
import { whenIdle } from './whenIdle';
import { whenVisible } from './whenVisible';

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
						void doHydration(name, props, element, emotionCache);
						/**
						 * The doHydration function starts the hydration process but it
						 * only waits for the import to complete, not for the evaluation or
						 * execution of any island javascript. The mouse event fired here is,
						 * probably, dependent on that javascript setting up listeners, so
						 * we have a race condition. By waiting 150ms we are likely to win
						 * the race in most cases but if we don't, a second click attempt
						 * will be needed
						 *
						 * But why not wait for the import at least?
						 * -----------------------------------------
						 * Because calls to `requestFullScreen` need to be triggered by user
						 * interaction but Safari 'loses track' of the fact a button was
						 * clicked if we await the island import
						 *
						 * This concept is known as Transient activation and different
						 * browsers decide this state differently
						 *
						 * https://developer.mozilla.org/en-US/docs/Glossary/Transient_activation
						 *
						 */
						setTimeout(() => {
							targetElement.dispatchEvent(
								new MouseEvent('click', {
									bubbles: true,
								}),
							);
						}, 150);
					});
					break;
				}
				case 'hash': {
					if (window.location.hash.includes(name)) {
						void doHydration(name, props, element, emotionCache);
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
