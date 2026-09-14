import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getZIndex } from './getZIndex';

void describe('getZIndex', () => {
	void it('gets the correct zindex for group and sibling', () => {
		assert.ok(getZIndex('sticky-video-button') > getZIndex('sticky-video'));
		assert.ok(
			getZIndex('expanded-veggie-menu-wrapper') >
				getZIndex('expanded-veggie-menu'),
		);
		assert.ok(
			getZIndex('stickyAdWrapperLabsHeader') >
				getZIndex('stickyAdWrapper'),
		);
		assert.ok(getZIndex('tableOfContents') > getZIndex('articleHeadline'));
		assert.ok(getZIndex('subNavBanner') > getZIndex('articleHeadline'));
		assert.ok(getZIndex('subNavBanner') > getZIndex('bodyArea'));
		assert.ok(getZIndex('card-nested-link') > getZIndex('card-link'));
	});
});
