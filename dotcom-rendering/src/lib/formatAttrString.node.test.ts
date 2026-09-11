import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { formatAttrString } from './formatAttrString';

const expectedOutput = 'this-headline-should-be-converted';

void nodeDescribe('formatAttrString', () => {
	void nodeIt('Lowercases all', () => {
		const input = 'This Headline Should Be Converted';
		assert.equal(formatAttrString(input), expectedOutput);
	});

	void nodeIt('Converts spaces to hyphens', () => {
		const input = 'this headline should be converted';
		assert.equal(formatAttrString(input), expectedOutput);
	});

	void nodeIt('Removes anything but spaces and letters', () => {
		const input = '/this headline should be converted.';
		assert.equal(formatAttrString(input), expectedOutput);
	});

	void nodeIt('Does not remove numbers', () => {
		const input = 'this headline should be converted 12';
		assert.equal(formatAttrString(input), `${expectedOutput}-12`);
	});

	void nodeIt('Puts it all together', () => {
		const input = '/this Headline should be converted. 12';
		assert.equal(formatAttrString(input), `${expectedOutput}-12`);
	});
});
