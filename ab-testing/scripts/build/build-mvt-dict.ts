import { ABTest } from '../../types.ts';
import { stringify } from '../lib.ts';

const MAX_MVT_GROUPS = 1000;

type MVTValue = {
	name: string;
	type: string;
	exp: number;
};
type MVTGroups = Record<string, MVTValue[]>;

/**
 * Convert an ab test space to mvt key values
 */
const testSpaceToMVTs = (tests: ABTest[]): Record<string, MVTValue> =>
	tests
		.sort((a, b) => a.audienceOffset ?? 0 - (b.audienceOffset ?? 0))
		.reduce<Record<string, MVTValue>>((acc, test) => {
			const testOffset = (test.audienceOffset ?? 0) * MAX_MVT_GROUPS;
			const groups = test.groups.reduce<Record<string, MVTValue>>(
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
							{
								name: `${test.name}:${group}`,
								type: test.type,
								exp: Math.floor(
									test.expirationDate.getTime() / 1000,
								),
							},
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
	const tertiaryTests = abTests.filter((test) => test.audienceSpace === 'C');

	const primaryMVTGroups = testSpaceToMVTs(primaryTests);
	const secondaryMVTGroups = testSpaceToMVTs(secondaryTests);
	const tertiaryMVTGroups = testSpaceToMVTs(tertiaryTests);

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

	// Add tertiary tests to existing slots
	Object.entries(tertiaryMVTGroups).forEach(([mvtKey, testValue]) => {
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

	return Object.entries(mvtKVs).map(([key, value]) => {
		const encodedValue = value
			.map((v, i) =>
				stringify({
					[`group:${i}`]: v.name,
					[`group:${i}:type`]: v.type,
					[`group:${i}:exp`]: v.exp,
				}),
			)
			.join(',');
		return {
			item_key: key,
			item_value: encodedValue,
		};
	});
};

export { buildMVTDict, testSpaceToMVTs, abTestsToMVTs };
