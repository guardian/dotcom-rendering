const path = require('path');
const { CredentialsProviderError } = require('@aws-sdk/property-provider');

console.log(typeof ExpiredTokenException);
const fs = require('fs').promises;
const { prompt, log, warn } = require('../env/log');
const secrets = require('../secrets');
const { getAwsSsmParameters } = require('./get-aws-ssm-parameters');

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
	const parameters = await getAwsSsmParameters(env);

	let envString = '';
	for (const secret of secrets) {
		envString += `${secret.key}=${parameters[secret.key]}\n`;
	}

	await fs.writeFile(ENV_PATH, envString);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
	try {
		const validEnv = await checkEnv();
		if (!validEnv) {
			log(
				'[scripts/dotenv] .env file is missing or out of date, attemting to generate it from AWS parameters...',
			);

			await genEnv();

			log('[scripts/dotenv] .env file written successfully');
		} else {
			log('[scripts/dotenv] valid .env file exists, moving on...');
		}
	} catch (err) {
		console.log(err);
		console.log(typeof err);
		if (
			err instanceof CredentialsProviderError ||
			// eslint-disable-next-line no-underscore-dangle -- '__type' is the only way to identify this exception type
			err.__type === 'ExpiredTokenException'
		) {
			const PROD = process.env.NODE_ENV === 'production';
			if (PROD) {
				warn(
					'[scripts/dotenv] could not generate .env file from AWS Parameter Store. Exiting',
				);
				throw err;
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
				'[scripts/dotenv] To get things working like PROD you can either:',
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
