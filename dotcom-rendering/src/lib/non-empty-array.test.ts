import { isNonEmptyArray } from './non-empty-array';

it('isNonEmpty', () => {
	expect(isNonEmptyArray([])).toBe(false);
	expect(isNonEmptyArray([1])).toBe(true);
	expect(isNonEmptyArray([1, 2, 3])).toBe(true);
});
