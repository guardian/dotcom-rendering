import type { JSX } from 'react';
import { renderToString } from 'react-dom/server';
import { withSignInGateSlot } from './withSignInGateSlot';

const makeElement = (key: number): JSX.Element => (
	<p key={key}>Element {key}</p>
);

// renderToString inserts comment markers between text nodes and expressions;
// strip them so substring assertions are stable.
const stripMarkers = (html: string): string => html.replace(/<!-- -->/g, '');

const renderSlot = (
	renderedElements: Array<JSX.Element | null | undefined>,
): string =>
	stripMarkers(
		renderToString(
			<>{withSignInGateSlot({ ...baseProps, renderedElements })}</>,
		),
	);

const baseProps = {
	contentType: 'Article',
	sectionId: 'uk-news',
	tags: [],
	isPaidContent: false,
	isPreview: false,
	host: 'https://theguardian.com',
	pageId: 'world/2026/sep/01/test',
	idUrl: 'https://profile.theguardian.com',
	isSensitive: false,
	isDev: false,
	contributionsServiceUrl: 'https://contributions.guardianapis.com',
	editionId: 'UK' as const,
};

describe('withSignInGateSlot', () => {
	it('inserts the placeholder after the second element', () => {
		const html = renderSlot([
			makeElement(0),
			makeElement(1),
			makeElement(2),
		]);

		const secondElementEnd = html.indexOf('Element 1</p>');
		const thirdElementStart = html.indexOf('Element 2');
		const placeholderIndex = html.indexOf('id="sign-in-gate"');

		expect(placeholderIndex).toBeGreaterThan(secondElementEnd);
		expect(placeholderIndex).toBeLessThan(thirdElementStart);
	});

	it('provides exactly one placeholder', () => {
		const html = renderSlot([
			makeElement(0),
			makeElement(1),
			makeElement(2),
		]);

		expect(html.split('id="sign-in-gate"')).toHaveLength(2); // one occurrence
	});

	it('appends the placeholder after the last element when the body has one element', () => {
		const html = renderSlot([makeElement(0)]);

		expect(html).toContain('Element 0');
		expect(html).toContain('id="sign-in-gate"');
		const elementEnd = html.indexOf('Element 0</p>');
		const placeholderIndex = html.indexOf('id="sign-in-gate"');
		expect(placeholderIndex).toBeGreaterThan(elementEnd);
	});

	it('still provides a placeholder when the body has no elements', () => {
		const html = renderSlot([]);

		expect(html).toContain('id="sign-in-gate"');
	});
});
