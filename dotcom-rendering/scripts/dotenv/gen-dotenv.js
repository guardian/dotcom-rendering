const { CredentialsProviderError } = require('@aws-sdk/property-provider');
const path = require('path');
const { prompt, warn, log } = require('../env/log');
const fs = require('fs').promises;
const secrets = require('../secrets');
const { getGuardianConfiguration } = require('./aws-parameters');

const ENV_PATH = path.resolve(__dirname, '../../.env');

const checkEnv = async () => {
	try {
		const env = (await fs.readFile(ENV_PATH)).toString();

		let valid = true;
		for (const secret of secrets) {
			const regex = new RegExp(`^${secret.key.replace('.', '\\.')}=.*`);
			if (!env.match(regex)) valid = false;
		}

		return valid;
	} catch (_err) {
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
	try {
		const validEnv = await checkEnv();
		if (!validEnv) {
			log(
				'Your .env file is missing, attemting to generate it from AWS parameters...',
			);
			await genEnv();
		}
	} catch (err) {
		if (err instanceof CredentialsProviderError) {
			const missingMessages = Object.values(secrets).map(
				(secret) => `* ${secret.key}: ${secret.missingMessage}`,
			);

			prompt(
				'Could not load AWS credentials to generate .env file',
				"This won't stop dotcom-rendering from working, it will just vary from PROD by:",
				...missingMessages,
				'',
				'To get things working PROD like either:',
				'* Get your credentials from Janus',
				'* Ask a local engineer for a copy of the .env file',
				'',
				'Then try again.',
			);
			process.exit(0);
		} else {
			throw err;
		}
	}
})();
