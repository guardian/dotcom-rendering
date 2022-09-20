import { Explainer as ExampleArticle } from '../../fixtures/generated/articles/Explainer';
import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import { enhanceTableOfContents } from './enhanceTableOfContents';

describe('Enhance Table of Contents', () => {
	it('does not generate a toc where an existing table of contents exists', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.InteractiveContentsBlockElement',
						elementId: 'mocOne',
						subheadingLinks: [],
					},
				],
			},
		];

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual(
			undefined,
		);
	});

	it('correctly generate a toc from h2s', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2One',
						html: '<h2>This is the h2 text</h2>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2Two',
						html: '<h2>This is the h2 text</h2>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2Three',
						html: '<h2>This is the h2 text</h2>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual({
			items: [
				{
					id: 'h2One',
					title: 'This is the h2 text',
				},
				{
					id: 'h2Two',
					title: 'This is the h2 text',
				},
				{
					id: 'h2Three',
					title: 'This is the h2 text',
				},
			],
		});
	});

	it('will not return a toc if the are fewer than 3 h2s', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2One',
						html: '<h2>This is the h2 text</h2>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2Two',
						html: '<h2>This is the h2 text</h2>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual(
			undefined,
		);
	});
});
