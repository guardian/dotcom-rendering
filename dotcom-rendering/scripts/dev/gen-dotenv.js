const { CredentialsProviderError } = require('@aws-sdk/property-provider');
const { checkAndGenDotenv } = require('./dotenv');
const { warn } = require('../env/log');

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
	try {
		await checkAndGenDotenv();
	} catch (err) {
		if (err instanceof CredentialsProviderError) {
			warn('Could not load AWS credentials, exiting.');
			process.exit(1);
		}
	}
})();
