import { FastlyClient } from "@guardian/ab-testing-config/lib/fastly/client.ts";
import type { CloudFormationCustomResourceEvent, Context } from "aws-lambda";
import { send } from "./lib/custom-resource-response.ts";
import { fetchAndDeployArtifacts } from "./lib/deploy.ts";
import { getFastlyApiToken, getFastlyConfig } from "./lib/fastly-config.ts";

export const handler = async (
	event: CloudFormationCustomResourceEvent,
	context: Context,
): Promise<void> => {
	if (event.RequestType === "Delete") {
		// No action needed on delete
		await send(event, context, "SUCCESS");
		return;
	}
	try {
		const apiToken = await getFastlyApiToken();

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

		await fetchAndDeployArtifacts([
			{
				artifact: "ab-tests.json",
				dictionary: abTestsDictionary,
			},
			{
				artifact: "mvts.json",
				dictionary: mvtDictionary,
			},
		]);

		await send(event, context, "SUCCESS");
	} catch (error) {
		console.error("Error deploying dictionaries:", error);
		await send(event, context, "FAILED", {
			error: (error as Error).message,
		});
	}
};
