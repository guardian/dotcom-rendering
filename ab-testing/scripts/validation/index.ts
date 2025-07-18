import { ABTests } from '../../abTest.ts';
import { ABTest } from '../../types.ts';
import { limitServerSideTests } from './limitServerSide.ts';
import { allExpirationsValid } from './validExpiration.ts';
import { validSizeOffset } from './validSizeOffset.ts';
import { noVariantOverlap } from './variantOverlap.ts';

type ValidationFunction = (tests: ABTest[]) => boolean;

const rules: ValidationFunction[] = [
	noVariantOverlap,
	limitServerSideTests,
	allExpirationsValid,
	validSizeOffset,
];

function validateTests(testList: ABTest[]) {
	return rules.every((rule) => rule(testList));
}

try {
	validateTests(ABTests);
	console.log('AB test validations passed');
} catch (err) {
	const error = err as Error;
	console.error(`AB test validation failed: ${error.message}`);
	throw error;
}
