import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatAttrString } from './formatAttrString';

const expectedOutput = 'this-headline-should-be-converted';

void describe('formatAttrString', () => {
	void it('Lowercases all', () => {
		const input = 'This Headline Should Be Converted';
		assert.equal(formatAttrString(input), expectedOutput);
	});

	void it('Converts spaces to hyphens', () => {
		const input = 'this headline should be converted';
		assert.equal(formatAttrString(input), expectedOutput);
	});

	void it('Removes anything but spaces and letters', () => {
		const input = '/this headline should be converted.';
		assert.equal(formatAttrString(input), expectedOutput);
	});

	void it('Does not remove numbers', () => {
		const input = 'this headline should be converted 12';
		assert.equal(formatAttrString(input), `${expectedOutput}-12`);
	});

	void it('Puts it all together', () => {
		const input = '/this Headline should be converted. 12';
		assert.equal(formatAttrString(input), `${expectedOutput}-12`);
	});
});
