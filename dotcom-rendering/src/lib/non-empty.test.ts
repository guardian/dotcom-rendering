import { isNonEmpty } from './non-empty';

it('isNonEmpty', () => {
	expect(isNonEmpty([])).toBe(false);
	expect(isNonEmpty([1])).toBe(true);
	expect(isNonEmpty([1, 2, 3])).toBe(true);
});
