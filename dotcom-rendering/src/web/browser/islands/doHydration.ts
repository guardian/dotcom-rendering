/* eslint-disable @typescript-eslint/no-unsafe-member-access -- necessary for calling our async loaded modules */
import { log } from '@guardian/libs';
import { h, hydrate, render } from 'preact';
import { initPerf } from '../initPerf';

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
 */
export const doHydration = async (
	name: string,
	data: { [key: string]: unknown } | null,
	element: HTMLElement,
): Promise<{ success: boolean }> => {
	// If this function has already been run for an element then don't try to
	// run it a second time
	const alreadyHydrated = element.dataset.guReady;
	if (alreadyHydrated) return { success: false };

	const { start: importStart, end: importEnd } = initPerf(`import-${name}`);
	importStart();
	await import(
		/* webpackInclude: /\.importable\.tsx$/ */
		/* webpackChunkName: "[request]" */
		`../../components/${name}.importable`
	)
		.then((module) => {
			/** The duration of importing the module for this island */
			const importDuration = importEnd();
			const clientOnly = element.getAttribute('clientOnly') === 'true';

			const { start: islandStart, end: islandEnd } = initPerf(
				`island-${name}`,
			);
			islandStart();

			if (clientOnly) {
				element.querySelector('[data-name="placeholder"]')?.remove();
				render(h(module[name], data), element);
			} else {
				hydrate(h(module[name], data), element);
			}

			element.setAttribute('data-gu-ready', 'true');
			/** The duration of rendering or hydrating this island */
			const islandDuration = islandEnd();

			return { clientOnly, importDuration, islandDuration };
		})
		.then(({ clientOnly, importDuration, islandDuration }) => {
			if (!('getEntriesByType' in window.performance)) return;

			const action = clientOnly ? 'Rendering' : 'Hydrating';

			log(
				'dotcom',
				`🏝 ${action} island <${name} /> took ${islandDuration}ms (imported in ${importDuration}ms)`,
			);
		})
		.catch((error) => {
			if (name && error.message.includes(name)) {
				console.error(
					`🚨 Error importing ${name}. Components must live in the root of /components and follow the [MyComponent].importable.tsx naming convention 🚨`,
				);
			}
			throw error;
		});

	return { success: true };
};
