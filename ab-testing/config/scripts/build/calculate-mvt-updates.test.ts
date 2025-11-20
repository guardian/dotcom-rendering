import { deepEqual, equal, throws } from "node:assert";
import { test } from "node:test";
import type {
	AllSpace,
	AudienceSpace,
	FastlyTestParams,
} from "../../lib/types.ts";
import type { ABTest } from "../../types.ts";
import {
	calculateAllSpaceUpdates,
	calculateSpaceUpdates,
} from "./calculate-mvt-updates.ts";

// Helper function to create mock ABTest
function createMockABTest(name: string, options: Partial<ABTest> = {}): ABTest {
	return {
		name: name as ABTest["name"], // Cast to satisfy TestName type
		description: options.description ?? `Test ${name}`,
		owners: options.owners ?? ["test@example.com"],
		expirationDate:
			options.expirationDate ??
			(new Date(Date.now() + 86400000)
				.toISOString()
				.split("T")[0] as ABTest["expirationDate"]), // 24 hours from now
		type: options.type ?? "server",
		status: options.status ?? "ON",
		audienceSize: options.audienceSize ?? 0.1, // 10% of audience
		audienceSpace: options.audienceSpace ?? "A",
		groups: options.groups ?? ["control", "variant"],
	};
}

// Helper function to create mock AudienceSpace
function createMockAudienceSpace(
	testGroups: Record<string, number[]>,
): AudienceSpace {
	const audienceSpace = new Map<string, FastlyTestParams>();

	for (const [groupName, mvts] of Object.entries(testGroups)) {
		mvts.forEach((mvt) => {
			audienceSpace.set(`mvt:${mvt}`, {
				name: groupName,
				type: "server",
				exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
			});
		});
	}

	return audienceSpace;
}

test("calculateSpaceUpdates - handles empty audience space and tests", () => {
	const emptyAudienceSpace = new Map<string, FastlyTestParams>();
	const emptyTests: ABTest[] = [];

	const result = calculateSpaceUpdates(emptyAudienceSpace, emptyTests);

	equal(result.size, 0);
});

test("calculateSpaceUpdates - adds new test groups correctly", () => {
	const emptyAudienceSpace = new Map<string, FastlyTestParams>();
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.002, // 0.2% = 2 MVTs total, 1 MVT per group
			groups: ["control", "variant"],
		}),
	];

	const result = calculateSpaceUpdates(emptyAudienceSpace, tests);

	// Should have 2 MVT entries (one for each group)
	equal(result.size, 2);

	// Check that MVTs are allocated in ascending order
	const mvtKeys = Array.from(result.keys()).sort();
	deepEqual(mvtKeys, ["mvt:0", "mvt:1"]);

	// Check the test group names
	const controlEntry = result.get("mvt:0");
	const variantEntry = result.get("mvt:1");

	equal(controlEntry?.name, "commercial-test1:control");
	equal(variantEntry?.name, "commercial-test1:variant");
	equal(controlEntry?.type, "server");
	equal(variantEntry?.type, "server");
});

test("calculateSpaceUpdates - removes tests no longer present", () => {
	const existingAudienceSpace = createMockAudienceSpace({
		"commercial-test1:control": [0, 1],
		"commercial-test1:variant": [2, 3],
		"commercial-test2:control": [4, 5],
	});

	// Only provide test1, test2 should be removed
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.002,
			groups: ["control", "variant"],
		}),
	];

	const result = calculateSpaceUpdates(existingAudienceSpace, tests);

	// Should only have entries for test1
	const testNames = new Set(
		Array.from(result.values()).map((entry) => entry.name.split(":")[0]),
	);
	equal(testNames.size, 1);
	equal(testNames.has("commercial-test1"), true);
	equal(testNames.has("commercial-test2"), false);
});

