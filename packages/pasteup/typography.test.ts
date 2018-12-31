import { fs } from './typography';

it('fs evaluates correctly', () => {
    expect(fs('headline', 2)).toBe(
        'font-size: 16px; line-height: 20px; font-family: GH Guardian Headline, Georgia, serif',
    );
});
