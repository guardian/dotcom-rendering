import { ABTest } from '../../types.ts';
import { stringify } from '../lib.ts';

const MAX_MVT_GROUPS = 1000;

type MVTGroups = Record<string, string[]>;

/**
 * Convert an ab test space to mvt key values
 *
 * example output:
 * mvt:0 - Test1:control
 * mvt:1 - Test1:control
 * mvt:2 - Test1:variant
 * mvt:3 - Test1:variant
 */
const testSpaceToMVTs = (tests: ABTest[]): Record<string, string> =>
	tests
		.sort((a, b) => a.audienceOffset ?? 0 - (b.audienceOffset ?? 0))
		.reduce<Record<string, string>>((acc, test) => {
			const testOffset = (test.audienceOffset ?? 0) * MAX_MVT_GROUPS;
			const groups = test.groups.reduce<Record<string, string>>(
				(groupAcc, group, groupIndex) => {
					const groupSize = Math.floor(
						(test.audienceSize / test.groups.length) *
							MAX_MVT_GROUPS,
					);
					const groupOffset = testOffset + groupSize * groupIndex;

					const groupMVTs = Array.from(
						{
							length: groupSize,
						},
						(_, i) => [
							`mvt:${i + groupOffset}`,
							`${test.name}:${group}`,
						],
					);

					return {
						...groupAcc,
						...Object.fromEntries(groupMVTs),
					};
				},
				{},
			);

			return {
				...acc,
				...groups,
			};
		}, {});

/**
 * Convert an array of ab tests to mvt key values
 * @param abTests - Array of ABTest objects
 * @returns MVTGroups - Object with mvt keys and their corresponding test groups
 */
const abTestsToMVTs = (abTests: ABTest[]): MVTGroups => {
	const primaryTests = abTests.filter(
		(test) =>
			test.audienceSpace === undefined || test.audienceSpace === 'A',
	);
	const secondaryTests = abTests.filter((test) => test.audienceSpace === 'B');

	const primaryMVTGroups = testSpaceToMVTs(primaryTests);
	const secondaryMVTGroups = testSpaceToMVTs(secondaryTests);

	if (Object.keys(primaryMVTGroups).length > MAX_MVT_GROUPS) {
		throw new Error(
			`Test space 0 test sizes add up to > 100%, try moving the test to another space.`,
		);
	}

	if (Object.keys(secondaryMVTGroups).length > MAX_MVT_GROUPS) {
		throw new Error(`Test space 1 test sizes add up to > 100%.`);
	}

	const result: MVTGroups = {};

	// Process primary tests first
	Object.entries(primaryMVTGroups).forEach(([mvtKey, testValue]) => {
		result[mvtKey] = [testValue];
	});

	// Add secondary tests to existing slots
	Object.entries(secondaryMVTGroups).forEach(([mvtKey, testValue]) => {
		if (result[mvtKey]) {
			result[mvtKey].push(testValue);
		} else {
			result[mvtKey] = [testValue];
		}
	});

	return result;
};

const buildMVTDict = (tests: ABTest[]) => {
	const mvtKVs = abTestsToMVTs(tests);
	return Object.entries(mvtKVs).map(([key, value]) => ({
		item_key: key,
		item_value: value.join(','),
	}));
};

export { buildMVTDict, testSpaceToMVTs, abTestsToMVTs };
