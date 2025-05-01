import {
	bulkUpdateABTestGroups,
	bulkUpdateMVTGroups,
	calculateBulkUpdates,
	getABTestGroupsFromDictionary,
	getMVTGroupsFromDictionary,
} from './fastly-api.ts';
import {
	getMVTGroups,
	getUpdatedABTestGroups,
} from './read-built-dictionaries.ts';
import { parseArgs } from 'jsr:@std/cli/parse-args';

const flags = parseArgs(Deno.args, {
	string: ['mvts', 'ab-tests'],
});

if (!flags['mvts'] || !flags['ab-tests']) {
	console.error(
		'Please provide the path to the mvt and ab test groups dictionaries',
	);
	Deno.exit(1);
}

// update ab test groups first
const updatedABTestGroups = await getUpdatedABTestGroups(flags['ab-tests']);
const currentABTestGroups = await getABTestGroupsFromDictionary();

const ABTestGroupBulkUpdates = calculateBulkUpdates(
	updatedABTestGroups,
	currentABTestGroups,
);

if (ABTestGroupBulkUpdates.length === 0) {
	console.log('No ab test groups to update');
} else {
	Map.groupBy(ABTestGroupBulkUpdates, (item) => item.op).forEach(
		(items, op) => {
			if (op === 'delete') {
				console.log(
					`Deleting ${items.length} ab test groups from dictionary`,
				);
			}
			if (op === 'update') {
				console.log(
					`Updating ${items.length} ab test groups in dictionary`,
				);
			}
			if (op === 'create') {
				console.log(
					`Creating ${items.length} ab test groups in dictionary`,
				);
			}
		},
	);

	const bulkUpdateABTestGroupsResponse = await bulkUpdateABTestGroups(
		ABTestGroupBulkUpdates,
	);

	if (bulkUpdateABTestGroupsResponse.status !== 'ok') {
		throw new Error(`Failed to update ab test groups dictionary`);
	}
}

// update mvt groups
const mvtGroups = await getMVTGroups(flags['mvts']);
const currentMVTGroups = await getMVTGroupsFromDictionary();
const MVTGroupBulkUpdates = calculateBulkUpdates(mvtGroups, currentMVTGroups);

if (MVTGroupBulkUpdates.length === 0) {
	console.log('No mvt groups to update');
} else {
	Map.groupBy(MVTGroupBulkUpdates, (item) => item.op).forEach((items, op) => {
		if (op === 'delete') {
			console.log(`Deleting ${items.length} mvt groups from dictionary`);
		}
		if (op === 'update') {
			console.log(`Updating ${items.length} mvt groups in dictionary`);
		}
		if (op === 'create') {
			console.log(`Creating ${items.length} mvt groups in dictionary`);
		}
	});

	console.log(
		`Performing ${MVTGroupBulkUpdates.length} mvt groups dictionary operations`,
	);

	const bulkUpdateMVTGroupsResponse =
		await bulkUpdateMVTGroups(MVTGroupBulkUpdates);

	if (bulkUpdateMVTGroupsResponse.status !== 'ok') {
		throw new Error(`Failed to update mvt groups dictionary`);
	}
}
console.log('Successfully updated ab test groups and mvt groups dictionaries');
