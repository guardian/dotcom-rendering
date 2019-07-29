import { findPillar } from './find-pillar';

describe('findPillar', () => {
    it('returns pillar if valid', () => {
        expect(findPillar('News')).toBe('news');
    });

    it('returns news pillar if not valid', () => {
        expect(findPillar('foo')).toBe('news');
    });

    it('returns "culture" if "arts"', () => {
        expect(findPillar('Arts', [])).toBe('culture');
    });

    it('returns "labs" if paid content tagging exists', () => {
        const tags = [
            {
                id: 'money/ticket-prices',
                type: 'Keyword',
                title: 'Ticket prices',
            },
            {
                id: 'tone/advertisement-features',
                type: 'Tone',
                title: 'Consumer affairs',
            },
        ];

        expect(findPillar('Arts', tags)).toBe('labs');
    });
});
