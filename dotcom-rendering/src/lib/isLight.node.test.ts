import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { isLight } from './isLight';

void nodeDescribe('isLight', () => {
	void nodeIt(
		'should return the correct response for dark hex colours',
		() => {
			for (const colour of [
				'#791a4e',
				'#644f4e',
				'#7f4e2a',
				'#aa365e',
				'#5e387c',
				'#87656e',
				'#223cdd',
				'#555eee',
				'#334cde',
				'#b54bbb',
			]) {
				assert.equal(isLight(colour), false);
			}
		},
	);

	void nodeIt(
		'should return the correct response for light hex colours',
		() => {
			for (const colour of ['#ea3eee', '#97dc45', '#7ec621', '#54dbb6']) {
				assert.equal(isLight(colour), true);
			}
		},
	);

	void nodeIt(
		'should return the correct response for 3 digit hex colours',
		() => {
			assert.equal(isLight('#f4e'), true);
			assert.equal(isLight('#fff'), true);
			assert.equal(isLight('#999'), true);
			assert.equal(isLight('#64e'), false);
			assert.equal(isLight('#000'), false);
		},
	);

	void nodeIt('should handle if the # is missing', () => {
		assert.equal(isLight('97dc45'), true);
		assert.equal(isLight('000'), false);
	});

	void nodeIt('should handle if the colour string is invalid', () => {
		assert.equal(isLight('wyx'), false);
	});
});
