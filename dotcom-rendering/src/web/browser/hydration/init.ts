import '../webpackPublicPath';

import { startup } from '@root/src/web/browser/startup';
import { log } from '@guardian/libs';
import { whenVisible } from './whenVisible';
import { whenIdle } from './whenIdle';
import { doHydration } from './doHydration';
import { getName } from './getName';
import { getProps } from './getProps';

const init = () => {
	// HYDRATION
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
