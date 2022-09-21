import { shouldPadWrappableRows } from './dynamicSlices';

describe('shouldPadWrappableRows', () => {
	describe('Three columns', () => {
		const columns = 3;
		describe('Five cards', () => {
			const cards = 5;
			// true:  0 1 2
			// false: 3 4
			it.each([
				[0, true],
				[1, true],
				[2, true],
				[3, false],
				[4, false],
			])('card number %s should return %s', (index, expected) => {
				expect(shouldPadWrappableRows(index, cards, columns)).toBe(
					expected,
				);
			});
		});

		describe('Six cards', () => {
			const cards = 6;
			// true:  0 1 2
			// false: 3 4 5
			it.each([
				[0, true],
				[1, true],
				[2, true],
				[3, false],
				[4, false],
				[5, false],
			])('card number %s should return %s', (index, expected) => {
				expect(shouldPadWrappableRows(index, cards, columns)).toBe(
					expected,
				);
			});
		});

		describe('Seven cards', () => {
			const cards = 7;
			// true:  0 1 2
			// true:  3 4 5
			// false: 6
			it.each([
				[0, true],
				[1, true],
				[2, true],
				[3, true],
				[4, true],
				[5, true],
				[6, false],
			])('card number %s should return %s', (index, expected) => {
				expect(shouldPadWrappableRows(index, cards, columns)).toBe(
					expected,
				);
			});
		});
	});

	describe('Two columns', () => {
		const columns = 2;
		describe('Three cards', () => {
			const cards = 3;
			// true:  0 1
			// false: 2
			it.each([
				[0, true],
				[1, true],
				[2, false],
			])('card number %s should return %s', (index, expected) => {
				expect(shouldPadWrappableRows(index, cards, columns)).toBe(
					expected,
				);
			});
		});

		describe('Four cards', () => {
			const cards = 4;
			// true:  0 1
			// false: 2 3
			it.each([
				[0, true],
				[1, true],
				[2, false],
				[3, false],
			])('card number %s should return %s', (index, expected) => {
				expect(shouldPadWrappableRows(index, cards, columns)).toBe(
					expected,
				);
			});
		});

		describe('Five cards', () => {
			const cards = 5;
			// true:  0 1
			// true:  2 3
			// false: 4
			it.each([
				[0, true],
				[1, true],
				[2, true],
				[3, true],
				[4, false],
			])('card number %s should return %s', (index, expected) => {
				expect(shouldPadWrappableRows(index, cards, columns)).toBe(
					expected,
				);
			});
		});
	});
});
