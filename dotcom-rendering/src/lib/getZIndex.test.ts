import { getZIndex } from './getZIndex';

describe('getZIndex', () => {
	it('gets the correct zindex for group and sibling', () => {
		expect(getZIndex('sticky-video-button')).toBeGreaterThan(
			getZIndex('sticky-video'),
		);
		expect(getZIndex('expanded-veggie-menu-wrapper')).toBeGreaterThan(
			getZIndex('expanded-veggie-menu'),
		);
		expect(getZIndex('stickyAdWrapperLabsHeader')).toBeGreaterThan(
			getZIndex('stickyAdWrapper'),
		);
		expect(getZIndex('tableOfContents')).toBeGreaterThan(
			getZIndex('articleHeadline'),
		);
		expect(getZIndex('subNavBanner')).toBeGreaterThan(
			getZIndex('articleHeadline'),
		);
		expect(getZIndex('subNavBanner')).toBeGreaterThan(
			getZIndex('bodyArea'),
		);
		expect(getZIndex('card-nested-link')).toBeGreaterThan(
			getZIndex('card-link'),
		);
	});
});
