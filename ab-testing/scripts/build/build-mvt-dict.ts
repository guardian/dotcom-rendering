import { ABTest } from '../../types.ts';
import { stringify } from '../lib.ts';

const MAX_MVT_GROUPS = 1000;

/**
 * convert ab tests to array of test groups, repeated for each group size
 *
 * @param tests
 * @returns
 */
const testsToArray = (tests: ABTest[]): string[] =>
	tests.reduce<string[]>((acc, test) => {
		const groups = test.groups.reduce<string[]>((groupAcc, group) => {
			const mvtGroups = Array.from(
				{ length: (test.size / test.groups.length) * 1000 },
				() => `${test.name}:${group}`,
			);
			groupAcc.push(...mvtGroups);
			return groupAcc;
		}, []);
		acc.push(...groups);
		return acc;
	}, []);

const abTestsToMVTs = (
	abTests: ABTest[],
): Record<`mvt:${number}`, string[]> => {
	const primaryTests = abTests.filter(
		(test) => test.testSpace !== 'secondary',
	);
	const secondaryTests = abTests.filter(
		(test) => test.testSpace === 'secondary',
	);

	const primaryMVTGroups = testsToArray(primaryTests);
	const secondaryMVTGroups = testsToArray(secondaryTests);

	if (primaryMVTGroups.length > MAX_MVT_GROUPS) {
		throw new Error(
			`The the primary test space test sizes add up to > 100%.`,
		);
	}
	if (secondaryMVTGroups.length > MAX_MVT_GROUPS) {
		throw new Error(
			`The the secondary test space test sizes add up to > 100%.`,
		);
	}

	const mvtKVs: Record<`mvt:${number}`, string[]> = {};

	for (let i = 0; i < MAX_MVT_GROUPS; i++) {
		if (primaryMVTGroups[i] || secondaryMVTGroups[i]) {
			mvtKVs[`mvt:${i}`] = [];

			if (primaryMVTGroups[i]) {
				mvtKVs[`mvt:${i}`].push(primaryMVTGroups[i]);
			}
			if (secondaryMVTGroups[i]) {
				mvtKVs[`mvt:${i}`].push(secondaryMVTGroups[i]);
			}
		}
	}

	return mvtKVs;
};

const buildMVTDict = (tests: ABTest[]) => {
	const mvtKVs = abTestsToMVTs(tests);
	return Object.entries(mvtKVs).map(([key, value]) => ({
		item_key: key,
		item_value: stringify(value),
	}));
};

export { buildMVTDict, testsToArray, abTestsToMVTs };
