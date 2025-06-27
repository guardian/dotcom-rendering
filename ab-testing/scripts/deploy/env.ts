const getEnv = (key: string): string => {
	const value = Deno.env.get(key);
	if (!value) {
		throw new Error(`Environment variable ${key} is not set`);
	}
	return value;
};

const FASTLY_API_TOKEN = getEnv('FASTLY_API_TOKEN');
const SERVICE_ID = getEnv('FASTLY_SERVICE_ID');
const MVT_DICTIONARY_ID = getEnv('FASTLY_MVT_DICTIONARY_ID');
const AB_TESTS_DICTIONARY_ID = getEnv('FASTLY_AB_TESTS_DICTIONARY_ID');

export {
	FASTLY_API_TOKEN,
	SERVICE_ID,
	MVT_DICTIONARY_ID,
	AB_TESTS_DICTIONARY_ID,
};
