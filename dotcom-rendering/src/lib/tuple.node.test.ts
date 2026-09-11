import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { isNonEmptyArray, takeFirst } from './tuple';

void nodeDescribe('takeFirst', () => {
	void nodeIt(
		'Always returns the correct array length when the array is one less, the same as, or one more than n',
		() => {
			const results = [
				// Format, from 1 to 12, cover length n - 1, n & n+1
				takeFirst([0, 1], 1),
				takeFirst([0], 1),
				takeFirst([], 1),
				takeFirst([0, 1, 2], 2),
				takeFirst([0, 1], 2),
				takeFirst([0], 2),
				takeFirst([0, 1, 2, 3], 3),
				takeFirst([0, 1, 2], 3),
				takeFirst([0, 1], 3),
				takeFirst([0, 1, 2, 3, 4], 4),
				takeFirst([0, 1, 2, 3], 4),
				takeFirst([0, 1, 2], 4),
				takeFirst([0, 1, 2, 3, 4, 5], 5),
				takeFirst([0, 1, 2, 3, 4], 5),
				takeFirst([0, 1, 2, 3], 5),
				takeFirst([0, 1, 2, 3, 4, 5, 6], 6),
				takeFirst([0, 1, 2, 3, 4, 5], 6),
				takeFirst([0, 1, 2, 3, 4], 6),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7], 7),
				takeFirst([0, 1, 2, 3, 4, 5, 6], 7),
				takeFirst([0, 1, 2, 3, 4, 5], 7),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8], 8),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7], 8),
				takeFirst([0, 1, 2, 3, 4, 5, 6], 8),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8], 9),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7], 9),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8], 10),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 11),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 11),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12),
				takeFirst([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 12),
			] as const;

			const expectedLengths = [
				1, 1, 0, 2, 2, 1, 3, 3, 2, 4, 4, 3, 5, 5, 4, 6, 6, 5, 7, 7, 6,
				8, 8, 7, 9, 9, 8, 10, 10, 9, 11, 11, 10, 12, 12, 11,
			];

			assert.deepEqual(
				results.map((result) => result.length),
				expectedLengths,
			);
		},
	);
});

void nodeIt('isNonEmptyArray', () => {
	assert.equal(isNonEmptyArray([]), false);
	assert.equal(isNonEmptyArray([1]), true);
	assert.equal(isNonEmptyArray([1, 2, 3]), true);
});
