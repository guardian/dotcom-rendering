import { NumberedList } from '@root/fixtures/generated/articles/NumberedList';
import { Article } from '@root/fixtures/generated/articles/Article';
import { images } from '@root/fixtures/generated/images';

import { enhanceNumberedLists } from './enhance-numbered-lists';

const metaData = {
	id: '123',
	primaryDateLine: 'Wed 9 Dec 2020 06.30 GMT',
	secondaryDateLine: 'Last modified on Wed 9 Dec 2020 13.40 GMT',
};

describe('Enhance Numbered Lists', () => {
	it('sets the role for the image to be inline', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							...images[0],
							role: 'thumbnail',
						},
					],
				},
			],
		};
		const expectedOutput: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							...images[0],
							role: 'inline',
						},
					],
				},
			],
		};
		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('does not enhance articles if they are not numbered lists', () => {
		const input: CAPIType = {
			...Article,
			blocks: [
				{
					...metaData,
					elements: [
						{
							...images[0],
							role: 'thumbnail',
						},
					],
				},
			],
		};
		const expectedOutput: CAPIType = {
			...Article,
			blocks: [
				{
					...metaData,
					elements: [
						{
							...images[0],
							role: 'thumbnail',
						},
					],
				},
			],
		};
		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('replaces faux h3s with real ones, prefixing them with a divider', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p><strong>Faux H3 text</strong></p>',
						},
					],
				},
			],
		};
		const expectedOutput: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.DividerBlockElement',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<h3>Faux H3 text</h3>',
						},
					],
				},
			],
		};
		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('does not set a h3 if there is more than one strong tag', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<p><strong>Strong 1</strong><strong>Strong 2</strong></p>',
						},
					],
				},
			],
		};
		const expectedOutput: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<p><strong>Strong 1</strong><strong>Strong 2</strong></p>',
						},
					],
				},
			],
		};
		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('does not set a h3 if there if the html does not end with a strong p tag combo', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p><strong>abc</strong>some other text</p>',
						},
					],
				},
			],
		};
		const expectedOutput: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p><strong>abc</strong>some other text</p>',
						},
					],
				},
			],
		};
		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('replaces ★★★★☆ with the StarRating component', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>★★★★☆</p>',
						},
					],
				},
			],
		};

		const expectedOutput: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.StarRatingBlockElement',
							elementId: 'mockId',
							rating: 4,
							size: 'large',
						},
					],
				},
			],
		};

		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('ignores ascii stars when there is other text present', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>I give this 4 ★★★★☆</p>',
						},
					],
				},
			],
		};

		const expectedOutput: CAPIType = input;

		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('ignores ascii stars when there are not 5 stars', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>★★☆</p>',
						},
					],
				},
			],
		};

		const expectedOutput: CAPIType = input;

		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('ignores ascii stars that are not wrapped in p tags', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<h2>★★★★☆</h2>',
						},
					],
				},
			],
		};

		const expectedOutput: CAPIType = input;

		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('can handle zero (selected) stars', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>☆☆☆☆☆</p>',
						},
					],
				},
			],
		};

		const expectedOutput: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.StarRatingBlockElement',
							elementId: 'mockId',
							rating: 0,
							size: 'large',
						},
					],
				},
			],
		};

		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('can handle really good things that have five stars!', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>★★★★★</p>',
						},
					],
				},
			],
		};

		const expectedOutput: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.StarRatingBlockElement',
							elementId: 'mockId',
							rating: 5,
							size: 'large',
						},
					],
				},
			],
		};

		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});

	it('should create full review elements', () => {
		const input: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul> <li><p><strong>Full review:</strong> <a href="https://www.theguardian.com/technology/2019/oct/22/oneplus-7t-pro-review-the-best-kind-of-deja-vu">OnePlus 7T Pro review: the best kind of deja vu</a></p></li> </ul>',
						},
					],
				},
			],
		};
		const expectedOutput: CAPIType = {
			...NumberedList,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.ItemListLink',
							elementId: 'mockId',
							href:
								'https://www.theguardian.com/technology/2019/oct/22/oneplus-7t-pro-review-the-best-kind-of-deja-vu',
							title:
								'OnePlus 7T Pro review: the best kind of deja vu',
						},
					],
				},
			],
		};

		expect(enhanceNumberedLists(input)).toEqual(expectedOutput);
	});
});
