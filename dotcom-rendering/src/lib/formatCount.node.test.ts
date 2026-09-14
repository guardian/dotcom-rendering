import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatCount } from './formatCount';

void describe('formatCount', () => {
	void it('formats simple numbers', () => {
		assert.deepEqual(formatCount(123), { short: '123', long: '123' });
	});
	void it('formats medium numbers', () => {
		assert.deepEqual(formatCount(9876), { short: '9876', long: '9,876' });
	});
	void it('formats very long numbers', () => {
		assert.deepEqual(formatCount(92878), { short: '93k', long: '92,878' });
	});
	void it('returns zero for zero', () => {
		assert.deepEqual(formatCount(0), { short: '0', long: '0' });
	});
	void it('returns an ellipsis for undefined', () => {
		assert.deepEqual(formatCount(), { short: '…', long: '…' });
	});
});
