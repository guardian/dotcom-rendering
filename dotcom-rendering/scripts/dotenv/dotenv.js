const path = require('path');
const fs = require('fs').promises;
const secrets = require('../secrets');
const { getGuardianConfiguration } = require('./aws-parameters');
const { log } = require('../env/log');

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

const checkAndGenDotenv = async () => {
	const validEnv = await checkEnv();
	if (!validEnv) {
		log(
			'Your .env file is missing, attemting to generate it from AWS parameters...',
		);
		await genEnv();
	}
};

module.exports.checkAndGenDotenv = checkAndGenDotenv;
