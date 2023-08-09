// provides a way to use packages in scripts when we don't know
// if they've been installed yet (with yarn) by temporarily
// installing with npm if node cannot resolve the package

const { log } = require('./log');

module.exports = (...packages) =>
	new Promise((resolve) => {
		try {
			resolve(packages.map(require));
		} catch (e) {
			log(`Pre-installing dependency (${packages.join(', ')})...`);
			const npmInstallProcess = require('node:child_process')
				.spawn('npm', [
					'i',
					...packages,
					'--no-save',
					'--legacy-peer-deps',
					'--package-lock=false',
				])
				.on('close', (code) => {
					if (code !== 0) {
						process.exit(code);
					}
					try {
						resolve(packages.map(require));
					} catch (e2) {
						// eslint-disable-next-line no-console
						console.log(e2);
						process.exit(1);
					}
				})
				.stderr.on('data', (data) =>
					console.error(Buffer.from(data).toString()),
				);
		}
	});
