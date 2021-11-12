/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { hydrate, h } from 'preact';
import { initPerf } from '../initPerf';

export const doHydration = (name: string, data: any, marker: HTMLElement) => {
	const { start, end } = initPerf(name);
	start();
	import(
		/* webpackInclude: /\.importable\.(tsx|jsx)$/ */
		`../../components/${name}.importable`
	)
		.then((module) => {
			hydrate(h(module[name], data), marker);
			end();
		})
		.catch((error) => {
			if (name && error.message.includes(name)) {
				console.error(
					`🚨 Error importing ${name}. Did you forget to use th [MyComponent].importable.tsx naming convention? 🚨`,
				);
			}
			throw error;
		});
};
