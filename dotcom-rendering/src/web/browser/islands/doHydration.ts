/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { log } from '@guardian/libs';
import { hydrate, render, h } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { ABProps, WithABProvider } from '../../components/WithABProvider';
import { initPerf } from '../initPerf';
import { Provider } from './getProviders';

type Data =
	| (JSXInternal.HTMLAttributes &
			JSXInternal.SVGAttributes &
			Record<string, any>)
	| null;

const ABProviderProps: ABProps =
	typeof window === 'undefined'
		? {
				abTestSwitches: {},
				pageIsSensitive: false,
				isDev: false,
		  }
		: {
				abTestSwitches: window.guardian.config.switches,
				pageIsSensitive: window.guardian.config.page.isSensitive,
				isDev: !!window.guardian.config.page.isDev,
		  };

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
export const doHydration = (
	name: string,
	data: any | Data,
	element: HTMLElement,
	providers?: Provider[],
) => {
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

			const component = h(module[name], data);

			if (clientOnly) {
				element.querySelector('[data-name="placeholder"]')?.remove();
				log('dotcom', `Rendering island ${name}`);

				if (providers?.includes('WithABProvider')) {
					render(
						h(WithABProvider, {
							...ABProviderProps,
							children: component,
						}),
						element,
					);
				} else {
					render(component, element);
				}
			} else {
				log('dotcom', `Hydrating island ${name}`);
				hydrate(component, element);
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
