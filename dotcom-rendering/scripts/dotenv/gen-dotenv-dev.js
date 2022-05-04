const { CredentialsProviderError } = require('@aws-sdk/property-provider');
const { checkAndGenDotenv } = require('./dotenv');
const { prompt } = require('../env/log');

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
	try {
		await checkAndGenDotenv();
	} catch (err) {
		if (err instanceof CredentialsProviderError) {
			const secrets = require('../secrets');
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
		}
	}
})();
