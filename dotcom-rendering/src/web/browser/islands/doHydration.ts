/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { log } from '@guardian/libs';
import { hydrate, render, h } from 'preact';
import { initPerf } from '../initPerf';

export const doComponentHydration = (
	name: string,
	data: any,
	element: HTMLElement,
) => {
	// If this function has already been run for an element then don't try to
	// run it a second time
	const alreadyHydrated = element.dataset.guReady;
	if (alreadyHydrated) return;

	const { start, end } = initPerf(`hydrate-${name}`);
	start();
	import(
		/* webpackInclude: /\.importable\.tsx$/ */
		/* webpackChunkName: "[request]" */
		`../../components/${name}.importable`
	)
		.then((module) => {
			const clientOnly = element.getAttribute('clientOnly') === 'true';

			if (clientOnly) {
				element.querySelector('[data-name="placeholder"]')?.remove();
				log('dotcom', `Rendering island ${name}`);
				render(h(module[name], data), element);
			} else {
				log('dotcom', `Hydrating island ${name}`);
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

export const doScriptHydration = (
	name: string,
	data: any,
	element: HTMLElement,
) => {
	// If this function has already been run for an element then don't try to
	// run it a second time
	const alreadyHydrated = element.dataset.guReady;
	if (alreadyHydrated) return;

	const { start, end } = initPerf(`load-${name}`);
	start();
	import(
		/* webpackInclude: /\.importable\.ts$/ */
		/* webpackChunkName: "[request]" */
		`../../lib/${name}.importable`
	)
		.then((module) => {
			log('dotcom', `Loading island ${name}`);
			// Data is an array of arguments to be passed
			// e.g ["arg1", true, 5, "etc"],
			module[name](...data);

			element.setAttribute('data-gu-ready', 'true');
			end();
		})
		.catch((error) => {
			if (name && error.message.includes(name)) {
				console.error(
					`🚨 Error importing ${name}. Scripts must live in the root of /lib, be named [MyScript].importable.ts and export a function named named [MyScript] 🚨`,
				);
			}
			throw error;
		});
};

/**
 * This function dynamically imports either a script or component from an island
 *
 * If it's a script, it will be dynamically called, passing the data through as arguments.
 * While the location of scripts in DOM does not matter, the element is used to track the island
 * data.
 *
 * If it's a component, it will hydrate the component in the specific part of the page.
 * If the content being hydrated is not present in the dom then React renders
 * it. This is how portals (non server side rendered content) work
 *
 * @param name The name of the component or script we want to hydrate
 * @param data The deserialised props/arguments we want to use for hydration
 * @param element The location on the DOM where the component to hydrate exists
 */
export const doHydration = (name: string, data: any, element: HTMLElement) => {
	const type = element.getAttribute('type');
	if (type === 'script') doScriptHydration(name, data, element);
	else doComponentHydration(name, data, element);
};
