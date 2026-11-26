import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { InferOutput } from "valibot";
import { array, parse, strictObject, string } from "valibot";
import { REGION } from "./constants.ts";

const fastlyKVStruct = strictObject({
	item_key: string(),
	item_value: string(),
});

type KeyValue = InferOutput<typeof fastlyKVStruct>;

/**
 * Fetches the dictionary artifact from the given s3 location, using the AWS SDK.
 * @param Bucket The S3 bucket name.
 * @param Key The S3 object key.
 * @returns A promise that resolves to the artifact JSON.
 */
const fetchDictionaryArtifact = async (
	Bucket: string,
	Key: string,
): Promise<KeyValue[]> => {
	const s3Client = new S3Client({ region: REGION });

	const getObjectCommand = new GetObjectCommand({
		Bucket,
		Key,
	});

	try {
		const response = await s3Client.send(getObjectCommand);

		if (!response.Body) {
			throw new Error("No body found in S3 object response");
		}

		const bodyString = await response.Body.transformToString();
		const parsed = JSON.parse(bodyString) as unknown;

		const result = parse(array(fastlyKVStruct), parsed);

		return result;
	} catch (error) {
		console.error(
			`Failed to fetch artifact from Bucket: ${Bucket}, Key: ${Key}`,
		);
		console.error("Error fetching or parsing artifact:", error);
		throw error;
	}
};

export { fetchDictionaryArtifact, type KeyValue };
