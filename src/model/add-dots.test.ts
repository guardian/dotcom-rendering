import { Article } from '@root/fixtures/generated/articles/Article';
import { enhanceDots } from './add-dots';

const example = Article;

describe('Middot Tests', () => {
	it('Output should not be the same as input as dot has been replaced', () => {
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
								'model.dotcomrendering.pageElements.TextBlockElement',
							html:
								'<p><span data-dcr-style="bullet"></span> I should have have a dot.</p>',
						},
					],
				},
			],
		};

		expect(enhanceDots(input)).not.toBe(expectedOutput);
	});

	it('It does not incorrectly replace * with dot spans', () => {
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
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>*</p>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I am text.</p>',
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
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>*</p>',
						},

						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							html: '<p>I am text.</p>',
						},
					],
				},
			],
		};

		expect(enhanceDots(input)).toEqual(expectedOutput);
	});
});
