import React from 'react';
import ReactDOM from 'react-dom';
import { getName } from './getName';
import { getProps } from './getProps';

/**
 * This is a cut down version of the islands/doHydration function that is
 * used as part of the Islands flow for hydrating DCR pages.
 *
 * We don't use that specific function directly for two reasons:
 *
 * 1) We need to use React here, not Preact. Otherwise we get errors about
 *    conflicting versions of React
 *
 * 2) We don't want to defer hydration as this could affect our Chromatic
 *    snapshots
 */
export const doStorybookHydration = () => {
	document.querySelectorAll('gu-island').forEach((element) => {
		if (element instanceof HTMLElement) {
			const name = getName(element);
			const props = getProps(element);

			if (!name) return;
			if (element.getAttribute('deferuntil') === 'hash') return;

			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			import(
				/* webpackInclude: /\.importable\.tsx$/ */
				/* webpackChunkName: "[request]" */
				`../../components/${name}.importable`
			).then((module) => {
				element.querySelector('[data-name="placeholder"]')?.remove();
				ReactDOM.render(
					React.createElement(module[name], props),
					element,
				);
			});
		}
	});
};
