import assert from "node:assert";
import test from "node:test";
import type { ABTest } from "@guardian/ab-testing-config";
import { checkExpiry } from "./checkExpiry.ts";

function getOffsetDate(days: number): ABTest["expirationDate"] {
	const today = new Date();
	today.setDate(today.getDate() + days);
	return today.toISOString().split("T")[0] as ABTest["expirationDate"]; // Format as YYYY-MM-DD
}

const tests: Record<
	"futureDay" | "dayAfterTomorrow" | "tomorrow" | "today" | "pastDay",
	ABTest
> = {
	futureDay: {
		name: "commercial-future",
		description: "End on a weekday",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(10),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
	dayAfterTomorrow: {
		name: "commercial-future",
		description: "End on a weekday",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(2),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
	tomorrow: {
		name: "commercial-future",
		description: "End on a weekday",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(1),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
	today: {
		name: "commercial-future",
		description: "End on a weekday",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(0),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
	pastDay: {
		name: "commercial-future",
		description: "End on a weekday",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(-2),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
};

test("checkExpiry - does not flag when the expiration is far in the future", () => {
	assert.deepStrictEqual(checkExpiry([tests.futureDay]), {
		within2Days: [],
		within1Day: [],
		expired: [],
	});
});

test("checkExpiry - flags when the expiration is within two days", () => {
	assert.deepStrictEqual(checkExpiry([tests.dayAfterTomorrow]), {
		within2Days: [tests.dayAfterTomorrow],
		within1Day: [],
		expired: [],
	});
});

test("checkExpiry - flags when the expiration is within one day", () => {
	assert.deepStrictEqual(checkExpiry([tests.tomorrow]), {
		within2Days: [],
		within1Day: [tests.tomorrow],
		expired: [],
	});
});

test("checkExpiry - flags test as expired with a date of today", () => {
	assert.deepStrictEqual(checkExpiry([tests.today]), {
		within2Days: [],
		within1Day: [],
		expired: [tests.today],
	});
});

test("checkExpiry - flags when the expiration is in the past", () => {
	assert.deepStrictEqual(checkExpiry([tests.pastDay]), {
		within2Days: [],
		within1Day: [],
		expired: [tests.pastDay],
	});
});

test("checkExpiry - flags various expiration dates", () => {
	assert.deepStrictEqual(
		checkExpiry([
			tests.pastDay,
			tests.today,
			tests.tomorrow,
			tests.dayAfterTomorrow,
			tests.futureDay,
		]),
		{
			within2Days: [tests.dayAfterTomorrow],
			within1Day: [tests.tomorrow],
			expired: [tests.pastDay, tests.today],
		},
	);
});
