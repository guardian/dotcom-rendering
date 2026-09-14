import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getZIndex } from './getZIndex';

void describe('getZIndex', () => {
	void it('gets the correct zindex for group and sibling', () => {
		assert(getZIndex('sticky-video-button') > getZIndex('sticky-video'));
		assert(
			getZIndex('expanded-veggie-menu-wrapper') >
				getZIndex('expanded-veggie-menu'),
		);
		assert(
			getZIndex('stickyAdWrapperLabsHeader') >
				getZIndex('stickyAdWrapper'),
		);
		assert(getZIndex('tableOfContents') > getZIndex('articleHeadline'));
		assert(getZIndex('subNavBanner') > getZIndex('articleHeadline'));
		assert(getZIndex('subNavBanner') > getZIndex('bodyArea'));
		assert(getZIndex('card-nested-link') > getZIndex('card-link'));
	});
});
