import { ABTest } from '../types.ts';
import { noVariantOverlap } from './validation/variantOverlap.ts';

type ValidationFunction = (tests: ABTest[]) => boolean;

const rules: ValidationFunction[] = [noVariantOverlap];

export function validateTests(testList: ABTest[]) {
	return rules.every((rule) => rule(testList));
}
