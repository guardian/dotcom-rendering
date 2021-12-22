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
	 * Partial Hydration / React Islands
	 *
	 * The code here looks for parts of the dom that have been marked using the `gu-island`
	 * marker, hydrating/rendering each one using the following properties:
	 *
	 * defer - Used to optionally defer execution
	 * name - The name of the component. Used to dynamically import the code
	 * props - The data for the component that has been serialised in the dom
	 * marker - The `gu-island` custom element which is wrapping the content
	 */
	document.querySelectorAll('gu-island').forEach((marker) => {
		if (marker instanceof HTMLElement) {
			const name = getName(marker);
			const props = getProps(marker);

			if (!name) return;
			log('dotcom', `Hydrating ${name}`);

			const defer = marker.getAttribute('defer');
			switch (defer) {
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
				default: {
					doHydration(name, props, marker);
				}
			}
		}
	});

	return Promise.resolve();
};

startup('hydration', null, init);
