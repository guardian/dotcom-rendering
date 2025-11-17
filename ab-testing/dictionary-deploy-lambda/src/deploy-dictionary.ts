import {
	calculateUpdates,
	getDictionaryItems,
	updateDictionaryItems,
	verifyDictionaryName,
} from "../../lib/fastly-api.ts";
import type { KeyValue } from "./fetch-artifact.ts";

/**
 * Deploys key-value pairs to a Fastly edge dictionary.
 * Uses `calculateUpdates` to determine necessary CRUD operations.
 *
 * @param config Configuration for the dictionary deployment.
 * @param keyValues An array of key-value pairs to deploy to the dictionary.
 */
export const deployDictionary = async (
	{
		dictionaryName,
		dictionaryId,
		serviceId,
		activeVersion,
	}: {
		dictionaryName: string;
		dictionaryId: string;
		serviceId: string;
		activeVersion: number;
	},
	keyValues: KeyValue[],
) => {
	await verifyDictionaryName({
		serviceId,
		activeVersion,
		dictionaryName,
		dictionaryId,
	});

	const currentKeyValues = await getDictionaryItems({
		dictionaryId,
	});

	const updates = calculateUpdates(keyValues, currentKeyValues);

	if (updates.length === 0) {
		console.log(`No key-values need updating in '${dictionaryName}'`);
	} else {
		Map.groupBy(updates, (item) => item.op).forEach((items, op) => {
			console.log(
				`Performing ${items.length} ${op} operations in '${dictionaryName}'`,
			);
		});

		console.log(
			`Performing ${updates.length} total operations in '${dictionaryName}'`,
		);

		const response = await updateDictionaryItems({
			dictionaryId,
			items: updates,
		});

		if (response.status !== "ok") {
			throw new Error(`Failed to update mvt groups dictionary`);
		}
	}
};
