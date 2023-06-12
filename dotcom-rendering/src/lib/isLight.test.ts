import { isLight } from './isLight';

describe('isLight', () => {
	it('should return the correct response for dark hex colours', () => {
		expect(isLight('#791a4e')).toBe(false);
		expect(isLight('#644f4e')).toBe(false);
		expect(isLight('#7f4e2a')).toBe(false);
		expect(isLight('#aa365e')).toBe(false);
		expect(isLight('#5e387c')).toBe(false);
		expect(isLight('#87656e')).toBe(false);
		expect(isLight('#223cdd')).toBe(false);
		expect(isLight('#555eee')).toBe(false);
		expect(isLight('#334cde')).toBe(false);
		expect(isLight('#b54bbb')).toBe(false);
	});

	it('should return the correct response for light hex colours', () => {
		expect(isLight('#ea3eee')).toBe(true);
		expect(isLight('#97dc45')).toBe(true);
		expect(isLight('#7ec621')).toBe(true);
		expect(isLight('#54dbb6')).toBe(true);
	});

	it('should return the correct response for 3 digit hex colours', () => {
		expect(isLight('#f4e')).toBe(true);
		expect(isLight('#fff')).toBe(true);
		expect(isLight('#999')).toBe(true);
		expect(isLight('#64e')).toBe(false);
		expect(isLight('#000')).toBe(false);
	});

	it('should handle if the # is missing', () => {
		expect(isLight('97dc45')).toBe(true);
		expect(isLight('000')).toBe(false);
	});

	it('should handle if the colour string is invalid', () => {
		expect(isLight('wyx')).toBe(false);
	});
});
