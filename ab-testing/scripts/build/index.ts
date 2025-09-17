import { ABTests } from '../../abTest.ts';
import { getMVTGroupsFromDictionary } from '../lib/fastly-api.ts';
import { buildABTestGroupKeyValues } from './build-ab-tests-dict.ts';
import { parseArgs } from 'jsr:@std/cli/parse-args';
import { calculateAllSpaceUpdates } from './calculate-mvt-updates.ts';
import { parseMVTValue, stringifyMVTValue } from '../lib/fastly-subfield.ts';

const flags = parseArgs(Deno.args, {
	string: ['mvts', 'ab-tests'],
});

if (!flags['mvts'] || !flags['ab-tests']) {
	console.error(
		'Please provide the path to the mvt and ab test groups dictionaries',
	);
	Deno.exit(1);
}

const mvtGroupsDictionary = await getMVTGroupsFromDictionary();

const mvtGroups = new Map(
	mvtGroupsDictionary.map(({ item_key, item_value }) => {
		const testGroups = parseMVTValue(item_value);
		return [item_key, testGroups];
	}),
);

const abTestGroupKeyValues = buildABTestGroupKeyValues(ABTests);

const mvtIdKeyValues = calculateAllSpaceUpdates(mvtGroups, ABTests);

const mvtDictArray = Array.from(
	mvtIdKeyValues.entries().map(([key, value]) => ({
		item_key: key,
		item_value: stringifyMVTValue(value),
	})),
);

console.log(`Writing ${mvtDictArray.length} MVT groups to ${flags['mvts']}`);

// Ensure the build's destination folder path exists
for (const path of [flags['mvts'], flags['ab-tests']]) {
	await Deno.mkdir(dirname(path), { recursive: true });
}

// write the abTestDictArray to a file
await Deno.writeTextFile(
	flags['ab-tests'],
	JSON.stringify(abTestGroupKeyValues, null, 2),
);

// write the mvtKVsArray to a file
await Deno.writeTextFile(flags['mvts'], JSON.stringify(mvtDictArray, null, 2));
