import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { getTagPageBannerAdPositions } from './getTagPageAdPositions';

void nodeDescribe('Tag page fronts-banner ad slots', () => {
	void nodeIt(
		'should insert 0 ads if there are less than 5 containers',
		() => {
			assert.deepEqual(getTagPageBannerAdPositions(1), []);
			assert.deepEqual(getTagPageBannerAdPositions(3), []);
		},
	);

	void nodeIt('should insert 1 ad if there are 5-7 containers', () => {
		assert.deepEqual(getTagPageBannerAdPositions(4), [2]);
		assert.deepEqual(getTagPageBannerAdPositions(6), [2]);
	});

	void nodeIt('should insert 2 ads if there are 8-10 containers', () => {
		assert.deepEqual(getTagPageBannerAdPositions(7), [2, 5]);
		assert.deepEqual(getTagPageBannerAdPositions(9), [2, 5]);
	});

	void nodeIt(
		'should insert no more than 8 ads if there are more than 18 containers',
		() => {
			assert.deepEqual(
				getTagPageBannerAdPositions(19),
				[2, 5, 8, 11, 14, 17],
			);
			assert.deepEqual(
				getTagPageBannerAdPositions(25),
				[2, 5, 8, 11, 14, 17, 20, 23],
			);
		},
	);
});
