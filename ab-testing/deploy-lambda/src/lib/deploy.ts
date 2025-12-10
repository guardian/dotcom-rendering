import { getEnv } from "@guardian/ab-testing-config/lib/config.ts";
import type { FastlyDictionary } from "@guardian/ab-testing-config/lib/fastly/dictionary.ts";
import { deployDictionary } from "./deploy-dictionary.ts";
import { fetchDictionaryArtifact } from "./fetch-artifact.ts";

type ArtifactInfo = {
	artifact: string;
	dictionary: FastlyDictionary;
};

/**
 * Fetches dictionary artifacts from S3 and deploys them to Fastly dictionaries in parallel.
 * @param serviceInfo The Fastly service information including active version and service ID.
 * @param deployments An array of artifact deployment information.
 */
export const fetchAndDeployArtifacts = async (deployments: ArtifactInfo[]) => {
	const ARTIFACT_BUCKET_NAME = getEnv("ARTIFACT_BUCKET_NAME");
	const STAGE = getEnv("STAGE");
	const CONFIG_PREFIX = `${STAGE}/config/ab-testing`;

	try {
		await Promise.all(
			deployments.map(async ({ artifact, dictionary }) => {
				console.log(
					`Fetching artifact /${ARTIFACT_BUCKET_NAME}${CONFIG_PREFIX}/${artifact} from S3 and deploying to Fastly dictionary ${dictionary.name}`,
				);
				const abTestGroups = await fetchDictionaryArtifact(
					ARTIFACT_BUCKET_NAME,
					`${CONFIG_PREFIX}/${artifact}`,
				);
				return await deployDictionary(dictionary, abTestGroups);
			}),
		);
	} catch (error) {
		console.error("Error in fetchAndDeployArtifacts:", error);
		throw error;
	}
};
