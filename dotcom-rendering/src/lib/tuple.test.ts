import { isNonEmptyArray, takeFirst } from './tuple';

describe('takeFirst', () => {
	it('Always returns the correct array length when the array is one less, the same as, or one more than n', () => {
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

		// Expected results from n are n, n & n-1
		expect(results[0].length).toEqual(1);
		expect(results[1].length).toEqual(1);
		expect(results[2].length).toEqual(0);
		expect(results[3].length).toEqual(2);
		expect(results[4].length).toEqual(2);
		expect(results[5].length).toEqual(1);
		expect(results[6].length).toEqual(3);
		expect(results[7].length).toEqual(3);
		expect(results[8].length).toEqual(2);
		expect(results[9].length).toEqual(4);
		expect(results[10].length).toEqual(4);
		expect(results[11].length).toEqual(3);
		expect(results[12].length).toEqual(5);
		expect(results[13].length).toEqual(5);
		expect(results[14].length).toEqual(4);
		expect(results[15].length).toEqual(6);
		expect(results[16].length).toEqual(6);
		expect(results[17].length).toEqual(5);
		expect(results[18].length).toEqual(7);
		expect(results[19].length).toEqual(7);
		expect(results[20].length).toEqual(6);
		expect(results[21].length).toEqual(8);
		expect(results[22].length).toEqual(8);
		expect(results[23].length).toEqual(7);
		expect(results[24].length).toEqual(9);
		expect(results[25].length).toEqual(9);
		expect(results[26].length).toEqual(8);
		expect(results[27].length).toEqual(10);
		expect(results[28].length).toEqual(10);
		expect(results[29].length).toEqual(9);
		expect(results[30].length).toEqual(11);
		expect(results[31].length).toEqual(11);
		expect(results[32].length).toEqual(10);
		expect(results[33].length).toEqual(12);
		expect(results[34].length).toEqual(12);
		expect(results[35].length).toEqual(11);
	});
});

it('isNonEmptyArray', () => {
	expect(isNonEmptyArray([])).toBe(false);
	expect(isNonEmptyArray([1])).toBe(true);
	expect(isNonEmptyArray([1, 2, 3])).toBe(true);
});
