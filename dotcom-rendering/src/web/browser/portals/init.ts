import '../webpackPublicPath';

import { startup } from '@root/src/web/browser/startup';
import { log } from '@guardian/libs';
import { whenVisible } from '../whenVisible';
import { whenIdle } from '../whenIdle';
import { doRender } from './doRender';
import { getName } from '../getName';
import { getProps } from '../getProps';

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
	 * element - The `gu-portal` custom element
	 */
	document.querySelectorAll('gu-portal').forEach((element) => {
		if (element instanceof HTMLElement) {
			const name = getName(element);
			const props = getProps(element);

			if (!name) return;
			log('dotcom', `Inserting portal ${name}`);

			const when = element.getAttribute('when');
			switch (when) {
				case 'idle': {
					whenIdle(() => {
						doRender(name, props, element);
					});
					break;
				}
				case 'visible': {
					whenVisible(element, () => {
						doRender(name, props, element);
					});
					break;
				}
				case 'immediate':
				default: {
					doRender(name, props, element);
				}
			}
		}
	});

	return Promise.resolve();
};

startup('portals', null, init);
