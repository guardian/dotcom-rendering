import { isGuardianLink } from './isGuardianLink';

describe('isGuardianLink', () => {
	it.each([
		'https://www.theguardian.com/uk',
		'https://theguardian.com/uk',
		'https://m.code.dev-theguardian.com/uk',
		'https://code.dev-theguardian.com/uk',
		'http://localhost:3030/uk',
	])('treats %s as a Guardian link', (href) => {
		expect(isGuardianLink(href)).toBe(true);
	});

	it.each([
		'https://support.theguardian.com/contribute',
		'https://profile.theguardian.com/signin',
		'https://football.theguardian.com/',
	])(
		'treats the Guardian subdomain %s as internal, unlike isExternalLink',
		(href) => {
			expect(isGuardianLink(href)).toBe(true);
		},
	);

	it.each([
		'/culture/kerry-washington',
		'#footnote-1',
		'mailto:someone@theguardian.com',
		'tel:+441234567890',
		'',
		'not a url',
	])('treats the non-http href %s as internal', (href) => {
		expect(isGuardianLink(href)).toBe(true);
	});

	it('treats the legacy affiliate redirector go.theguardian.com as external', () => {
		expect(
			isGuardianLink(
				'http://go.theguardian.com/?id=114047X1572903&url=https%3A%2F%2Fwww.wiggle.co.uk%2F',
			),
		).toBe(false);
	});

	it.each([
		'https://go.skimresources.com/?id=114047X1572903',
		'https://www.johnlewis.com/',
		'https://nottheguardian.com/uk',
		'https://evil-theguardian.com/uk',
	])('treats %s as external', (href) => {
		expect(isGuardianLink(href)).toBe(false);
	});
});
