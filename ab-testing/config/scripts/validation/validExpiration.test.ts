import { equal, throws } from "node:assert";
import test from "node:test";
import type { ABTest } from "../../types.ts";
import { allExpirationsValid } from "./validExpiration.ts";

function createTestABTest(
	name: ABTest["name"],
	expirationDate: ABTest["expirationDate"],
): ABTest {
	return {
		name,
		description: "A test description",
		owners: ["test@guardian.co.uk"],
		status: "ON",
		expirationDate,
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	};
}

function getOffsetDate(days: number): ABTest["expirationDate"] {
	const today = new Date();
	today.setDate(today.getDate() + days);
	return today.toISOString().split("T")[0] as ABTest["expirationDate"]; // Format as YYYY-MM-DD
}

test("allExpirationsValid - passes when all tests have valid expiration dates", () => {
	const nextYear = new Date().getFullYear() + 1;
	const futureDate = `${nextYear}-01-01` as ABTest["expirationDate"];
	const tests: ABTest[] = [
		createTestABTest("commercial-test-one", futureDate),
		createTestABTest("commercial-test-two", futureDate),
		createTestABTest("webex-test-three", futureDate),
	];

	equal(allExpirationsValid(tests), true);
});

test("allExpirationsValid - fails when one of the tests has an invalid expiration date", () => {
	const nextYear = new Date().getFullYear() + 1;
	const feb31stNextYear = `${nextYear}-02-31` as ABTest["expirationDate"];
	const tests: ABTest[] = [
		createTestABTest("commercial-test-one", getOffsetDate(5)),
		createTestABTest("commercial-test-two", getOffsetDate(10)),
		createTestABTest("webex-invalid-date", feb31stNextYear),
	];

	throws(
		() => allExpirationsValid(tests),
		Error,
		`Invalid expiration date provided on test webex-invalid-date: ${feb31stNextYear}`,
	);
});
