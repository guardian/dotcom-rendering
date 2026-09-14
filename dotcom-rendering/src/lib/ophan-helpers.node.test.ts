import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { nestedOphanComponents } from './ophan-helpers';

void describe('Ophan helpers', () => {
	void it('should handle nested values', () => {
		assert.equal(nestedOphanComponents('logo'), 'logo');
		assert.equal(
			nestedOphanComponents('nav', 'sub nav', 'final element'),
			'nav : sub nav : final element',
		);
	});
});
