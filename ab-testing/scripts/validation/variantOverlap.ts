import { ABTest } from '../../types.ts';

interface TestRange {
	name: string;
	start: number;
	end: number;
}

export const findOverlappingTests = (tests: ABTest[]) => {
	return tests.reduce<TestRange[]>(
		(acc, { name, audienceOffset, audienceSize }) => {
			const start = audienceOffset ?? 0;
			const end = (audienceOffset ?? 0) + audienceSize;
			const overlap = acc.find(
				({ start: startAcc, end: endAcc }) =>
					(startAcc <= start && endAcc >= start) ||
					(startAcc <= end && endAcc >= end) ||
					(startAcc >= start && endAcc <= end),
			);
			if (overlap) {
				throw new Error(`Test ${name} overlaps with ${overlap.name}`);
			}
			return [...acc, { name, start, end }];
		},
		[],
	);
};
export function noVariantOverlap(tests: ABTest[]) {
	const allPrimaryTests = tests.filter(
		(test) => test.audienceSpace === undefined || test.audienceSpace === 0,
	);

	findOverlappingTests(allPrimaryTests);

	const allSecordaryTests = tests.filter((test) => test.audienceSpace === 1);

	findOverlappingTests(allSecordaryTests);

	return true;
}
