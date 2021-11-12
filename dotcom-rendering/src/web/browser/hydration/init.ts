import '../webpackPublicPath';

import { startup } from '@root/src/web/browser/startup';
import { log } from '@guardian/libs';
import { whenVisible } from './whenVisible';
import { whenIdle } from './whenIdle';
import { doHydration } from './doHydration';
import { getName } from './getName';
import { getProps } from './getProps';

const init = () => {
	/**
	 * Partial Hydration
	 *
	 * The code here looks for parts of the dom that have been marked using the `gu-hydrate`
	 * marker, hydrating each one using the following properties:
	 *
	 * when - Used to optionally defer hydration
	 * name - The name of the component. Used to dynamically import the code
	 * props - The data for the component that has been serialised in the dom
	 * marker - The `gu-hydrate` custom element which is wrapping the content
	 */
	const hydrationMarkers = document.querySelectorAll('gu-hydrate');
	hydrationMarkers.forEach((marker) => {
		if (marker instanceof HTMLElement) {
			const name = getName(marker);
			const props = getProps(marker);

			if (!name) return;
			log('dotcom', `Hydrating ${name}`);

			const when = marker.getAttribute('when');
			switch (when) {
				case 'idle': {
					whenIdle(() => {
						doHydration(name, props, marker);
					});
					break;
				}
				case 'visible': {
					whenVisible(marker, () => {
						doHydration(name, props, marker);
					});
					break;
				}
				case 'immediate':
				default: {
					doHydration(name, props, marker);
				}
			}
		}
	});

	return Promise.resolve();
};

startup('hydration', null, init);
