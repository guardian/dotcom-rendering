import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import { enhanceH3s } from './enhance-H3s';

describe('Enhance H3s', () => {
	it('replaces faux h3s with real ones, prefixing them with a divider', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Faux H3 text</strong></p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
						size: 'full',
						spaceAbove: 'tight',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h3>Faux H3 text</h3>',
					},
				],
			},
		];
		expect(enhanceH3s(input)).toEqual(expectedOutput);
	});

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
						_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
						size: 'full',
						spaceAbove: 'tight',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h3>Strong 1 Strong 2</h3>',
					},
				],
			},
		];
		expect(enhanceH3s(input)).toEqual(expectedOutput);
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
						_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
						size: 'full',
						spaceAbove: 'tight',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h3>Strong 1 Strong 2 <a href="example.com">Some Link</a></h3>',
					},
				],
			},
		];
		expect(enhanceH3s(input)).toEqual(expectedOutput);
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
						_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
						size: 'full',
						spaceAbove: 'tight',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h3>Strong 1 some text inbetween Strong 2</h3>',
					},
				],
			},
		];
		expect(enhanceH3s(input)).toEqual(expectedOutput);
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
		expect(enhanceH3s(input)).toEqual(expectedOutput);
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
		expect(enhanceH3s(input)).toEqual(expectedOutput);
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
		expect(enhanceH3s(input)).toEqual(expectedOutput);
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
		expect(enhanceH3s(input)).toEqual(expectedOutput);
	});

	it('does set divider `spaceAbove` to `loose` if ItemLinkBlockElement is followed by fauxH3', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.ItemLinkBlockElement',
						elementId: 'mockId',
						html: '<ul><li><strong>Item link block</strong><a href="https://www.theguardian.com">Link</a></li></ul>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Faux H3 text</strong></p>',
					},
				],
			},
		];
		const expectedOutput: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.ItemLinkBlockElement',
						elementId: 'mockId',
						html: '<ul><li><strong>Item link block</strong><a href="https://www.theguardian.com">Link</a></li></ul>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
						size: 'full',
						spaceAbove: 'loose',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h3>Faux H3 text</h3>',
					},
				],
			},
		];
		expect(enhanceH3s(input)).toEqual(expectedOutput);
	});
	it('does set divider `spaceAbove` to `tight` if fauxH3 is not proceeded by ItemLinkBlockElement', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: 'some HTML text',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><strong>Faux H3 text</strong></p>',
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
						html: 'some HTML text',
					},
					{
						_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
						size: 'full',
						spaceAbove: 'tight',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h3>Faux H3 text</h3>',
					},
				],
			},
		];
		expect(enhanceH3s(input)).toEqual(expectedOutput);
	});
});