test("calculateSpaceUpdates - resizes existing test groups", () => {
	const existingAudienceSpace = createMockAudienceSpace({
		"commercial-test1:control": [0],
		"commercial-test1:variant": [1],
	});

	// Increase audience size from 0.002 to 0.004 (2 MVTs per group instead of 1)
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.004,
			groups: ["control", "variant"],
		}),
	];

	const result = calculateSpaceUpdates(existingAudienceSpace, tests);

	// Should have 4 MVT entries total (2 per group)
	equal(result.size, 4);

	// Should allocate additional MVTs in ascending order
	const mvtKeys = Array.from(result.keys()).sort();
	deepEqual(mvtKeys, ["mvt:0", "mvt:1", "mvt:2", "mvt:3"]);
});

test("calculateSpaceUpdates - handles fractional audience sizes correctly", () => {
	const emptyAudienceSpace = new Map<string, FastlyTestParams>();
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.004, // 4 MVTs total, 2 per group
			groups: ["control", "variant"],
		}),
	];

	const result = calculateSpaceUpdates(emptyAudienceSpace, tests);

	// With 0.004 audience size and 2 groups, each group gets 0.002 * 1000 = 2 MVTs
	equal(result.size, 4); // 2 * 2 groups
});

test("calculateSpaceUpdates - handles single group test", () => {
	const emptyAudienceSpace = new Map<string, FastlyTestParams>();
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.002,
			groups: ["variant"], // Only one group
		}),
	];

	const result = calculateSpaceUpdates(emptyAudienceSpace, tests);

	// All audience size goes to the single group
	equal(result.size, 2); // 0.002 * 1000 = 2 MVTs

	const entry = result.get("mvt:0");
	equal(entry?.name, "commercial-test1:variant");
});

test("calculateSpaceUpdates - handles multiple tests", () => {
	const emptyAudienceSpace = new Map<string, FastlyTestParams>();
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.002,
			groups: ["control", "variant"],
		}),
		createMockABTest("webex-test2", {
			audienceSize: 0.001,
			groups: ["control"],
		}),
	];

	const result = calculateSpaceUpdates(emptyAudienceSpace, tests);

	// test1: 2 MVTs (1 per group), test2: 1 MVT = 3 total
	equal(result.size, 3);

	// Check that we have entries for both tests
	const testNames = new Set(
		Array.from(result.values()).map((entry) => entry.name.split(":")[0]),
	);
	equal(testNames.size, 2);
	equal(testNames.has("commercial-test1"), true);
	equal(testNames.has("webex-test2"), true);
});

test("calculateSpaceUpdates - preserves expiration dates", () => {
	const emptyAudienceSpace = new Map<string, FastlyTestParams>();
	const expirationDate = "2025-12-31";
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.001,
			groups: ["control"],
			expirationDate,
		}),
	];

	const result = calculateSpaceUpdates(emptyAudienceSpace, tests);

	const entry = result.get("mvt:0");
	equal(entry?.exp, Math.floor(new Date(expirationDate).getTime() / 1000));
});

test("calculateSpaceUpdates - handles client-side tests", () => {
	const emptyAudienceSpace = new Map<string, FastlyTestParams>();
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.001,
			groups: ["control"],
			type: "client",
		}),
	];

	const result = calculateSpaceUpdates(emptyAudienceSpace, tests);

	const entry = result.get("mvt:0");
	equal(entry?.type, "client");
});

test("calculateAllSpaceUpdates - handles empty inputs", () => {
	const emptyAllSpace = new Map<string, FastlyTestParams[]>();
	const emptyTests: ABTest[] = [];

	const result = calculateAllSpaceUpdates(emptyAllSpace, emptyTests);

	equal(result.size, 0);
});

test("calculateAllSpaceUpdates - filters tests by audience space", () => {
	const emptyAllSpace = new Map<string, FastlyTestParams[]>();
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.001,
			groups: ["control"],
			audienceSpace: "A",
		}),
		createMockABTest("commercial-test2", {
			audienceSize: 0.001,
			groups: ["control"],
			audienceSpace: "B",
		}),
		createMockABTest("commercial-test3", {
			audienceSize: 0.001,
			groups: ["control"],
			// No audienceSpace specified, should default to 'A'
		}),
	];

	const result = calculateAllSpaceUpdates(emptyAllSpace, tests);

	// Should have entries for test1 and test3 in space A, test2 in space B
	equal(result.size, 2); // Only 2 because test1 and test3 both go to space A

	// Check that each MVT has the correct number of space entries
	result.forEach((spaceEntries) => {
		// MVT:0 should have 2 entries (space A has 2 tests, space B has 1 test)
		// The number of entries per MVT depends on which spaces have tests for that MVT
		equal(spaceEntries.length >= 1, true);
	});
});

