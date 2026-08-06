import type { FEElement, ImageBlockElement } from '../types/content';
import { enhanceExternalLinks } from './enhance-external-links';

const enhance = enhanceExternalLinks(true, 'Web');

const textBlock = (html: string): FEElement => ({
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'mockId',
	html,
});

/** Narrows to the elements this enhancer touches, so we can read `html` back */
const htmlOf = (element: FEElement): string =>
	'html' in element && typeof element.html === 'string' ? element.html : '';

describe('enhanceExternalLinks', () => {
	it('opens an external link in a new tab', () => {
		const input = [
			textBlock(
				'<p>Try <a href="https://www.johnlewis.com/">this</a>.</p>',
			),
		];

		expect(htmlOf(enhance(input)[0] as FEElement)).toBe(
			'<p>Try <a href="https://www.johnlewis.com/" target="_blank" rel="noreferrer noopener">this</a>.</p>',
		);
	});

	it('leaves Guardian links untouched, without re-serialising the element', () => {
		const element = textBlock(
			'<p>See <a href="https://www.theguardian.com/uk">the news</a>.</p>',
		);

		// Referential equality pins the no-op fast path
		expect(enhance([element])[0]).toBe(element);
	});

	it('leaves Guardian subdomains untouched', () => {
		const element = textBlock(
			'<p><a href="https://support.theguardian.com/contribute">Support us</a></p>',
		);

		expect(enhance([element])[0]).toBe(element);
	});

	it('adds sponsored to a skimlink that has no rel', () => {
		const input = [
			textBlock(
				'<p><a href="https://go.skimresources.com/?id=1&amp;url=x">Buy</a></p>',
			),
		];

		expect(htmlOf(enhance(input)[0] as FEElement)).toBe(
			'<p><a href="https://go.skimresources.com/?id=1&amp;url=x" target="_blank" rel="sponsored noreferrer noopener">Buy</a></p>',
		);
	});

	it('merges rather than duplicates an existing sponsored rel', () => {
		const input = [
			textBlock(
				'<p><a href="https://go.skimresources.com/?id=1" rel="sponsored">Buy</a></p>',
			),
		];

		expect(htmlOf(enhance(input)[0] as FEElement)).toBe(
			'<p><a href="https://go.skimresources.com/?id=1" rel="sponsored noreferrer noopener" target="_blank">Buy</a></p>',
		);
	});

	it('preserves existing rel tokens on other external links', () => {
		const input = [
			textBlock(
				'<p><a href="https://www.johnlewis.com/" rel="nofollow">Buy</a></p>',
			),
		];

		expect(htmlOf(enhance(input)[0] as FEElement)).toBe(
			'<p><a href="https://www.johnlewis.com/" rel="nofollow noreferrer noopener" target="_blank">Buy</a></p>',
		);
	});

	it.each([
		'<p><a href="mailto:someone@theguardian.com">Email us</a></p>',
		'<p><a href="/culture/kerry-washington">Kerry Washington</a></p>',
		'<p>No links here at all</p>',
	])('leaves %s untouched', (html) => {
		const element = textBlock(html);

		expect(enhance([element])[0]).toBe(element);
	});

	it('treats the legacy affiliate redirector go.theguardian.com as external', () => {
		const input = [
			textBlock(
				'<p>It costs <a href="http://go.theguardian.com/?id=114047X1572903&amp;url=https%3A%2F%2Fwww.wiggle.co.uk%2F" title="">£82.99 at Wiggle.co.uk</a>.</p>',
			),
		];

		expect(htmlOf(enhance(input)[0] as FEElement)).toContain(
			'target="_blank"',
		);
	});

	it('only changes the external anchor when a paragraph has both', () => {
		const input = [
			textBlock(
				'<p><a href="https://www.theguardian.com/uk">News</a> and <a href="https://www.johnlewis.com/">shopping</a></p>',
			),
		];

		expect(htmlOf(enhance(input)[0] as FEElement)).toBe(
			'<p><a href="https://www.theguardian.com/uk">News</a> and <a href="https://www.johnlewis.com/" target="_blank" rel="noreferrer noopener">shopping</a></p>',
		);
	});

	it('preserves surrounding entities and query strings when re-serialising', () => {
		const input = [
			textBlock(
				'<p>Fish&nbsp;&amp; chips <a href="https://www.johnlewis.com/?a=1&amp;b=2">here</a> &lt;3</p>',
			),
		];

		expect(htmlOf(enhance(input)[0] as FEElement)).toBe(
			'<p>Fish&nbsp;&amp; chips <a href="https://www.johnlewis.com/?a=1&amp;b=2" target="_blank" rel="noreferrer noopener">here</a> &lt;3</p>',
		);
	});

	it('enhances blockquote elements too', () => {
		const input: FEElement[] = [
			{
				_type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
				elementId: 'mockId',
				html: '<blockquote><a href="https://www.johnlewis.com/">Buy</a></blockquote>',
			},
		];

		expect(htmlOf(enhance(input)[0] as FEElement)).toBe(
			'<blockquote><a href="https://www.johnlewis.com/" target="_blank" rel="noreferrer noopener">Buy</a></blockquote>',
		);
	});

	describe('captions', () => {
		const image = (caption: string): ImageBlockElement => ({
			_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
			elementId: 'mockId',
			media: { allImages: [] },
			data: { alt: 'An air fryer', caption },
			imageSources: [],
			role: 'inline',
		});

		it('enhances an image caption held under data', () => {
			const [enhanced] = enhance([
				image('Buy it <a href="https://www.johnlewis.com/">here</a>.'),
			]) as [ImageBlockElement];

			expect(enhanced.data.caption).toBe(
				'Buy it <a href="https://www.johnlewis.com/" target="_blank" rel="noreferrer noopener">here</a>.',
			);
		});

		it('leaves the rest of the image data intact', () => {
			const [enhanced] = enhance([
				image('<a href="https://www.johnlewis.com/">Buy</a>'),
			]) as [ImageBlockElement];

			expect(enhanced.data.alt).toBe('An air fryer');
			expect(enhanced.role).toBe('inline');
		});

		it('leaves a Guardian caption link alone', () => {
			const element = image(
				'The Guardian may make a commission. <a href="https://www.theguardian.com/info/2017/nov/01/reader-information-on-affiliate-links">More information</a>.',
			);

			expect(enhance([element])[0]).toBe(element);
		});

		it('enhances a caption held directly on the element', () => {
			const input: FEElement[] = [
				{
					_type: 'model.dotcomrendering.pageElements.CartoonBlockElement',
					elementId: 'mockId',
					role: 'inline',
					variants: [],
					caption: '<a href="https://www.johnlewis.com/">Buy</a>',
				},
			];

			const [enhanced] = enhance(input);

			expect(
				enhanced && 'caption' in enhanced
					? enhanced.caption
					: undefined,
			).toBe(
				'<a href="https://www.johnlewis.com/" target="_blank" rel="noreferrer noopener">Buy</a>',
			);
		});

		it('enhances a captionText held on a caption element', () => {
			const input: FEElement[] = [
				{
					_type: 'model.dotcomrendering.pageElements.CaptionBlockElement',
					elementId: 'mockId',
					captionText:
						'<a href="https://go.skimresources.com/?id=1">Buy</a>',
				},
			];

			const [enhanced] = enhance(input);

			expect(
				enhanced && 'captionText' in enhanced
					? enhanced.captionText
					: undefined,
			).toBe(
				'<a href="https://go.skimresources.com/?id=1" target="_blank" rel="sponsored noreferrer noopener">Buy</a>',
			);
		});

		it('enhances captions on images nested in a multi image element', () => {
			const input: FEElement[] = [
				{
					_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
					elementId: 'mockId',
					images: [
						image('<a href="https://www.johnlewis.com/">Buy</a>'),
					],
					caption: '<a href="https://www.currys.co.uk/">Or here</a>',
				},
			];

			const [enhanced] = enhance(input);

			if (
				enhanced?._type !==
				'model.dotcomrendering.pageElements.MultiImageBlockElement'
			) {
				throw new Error('Expected a MultiImageBlockElement');
			}

			expect(enhanced.caption).toContain('target="_blank"');
			expect(enhanced.images[0]?.data.caption).toContain(
				'target="_blank"',
			);
		});

		it('does not enhance captions when rendering for apps', () => {
			const element = image(
				'<a href="https://www.johnlewis.com/">Buy</a>',
			);

			expect(enhanceExternalLinks(true, 'Apps')([element])[0]).toBe(
				element,
			);
		});
	});

	it('does nothing when the article has no affiliate disclaimer', () => {
		const element = textBlock(
			'<p><a href="https://www.johnlewis.com/">Buy</a></p>',
		);

		expect(enhanceExternalLinks(false, 'Web')([element])[0]).toBe(element);
	});

	it('does nothing when rendering for apps', () => {
		const element = textBlock(
			'<p><a href="https://www.johnlewis.com/">Buy</a></p>',
		);

		expect(enhanceExternalLinks(true, 'Apps')([element])[0]).toBe(element);
	});
});
