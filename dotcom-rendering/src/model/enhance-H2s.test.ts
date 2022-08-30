import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import { enhanceH2s } from './enhance-H2s';

describe('Enhance h2 Embeds', () => {
	it('sets an id when it is an h2 of type SubheadingBlockElement', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<h2>I should get an id.</h2>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: "<h2 id='i-should-get-an-id'>I should get an id.</h2>",
					},
				],
			},
		];

		expect(enhanceH2s(input)).toEqual(expectedOutput);
	});
	it('does not set an id for h2s of type TextBlockElement', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h2>I should NOT get an id.</h2>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<h2>I should NOT get an id.</h2>',
					},
				],
			},
		];

		expect(enhanceH2s(input)).toEqual(expectedOutput);
	});
	it('does not set an id when it is of type SubheadingBlockElement but not an h2', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<p>I should NOT get an id.</p>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<p>I should NOT get an id.</p>',
					},
				],
			},
		];

		expect(enhanceH2s(input)).toEqual(expectedOutput);
	});

	it('should add the number of occurences to the slug if it is not unique', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<h2>I am not unique.</h2>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<h2>I am not unique.</h2>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<h2>I am not unique.</h2>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: "<h2 id='i-am-not-unique'>I am not unique.</h2>",
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: "<h2 id='i-am-not-unique-1'>I am not unique.</h2>",
					},
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: "<h2 id='i-am-not-unique-2'>I am not unique.</h2>",
					},
				],
			},
		];

		expect(enhanceH2s(input)).toEqual(expectedOutput);
	});

	it('should only have lower case letters in the id', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<h2>I SHOULD BE a LOWeR cAsE id.</h2>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: "<h2 id='i-should-be-a-lower-case-id'>I SHOULD BE a LOWeR cAsE id.</h2>",
					},
				],
			},
		];

		expect(enhanceH2s(input)).toEqual(expectedOutput);
	});

	it('should remove trailing whitespace and replace non-trailing whitespace with hyphens for the id', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<h2> no white space </h2>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: "<h2 id='no-white-space'> no white space </h2>",
					},
				],
			},
		];

		expect(enhanceH2s(input)).toEqual(expectedOutput);
	});

	it('should remove all non-word characters and trailing hyphens from the id ', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<h2>	Jurassic Park III, 2001 - ★★★ </h2>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: "<h2 id='jurassic-park-iii-2001'>	Jurassic Park III, 2001 - ★★★ </h2>",
					},
				],
			},
		];

		expect(enhanceH2s(input)).toEqual(expectedOutput);
	});

	it('should replace multiple "-" with single "-" from the id', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: '<h2>	Jurassic Park III --- 2001 -- ★★★ </h2>',
					},
				],
			},
		];

		const expectedOutput = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
						elementId: 'mockId',
						html: "<h2 id='jurassic-park-iii-2001'>	Jurassic Park III --- 2001 -- ★★★ </h2>",
					},
				],
			},
		];

		expect(enhanceH2s(input)).toEqual(expectedOutput);
	});
});
