import { formatAttrString } from './formatAttrString';

const expectedOutput = 'this-headline-should-be-converted';

describe('formatAttrString', () => {
	it('Lowercases all', () => {
		const input = 'This Headline Should Be Converted';
		expect(formatAttrString(input)).toBe(expectedOutput);
	});

	it('Converts spaces to hyphens', () => {
		const input = 'this headline should be converted';
		expect(formatAttrString(input)).toBe(expectedOutput);
	});

	it('Removes anything but spaces and letters', () => {
		const input = '/this headline should be converted.';
		expect(formatAttrString(input)).toBe(expectedOutput);
	});

	it('Does not remove numbers', () => {
		const input = 'this headline should be converted 12';
		expect(formatAttrString(input)).toBe(`${expectedOutput}-12`);
	});

	it('Puts it all together', () => {
		const input = '/this Headline should be converted. 12';
		expect(formatAttrString(input)).toBe(`${expectedOutput}-12`);
	});
});
