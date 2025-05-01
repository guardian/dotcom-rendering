import { ABTests } from '../../abTest.ts';
import { buildABTestDict } from './build-ab-tests-dict.ts';
import { buildMVTDict } from './build-mvt-dict.ts';
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

const abTestDict = buildABTestDict(ABTests);

const mvtDict = buildMVTDict(ABTests);

// write the abTestDictArray to a file
await Deno.writeTextFile(
	flags['ab-tests'],
	JSON.stringify(abTestDict, null, 2),
);

// write the mvtKVsArray to a file
await Deno.writeTextFile(flags['mvts'], JSON.stringify(mvtDict, null, 2));
