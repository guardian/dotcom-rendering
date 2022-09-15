// provides a way to use packages in scripts when we don't know
// if they've been installed yet (with yarn) by temporarily
// installing with npm if node cannot resolve the package

import { log } from './log.js';

/** @type {(...packages: string[]) => Promise<any[]>} */
export const ensure = (...packages) =>
	new Promise(async (resolve) => {
		try {
			resolve(await Promise.all(packages.map((pkg) => import(pkg))));
		} catch (e) {
			log(`Pre-installing dependency (${packages.join(', ')})...`);
			(await import('child_process'))
				.spawn('npm', ['i', ...packages, '--no-save'])
				.on('close', async (code) => {
					if (code !== 0) {
						process.exit(code);
					}
					try {
						resolve(
							await Promise.all(
								packages.map((pkg) => import(pkg)),
							),
						);
					} catch (e2) {
						// eslint-disable-next-line no-console
						console.log(e2);
						process.exit(1);
					}
				});
		}
	});
