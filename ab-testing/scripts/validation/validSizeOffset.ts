import { ABTest } from '../../types.ts';

const _validSizeOffset = (test: ABTest): boolean => {
	// Check if audienceSize is defined and is a number between 0 and 1
	if (
		typeof test.audienceSize !== 'number' ||
		test.audienceSize < 0 ||
		test.audienceSize > 1
	) {
		throw new Error(`Invalid audienceSize for test ${test.name}`);
	}

	// Check if audienceOffset is defined and is a number between 0 and 1
	if (
		test.audienceOffset !== undefined &&
		(typeof test.audienceOffset !== 'number' ||
			test.audienceOffset < 0 ||
			test.audienceOffset > 1)
	) {
		throw new Error(`Invalid audienceOffset for test ${test.name}`);
	}

	return true;
};

const validSizeOffset = (tests: ABTest[]): boolean => {
	return tests.every(_validSizeOffset);
};

export { validSizeOffset };
