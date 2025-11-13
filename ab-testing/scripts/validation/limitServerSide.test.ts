import { equal, throws } from "node:assert";
import test from "node:test";
import type { ABTest } from "../../config/types.ts";
import { MAX_SERVER_SIDE_TESTS } from "../../lib/constants.ts";
import { limitServerSideTests } from "./limitServerSide.ts";

test("limitServerSideTests - throws if the amount of tests exceeds the limit", () => {
	const serverSideTest: ABTest = {
		name: "commercial-server-side",
		description: "A server-side test",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: new Date()
			.toISOString()
			.split("T")[0] as ABTest["expirationDate"],
		type: "server",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	};
	throws(() => {
		limitServerSideTests(
			Array.from({ length: MAX_SERVER_SIDE_TESTS + 1 }).map(
				() => serverSideTest,
			),
		);
	});
});

test("limitServerSideTests - passes if the amount of tests is within the limit", () => {
	const serverSideTest: ABTest = {
		name: "commercial-server-side",
		description: "A server-side test",
		owners: ["commercial.dev@guardian.co.uk"],
		status: "ON",
		expirationDate: new Date()
			.toISOString()
			.split("T")[0] as ABTest["expirationDate"],
		type: "server",
		audienceSize: 10 / 100,
		groups: ["control", "variant"],
	};
	equal(
		limitServerSideTests(
			Array.from({ length: MAX_SERVER_SIDE_TESTS }).map(
				() => serverSideTest,
			),
		),
		true,
	);
});
