import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { isFilterPageId } from './theFilter';

void nodeDescribe('isFilterPageId', () => {
	void nodeIt('returns true for a UK Filter article pageId', () => {
		assert.equal(
			isFilterPageId(
				'thefilter/2026/jul/02/jess-cartner-morleys-july-style-essentials-2026',
			),
			true,
		);
	});

	void nodeIt('returns true for a US Filter article pageId', () => {
		assert.equal(
			isFilterPageId(
				'thefilter-us/2025/dec/27/best-wine-subscriptions-us',
			),
			true,
		);
	});

	void nodeIt('returns false for a non-Filter pageId', () => {
		assert.equal(
			isFilterPageId('technology/2026/jan/01/some-other-article'),
			false,
		);
	});

	void nodeIt(
		'returns false for a pageId that merely contains "thefilter" mid-string',
		() => {
			assert.equal(
				isFilterPageId('lifestyle/thefilter-mentioned/some-article'),
				false,
			);
		},
	);
});
