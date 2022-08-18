import { Standard as ExampleArticle } from '../../fixtures/generated/articles/Standard';
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
	it('correctly generate a toc from h2s and h3s', () => {
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
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3One',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2Three',
						html: '<h2>This is the h2 text</h2>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual([
			{ id: 'h2One', nested: [], title: 'This is the h2 text' },
			{
				id: 'h2Two',
				nested: [{ id: 'h3One', title: 'This is the h3 text' }],
				title: 'This is the h2 text',
			},
			{ id: 'h2Three', nested: [], title: 'This is the h2 text' },
		]);
	});
	it('will ignore any h4s if there are h2s present in the document', () => {
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
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h4One',
						html: '<h4>This is the h4 text</h4>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2Two',
						html: '<h2>This is the h2 text</h2>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3One',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h4Two',
						html: '<h4>This is the h4 text</h4>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2Three',
						html: '<h2>This is the h2 text</h2>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual([
			{ id: 'h2One', nested: [], title: 'This is the h2 text' },
			{
				id: 'h2Two',
				nested: [{ id: 'h3One', title: 'This is the h3 text' }],
				title: 'This is the h2 text',
			},
			{ id: 'h2Three', nested: [], title: 'This is the h2 text' },
		]);
	});
	it('will ignore orphan h3s', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3One',
						html: '<h3>I am an orphan h3</h3>',
					},
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
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3Two',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'h2Three',
						html: '<h2>This is the h2 text</h2>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual([
			{ id: 'h2One', nested: [], title: 'This is the h2 text' },
			{
				id: 'h2Two',
				nested: [{ id: 'h3Two', title: 'This is the h3 text' }],
				title: 'This is the h2 text',
			},
			{ id: 'h2Three', nested: [], title: 'This is the h2 text' },
		]);
	});
	it('will only use h3s if no h2s exist', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3One',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3Two',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h4One',
						html: '<h4>This is the h4 text</h4>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3Three',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h4Two',
						html: '<h4>This is the h4 text</h4>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual([
			{ id: 'h3One', nested: [], title: 'This is the h3 text' },
			{
				id: 'h3Two',
				nested: [],
				title: 'This is the h3 text',
			},
			{
				id: 'h3Three',
				nested: [],
				title: 'This is the h3 text',
			},
		]);
	});
	it('will handle multiple nested h3 links', () => {
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
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3One',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3Two',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3Three',
						html: '<h3>This is the h3 text</h3>',
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

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual([
			{
				id: 'h2One',
				nested: [
					{ id: 'h3One', title: 'This is the h3 text' },
					{ id: 'h3Two', title: 'This is the h3 text' },
					{ id: 'h3Three', title: 'This is the h3 text' },
				],
				title: 'This is the h2 text',
			},
			{ id: 'h2Two', nested: [], title: 'This is the h2 text' },
			{ id: 'h2Three', nested: [], title: 'This is the h2 text' },
		]);
	});
	it('will generate a toc if there are only h4s', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h4One',
						html: '<h4>This is the h4 text</h4>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h4Two',
						html: '<h4>This is the h4 text</h4>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h4Three',
						html: '<h4>This is the h4 text</h4>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual([
			{
				id: 'h4One',
				nested: [],
				title: 'This is the h4 text',
			},
			{
				id: 'h4Two',
				nested: [],
				title: 'This is the h4 text',
			},
			{
				id: 'h4Three',
				nested: [],
				title: 'This is the h4 text',
			},
		]);
	});
	it('will generate a toc if there are only h3s', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3One',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3Two',
						html: '<h3>This is the h3 text</h3>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'h3Three',
						html: '<h3>This is the h3 text</h3>',
					},
				],
			},
		];

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual([
			{
				id: 'h3One',
				nested: [],
				title: 'This is the h3 text',
			},
			{
				id: 'h3Two',
				nested: [],
				title: 'This is the h3 text',
			},
			{
				id: 'h3Three',
				nested: [],
				title: 'This is the h3 text',
			},
		]);
	});
	it('will generate a toc if there are only h2s', () => {
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

		expect(enhanceTableOfContents(ExampleArticle.format, input)).toEqual([
			{
				id: 'h2One',
				nested: [],
				title: 'This is the h2 text',
			},
			{
				id: 'h2Two',
				nested: [],
				title: 'This is the h2 text',
			},
			{
				id: 'h2Three',
				nested: [],
				title: 'This is the h2 text',
			},
		]);
	});
	it('will not return a toc if the are fewer than 3 headings', () => {
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
