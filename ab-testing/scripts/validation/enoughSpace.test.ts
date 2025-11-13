import { throws } from "node:assert";
import test from "node:test";
import type { ABTest } from "../../config/types.ts";
import { enoughSpace } from "./enoughSpace.ts";

// Helper function to create a test AB test object
function createABTest(
	name: string,
	audienceSize: number,
	audienceSpace?: "A" | "B" | "C",
): ABTest {
	return {
		name: `commercial-${name}` as const,
		description: `Test description for ${name}`,
		owners: ["test@example.com"],
		expirationDate: "2025-12-31",
		type: "client",
		status: "ON",
		audienceSize,
		audienceSpace,
		groups: ["control", "variant"],
	};
}

test("enoughSpace - should pass when total audience size is within limits", () => {
	const tests: ABTest[] = [
		createABTest("test1", 0.3, "A"),
		createABTest("test2", 0.4, "A"),
		createABTest("test3", 0.2, "A"),
	];

	// Should not throw any error
	enoughSpace(tests);
});

test("enoughSpace - should pass when audience size equals exactly 1.0", () => {
	const tests: ABTest[] = [
		createABTest("test1", 0.5, "A"),
		createABTest("test2", 0.5, "A"),
	];

	// Should not throw any error
	enoughSpace(tests);
});

test("enoughSpace - should throw error when audience size exceeds 1.0 in space A", () => {
	const tests: ABTest[] = [
		createABTest("test1", 0.6, "A"),
		createABTest("test2", 0.5, "A"),
	];

	throws(
		() => enoughSpace(tests),
		Error,
		"Audience sizes in space A exceeds 100%",
	);
});

test("enoughSpace - should throw error when audience size exceeds 1.0 in space B", () => {
	const tests: ABTest[] = [
		createABTest("test1", 0.7, "B"),
		createABTest("test2", 0.4, "B"),
	];

	throws(
		() => enoughSpace(tests),
		Error,
		"Audience sizes in space B exceeds 100%",
	);
});

test("enoughSpace - should throw error when audience size exceeds 1.0 in space C", () => {
	const tests: ABTest[] = [
		createABTest("test1", 0.8, "C"),
		createABTest("test2", 0.3, "C"),
	];

	throws(
		() => enoughSpace(tests),
		Error,
		"Audience sizes in space C exceeds 100%",
	);
});

test("enoughSpace - should handle tests with default audience space (A)", () => {
	const tests: ABTest[] = [
		createABTest("test1", 0.4), // No audienceSpace specified, defaults to A
		createABTest("test2", 0.3, "A"),
		createABTest("test3", 0.2, "A"),
	];

	// Should not throw any error (0.4 + 0.3 + 0.2 = 0.9)
	enoughSpace(tests);
});

test("enoughSpace - should handle tests across multiple spaces independently", () => {
	const tests: ABTest[] = [
		createABTest("test1", 0.8, "A"),
		createABTest("test2", 0.9, "B"),
		createABTest("test3", 1.0, "C"),
	];

	// Should not throw any error as each space is within limits
	enoughSpace(tests);
});

test("enoughSpace - should handle empty test array", () => {
	const tests: ABTest[] = [];

	// Should not throw any error
	enoughSpace(tests);
});

test("enoughSpace - should handle single test within limits", () => {
	const tests: ABTest[] = [createABTest("test1", 0.5, "A")];

	// Should not throw any error
	enoughSpace(tests);
});

test("enoughSpace - should handle single test exceeding limits", () => {
	const tests: ABTest[] = [createABTest("test1", 1.1, "A")];

	throws(
		() => enoughSpace(tests),
		Error,
		"Audience sizes in space A exceeds 100%",
	);
});

test("enoughSpace - should handle tests with zero audience size", () => {
	const tests: ABTest[] = [
		createABTest("test1", 0, "A"),
		createABTest("test2", 0.5, "A"),
		createABTest("test3", 0, "B"),
	];

	// Should not throw any error
	enoughSpace(tests);
});

test("enoughSpace - should handle multiple spaces with some exceeding limits", () => {
	const tests: ABTest[] = [
		createABTest("test1", 0.5, "A"), // Space A total: 0.5 (OK)
		createABTest("test2", 0.7, "B"), // Space B total: 1.2 (EXCEEDS)
		createABTest("test3", 0.5, "B"),
		createABTest("test4", 0.3, "C"), // Space C total: 0.3 (OK)
	];

	throws(
		() => enoughSpace(tests),
		Error,
		"Audience sizes in space B exceeds 100%",
	);
});
