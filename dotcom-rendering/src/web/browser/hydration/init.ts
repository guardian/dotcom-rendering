import '../webpackPublicPath';

import { startup } from '@root/src/web/browser/startup';
import { log } from '@guardian/libs';
import { whenVisible } from '../whenVisible';
import { whenIdle } from '../whenIdle';
import { doHydration } from './doHydration';
import { getName } from '../getName';
import { getProps } from '../getProps';

const init = () => {
	/**
	 * Partial Hydration
	 *
	 * The code here looks for parts of the dom that have been marked using the `gu-hydrate`
	 * element, hydrating each one using the following properties:
	 *
	 * when - Used to optionally defer hydration
	 * name - The name of the component. Used to dynamically import the code
	 * props - The data for the component that has been serialised in the dom
	 * element - The `gu-hydrate` custom element which is wrapping the content
	 */
	const hydrationMarkers = document.querySelectorAll('gu-hydrate');
	hydrationMarkers.forEach((element) => {
		if (element instanceof HTMLElement) {
			const name = getName(element);
			const props = getProps(element);

			if (!name) return;
			log('dotcom', `Hydrating ${name}`);

			const when = element.getAttribute('when');
			switch (when) {
				case 'idle': {
					whenIdle(() => {
						doHydration(name, props, element);
					});
					break;
				}
				case 'visible': {
					whenVisible(element, () => {
						doHydration(name, props, element);
					});
					break;
				}
				case 'immediate':
				default: {
					doHydration(name, props, element);
				}
			}
		}
	});

	return Promise.resolve();
};

startup('hydration', null, init);
