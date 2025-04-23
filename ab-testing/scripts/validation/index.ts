import { ABTest } from '../../types.ts';
import { limitServerSideTests } from './limitServerSide.ts';
import { noVariantOverlap } from './variantOverlap.ts';

type ValidationFunction = (tests: ABTest[]) => boolean;

const rules: ValidationFunction[] = [noVariantOverlap, limitServerSideTests];

export function validateTests(testList: ABTest[]) {
	return rules.every((rule) => rule(testList));
}
