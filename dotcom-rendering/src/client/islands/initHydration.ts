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
						void doHydration(
							name,
							props,
							element,
							emotionCache,
						).then((hydrationHappened) => {
							// Sometimes an element will already have been hydrated in which case
							// hydrationHappend is false and we can skip this
							if (hydrationHappened) {
								/**
								 * The doHydration function starts the hydration process but it
								 * only waits for the import to complete, not for the evaluation or
								 * execution of any island javascript. The mouse event fired here is,
								 * probably, dependent on that javascript setting up listeners, so
								 * we have a race condition.
								 *
								 * We can dispatch this click below but the the code that listens for
								 * it might not be ready. By waiting 150ms before trying we workaround
								 * this race condition. In the event that the listener still isn't
								 * ready even after 150ms then the user will have to click again.
								 */
								setTimeout(() => {
									targetElement.dispatchEvent(
										new MouseEvent('click', {
											bubbles: true,
										}),
									);
								}, 150);
							}
						});
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
