import { decideLanguage, decideLanguageDirection } from './lang';

describe('decideLanguage', () => {
	test('returns undefined if input is "en"', () => {
		expect(decideLanguage('en')).toBe(undefined);
	});

	test('returns input if it is not "en"', () => {
		expect(decideLanguage('at')).toBe('at');
		expect(decideLanguage('fr')).toBe('fr');
	});
});

describe('describeLanguageDirection', () => {
	test('returns rtl if input is true', () => {
		expect(decideLanguageDirection(true)).toBe('rtl');
		expect(decideLanguageDirection(false)).toBe(undefined);
	});
});
