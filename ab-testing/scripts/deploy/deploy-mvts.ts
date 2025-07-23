import {
	calculateUpdates,
	getMVTGroupsFromDictionary,
	updateMVTGroups,
} from './fastly-api.ts';
import { getMVTGroups } from './read-built-dictionaries.ts';

const deployMVTs = async (filePath: string) => {
	// update mvt groups
	const mvtGroups = await getMVTGroups(filePath);
	const currentMVTGroups = await getMVTGroupsFromDictionary();

	console.log(`Current MVT Groups: ${currentMVTGroups.length}`);
	console.log(`New MVT Groups: ${mvtGroups.length}`);

	const mvtGroupUpdates = calculateUpdates(mvtGroups, currentMVTGroups);

	if (mvtGroupUpdates.length === 0) {
		console.log('No mvt groups to update');
	} else {
		Map.groupBy(mvtGroupUpdates, (item) => item.op).forEach((items, op) => {
			if (op === 'delete') {
				console.log(
					`Deleting ${items.length} mvt groups from dictionary`,
				);
			}
			if (op === 'update') {
				console.log(
					`Updating ${items.length} mvt groups in dictionary`,
				);
			}
			if (op === 'create') {
				console.log(
					`Creating ${items.length} mvt groups in dictionary`,
				);
			}
		});

		console.log(
			`Performing ${mvtGroupUpdates.length} mvt groups dictionary operations`,
		);

		const updateMVTGroupsResponse = await updateMVTGroups(mvtGroupUpdates);

		if (updateMVTGroupsResponse.status !== 'ok') {
			throw new Error(`Failed to update mvt groups dictionary`);
		}
	}
};

export { deployMVTs };
