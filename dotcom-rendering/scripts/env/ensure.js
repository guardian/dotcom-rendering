import { log } from './log.js';

export default (...packages) =>
	new Promise((resolve) => {
		try {
			resolve(packages.map((p) => import(p)));
		} catch (e) {
			log(`Pre-installing dependency (${packages.join(', ')})...`);
			require('child_process')
				.spawn('npm', ['i', ...packages, '--no-save'])
				.on('close', (code) => {
					if (code !== 0) {
						process.exit(code);
					}
					try {
						resolve(packages.map((p) => import(p)));
					} catch (e2) {
						log(e2);
						process.exit(1);
					}
				});
		}
	});
