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

const distDirName = 'dist';

// Ensure the dist folder exists
await Deno.mkdir(distDirName, { recursive: true });

// Build absolute output path inside dist/
const abTestsPath = `${distDirName}/${flags['ab-tests']}`;

// write the abTestDictArray to a file
await Deno.writeTextFile(
	abTestsPath,
	JSON.stringify(abTestGroupKeyValues, null, 2),
);

// Build absolute output pats inside dist/
const mvtsPath = `${distDirName}/${flags['mvts']}`;

// write the mvtKVsArray to a file
await Deno.writeTextFile(mvtsPath, JSON.stringify(mvtDictArray, null, 2));
