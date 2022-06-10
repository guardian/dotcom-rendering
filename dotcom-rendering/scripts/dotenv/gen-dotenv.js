const fs = require('fs').promises;
const path = require('path');
const { CredentialsProviderError } = require('@aws-sdk/property-provider');
const { prompt, log, success, warn } = require('../env/log');
const secrets = require('../secrets');
const { getAwsSsmParameters } = require('./get-aws-ssm-parameters');

const ENV_PATH = path.resolve(__dirname, '../../.env');

const checkEnv = async () => {
	try {
		const env = (await fs.readFile(ENV_PATH)).toString();

		for (const secret of secrets) {
			const regex = new RegExp(`^${secret.key.replace('.', '\\.')}=.+`);
			if (!env.match(regex)) return false;
		}

		return true;
	} catch (_err) {
		return false;
	}
};

const genEnv = async (parameters) => {
	let envString = '';
	for (const secret of secrets) {
		if (!parameters[secret.key]) {
			throw new Error(
				`Key "${secret.key}" could not be found or is empty`,
			);
		}

		envString += `${secret.key}=${parameters[secret.key]}\n`;
	}

	await fs.writeFile(ENV_PATH, envString);

	success('[scripts/dotenv] ✓ Generated .env file');
};

const prod = async () => {
	try {
		const params = await getAwsSsmParameters('prod');
		await genEnv(params);
		const isValid = await checkEnv();
		if (!isValid) {
			throw new Error(
				'Could not validate .env file was generated correctly',
			);
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

const dev = async () => {
	try {
		const params = await getAwsSsmParameters('dev');
		await genEnv(params);
	} catch (err) {
		if (
			err instanceof CredentialsProviderError ||
			// eslint-disable-next-line no-underscore-dangle -- '__type' is the only way to identify this exception type
			err.__type === 'ExpiredTokenException'
		) {
			log('[scripts/dotenv] Could not load AWS credentials');

			// We've failed to generate the .env file - but this is okay for the DEV environment
			// If we already have an existing valid .env file, simply notify the user their .env was not updated.
			// If we don't have a valid .env, notify them of the potential missing functionality.
			const isValid = await checkEnv();
			if (isValid) {
				success('[scripts/dotenv] ✓ Using existing .env file');
			} else {
				warn(
					'[scripts/dotenv] ✖ .env file either does not exist or is missing secrets',
				);
				prompt(
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
			}
		} else {
			throw err;
		}
	}
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises -- Async entrypoint
(async () => {
	if (process.env.NODE_ENV === 'production') await prod();
	else await dev();
})();
