import { getZIndex } from './getZIndex';

describe('getZIndex', () => {
	it('gets the correct zindex for group and sibling', () => {
		expect(getZIndex('sticky-video-button')).toBe('z-index: 25;');
		expect(getZIndex('sticky-video')).toBe('z-index: 24;');
		expect(getZIndex('banner')).toBe('z-index: 23;');
		expect(getZIndex('dropdown')).toBe('z-index: 22;');
		expect(getZIndex('burger')).toBe('z-index: 21;');
		expect(getZIndex('expanded-veggie-menu-wrapper')).toBe('z-index: 20;');
		expect(getZIndex('expanded-veggie-menu')).toBe('z-index: 19;');
		expect(getZIndex('mobileSticky')).toBe('z-index: 18;');
		expect(getZIndex('stickyAdWrapperLabsHeader')).toBe('z-index: 17;');
		expect(getZIndex('stickyAdWrapper')).toBe('z-index: 16;');
		expect(getZIndex('stickyAdWrapperNav')).toBe('z-index: 15;');
		expect(getZIndex('editionDropdown')).toBe('z-index: 14;');
		expect(getZIndex('toast')).toBe('z-index: 13;');
		expect(getZIndex('onwardsCarousel')).toBe('z-index: 12;');
		expect(getZIndex('myAccountDropdown')).toBe('z-index: 11;');
		expect(getZIndex('searchHeaderLink')).toBe('z-index: 10;');
		expect(getZIndex('TheGuardian')).toBe('z-index: 9;');
		expect(getZIndex('headerWrapper')).toBe('z-index: 8;');
		expect(getZIndex('articleHeadline')).toBe('z-index: 7;');
		expect(getZIndex('immersiveBlackBox')).toBe('z-index: 6;');
		expect(getZIndex('bodyArea')).toBe('z-index: 5;');
		expect(getZIndex('rightColumnArea')).toBe('z-index: 4;');
		expect(getZIndex('mainMedia')).toBe('z-index: 3;');
		expect(getZIndex('card-nested-link')).toBe('z-index: 2;');
		expect(getZIndex('card-link')).toBe('z-index: 1;');
	});
});
