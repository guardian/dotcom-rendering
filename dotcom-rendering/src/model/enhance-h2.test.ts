import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import { enhanceH2 } from './enhance-h2';

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
						html: "<h2 id='mockId'>I should get an id.</h2>",
					},
				],
			},
		];

		expect(enhanceH2(input)).toEqual(expectedOutput);
	});
	it('does not set an id when it is an h2 not of type TextBlockElement', () => {
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

		expect(enhanceH2(input)).toEqual(expectedOutput);
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

		expect(enhanceH2(input)).toEqual(expectedOutput);
	});
});
