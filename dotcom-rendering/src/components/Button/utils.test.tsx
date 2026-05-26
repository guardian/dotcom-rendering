import { isExternalLink } from './utils';

describe('isExternalLink', () => {
	it('correctly identifies an external link', () => {
		expect(isExternalLink('https://www.theguardian.com/a/path')).toBe(
			false,
		);
		expect(isExternalLink('https://code.dev-theguardian.com/dsa')).toBe(
			false,
		);
		expect(isExternalLink('https://m.code.dev-theguardian.com/dsa')).toBe(
			false,
		);
		expect(isExternalLink('https://bbc.co.uk')).toBe(true);
	});

	it('does not throw when the passed string is not a link', () => {
		expect(isExternalLink('im-from-the-internet')).toBe(false);
	});
});
