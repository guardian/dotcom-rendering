import { ABTests } from '../../abTest.ts';
import { ABTest } from '../../types.ts';
import { limitServerSideTests } from './limitServerSide.ts';
import { allExpirationsValid } from './validExpiration.ts';
import { noVariantOverlap } from './variantOverlap.ts';

type ValidationFunction = (tests: ABTest[]) => boolean;

const rules: ValidationFunction[] = [
	noVariantOverlap,
	limitServerSideTests,
	allExpirationsValid,
];

function validateTests(testList: ABTest[]) {
	return rules.every((rule) => rule(testList));
}

try {
	validateTests(ABTests);
	console.log('AB test validations passed');
} catch (err) {
	const error = err as Error;
	console.error(`Validation failed: ${error.message}`);
}
