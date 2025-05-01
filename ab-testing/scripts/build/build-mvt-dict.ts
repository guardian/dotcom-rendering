import { ABTest } from '../../types.ts';
import { stringify } from '../lib.ts';

const MAX_GROUPS_PER_MVT = 2;
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
				{ length: group.size * 1000 },
				() => `${test.name}:${group.id}`,
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
	const normalTests = abTests.filter((test) => test.allowOverlap !== true);
	const overlappingTests = abTests.filter(
		(test) => test.allowOverlap === true,
	);

	const normalMVTGroups = testsToArray(normalTests);

	const mvtKVs: Record<`mvt:${number}`, string[]> = normalMVTGroups.reduce<
		Record<`mvt:${number}`, string[]>
	>((acc, group, i) => {
		acc[`mvt:${i}`] = [group];
		return acc;
	}, {});

	const overlappingMVTGroups = testsToArray(overlappingTests);

	overlappingMVTGroups.forEach((group, i) => {
		const index = i + normalMVTGroups.length;
		// If the index is less than the max mvt ids, we can add it to the remaining empty mvt ids
		// Otherwise, we go back to the start of the array and start adding more groups to the mvt ids
		// If we reach 2000, we throw an error as we can't have more than 2 groups per MVT
		if (index < MAX_MVT_GROUPS) {
			mvtKVs[`mvt:${index}`] = [group];
		} else if (
			index < MAX_MVT_GROUPS * MAX_GROUPS_PER_MVT &&
			mvtKVs[`mvt:${index - MAX_MVT_GROUPS}`]?.length < MAX_GROUPS_PER_MVT
		) {
			mvtKVs[`mvt:${index - MAX_MVT_GROUPS}`]?.push(group);
		} else {
			throw new Error(
				`Overlapping MVT groups exceed the maximum size of 1000. Please check your configuration.`,
			);
		}
	});

	return mvtKVs;
};

const buildMVTDict = (tests: ABTest[]) => {
	const mvtKVs = abTestsToMVTs(tests);
	Object.entries(mvtKVs).map(([key, value]) => ({
		item_key: key,
		item_value: stringify(value),
	}));
};

export { buildMVTDict, testsToArray, abTestsToMVTs };
