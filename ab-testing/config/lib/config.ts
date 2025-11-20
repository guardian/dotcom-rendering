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

const getConfigFromEnv = () => {
	const config = JSON.parse(getEnv("FASTLY_AB_TESTING_CONFIG")) as unknown;
	assert(config, configStruct);

	return config;
};
const getApiTokenFromEnv = () => {
	const apiToken = getEnv("FASTLY_API_TOKEN");
	return apiToken;
};

export { getConfigFromEnv, getApiTokenFromEnv, getEnv, configStruct };
