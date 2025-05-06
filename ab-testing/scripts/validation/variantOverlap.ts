import { ABTest } from '../../types.ts';

export function noVariantOverlap(tests: ABTest[]) {
	const allPrimaryTestPercentages = tests
		.filter((test) => !test.testSpace || test.testSpace === 'primary')
		.map((test) => test.size)
		.reduce((acc, size) => acc + size, 0);

	if (allPrimaryTestPercentages > 1) {
		throw new Error(`Test variants exceed 100% (primary)`);
	}

	const allSecordaryTestPercentages = tests
		.filter((test) => test.testSpace === 'secondary')
		.map((test) => test.size)
		.reduce((acc, size) => acc + size, 0);

	if (allSecordaryTestPercentages <= 1) {
		return true;
	}
	throw new Error(`Test variants exceed 100% (secondary)`);
}
