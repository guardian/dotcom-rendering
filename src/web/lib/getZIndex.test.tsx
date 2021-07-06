import { getZIndex } from './getZIndex';

describe('getZIndex', () => {
	it('gets the correct zindex for group and sibling', () => {
		expect(getZIndex('banner')).toBe('z-index: 17;');
		expect(getZIndex('dropdown')).toBe('z-index: 16;');
		expect(getZIndex('burger')).toBe('z-index: 15;');
		expect(getZIndex('expanded-veggie-menu-wrapper')).toBe('z-index: 14;');
		expect(getZIndex('expanded-veggie-menu')).toBe('z-index: 13;');
		expect(getZIndex('stickyAdWrapperLabsHeader')).toBe('z-index: 12;');
		expect(getZIndex('stickyAdWrapper')).toBe('z-index: 11;');
		expect(getZIndex('stickyAdWrapperNav')).toBe('z-index: 10;');
		expect(getZIndex('editionDropdown')).toBe('z-index: 9;');
		expect(getZIndex('searchHeaderLink')).toBe('z-index: 8;');
		expect(getZIndex('TheGuardian')).toBe('z-index: 7;');
		expect(getZIndex('headerWrapper')).toBe('z-index: 6;');
		expect(getZIndex('articleHeadline')).toBe('z-index: 5;');
		expect(getZIndex('immersiveBlackBox')).toBe('z-index: 4;');
		expect(getZIndex('bodyArea')).toBe('z-index: 3;');
		expect(getZIndex('rightColumnArea')).toBe('z-index: 2;');
		expect(getZIndex('mainMedia')).toBe('z-index: 1;');
	});
});
