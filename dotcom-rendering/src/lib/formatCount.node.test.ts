import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { formatCount } from './formatCount';

void nodeDescribe('formatCount', () => {
	void nodeIt('formats simple numbers', () => {
		assert.deepEqual(formatCount(123), { short: '123', long: '123' });
	});
	void nodeIt('formats medium numbers', () => {
		assert.deepEqual(formatCount(9876), { short: '9876', long: '9,876' });
	});
	void nodeIt('formats very long numbers', () => {
		assert.deepEqual(formatCount(92878), { short: '93k', long: '92,878' });
	});
	void nodeIt('returns zero for zero', () => {
		assert.deepEqual(formatCount(0), { short: '0', long: '0' });
	});
	void nodeIt('returns an ellipsis for undefined', () => {
		assert.deepEqual(formatCount(), { short: '…', long: '…' });
	});
});
