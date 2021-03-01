import { addDots } from './add-dots';
import { bodyJSON } from './exampleBodyJSON';

const example = JSON.parse(bodyJSON);

describe('Replacing Middot with fake dot', () => {
	it('creates an identical but new object when no changes are needed', () => {
		expect(addDots(example)).not.toBe(example); // We created a new object
		expect(addDots(example)).toEqual(example); // The new object is what we expect
	});

	it('replace the Middot', () => {
		const input = {
			...example,
			blocks: [
				{
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							html: '<p>* * *</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>• I should have a dot.</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...example,
			blocks: [
				{
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html:
								'<p><span data-dcr-style="bullet"></span> I should NOT have a dot.</p>',
						},
					],
				},
			],
		};

		expect(addDots(input)).toEqual(expectedOutput);
	});

	it('Should not make any changes without dots', () => {
		const input = {
			...example,
			blocks: [
				{
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							html: '<p>***</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
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
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I should become a drop cap.</p>',
						},
					],
				},
			],
		};

		expect(addDots(input)).toEqual(expectedOutput);
	});

	it('Should not insert fake dot', () => {
		const input = {
			...example,
			blocks: [
				{
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							html: '<h2><strong>* * *</strong></h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
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
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I am the first paragraph</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I should become a drop cap.</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html:
								'<p><span data-dcr-style="bullet"></span> I should NOT have a dot.</p>',
						},
					],
				},
			],
		};
		expect(addDots(input)).not.toEqual(expectedOutput);
	});
});
