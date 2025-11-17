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
import { getService } from "../../lib/fastly-api.ts";
import { fetchAndDeployArtifacts } from "./deploy.ts";

export const handler: Handler = async (
	event: CloudFormationCustomResourceEvent,
	context: Context,
): Promise<void> => {
	const service = await getService(serviceId);
	if (service.name !== serviceName) {
		throw new Error(
			`Service ID ${serviceId} does not match the expected service name ${serviceName}`,
		);
	}

	const activeVersion = service.versions.find(
		(v: { active: boolean }) => v.active,
	);

	if (!activeVersion) {
		throw new Error(`No active version found for service ${service.name}`);
	}

	if (event.RequestType === "Create" || event.RequestType === "Update") {
		try {
			await fetchAndDeployArtifacts(
				{
					activeVersion,
					serviceId,
				},
				[
					{
						artifact: "ab-test-groups.json",
						dictionaryName: abTestsDictionaryName,
						dictionaryId: abTestsDictionaryId,
					},
					{
						artifact: "mvt-groups.json",
						dictionaryName: mvtDictionaryName,
						dictionaryId: mvtDictionaryId,
					},
				],
			);

			send(event, context, "SUCCESS");
		} catch (error) {
			console.error("Error deploying dictionaries:", error);
			send(event, context, "FAILED");
		}
	}
};
