import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { unwrapHtml } from './unwrapHtml';

type Params = Parameters<typeof unwrapHtml>[0];

void describe('unwrapHtml', () => {
	void it('Returns unwrapped HTML if prefix and suffix match', () => {
		// Blockquote, elements inside
		const bqUnwrap: Params = {
			html: '<blockquote class="quote"><p>inner</p></blockquote>',
			fixes: [
				{
					prefix: '<blockquote class="quote">',
					suffix: '</blockquote>',
				},
			],
		};

		const { willUnwrap: bqIsUnwrapped, unwrappedHtml: bqUnwrappedHtml } =
			unwrapHtml(bqUnwrap);

		// Paragraph, no elements inside
		const pUnwrap: Params = {
			html: '<p>inner</p>',
			fixes: [
				{
					prefix: '<p>',
					suffix: '</p>',
				},
			],
		};
		const { willUnwrap: pIsUnwrapped, unwrappedHtml: pUnwrappedHtml } =
			unwrapHtml(pUnwrap);

		// Testy test
		assert.ok(bqIsUnwrapped);
		assert.equal(bqUnwrappedHtml, '<p>inner</p>');
		assert.ok(pIsUnwrapped);
		assert.equal(pUnwrappedHtml, 'inner');
	});

	void it('Returns non-unwrapped HTML if prefix and suffix do not match', () => {
		const bqUnwrap: Params = {
			html: '<blockquote><p>inner</p></blockquote>',
			fixes: [
				{
					prefix: '<blockquote class="quote">',
					suffix: '</blockquote>',
				},
			],
		};
		const { willUnwrap: isUnwrapped, unwrappedHtml } = unwrapHtml(bqUnwrap);

		assert.ok(!isUnwrapped);
		assert.equal(unwrappedHtml, bqUnwrap.html);
	});

	void it('Returns wrapped HTML if prefix and suffix of one "fix" match from multiple options', () => {
		const bqUnwrap: Params = {
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

		const pUnwrap: Params = {
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

		const ulUnwrap: Params = {
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

		assert.ok(bqIsUnwrapped);
		assert.equal(bqUnwrappedHtml, '<p>inner</p>');
		assert.equal(bqUnwrappedElement, 'blockquote');

		assert.ok(pIsUnwrapped);
		assert.equal(pUnwrappedHtml, 'inner');
		assert.equal(pUnwrappedElement, 'p');

		assert.ok(ulIsUnwrapped);
		assert.equal(ulUnwrappedHtml, '<li>Test</li><li>test2</li>');
		assert.equal(ulUnwrappedElement, 'ul');
	});
});
