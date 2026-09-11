import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { nestedOphanComponents } from './ophan-helpers';

void nodeDescribe('Ophan helpers', () => {
	void nodeIt('should handle nested values', () => {
		assert.equal(nestedOphanComponents('logo'), 'logo');
		assert.equal(
			nestedOphanComponents('nav', 'sub nav', 'final element'),
			'nav : sub nav : final element',
		);
	});
});
