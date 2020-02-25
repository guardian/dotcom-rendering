import { getZIndex } from './getZIndex';

describe('getZIndex', () => {
    it('gets the correct zindex for group and sibling', () => {
        expect(
            getZIndex({
                group: 'bodyGroup',
                name: 'rightColumnArea',
            }),
        ).toBe('z-index: 1;');

        expect(
            getZIndex({
                group: 'bodyGroup',
                name: 'bodyArea',
            }),
        ).toBe('z-index: 2;');

        expect(
            getZIndex({
                group: 'headerGroup',
                name: 'stickyAdWrapper',
            }),
        ).toBe('z-index: 4;');
    });
});
