/* eslint-disable @typescript-eslint/no-unsafe-member-access -- necessary for calling our async loaded modules */
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { log, startPerformanceMeasure } from '@guardian/libs';
import { createElement } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ConfigProvider } from '../../components/ConfigContext';
import type { Config } from '../../types/configContext';

declare global {
	interface DOMStringMap {
		/**
		 * Defines the current state of the Island.
		 * `undefined` at server-side rendering
		 */
		islandStatus?: 'identified' | 'imported' | 'rendered' | 'hydrated';
	}
}

/**
 * This function dynamically imports and then hydrates a specific component in
 * a specific part of the page
 *
 * If the content being hydrated is not present in the dom then React renders
 * it. This is how portals (non server side rendered content) work
 *
 * @param name The name of the component we want to hydrate
 * @param data The deserialised props we want to use for hydration
 * @param element The location on the DOM where the component to hydrate exists
 * @param emotionCache An instance of an emotion cache to use for the island
 * @param config Application configuration to be passed to the config context for the hydrated component
 */
export const doHydration = async (
	name: string,
	data: { [key: string]: unknown } | null,
	element: HTMLElement,
	emotionCache: EmotionCache,
	config: Config,
): Promise<void> => {
	// If this function has already been run for an element then don't try to
	// run it a second time
	if (element.dataset.islandStatus !== undefined) return;
	else element.dataset.islandStatus = 'identified';

	const { endPerformanceMeasure: endImportPerformanceMeasure } =
		startPerformanceMeasure('dotcom', name, 'import');
	await import(
		/* webpackInclude: /\.importable\.tsx$/ */
		/* webpackChunkName: "[request]" */
		`../../components/${name}.importable`
	)
		.then((module) => {
			/** The duration of importing the module for this island */
			const importDuration = endImportPerformanceMeasure();
			const clientOnly = element.hasAttribute('clientonly');
			element.dataset.islandStatus = 'imported';

			const { endPerformanceMeasure: endIslandPerformanceMeasure } =
				startPerformanceMeasure('dotcom', name, 'island');

			if (clientOnly) {
				element.querySelector('[data-name="placeholder"]')?.remove();
				const root = createRoot(element);
				root.render(
					<ConfigProvider value={config}>
						<CacheProvider value={emotionCache}>
							{createElement(module[name], data)}
						</CacheProvider>
					</ConfigProvider>,
				);
			} else {
				hydrateRoot(
					element,
					<ConfigProvider value={config}>
						<CacheProvider value={emotionCache}>
							{createElement(module[name], data)}
						</CacheProvider>
					</ConfigProvider>,
				);
			}

			/** The duration of rendering or hydrating this island */
			const islandDuration = endIslandPerformanceMeasure();

			return { clientOnly, importDuration, islandDuration };
		})
		.then(({ clientOnly, importDuration, islandDuration }) => {
			if (!('getEntriesByType' in window.performance)) return;

			const action = clientOnly ? 'rendered' : 'hydrated';
			element.dataset.islandStatus = action;

			log(
				'dotcom',
				`🏝 <${name} /> ${action} in ${islandDuration}ms (imported in ${importDuration}ms)`,
			);
		})
		.catch((error) => {
			element.dataset.islandStatus = undefined; // remove any island status
			if (name && error.message.includes(name)) {
				console.error(
					`🚨 Error importing ${name}. Components must live in the root of /components and follow the [MyComponent].importable.tsx naming convention 🚨`,
				);
			}
			throw error;
		});
};
