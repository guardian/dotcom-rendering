import { equal, throws } from "node:assert";
import test from "node:test";
import type { ABTest } from "../../types.ts";
import { allExpirationsValid } from "./validExpiration.ts";

function futureDay() {
	const today = new Date();
	today.setDate(today.getDate() + 1);
	return today.toISOString().split("T")[0] as ABTest["expirationDate"]; // Format as YYYY-MM-DD
}

function pastDay() {
	const pastDate = new Date();
	pastDate.setDate(pastDate.getDate() - 2);
	return pastDate.toISOString().split("T")[0] as ABTest["expirationDate"]; // Format as YYYY-MM-DD
}

test("allExpirationsValid - passes when the expiration is in the future", () => {
	const futureDayTest: ABTest = {
		name: "commercial-future",
		description: "End on a weekday",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: futureDay(),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	};

	equal(allExpirationsValid([futureDayTest]), true);
});

test("allExpirationsValid - throws when the expiration is in the past", () => {
	const pastTest: ABTest = {
		name: "commercial-past",
		description: "End in the past",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: pastDay(),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	};

	throws(() => allExpirationsValid([pastTest]));
});
