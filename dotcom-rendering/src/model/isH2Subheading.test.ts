import { isH2Subheading } from './isH2Subheading';

describe('isH2Subheading', () => {
	it.each([
		'<h2>A subheading</h2>',
		"<h2 id='a-subheading'>A subheading</h2>",
		'<h2>A subheading with <strong>strong</strong> tags</h2>',
		'Subheading text only (no HTML)',
	])('treats %s as an h2 subheading', (html) => {
		expect(isH2Subheading(html)).toBe(true);
	});

	it.each([
		'<h3>An h3</h3>',
		"<h3 id='an-h3'>An h3</h3>",
		'<H4>An h4</H4>',
		'<h4>An h4 with <strong>strong</strong> tags</h4>',
	])('does not treat %s as an h2 subheading', (html) => {
		expect(isH2Subheading(html)).toBe(false);
	});

	it('is not confused by text that looks like a lower level heading', () => {
		expect(isH2Subheading('<h2>Fix the h3 problem</h2>')).toBe(true);
	});
});
