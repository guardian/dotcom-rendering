import { ABTest } from '../../types.ts';
import { AUDIENCE_SPACES, MVT_COUNT } from '../lib/constants.ts';
import { AllSpace, AudienceSpace, FastlyTestParams } from '../lib/types.ts';
import { TestGroupMVTManager } from './test-group-mvt-manager.ts';

export const calculateSpaceUpdates = (
	audienceSpace: AudienceSpace,
	tests: ABTest[],
) => {
	const testGroupMVTs = new TestGroupMVTManager(audienceSpace);

	const updateTestGroups = new Map(
		tests.flatMap((test) =>
			test.groups.map((group) => [
				`${test.name}:${group}`,
				{
					name: test.name,
					type: test.type,
					audienceSize: test.audienceSize / test.groups.length,
					expirationDate: test.expirationDate,
					group,
				},
			]),
		),
	);

	// Remove tests that are no longer present
	testGroupMVTs.testGroups.keys().forEach((key) => {
		if (!updateTestGroups.has(key)) {
			console.log(`Removing test group: ${key}`);
			testGroupMVTs.deleteTestGroup(key);
		}
	});

	// Add or update tests
	updateTestGroups.forEach((test) => {
		const currentTest = testGroupMVTs.getTestGroup(
			`${test.name}:${test.group}`,
		);
		if (!currentTest) {
			console.log(`Adding new test group: ${test.name}:${test.group}`);
			testGroupMVTs.addTestGroup(
				`${test.name}:${test.group}`,
				test.audienceSize * MVT_COUNT,
			);
		} else {
			console.log(`Resizing test group: ${test.name}:${test.group}`);
			testGroupMVTs.resizeTestGroup(
				`${test.name}:${test.group}`,
				test.audienceSize * MVT_COUNT,
			);
		}
	});

	return new Map(
		testGroupMVTs.testGroups.entries().flatMap(([testName, mvts]) =>
			mvts.map((mvt) => {
				const test = updateTestGroups.get(testName);
				if (!test) {
					throw new Error(`Test ${testName} not found`);
				}
				return [
					`mvt:${mvt}`,
					{
						name: `${test.name}:${test.group}`,
						type: test.type,
						exp: Math.floor(
							new Date(test.expirationDate).getTime() / 1000,
						),
					},
				];
			}),
		),
	);
};

/**
 * Calculate all updates for all audience spaces.
 * @param mvtGroups
 * @param tests
 */
const calculateAllSpaceUpdates = (
	mvtGroups: AllSpace,
	tests: ABTest[],
): AllSpace => {
	const updatedTestSpace: AudienceSpace[] = AUDIENCE_SPACES.map(
		(space, i) => {
			console.log(`Calculating updates for space: ${space}`);
			const spaceTests = tests.filter(
				(test) => (test.audienceSpace ?? 'A') === space, // 'A' is the default space
			);

			if (spaceTests.length === 0) {
				console.log(`No tests for space: ${space}`);
				return new Map();
			}

			const spaceMVTGroups: Map<
				string,
				{ name: string; type: string; exp: number }
			> = new Map(
				mvtGroups.entries().map(([key, value]) => [key, value[i]]),
			);

			return calculateSpaceUpdates(spaceMVTGroups, spaceTests);
		},
	);

	return updatedTestSpace.reduce((acc, curr) => {
		curr.forEach((value, key) => {
			if (!acc.has(key)) {
				acc.set(key, []);
			}
			acc.get(key)?.push(value);
		});
		return acc;
	}, new Map<string, FastlyTestParams[]>());
};

export { calculateAllSpaceUpdates };
