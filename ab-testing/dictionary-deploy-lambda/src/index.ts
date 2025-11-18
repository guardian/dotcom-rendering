import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import type { Handler } from "aws-cdk-lib/aws-lambda";
import type { CloudFormationCustomResourceEvent, Context } from "aws-lambda";
import { send } from "cfn-response";
import {
	abTestsDictionaryId,
	abTestsDictionaryName,
	mvtDictionaryId,
	mvtDictionaryName,
	serviceId,
	serviceName,
} from "../../lib/config.ts";
import { FastlyClient } from "../../lib/fastly/client.ts";
import { fetchAndDeployArtifacts } from "./deploy.ts";

const ssmClient = new SSMClient({ region: "eu-west-1" });

const getSecureString = async (name: string) => {
	const response = await ssmClient.send(
		new GetParameterCommand({
			Name: name,
			WithDecryption: true,
		}),
	);
	return response.Parameter?.Value;
};

export const handler: Handler = async (
	event: CloudFormationCustomResourceEvent,
	context: Context,
): Promise<void> => {
	const apiToken = await getSecureString(
		`/ab-testing-deploy/${process.env.STAGE}/fastly-api-token`,
	);

	if (!apiToken) {
		throw new Error("Fastly API token not found in SSM Parameter Store");
	}

	const fastly = new FastlyClient(apiToken);
	const service = await fastly.getService(serviceId, serviceName);

	const abTestsDictionary = await service.getDictionary(
		abTestsDictionaryId,
		abTestsDictionaryName,
	);
	const mvtDictionary = await service.getDictionary(
		mvtDictionaryId,
		mvtDictionaryName,
	);

	if (event.RequestType === "Create" || event.RequestType === "Update") {
		try {
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

			send(event, context, "SUCCESS");
		} catch (error) {
			console.error("Error deploying dictionaries:", error);
			send(event, context, "FAILED");
		}
	}
};
