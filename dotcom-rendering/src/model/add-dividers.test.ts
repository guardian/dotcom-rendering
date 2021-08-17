import { Article } from '@root/fixtures/generated/articles/Article';
import { addDividers } from './add-dividers';

const example = Article;

const blockMetaData = {
	id: '123',
	primaryDateLine: 'Wed 9 Dec 2020 06.30 GMT',
	secondaryDateLine: 'Last modified on Wed 9 Dec 2020 13.40 GMT',
};

describe('Dividers and Drop Caps', () => {
	it('creates an identical but new object when no changes are needed', () => {
		expect(addDividers(example)).not.toBe(example); // We created a new object
		expect(addDividers(example)).toEqual(example); // The new object is what we expect
	});

	it('sets the divider flag correctly', () => {
		const input: CAPIType = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<p>* * *</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							dropCap: true,
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		expect(addDividers(input)).toEqual(expectedOutput);
	});

	it('handles dot dinkuses as text elements', () => {
		const input: CAPIType = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>•••</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							dropCap: true,
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
					],
				},
			],
		};

		expect(addDividers(input)).toEqual(expectedOutput);
	});

	it('handles when there are no spaces in the dinkus', () => {
		const input: CAPIType = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<p>***</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							dropCap: true,
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
					],
				},
			],
		};

		expect(addDividers(input)).toEqual(expectedOutput);
	});

	it('handles divider flags wrapped in h2 tags', () => {
		const input: CAPIType = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2><strong>* * *</strong></h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							dropCap: true,
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		expect(addDividers(input)).toEqual(expectedOutput);
	});

	it('handles multiple divider flags', () => {
		const input: CAPIType = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<p>* * *</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2><strong>***</strong></h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should also become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							dropCap: true,
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							dropCap: true,
							elementId: 'mockId',
							html: '<p>I should also become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		expect(addDividers(input)).toEqual(expectedOutput);
	});

	it('handles divider flags being put before elements that are not text', () => {
		const input: CAPIType = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2><strong>* * *</strong></h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.InstagramBlockElement',
							elementId: 'mockId',
							isThirdPartyTracking: true,
							html: '',
							url: '',
							hasCaption: false,
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.InstagramBlockElement',
							elementId: 'mockId',
							isThirdPartyTracking: true,
							html: '',
							url: '',
							hasCaption: false,
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		expect(addDividers(input)).toEqual(expectedOutput);
	});

	it('handles multiple divider flags in sequence', () => {
		const input: CAPIType = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<p>* * *</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<p>* * *</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<p>* * *</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...example,
			blocks: [
				{
					...blockMetaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							dropCap: true,
							elementId: 'mockId',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I should NOT become a drop cap.</p>',
						},
					],
				},
			],
		};

		expect(addDividers(input)).toEqual(expectedOutput);
	});
});
