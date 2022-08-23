import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import { enhanceH3s } from './enhance-H3s';
import { Analysis as ExampleArticle } from '../../fixtures/generated/articles/Analysis';
import { Standard as StandardArticle } from '../../fixtures/generated/articles/Standard';

describe('Enhance H3s', () => {
	it('does set a h3 if there is more than one strong tag', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Strong 1</strong> <strong>Strong 2</strong></p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h3>Strong 1 Strong 2</h3>',
					},
				],
			},
		];
		expect(enhanceH3s(input, ExampleArticle.format)).toEqual(
			expectedOutput,
		);
	});

	it('does not set a h3 if the article is not analysis / explainer / numbered list', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Strong 1</strong> <strong>Strong 2</strong></p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Strong 1</strong> <strong>Strong 2</strong></p>',
					},
				],
			},
		];
		expect(enhanceH3s(input, StandardArticle.format)).toEqual(
			expectedOutput,
		);
	});
	it('does set a h3 if there is more than one strong tag', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Strong 1</strong> <strong>Strong 2 <a href="example.com">Some Link</a></strong></p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h3>Strong 1 Strong 2 <a href="example.com">Some Link</a></h3>',
					},
				],
			},
		];
		expect(enhanceH3s(input, ExampleArticle.format)).toEqual(
			expectedOutput,
		);
	});

	it('does set an h3 and extract all text even if it is between stong tages', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Strong 1</strong> some text inbetween <strong>Strong 2</strong></p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h3>Strong 1 some text inbetween Strong 2</h3>',
					},
				],
			},
		];
		expect(enhanceH3s(input, ExampleArticle.format)).toEqual(
			expectedOutput,
		);
	});

	it('does not set a h3 if there is text before the strong tag', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>Some text before <strong>Strong 1</strong></p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>Some text before <strong>Strong 1</strong></p>',
					},
				],
			},
		];
		expect(enhanceH3s(input, ExampleArticle.format)).toEqual(
			expectedOutput,
		);
	});

	it('does not set a h3 if there is text after the strong tag', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Strong 1</strong>Some text after</p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Strong 1</strong>Some text after</p>',
					},
				],
			},
		];
		expect(enhanceH3s(input, ExampleArticle.format)).toEqual(
			expectedOutput,
		);
	});

	it('does not set a h3 if there is text before and after the strong tag', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>Some text before <strong>Strong 1</strong>Some text after</p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>Some text before <strong>Strong 1</strong>Some text after</p>',
					},
				],
			},
		];
		expect(enhanceH3s(input, ExampleArticle.format)).toEqual(
			expectedOutput,
		);
	});

	it('does not set a h3 if there if the html does not end with a strong p tag combo', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>abc</strong>some other text</p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>abc</strong>some other text</p>',
					},
				],
			},
		];
		expect(enhanceH3s(input, ExampleArticle.format)).toEqual(
			expectedOutput,
		);
	});
});
