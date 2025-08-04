import { assert, object, string } from 'jsr:@superstruct/core';

const getEnv = (key: string): string => {
	const value = Deno.env.get(key);
	if (!value) {
		throw new Error(`Environment variable ${key} is not set`);
	}
	return value;
};

const configStruct = object({
	apiToken: string(),
	serviceName: string(),
	serviceId: string(),
	mvtDictionaryId: string(),
	mvtDictionaryName: string(),
	abTestsDictionaryId: string(),
	abTestsDictionaryName: string(),
});

const config = JSON.parse(getEnv('FASTLY_AB_TESTING_CONFIG'));

assert(config, configStruct);

const {
	apiToken,
	serviceName,
	serviceId,
	mvtDictionaryId,
	mvtDictionaryName,
	abTestsDictionaryId,
	abTestsDictionaryName,
} = config;

export {
	apiToken,
	serviceName,
	serviceId,
	mvtDictionaryId,
	mvtDictionaryName,
	abTestsDictionaryId,
	abTestsDictionaryName,
};