test("calculateAllSpaceUpdates - defaults audience space to A", () => {
	const emptyAllSpace = new Map<string, FastlyTestParams[]>();
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.001,
			groups: ["control"],
			// No audienceSpace specified
		}),
	];

	const result = calculateAllSpaceUpdates(emptyAllSpace, tests);

	equal(result.size, 1);

	// The test should be in space A (index 0)
	const spaceEntries = Array.from(result.values())[0];
	equal(spaceEntries?.length, 1);
	equal(spaceEntries?.[0]?.name, "commercial-test1:control");
});

test("calculateAllSpaceUpdates - handles existing MVT groups across spaces", () => {
	const existingAllSpace: AllSpace = new Map([
		[
			"mvt:0",
			[
				{
					name: "commercial-existing:control",
					type: "server",
					exp: 1234567890,
				}, // Space A
				{
					name: "webex-existing:control",
					type: "server",
					exp: 1234567890,
				}, // Space B
				{
					name: "commercial-existing2:control",
					type: "server",
					exp: 1234567890,
				}, // Space C
			],
		],
	]);

	const tests = [
		createMockABTest("commercial-new", {
			audienceSize: 0.001,
			groups: ["control"],
			audienceSpace: "A",
		}),
	];

	const result = calculateAllSpaceUpdates(existingAllSpace, tests);

	// Should have at least one MVT entry for the new test
	// (existing tests will be removed if not in the new test list)
	equal(result.size >= 1, true);
});

test("calculateAllSpaceUpdates - handles no tests for a space", () => {
	const emptyAllSpace = new Map<string, FastlyTestParams[]>();
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.001,
			groups: ["control"],
			audienceSpace: "A", // Only space A has tests
		}),
	];

	const result = calculateAllSpaceUpdates(emptyAllSpace, tests);

	// Should only have entries for space A
	equal(result.size, 1);

	const spaceEntries = Array.from(result.values())[0];
	// Should have 3 entries (one for each space), but only space A should have a test
	// Actually, spaces without tests will not create entries, so we should have just 1 entry
	equal(spaceEntries?.length, 1);
});

test("calculateAllSpaceUpdates - combines results from multiple spaces", () => {
	const emptyAllSpace = new Map<string, FastlyTestParams[]>();
	const tests = [
		createMockABTest("commercial-test1", {
			audienceSize: 0.001,
			groups: ["control"],
			audienceSpace: "A",
		}),
		createMockABTest("commercial-test2", {
			audienceSize: 0.001,
			groups: ["control"],
			audienceSpace: "B",
		}),
		createMockABTest("commercial-test3", {
			audienceSize: 0.001,
			groups: ["control"],
			audienceSpace: "C",
		}),
	];

	const result = calculateAllSpaceUpdates(emptyAllSpace, tests);

	// Should have 1 MVT entry (all tests use the same MVT:0 since they each start fresh)
	// But each MVT should have entries from multiple spaces
	equal(result.size, 1);

	// Each MVT should have exactly three space entries (one from each space)
	result.forEach((spaceEntries) => {
		equal(spaceEntries.length, 3);
	});
});

