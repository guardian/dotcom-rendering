import { findPillar } from './find-pillar';

jest.mock('@frontend/lib/pillars', () => ({
    pillarNames: ['news', 'opinion', 'sport', 'culture', 'lifestyle'],
}));

describe('findPillar', () => {
    it('returns pillar if valid', () => {
        expect(findPillar('News')).toBe('news');
    });

    it('returns undefined if not valid', () => {
        expect(findPillar('foo')).toBeUndefined();
    });

    it('returns "culture if "arts"', () => {
        expect(findPillar('Arts')).toBe('culture');
    });
});
