import { getZIndex } from './getZIndex';

describe('getZIndex', () => {
    it('gets the correct zindex for group and sibling', () => {
        expect(getZIndex('rightColumnArea')).toBe('z-index: 1;');

        expect(getZIndex('bodyArea')).toBe('z-index: 2;');

        expect(getZIndex('TheGuardian')).toBe('z-index: 3;');
        expect(getZIndex('headerLinks')).toBe('z-index: 4;');

        expect(getZIndex('stickyAdWrapper')).toBe('z-index: 6;');
    });
});
