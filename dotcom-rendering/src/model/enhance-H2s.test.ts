import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import { enhanceH2s, getUnique } from './enhance-H2s';

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
		const slug = 'i-am-not-unique';
		const array = [
			'my-id',
			'another-id',
			'i-am-not-unique',
			'i-am-not-unique',
			'i-am-not-unique',
		];

		const input = getUnique(slug, array);

		const expectedOutput = 'i-am-not-unique-3';

		expect(input).toEqual(expectedOutput);
	});
});
