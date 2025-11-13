import {
	calculateUpdates,
	getABTestGroupsFromDictionary,
	updateABTestGroups,
} from "../../lib/fastly-api.ts";
import { getUpdatedABTestGroups } from "./read-built-dictionaries.ts";

const deployABTests = async (filePath: string) => {
	// update ab test groups first
	const updatedABTestGroups = await getUpdatedABTestGroups(filePath);
	const currentABTestGroups = await getABTestGroupsFromDictionary();

	const abTestGroupUpdates = calculateUpdates(
		updatedABTestGroups,
		currentABTestGroups,
	);

	if (abTestGroupUpdates.length === 0) {
		console.log("No ab test groups to update");
	} else {
		Map.groupBy(abTestGroupUpdates, (item) => item.op).forEach(
			(items, op) => {
				if (op === "delete") {
					console.log(
						`Deleting ${items.length} ab test groups from dictionary`,
					);
				}
				if (op === "update") {
					console.log(
						`Updating ${items.length} ab test groups in dictionary`,
					);
				}
				if (op === "create") {
					console.log(
						`Creating ${items.length} ab test groups in dictionary`,
					);
				}
			},
		);

		const updateABTestGroupsResponse =
			await updateABTestGroups(abTestGroupUpdates);

		if (updateABTestGroupsResponse.status !== "ok") {
			throw new Error(`Failed to update ab test groups dictionary`);
		}
	}
};

export { deployABTests };
