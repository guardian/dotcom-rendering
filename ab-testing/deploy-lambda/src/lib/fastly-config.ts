import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { configStruct } from "@guardian/ab-testing-config/lib/config.ts";
import { assert } from "superstruct";
import { REGION } from "./constants";

const getSecureString = async (name: string) => {
	const ssmClient = new SSMClient({ region: REGION });

	const response = await ssmClient.send(
		new GetParameterCommand({
			Name: name,
			WithDecryption: true,
		}),
	);
	return response.Parameter?.Value;
};

export const getFastlyApiToken = async () => {
	const apiToken = await getSecureString(
		`/ab-testing/${process.env.STAGE}/fastly-api-token`,
	);

	if (!apiToken) {
		throw new Error("Fastly API token not found in SSM Parameter Store");
	}

	return apiToken;
};

export const getFastlyConfig = async () => {
	const stringParam = await getSecureString(
		`/ab-testing/${process.env.STAGE}/fastly-config`,
	);
	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- empty string is invalid JSON too
	const json = JSON.parse(stringParam || "{}") as unknown;

	assert(json, configStruct);

	return json;
};
