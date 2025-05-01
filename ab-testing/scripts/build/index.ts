import { ABTests } from '../../abTest.ts';
import { createABTestDict } from './ab-tests.ts';
import { createMVTDict } from './mvts.ts';

const abTestDict = createABTestDict(ABTests);

const mvtDict = createMVTDict(ABTests);

// write the abTestDictArray to a file
await Deno.writeTextFile(
	'./abTestDictArray.json',
	JSON.stringify(abTestDict, null, 2),
);

// write the mvtKVsArray to a file
await Deno.writeTextFile(
	'./mvtKVsArray.json',
	JSON.stringify(mvtDict, null, 2),
);
