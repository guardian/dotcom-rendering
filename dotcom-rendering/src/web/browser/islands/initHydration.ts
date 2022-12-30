import { doHydration } from './doHydration';
import { getName } from './getName';
import { getProps } from './getProps';
import { onInteraction } from './onInteraction';
import { whenIdle } from './whenIdle';
import { whenVisible } from './whenVisible';

export const initHydration = (elements: NodeListOf<Element>): void => {
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
						void doHydration(name, props, element);
					});
					break;
				}
				case 'visible': {
					whenVisible(element, () => {
						void doHydration(name, props, element);
					});
					break;
				}
				case 'interaction': {
					onInteraction(element, (targetElement) => {
						void doHydration(name, props, element).then(
							({ success }) => {
								if (success) {
									setTimeout(() => {
										targetElement.dispatchEvent(
											new MouseEvent('click', {
												bubbles: true,
											}),
										);
									}, 50);
								}
							},
						);
					});
					break;
				}
				case 'hash': {
					if (window.location.hash.includes(name)) {
						void doHydration(name, props, element);
					}
					break;
				}
				default: {
					void doHydration(name, props, element);
				}
			}
		}
	});
};
