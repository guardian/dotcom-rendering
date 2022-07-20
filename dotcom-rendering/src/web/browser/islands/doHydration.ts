import { log } from '@guardian/libs';
import type { Attributes } from 'preact';
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
export const doHydration = (
	name: string,
	data: Attributes | null,
	element: HTMLElement,
): void => {
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
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument -- eslint does not know the type of our modules
				render(h(module[name], data), element);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument -- eslint does not know the type of our modules
				hydrate(h(module[name], data), element);
			}

			element.setAttribute('data-gu-ready', 'true');
			const timeTaken = end();

			return { clientOnly, timeTaken };
		})
		.then(({ clientOnly, timeTaken }) => {
			// Log performance info
			const { duration: download = -1 } =
				window.performance
					.getEntriesByType('resource')
					.find((p) => p.name.includes(`/${name}-importable.`)) ?? {};

			const action = clientOnly ? 'Rendering' : 'Hydrating';

			log(
				'dotcom',
				`🏝 ${action} island <${name} /> took ${timeTaken}ms (downloaded in ${download}ms)`,
			);
		})
		.catch((error) => {
			if (error instanceof Error) {
				if (
					window.guardian.config.isDev &&
					name &&
					error.message.includes(name)
				) {
					// eslint-disable-next-line no-console -- We want to log this
					console.error(
						`Error importing '${name}'. (🚨 Components must live in the root of /components and follow the [MyComponent].importable.tsx naming convention 🚨)`,
					);
				}
				window.guardian.modules.sentry.reportError(
					error,
					'islands-do-hydration',
				);
			} else {
				// eslint-disable-next-line no-console -- We want to log this
				console.error(
					'[islands-do-hydration] Unknown error type:',
					error,
				);
			}
		});
};
