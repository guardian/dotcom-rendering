import type { UpdateDictionaryItemRequest } from "./client.ts";

/**
 * Calculate the bulk updates for a dictionary
 * Compare the new dictionary with the current dictionary and return the operations required
 *
 * @param updatedDictionary
 * @param currentDictionary
 * @returns
 */
export const calculateUpdates = (
	updatedDictionary: Array<{
		item_key: string;
		item_value: string;
	}>,
	currentDictionary: Array<{
		item_key: string;
		item_value: string;
	}>,
): UpdateDictionaryItemRequest[] => {
	const currentDictionaryKeys = new Set(
		currentDictionary.map((group) => group.item_key),
	);

	const updateDeleteOps = currentDictionary.reduce<{
		updates: UpdateDictionaryItemRequest[];
		deletes: UpdateDictionaryItemRequest[];
	}>(
		(ops, group) => {
			const updatedGroup = updatedDictionary.find(
				(newGroup) => newGroup.item_key === group.item_key,
			);

			if (!updatedGroup) {
				return {
					...ops,
					deletes: [
						...ops.deletes,
						{
							item_key: group.item_key,
							op: "delete",
						},
					],
				};
			}

			if (group.item_value !== updatedGroup.item_value) {
				return {
					...ops,
					updates: [
						...ops.updates,
						{
							item_key: group.item_key,
							item_value: updatedGroup.item_value,
							op: "update",
						},
					],
				};
			}

			return ops;
		},
		{
			updates: [],
			deletes: [],
		},
	);

	const createOpts: UpdateDictionaryItemRequest[] = updatedDictionary
		.filter((group) => !currentDictionaryKeys.has(group.item_key))
		.map(({ item_key, item_value }) => ({
			item_key,
			item_value,
			op: "create",
		}));

	const bulkUpdates = [
		...updateDeleteOps.deletes,
		...updateDeleteOps.updates,
		...createOpts,
	];

	return bulkUpdates;
};

export const encodeObject = (obj: Record<string, unknown> | string[]) =>
	Object.entries(obj)
		.map(([key, value]) => `${key}=${String(value)}`)
		.join(",");