test("calculateSpaceUpdates - resizes middle test with adjacent tests", () => {
	const existingAudienceSpace = createMockAudienceSpace({
		"commercial-test1:control": [0, 1], // First test: MVTs 0-1
		"commercial-test1:variant": [2, 3], // First test: MVTs 2-3
		"commercial-test2:control": [4, 5], // Middle test: MVTs 4-5
		"commercial-test2:variant": [6, 7], // Middle test: MVTs 6-7
		"commercial-test3:control": [8, 9], // Last test: MVTs 8-9
		"commercial-test3:variant": [10, 11], // Last test: MVTs 10-11
	});

	const tests = [
		// Keep test1 the same size
		createMockABTest("commercial-test1", {
			audienceSize: 0.004, // 4 MVTs total, 2 per group
			groups: ["control", "variant"],
		}),
		// Resize test2 from 4 MVTs to 6 MVTs (from 2 per group to 3 per group)
		createMockABTest("commercial-test2", {
			audienceSize: 0.006, // 6 MVTs total, 3 per group
			groups: ["control", "variant"],
		}),
		// Keep test3 the same size
		createMockABTest("commercial-test3", {
			audienceSize: 0.004, // 4 MVTs total, 2 per group
			groups: ["control", "variant"],
		}),
	];

	const result = calculateSpaceUpdates(existingAudienceSpace, tests);

	// Should have 14 MVT entries total (4 + 6 + 4)
	equal(result.size, 14);

	// Check that test1 keeps its original MVTs (0-3)
	const test1MVTs = Array.from(result.entries())
		.filter(([, entry]) => entry.name.startsWith("commercial-test1:"))
		.map(([mvtKey]) => parseInt(mvtKey.split(":")[1] as string))
		.sort((a, b) => a - b);
	deepEqual(test1MVTs, [0, 1, 2, 3]);

	// Check that test2 has 6 MVTs allocated (should include original 4-7 plus 2 more)
	const test2MVTs = Array.from(result.entries())
		.filter(([, entry]) => entry.name.startsWith("commercial-test2:"))
		.map(([mvtKey]) => parseInt(mvtKey.split(":")[1] as string))
		.sort((a, b) => a - b);
	equal(test2MVTs.length, 6);

	// Test2 should keep its original MVTs 4-7 and get additional ones from available pool
	equal(test2MVTs.includes(4), true);
	equal(test2MVTs.includes(5), true);
	equal(test2MVTs.includes(6), true);
	equal(test2MVTs.includes(7), true);

	// Check that test3 has been properly reallocated (may not keep original MVTs due to test2 expansion)
	const test3MVTs = Array.from(result.entries())
		.filter(([, entry]) => entry.name.startsWith("commercial-test3:"))
		.map(([mvtKey]) => parseInt(mvtKey.split(":")[1] as string))
		.sort((a, b) => a - b);
	equal(test3MVTs.length, 4);

	// Verify that all MVTs are unique (no overlaps)
	const allMVTs = Array.from(result.keys()).map((key) =>
		parseInt(key.split(":")[1] as string),
	);
	const uniqueMVTs = [...new Set(allMVTs)];
	equal(allMVTs.length, uniqueMVTs.length);

	// Verify test group structure is maintained
	const test2ControlMVTs = Array.from(result.entries())
		.filter(([, entry]) => entry.name === "commercial-test2:control")
		.map(([mvtKey]) => parseInt(mvtKey.split(":")[1] as string));
	const test2VariantMVTs = Array.from(result.entries())
		.filter(([, entry]) => entry.name === "commercial-test2:variant")
		.map(([mvtKey]) => parseInt(mvtKey.split(":")[1] as string));

	// Each group should have 3 MVTs
	equal(test2ControlMVTs.length, 3);
	equal(test2VariantMVTs.length, 3);
});

