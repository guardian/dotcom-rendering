import { enhanceDots } from './add-dots';

const blockMetaData = {
	id: '123',
	primaryDateLine: 'Wed 9 Dec 2020 06.30 GMT',
	secondaryDateLine: 'Last modified on Wed 9 Dec 2020 13.40 GMT',
};

describe('Middot Tests', () => {
	it('Output should not be the same as input as dot has been replaced', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>I am the first paragraph</p>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>• I should have a dot.</p>',
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
						html: '<p>I am the first paragraph</p>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p><span data-dcr-style="bullet"></span> I should have have a dot.</p>',
					},
				],
			},
		];

		expect(enhanceDots(input)).not.toBe(expectedOutput);
	});

	it('It does not incorrectly replace * with dot spans', () => {
		const input: Block[] = [
			{
				...blockMetaData,
				elements: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>I am the first paragraph</p>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>*</p>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>I am text.</p>',
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
						html: '<p>I am the first paragraph</p>',
					},
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>*</p>',
					},

					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						elementId: 'mockId',
						html: '<p>I am text.</p>',
					},
				],
			},
		];

		expect(enhanceDots(input)).toEqual(expectedOutput);
	});
});
