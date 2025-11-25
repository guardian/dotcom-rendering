import type { FastlyDictionary } from "../../config/lib/fastly/dictionary.ts";
import { calculateUpdates } from "../../config/lib/fastly/utils.ts";
import type { KeyValue } from "./fetch-artifact.ts";

/**
 * Deploys key-value pairs to a Fastly edge dictionary.
 * Uses `calculateUpdates` to determine necessary CRUD operations.
 *
 * @param config Configuration for the dictionary deployment.
 * @param keyValues An array of key-value pairs to deploy to the dictionary.
 */
export const deployDictionary = async (
	dictionary: FastlyDictionary,
	keyValues: KeyValue[],
) => {
	const currentKeyValues = await dictionary.getItems();

	const updates = calculateUpdates(keyValues, currentKeyValues);

	if (updates.length === 0) {
		console.log(`No key-values need updating in '${dictionary.name}'`);
	} else {
		Map.groupBy(updates, (item) => item.op).forEach((items, op) => {
			console.log(
				`Performing ${items.length} ${op} operations in '${dictionary.name}'`,
			);
		});

		console.log(
			`Performing ${updates.length} total operations in '${dictionary.name}'`,
		);

		const response = await dictionary.updateItems(updates);

		if (response.status !== "ok") {
			throw new Error(`Failed to update mvt groups dictionary`);
		}
	}
};