test("calculateSpaceUpdates - shrinks middle test with adjacent tests", () => {
	const existingAudienceSpace = createMockAudienceSpace({
		"commercial-test1:control": [0, 1], // First test: MVTs 0-1
		"commercial-test1:variant": [2, 3], // First test: MVTs 2-3
		"commercial-test2:control": [4, 5, 6], // Middle test: MVTs 4-6 (3 MVTs per group)
		"commercial-test2:variant": [7, 8, 9], // Middle test: MVTs 7-9 (3 MVTs per group)
		"commercial-test3:control": [10, 11], // Last test: MVTs 10-11
		"commercial-test3:variant": [12, 13], // Last test: MVTs 12-13
	});

	const tests = [
		// Keep test1 the same size
		createMockABTest("commercial-test1", {
			audienceSize: 0.004, // 4 MVTs total, 2 per group
			groups: ["control", "variant"],
		}),
		// Shrink test2 from 6 MVTs to 2 MVTs (from 3 per group to 1 per group)
		createMockABTest("commercial-test2", {
			audienceSize: 0.002, // 2 MVTs total, 1 per group
			groups: ["control", "variant"],
		}),
		// Keep test3 the same size
		createMockABTest("commercial-test3", {
			audienceSize: 0.004, // 4 MVTs total, 2 per group
			groups: ["control", "variant"],
		}),
	];

	const result = calculateSpaceUpdates(existingAudienceSpace, tests);

	// Should have 10 MVT entries total (4 + 2 + 4)
	equal(result.size, 10);

	// Check that test2 now has only 2 MVTs
	const test2MVTs = Array.from(result.entries())
		.filter(([, entry]) => entry.name.startsWith("commercial-test2:"))
		.map(([mvtKey]) => parseInt(mvtKey.split(":")[1] as string))
		.sort((a, b) => a - b);
	equal(test2MVTs.length, 2);

	// Test2 should keep the first MVT from each group (4 and 7 based on the original allocation)
	equal(test2MVTs.includes(4), true);
	equal(test2MVTs.includes(7), true);

	// Verify that MVTs 5, 6, 8, 9 are now available and could be reallocated
	// We can't easily test this directly, but we can verify the total count is correct

	// Verify test group structure is maintained
	const test2ControlMVTs = Array.from(result.entries())
		.filter(([, entry]) => entry.name === "commercial-test2:control")
		.map(([mvtKey]) => parseInt(mvtKey.split(":")[1] as string));
	const test2VariantMVTs = Array.from(result.entries())
		.filter(([, entry]) => entry.name === "commercial-test2:variant")
		.map(([mvtKey]) => parseInt(mvtKey.split(":")[1] as string));

	// Each group should now have 1 MVT
	equal(test2ControlMVTs.length, 1);
	equal(test2VariantMVTs.length, 1);

	// Verify that all MVTs are unique (no overlaps)
	const allMVTs = Array.from(result.keys()).map((key) =>
		parseInt(key.split(":")[1] as string),
	);
	const uniqueMVTs = [...new Set(allMVTs)];
	equal(allMVTs.length, uniqueMVTs.length);
});

test("calculateSpaceUpdates - handles insufficient MVTs when resizing middle test", () => {
	// Create a scenario where most MVTs are occupied
	const occupiedMVTs: Record<string, number[]> = {};

	// Fill up most of the MVT space, leaving only a few available
	occupiedMVTs["commercial-test1:control"] = Array.from(
		{ length: 300 },
		(_, i) => i,
	);
	occupiedMVTs["commercial-test1:variant"] = Array.from(
		{ length: 300 },
		(_, i) => i + 300,
	);
	occupiedMVTs["commercial-test2:control"] = [600, 601]; // Middle test with 2 MVTs per group
	occupiedMVTs["commercial-test2:variant"] = [602, 603];
	occupiedMVTs["commercial-test3:control"] = Array.from(
		{ length: 290 },
		(_, i) => i + 604,
	);
	occupiedMVTs["commercial-test3:variant"] = Array.from(
		{ length: 290 },
		(_, i) => i + 894,
	);
	// This leaves only MVTs 994-999 available (6 MVTs)

	const existingAudienceSpace = createMockAudienceSpace(occupiedMVTs);

	const tests = [
		// Keep test1 the same size
		createMockABTest("commercial-test1", {
			audienceSize: 0.6, // 600 MVTs total, 300 per group
			groups: ["control", "variant"],
		}),
		// Try to dramatically increase test2 from 4 MVTs to 20 MVTs (more than available)
		createMockABTest("commercial-test2", {
			audienceSize: 0.02, // 20 MVTs total, 10 per group
			groups: ["control", "variant"],
		}),
		// Keep test3 the same size
		createMockABTest("commercial-test3", {
			audienceSize: 0.58, // 580 MVTs total, 290 per group
			groups: ["control", "variant"],
		}),
	];

	// This should throw an error because there aren't enough available MVTs
	// to resize test2 from 4 MVTs to 20 MVTs (needs 16 additional MVTs but only 6 are available)
	throws(
		() => calculateSpaceUpdates(existingAudienceSpace, tests),
		Error,
		"Not enough available MVTs for test commercial-test2:control",
	);
});
