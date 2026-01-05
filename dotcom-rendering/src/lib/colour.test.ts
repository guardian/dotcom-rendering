import { addAlpha, getContrast, isLight } from './colour';

const round = (value: number): number => Math.round(value * 100) / 100;

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

/**
 * Contrast ratio calculated by `getContrast` should match that calculated
 * by the WebAIM contrast checker: https://webaim.org/resources/contrastchecker
 */
describe('getContrast', () => {
	it('should return the correct contrast ratio for two colours', () => {
		expect(round(getContrast('#000', '#fff'))).toEqual(21);
		expect(round(getContrast('#f00', '#fff'))).toEqual(4);
		expect(round(getContrast('#faa01b', '#f6f6f6'))).toEqual(1.92);
		expect(round(getContrast('#2a449a', '#f6f6f6'))).toEqual(8.12);
		expect(round(getContrast('#f0c650', '#1a1a1a'))).toEqual(10.69);
		expect(round(getContrast('#559861', '#1a1a1a'))).toEqual(5.01);
	});
});

describe('addAlpha', () => {
	it('should return new colour adjusted for opacity against background colour', () => {
		expect(addAlpha('#da020e', '#ffffff', 1)).toBe('#da020e');
		expect(addAlpha('#da020e', '#1a1a1a', 1)).toBe('#da020e');
		expect(addAlpha('#da020e', '#ffffff', 0.1)).toBe('#fbe6e7');
		expect(addAlpha('#da020e', '#1a1a1a', 0.1)).toBe('#2d1819');
		expect(addAlpha('#023474', '#ffffff', 0.1)).toBe('#e6ebf1');
		expect(addAlpha('#023474', '#1a1a1a', 0.1)).toBe('#181d23');
	});
	it('should return fallback colour if invalid colour passed in', () => {
		expect(addAlpha('#xyz', '#ffffff', 1)).toBe('#7f7f7f');
		expect(addAlpha('#ffffff', '#xyz', 1)).toBe('#7f7f7f');
	});
});
