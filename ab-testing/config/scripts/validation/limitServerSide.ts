import { MAX_SERVER_SIDE_TESTS } from "../../lib/constants.ts";
import type { ABTest } from "../../types.ts";

export function limitServerSideTests(tests: ABTest[]) {
	const serverSideTests = tests.filter((test) => test.type === "server");

	if (serverSideTests.length <= MAX_SERVER_SIDE_TESTS) {
		return true;
	}

	throw new Error("Amount of server-side tests exceeds allowed limit");
}
