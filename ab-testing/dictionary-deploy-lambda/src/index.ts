import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import type { Handler } from "aws-cdk-lib/aws-lambda";
import type { CloudFormationCustomResourceEvent, Context } from "aws-lambda";
import { assert } from "superstruct";
import { configStruct } from "../../lib/config.ts";
import { FastlyClient } from "../../lib/fastly/client.ts";
import { send } from "./custom-resource-response.ts";
import { fetchAndDeployArtifacts } from "./deploy.ts";

const getSecureString = async (name: string) => {
	const ssmClient = new SSMClient({ region: "eu-west-1" });

	const response = await ssmClient.send(
		new GetParameterCommand({
			Name: name,
			WithDecryption: true,
		}),
	);
	return response.Parameter?.Value;
};

const getFastlyConfig = async () => {
	const stringParam = await getSecureString(
		`/ab-testing/${process.env.STAGE}/fastly-config`,
	);
	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- empty string is invalid JSON too
	const json = JSON.parse(stringParam || "{}") as unknown;

	assert(json, configStruct);

	return json;
};

export const handler: Handler = async (
	event: CloudFormationCustomResourceEvent,
	context: Context,
): Promise<void> => {
	try {
		const apiToken = await getSecureString(
			`/ab-testing/${process.env.STAGE}/fastly-api-token`,
		);

		if (!apiToken) {
			throw new Error(
				"Fastly API token not found in SSM Parameter Store",
			);
		}

		const {
			serviceId,
			serviceName,
			abTestsDictionaryName,
			mvtDictionaryName,
		} = await getFastlyConfig();

		const fastly = new FastlyClient(apiToken);
		const service = await fastly.getService(serviceId, serviceName);

		const abTestsDictionary = await service.getDictionary(
			abTestsDictionaryName,
		);
		const mvtDictionary = await service.getDictionary(mvtDictionaryName);

		if (event.RequestType === "Create" || event.RequestType === "Update") {
			await fetchAndDeployArtifacts([
				{
					artifact: "ab-test-groups.json",
					dictionary: abTestsDictionary,
				},
				{
					artifact: "mvt-groups.json",
					dictionary: mvtDictionary,
				},
			]);

			await send(event, context, "SUCCESS");
		} else {
			// For Delete requests, simply respond with SUCCESS
			await send(event, context, "SUCCESS");
		}
	} catch (error) {
		console.error("Error deploying dictionaries:", error);
		await send(event, context, "FAILED", {
			error: (error as Error).message,
		});
	}
};
