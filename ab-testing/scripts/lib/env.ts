import { assert, object, string } from 'jsr:@superstruct/core';

const getEnv = (key: string): string => {
	const value = Deno.env.get(key);
	if (!value) {
		throw new Error(`Environment variable ${key} is not set`);
	}
	return value;
};

const configStruct = object({
	FASTLY_API_TOKEN: string(),
	SERVICE_ID: string(),
	MVTS_DICTIONARY_ID: string(),
	MVTS_DICTIONARY_NAME: string(),
	TEST_GROUPS_DICTIONARY_ID: string(),
	TEST_GROUPS_DICTIONARY_NAME: string(),
	SERVICE_NAME: string(),
});

const config = JSON.parse(getEnv('FASTLY_AB_TESTING_CONFIG'));

assert(config, configStruct);

const {
	FASTLY_API_TOKEN,
	SERVICE_ID,
	MVTS_DICTIONARY_ID,
	MVTS_DICTIONARY_NAME,
	TEST_GROUPS_DICTIONARY_ID,
	TEST_GROUPS_DICTIONARY_NAME,
	SERVICE_NAME,
} = config;

export {
	FASTLY_API_TOKEN,
	SERVICE_ID,
	MVTS_DICTIONARY_ID,
	MVTS_DICTIONARY_NAME,
	TEST_GROUPS_DICTIONARY_ID,
	TEST_GROUPS_DICTIONARY_NAME,
	SERVICE_NAME,
};
