/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { hydrate, render, h } from 'preact';
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
export const doHydration = (name: string, data: any, element: HTMLElement) => {
	// If this function has already been run for an element then don't try to
	// run it a second time
	const alreadyHydrated = element.dataset.guReady;
	if (alreadyHydrated) return;

	const { start, end } = initPerf(`hydrate-${name}`);
	start();
	import(
		/* webpackInclude: /\.importable\.(tsx|jsx)$/ */
		`../../components/${name}.importable`
	)
		.then((module) => {
			const clientOnly = element.getAttribute('clientOnly') === 'true';

			if (clientOnly) {
				element.querySelector('[data-name="placeholder"]')?.remove();
				render(h(module[name], data), element);
			} else {
				hydrate(h(module[name], data), element);
			}

			element.setAttribute('data-gu-ready', 'true');
			end();
		})
		.catch((error) => {
			if (name && error.message.includes(name)) {
				console.error(
					`🚨 Error importing ${name}. Components must live in the root of /components and follow the [MyComponent].importable.tsx naming convention 🚨`,
				);
			}
			throw error;
		});
};
