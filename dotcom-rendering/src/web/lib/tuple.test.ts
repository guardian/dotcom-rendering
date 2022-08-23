import { isTuple, nonEmpty } from './tuple';

describe('Tuple helpers', () => {
	describe('nonEmpty', () => {
		test('Works with a non-empty array', () => {
			expect(nonEmpty([0])).toBe(true);
		});

		test('Fails with an empty array', () => {
			expect(nonEmpty([])).toBe(false);
		});

		test('Does not narrow the second item', () => {
			const arr = [0, 1];
			expect(nonEmpty(arr)).toBe(true);
			if (nonEmpty(arr)) {
				const [, second] = arr;
				// @TODO @ts-expect-error
				expect(second === 1).toBe(true);
			}
		});
	});
	describe('isTuple', () => {
		test.each([
			[0, []],
			[1, [0]],
			[3, [0, 1, 2]],
			[12, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
		] as const)('Works with %s', (count, tuple) => {
			expect(isTuple(tuple, count)).toBe(true);
		});

		test.each([
			[0, [0]],
			[1, [0, 1]],
			[9, []],
		] as const)('Fails with %s', (count, tuple) => {
			expect(isTuple(tuple, count)).toBe(false);
		});

		test('Does not narrow with values longer than 12 with', () => {
			const bakersDozen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			expect(isTuple(bakersDozen, 13)).toBe(true);

			const [, , , , , , , , , , , , egg] = bakersDozen;

			// @TODO @ts-expect-error
			expect(egg === 12).toBe(true);
		});
	});
});
