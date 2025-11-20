import { activeABtests } from "../../abTests.ts";
import type { ABTest } from "../../types.ts";
import { enoughSpace } from "./enoughSpace.ts";
import { limitServerSideTests } from "./limitServerSide.ts";
import { uniqueName } from "./uniqueName.ts";
import { allExpirationsValid } from "./validExpiration.ts";

type ValidationFunction = (tests: ABTest[]) => boolean;

const rules: ValidationFunction[] = [
	limitServerSideTests,
	allExpirationsValid,
	uniqueName,
	enoughSpace,
];

function validateTests(testList: ABTest[]) {
	return rules.every((rule) => rule(testList));
}

try {
	validateTests(activeABtests);
	console.log("AB test validations passed");
} catch (err) {
	const error = err as Error;
	console.error(`AB test validation failed: ${error.message}`);
	throw error;
}
