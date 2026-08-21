import { MVT_COUNT } from "../../lib/constants.ts";
import type {
	AllSpace,
	AudienceSpace,
	FastlyTestParams,
} from "../../lib/types.ts";
import {
	type ABTest,
	type AudienceSpaceId,
	AudienceSpaces,
} from "../../types.ts";
import { TestGroupMVTManager } from "./test-group-mvt-manager.ts";

const getTestGroupName = (
	test: Pick<ABTest, "name"> & { group?: string },
	group?: string,
) => `${test.name}:${group ?? test.group}`;

const calculateSpaceUpdates = (
	audienceSpaceId: AudienceSpaceId,
	audienceSpace: AudienceSpace,
	tests: ABTest[],
) => {
	const testGroupMVTs = new TestGroupMVTManager(
		audienceSpaceId,
		audienceSpace,
	);

	const updateTestGroups = new Map(
		tests.flatMap((test) =>
			test.groups.map((group) => [
				getTestGroupName(test, group),
				{
					name: test.name,
					type: test.type,
					audienceSize:
						Math.floor(
							(test.audienceSize / test.groups.length) *
								MVT_COUNT,
						) / MVT_COUNT,
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
	updateTestGroups.forEach((group) => {
		const currentTestGroup = testGroupMVTs.getTestGroup(
			getTestGroupName(group),
		);
		if (!currentTestGroup) {
			console.log(
				`Adding new test group: ${group.name}:${
					group.group
				} with size ${group.audienceSize * MVT_COUNT}`,
			);
			testGroupMVTs.addTestGroup(
				getTestGroupName(group),
				group.audienceSize * MVT_COUNT,
			);
		} else if (currentTestGroup.length !== group.audienceSize * MVT_COUNT) {
			console.log(
				`Resizing test group: ${group.name}:${group.group} from ${
					currentTestGroup.length
				} to ${group.audienceSize * MVT_COUNT}`,
			);
			testGroupMVTs.resizeTestGroup(
				getTestGroupName(group),
				group.audienceSize * MVT_COUNT,
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
						name: getTestGroupName(test),
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
	const updatedTestSpaces: AudienceSpace[] = AudienceSpaces.map(
		(space, i) => {
			console.log(`Calculating updates for space: ${space}`);
			const spaceTests = tests.filter(
				(test) => (test.audienceSpace ?? "A") === space, // 'A' is the default space
			);

			if (spaceTests.length === 0) {
				console.log(`No tests for space: ${space}`);
				return new Map<string, FastlyTestParams>();
			}

			const spaceMVTGroups = new Map(
				Array.from(mvtGroups.entries())
					.map(([mvtId, tests]) => [
						mvtId,
						spaceTests.find((test) =>
							tests.find(
								(t) =>
									t.name === test.name &&
									t.type === test.type,
							),
						),
					])
					.filter(([_, test]) => test !== undefined) as Array<
					[string, FastlyTestParams]
				>,
			);

			return calculateSpaceUpdates(space, spaceMVTGroups, spaceTests);
		},
	);

	return updatedTestSpaces.reduce((acc, curr) => {
		curr.forEach((value, key) => {
			if (!acc.has(key)) {
				acc.set(key, []);
			}
			acc.get(key)?.push(value);
		});
		return acc;
	}, new Map<string, FastlyTestParams[]>());
};

export { calculateSpaceUpdates, calculateAllSpaceUpdates };
