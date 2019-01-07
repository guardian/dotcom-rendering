import { headline, body, textSans } from './typography';

it('headline evaluates correctly', () => {
    expect(headline(2)).toBe(
        'font-size: 16px; line-height: 20px; font-family: GH Guardian Headline, Georgia, serif',
    );
});

it('body evaluates correctly', () => {
    expect(body(2)).toBe(
        'font-size: 16px; line-height: 24px; font-family: GuardianTextEgyptian, Georgia, serif',
    );
});

it('textSans evaluates correctly', () => {
    expect(textSans(2)).toBe(
        'font-size: 13px; line-height: 18px; font-family: GuardianTextSans, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    );
});
