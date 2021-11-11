/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { hydrate, h } from 'preact';
import { initPerf } from '../initPerf';

export const doHydration = (name: string, data: any, marker: HTMLElement) => {
	const { start, end } = initPerf(name);
	start();
	import(
		/* webpackInclude: /(ClientComponent|HelloWorld)\.tsx$/ */
		`../../components/${name}`
	)
		.then((module) => {
			hydrate(h(module[name], data), marker);
			end();
		})
		.catch((error) => {
			if (name && error.message.includes(name)) {
				// Most likely, we're being asked to hydrate a component whose name hasn't been added to the
				// webpackInclude option in the dynamic import statement above
				console.error(
					`🚨 Error importing ${name}. Did you forget to update webpackInclude in hydration/doHydration.ts? 🚨`,
				);
			}
			throw error;
		});
};
