import { deployDictionary } from "./deploy-dictionary.ts";
import { fetchDictionaryArtifact } from "./fetch-artifact.ts";

const ARTIFACT_BUCKET_NAME = process.env.ARTIFACT_BUCKET_NAME ?? "";
const STAGE = process.env.STAGE ?? "CODE";

const CONFIG_PREFIX = `/${STAGE}/config/ab-testing`;

type ServiceInfo = {
	activeVersion: { number: number };
	serviceId: string;
};

type ArtifactInfo = {
	artifact: string;
	dictionaryName: string;
	dictionaryId: string;
};

/**
 * Fetches dictionary artifacts from S3 and deploys them to Fastly dictionaries in parallel.
 * @param serviceInfo The Fastly service information including active version and service ID.
 * @param deployments An array of artifact deployment information.
 */
export const fetchAndDeployArtifacts = async (
	{ activeVersion, serviceId }: ServiceInfo,
	deployments: ArtifactInfo[],
) => {
	try {
		await Promise.all(
			deployments.map(({ artifact, dictionaryName, dictionaryId }) =>
				fetchDictionaryArtifact(
					ARTIFACT_BUCKET_NAME,
					`${CONFIG_PREFIX}/${artifact}`,
				).then((abTestGroups) =>
					deployDictionary(
						{
							serviceId,
							activeVersion: activeVersion.number,
							dictionaryName,
							dictionaryId,
						},
						abTestGroups,
					),
				),
			),
		);
	} catch (error) {
		console.error("Error in fetchAndDeployArtifacts:", error);
		throw error;
	}
};
