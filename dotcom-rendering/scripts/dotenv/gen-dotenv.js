import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies -- it works, somehow
import { CredentialsProviderError } from '@aws-sdk/property-provider';
import { log, prompt, success, warn } from '../env/log.js';
import { secrets } from '../secrets.js';
import { getAwsSsmParameters } from './get-aws-ssm-parameters.js';
import { fileURLToPath } from 'url';

const ENV_PATH = resolve(fileURLToPath(import.meta.url), '../../../.env');

const checkEnv = () => {
	try {
		const content = readFileSync(ENV_PATH).toString().split('\n');
		const entries = content
			.filter((line) => line.trim() !== '')
			.map((line) => line.split('='));

		const env = Object.fromEntries(entries);

		for (const secret of secrets) {
			if (!env[secret.key]) return false;
		}

		return true;
	} catch (_err) {
		return false;
	}
};

const genEnv = (parameters) => {
	let envString = '';
	for (const secret of secrets) {
		if (!parameters[secret.key]) {
			throw new Error(
				`Key "${secret.key}" could not be found or is empty`,
			);
		}

		envString += `${secret.key}=${parameters[secret.key]}\n`;
	}

	writeFileSync(ENV_PATH, envString);

	success('[scripts/dotenv] ✓ Generated .env file');
};

const prod = async () => {
	try {
		const params = await getAwsSsmParameters('prod');
		genEnv(params);
		const isValid = checkEnv();
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
		genEnv(params);
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
			const isValid = checkEnv();
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
	// We don't want to force the .env for exist for CI, but do for all other production environments.
	if (process.env.NODE_ENV === 'production' && process.env.CI_ENV !== 'true')
		await prod();
	else await dev();
})();
