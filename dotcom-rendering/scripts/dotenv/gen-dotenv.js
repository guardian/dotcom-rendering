const { CredentialsProviderError } = require('@aws-sdk/property-provider');
const path = require('path');
const { prompt, log, warn } = require('../env/log');
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
				'[scripts/dotenv] Your .env file is missing, attemting to generate it from AWS parameters...',
			);
			await genEnv();
		}
	} catch (err) {
		if (err instanceof CredentialsProviderError) {
			const PROD = process.env.NODE_ENV === 'production';
			if (PROD) {
				warn(
					'[scripts/dotenv] could not generate .env file from AWS Parameter Store. Exiting',
				);
				process.exit(1);
			}

			prompt(
				'[scripts/dotenv] Could not load AWS credentials to generate .env file',
				"[scripts/dotenv] This won't stop dotcom-rendering from working, it will just vary from PROD by:",
			);
			for (const secret of secrets) {
				prompt(
					`[scripts/dotenv]  * ${secret.key}: ${secret.missingMessage}`,
				);
			}
			prompt(
				'',
				'[scripts/dotenv] To get things working PROD like either:',
				'[scripts/dotenv]  * Get your credentials from Janus',
				'[scripts/dotenv]  * Ask a local engineer for a copy of the .env file',
				'[scripts/dotenv] Then try again.',
			);

			process.exit(0);
		} else {
			throw err;
		}
	}
})();
