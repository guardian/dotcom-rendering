import '../webpackPublicPath';

import { startup } from '@root/src/web/browser/startup';
import { log } from '@guardian/libs';
import { whenVisible } from '../hydration/whenVisible';
import { whenIdle } from '../hydration/whenIdle';
import { doRender } from './doRender';
import { getName } from '../hydration/getName';
import { getProps } from '../hydration/getProps';

const init = () => {
	/**
	 * Portals
	 *
	 * The code here looks for `gu-portal` markers in the the dom and then renders
	 * the requested content based on the provided attributes:
	 *
	 * when - Used to optionally defer insertion
	 * name - The name of the component. Used to dynamically import the code
	 * props - The data for the component that has been serialised in the dom
	 * marker - The `gu-portal` custom element
	 */
	document.querySelectorAll('gu-portal').forEach((marker) => {
		if (marker instanceof HTMLElement) {
			const name = getName(marker);
			const props = getProps(marker);

			if (!name) return;
			log('dotcom', `Inserting portal ${name}`);

			const when = marker.getAttribute('when');
			switch (when) {
				case 'idle': {
					whenIdle(() => {
						doRender(name, props, marker);
					});
					break;
				}
				case 'visible': {
					whenVisible(marker, () => {
						doRender(name, props, marker);
					});
					break;
				}
				case 'immediate':
				default: {
					doRender(name, props, marker);
				}
			}
		}
	});

	return Promise.resolve();
};

startup('portals', null, init);
