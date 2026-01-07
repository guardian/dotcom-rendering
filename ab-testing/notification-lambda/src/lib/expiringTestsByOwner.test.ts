import assert from "node:assert";
import test from "node:test";
import type { ABTest } from "@guardian/ab-testing-config";
import { getExpiringAbTestsGroupedByOwner } from "./expiringTestsByOwner.ts";

function getOffsetDate(days: number): ABTest["expirationDate"] {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date.toISOString().split("T")[0] as ABTest["expirationDate"]; // Format as YYYY-MM-DD
}

const tests: Record<string, ABTest> = {
	thefilterFuture: {
		name: "thefilter-future",
		description: "End on a weekday",
		owners: ["thefilter.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(10),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
	commercialFuture: {
		name: "commercial-future",
		description: "End on a weekday",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(10),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
	commercialTomorrow: {
		name: "commercial-tomorrow",
		description: "End on a weekday",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(2),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
	webExToday: {
		name: "webex-today",
		description: "End on a weekday",
		owners: ["dotcom.platform@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(1),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
	commercialToday: {
		name: "commercial-future",
		description: "End on a weekday",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(1),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
	multipleOwnersExpired: {
		name: "webex-expired",
		description: "End on a weekday",
		owners: ["owner-1@guardian.co.uk", "owner-2@guardian.co.uk"],
		status: "ON",
		expirationDate: getOffsetDate(-10),
		type: "client",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	},
};

test("expiringTestsByOwner - expect owners without expiring tests not to be identified", () => {
	const result = getExpiringAbTestsGroupedByOwner(Object.values(tests));
	assert.equal(
		Object.keys(result).includes("thefilter.dev@guardian.co.uk"),
		false,
	);
});

test("expiringTestsByOwner - expect test with multiple owners to be included in both owner lists", () => {
	const result = getExpiringAbTestsGroupedByOwner(Object.values(tests));
	assert.deepStrictEqual(result["owner-1@guardian.co.uk"], {
		within2Days: [],
		within1Day: [],
		expired: [tests.multipleOwnersExpired],
	});
	assert.deepStrictEqual(result["owner-2@guardian.co.uk"], {
		within2Days: [],
		within1Day: [],
		expired: [tests.multipleOwnersExpired],
	});
});

test("expiringTestsByOwner - expect owners with multiple tests expiring at different times to be included in the same list", () => {
	const result = getExpiringAbTestsGroupedByOwner(Object.values(tests));
	assert.deepStrictEqual(result, {
		"commercial.dev@guardian.co.uk": {
			expired: [],
			within1Day: [tests.commercialToday],
			within2Days: [tests.commercialTomorrow],
		},
		"owner-1@guardian.co.uk": {
			expired: [tests.multipleOwnersExpired],
			within1Day: [],
			within2Days: [],
		},
		"owner-2@guardian.co.uk": {
			expired: [tests.multipleOwnersExpired],
			within1Day: [],
			within2Days: [],
		},
		"dotcom.platform@guardian.co.uk": {
			expired: [],
			within1Day: [tests.webExToday],
			within2Days: [],
		},
	});
});
