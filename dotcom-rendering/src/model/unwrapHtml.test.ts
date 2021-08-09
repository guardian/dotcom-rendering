import { unwrapHtml } from './unwrapHtml';

describe('unwrapHtml', () => {
	it('Returns unwrapped HTML if prefix and suffix match', () => {
		// Blockquote, elements inside
		const bqUnwrap = {
			html: '<blockquote class="quote"><p>inner</p></blockquote>',
			fixes: [
				{
					prefix: '<blockquote class="quote">',
					suffix: '</blockquote>',
				},
			],
		};

		const {
			willUnwrap: bqIsUnwrapped,
			unwrappedHtml: bqUnwrappedHtml,
		} = unwrapHtml(bqUnwrap);

		// Paragraph, no elements inside
		const pUnwrap = {
			html: '<p>inner</p>',
			fixes: [
				{
					prefix: '<p>',
					suffix: '</p>',
				},
			],
		};
		const {
			willUnwrap: pIsUnwrapped,
			unwrappedHtml: pUnwrappedHtml,
		} = unwrapHtml(pUnwrap);

		// Testy test
		expect(bqIsUnwrapped).toBeTruthy();
		expect(bqUnwrappedHtml).toBe('<p>inner</p>');
		expect(pIsUnwrapped).toBeTruthy();
		expect(pUnwrappedHtml).toBe('inner');
	});

	it('Returns non-unwrapped HTML if prefix and suffix do not match', () => {
		const bqUnwrap = {
			html: '<blockquote><p>inner</p></blockquote>',
			fixes: [
				{
					prefix: '<blockquote class="quote">',
					suffix: '</blockquote>',
				},
			],
		};
		const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml(bqUnwrap);

		expect(isUnwrapped).toBeFalsy();
		expect(unwrappedHtml).toBe(bqUnwrap.html);
	});

	it('Returns wrapped HTML if prefix and suffix of one "fix" match from multiple options', () => {
		const bqUnwrap = {
			html: '<blockquote><p>inner</p></blockquote>',
			fixes: [
				{
					prefix: '<blockquote>',
					suffix: '</blockquote>',
					unwrappedElement: 'blockquote',
				},
				{
					prefix: '<p>',
					suffix: '</p>',
					unwrappedElement: 'p',
				},
			],
		};

		const {
			willUnwrap: bqIsUnwrapped,
			unwrappedHtml: bqUnwrappedHtml,
			unwrappedElement: bqUnwrappedElement,
		} = unwrapHtml(bqUnwrap);

		const pUnwrap = {
			html: '<p>inner</p>',
			fixes: [
				{
					prefix: '<p>',
					suffix: '</p>',
					unwrappedElement: 'p',
				},
				{
					prefix: '<ul>',
					suffix: '</ul>',
					unwrappedElement: 'ul',
				},
			],
		};
		const {
			willUnwrap: pIsUnwrapped,
			unwrappedHtml: pUnwrappedHtml,
			unwrappedElement: pUnwrappedElement,
		} = unwrapHtml(pUnwrap);

		const ulUnwrap = {
			html: '<ul><li>Test</li><li>test2</li></ul>',
			fixes: [
				{
					prefix: '<p>',
					suffix: '</p>',
					unwrappedElement: 'p',
				},
				{
					prefix: '<ul>',
					suffix: '</ul>',
					unwrappedElement: 'ul',
				},
			],
		};

		// Unwrap Unordered lists
		const {
			willUnwrap: ulIsUnwrapped,
			unwrappedHtml: ulUnwrappedHtml,
			unwrappedElement: ulUnwrappedElement,
		} = unwrapHtml(ulUnwrap);

		expect(bqIsUnwrapped).toBeTruthy();
		expect(bqUnwrappedHtml).toBe('<p>inner</p>');
		expect(bqUnwrappedElement).toBe('blockquote');

		expect(pIsUnwrapped).toBeTruthy();
		expect(pUnwrappedHtml).toBe('inner');
		expect(pUnwrappedElement).toBe('p');

		expect(ulIsUnwrapped).toBeTruthy();
		expect(ulUnwrappedHtml).toBe('<li>Test</li><li>test2</li>');
		expect(ulUnwrappedElement).toBe('ul');
	});
});
