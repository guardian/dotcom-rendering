import { sanitise } from '@frontend/lib/sanitise-html';

describe('sanitise-html', () => {
	it('Remove rouge attributes', () => {
		const badHtml =
			'<p><a href="https://theguardian.com" not="allowed">Test</a></p>';
		const goodHtml = '<p><a href="https://theguardian.com">Test</a></p>';

		expect(sanitise(badHtml)).toEqual(goodHtml);
	});

	it('Fix malformed anchor', () => {
		const badHtml =
			'<p><a href="https://theguardian.com" not="allowed"">Test</a></p>';
		const goodHtml = '<p><a href="https://theguardian.com">Test</a></p>';

		expect(sanitise(badHtml)).toEqual(goodHtml);
	});
});
