import { ABTest } from '../../types.ts';

export function noVariantOverlap(tests: ABTest[]) {
	const allTestPercentages = tests.reduce<number>((percentageSum, test) => {
		// Skip tests with allowed overlap
		if (test.allowOverlap) {
			return percentageSum;
		}
		const newTotal = test.groups.reduce<number>((total, group) => {
			return total + group.size;
		}, percentageSum);

		if (newTotal > 1) {
			throw new Error(
				`Test variant space exceeded when checking ${test.name}`,
			);
		}

		return newTotal;
	}, 0);

	if (allTestPercentages <= 1) {
		return true;
	}
	throw new Error(`Test variants exceed 100%`);
}
