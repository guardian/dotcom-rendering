import { remap } from './remap';

describe('bork', () => {
	test.each([
		['50000', 0, 0],
		['50001', 1, 1],
		['50002', 2, 1],

		['50003', 3, 2],
		['50004', 4, 2],
		['50005', 5, 2],

		['50006', 6, 3],
		['50007', 7, 3],

		['50008', 8, 4],
		['50009', 9, 4],
		['50010', 10, 4],

		['50011', 11, 5],
		['50012', 12, 5],

		['50013', 13, 6],

		['50026', 26, 11],

		['59997', 9997, 3999],
		['59998', 9998, 4000],
		['59999', 9999, 4000],
	])(
		'for %s get %s, %s',
		(rawMvtIdString, expectedRemainder, expectedDelay) => {
			expect(Number(rawMvtIdString) % 10_000).toEqual(expectedRemainder);
			expect(remap(rawMvtIdString, 10_000, 4000)).toEqual(expectedDelay);
		},
	);
});
