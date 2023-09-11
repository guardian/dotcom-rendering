import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from '../../components/ConfigContext';
import { getConfig } from './getConfig';
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
	for (const element of document.querySelectorAll('gu-island')) {
		if (element instanceof HTMLElement) {
			const name = getName(element);
			const props = getProps(element);
			const config = getConfig(element);

			if (!name) continue;
			if (element.getAttribute('deferuntil') === 'hash') continue;

			import(
				/* webpackInclude: /\.importable\.tsx$/ */
				/* webpackChunkName: "[request]" */
				`../../components/${name}.importable`
			)
				.then((module) => {
					element
						.querySelector('[data-name="placeholder"]')
						?.remove();
					const root = createRoot(element);
					root.render(
						<ConfigProvider value={config}>
							{createElement(module[name], props)}
						</ConfigProvider>,
					);
				})
				.catch((e) =>
					// eslint-disable-next-line no-console -- We want to log here
					console.error(
						'Failed hydration for storybook environment',
						e,
					),
				);
		}
	}
};
