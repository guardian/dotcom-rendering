import { headline } from './typography';

it('fs evaluates correctly', () => {
    expect(headline(2)).toBe(
        'font-size: 16px; line-height: 20px; font-family: GH Guardian Headline, Georgia, serif',
    );
});
