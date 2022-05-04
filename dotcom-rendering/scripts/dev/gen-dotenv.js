const path = require('path');
const fs = require('fs').promises;
const secrets = require('../secrets');
const { getGuardianConfiguration } = require('./aws-parameters');

const ENV_PATH = path.resolve(__dirname, '../../.env');

const checkEnv = async () => {
	try {
		const env = (await fs.readFile(ENV_PATH)).toString();

		let valid = true;
		for (const secret of secrets) {
			const regex = new RegExp(`^${secret.replace('.', '\\.')}=.*`);
			if (!env.match(regex)) valid = false;
		}

		return valid;
	} catch (err) {
		console.error(err);
		return false;
	}
};

const genEnv = async () => {
	const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
	const configuration = await getGuardianConfiguration(env);

	let envString = '';
	for (const secretKey of secrets) {
		// eslint-disable-next-line no-await-in-loop
		envString += `${secretKey}=${configuration.getParameter(secretKey)}\n`;
	}

	await fs.writeFile(ENV_PATH, envString);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
	const validEnv = await checkEnv();

	console.log('valid env', validEnv);

	if (!validEnv) await genEnv();
})();
