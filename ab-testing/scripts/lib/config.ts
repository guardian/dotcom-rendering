import { assert, object, string } from "superstruct";

const getEnv = (key: string): string => {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Environment variable ${key} is not set`);
	}
	return value;
};

const configStruct = object({
	serviceName: string(),
	serviceId: string(),
	mvtDictionaryId: string(),
	mvtDictionaryName: string(),
	abTestsDictionaryId: string(),
	abTestsDictionaryName: string(),
});

const config = JSON.parse(getEnv("FASTLY_AB_TESTING_CONFIG")) as unknown;

const apiToken = getEnv("FASTLY_API_TOKEN");

assert(config, configStruct);

const {
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
