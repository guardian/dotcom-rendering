import { ABTest } from '../../types.ts';

export function noVariantOverlap(tests: ABTest[]) {
	return tests.every((test) => {
		if (test.allowOverlap) return true;
		const variantSum = test.groups.reduce<number>((total, group) => {
			return total + group.size;
		}, 0);
		if (variantSum <= 1) {
			return true;
		}
		throw new Error(`Overlapping variants in ${test.name}`);
	});
}
