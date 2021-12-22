/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { hydrate, h } from 'preact';
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
 * @param marker The location on the DOM where the component to hydrate exists
 */
export const doHydration = (name: string, data: any, marker: HTMLElement) => {
	const { start, end } = initPerf(`hydrate-${name}`);
	start();
	import(
		/* webpackInclude: /\.importable\.(tsx|jsx)$/ */
		`../../components/${name}.importable`
	)
		.then((module) => {
			hydrate(h(module[name], data), marker);
			marker.setAttribute('data-gu-hydrated', 'true');
			end();
		})
		.catch((error) => {
			if (name && error.message.includes(name)) {
				console.error(
					`🚨 Error importing ${name}. Did you forget to use the [MyComponent].importable.tsx naming convention? 🚨`,
				);
			}
			throw error;
		});
};
