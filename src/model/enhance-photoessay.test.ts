import { Pillar } from '@guardian/types';
import { Article } from '@root/fixtures/generated/articles/Article';

import { enhancePhotoEssay } from './enhance-photoessay';
import { images } from '../../fixtures/generated/images';

const article: CAPIType = Article;
const photoEssay = {
	...article,
	config: {
		...article.config,
		isPhotoEssay: true,
	},
};
const image = images[0];

const metaData = {
	id: '123',
	primaryDateLine: 'Wed 9 Dec 2020 06.30 GMT',
	secondaryDateLine: 'Last modified on Wed 9 Dec 2020 13.40 GMT',
};

describe('Enhance Photo Essays', () => {
	it('simplay passes through the same object if not a photo essay', () => {
		// example.designType does not equal 'PhotoEssay'
		expect(enhancePhotoEssay(article)).toBe(article); // We created a new object
		expect(enhancePhotoEssay(article)).toEqual(article); // The new object is what we expect
	});

	it('sets the designType to PhotoEssay when isPhotoEssay is true', () => {
		const input: CAPIType = {
			...article,
			config: {
				...article.config,
				isPhotoEssay: true,
			},
			blocks: [],
			designType: 'Interview',
		};

		const expectedOutput = {
			...photoEssay,
			blocks: [],
			designType: 'PhotoEssay',
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('does not change the designType to PhotoEssay when isPhotoEssay is false', () => {
		const input: CAPIType = {
			...article,
			config: {
				...article.config,
				isPhotoEssay: false,
			},
			blocks: [],
			designType: 'Interview',
		};

		const expectedOutput = {
			...article,
			blocks: [],
			designType: 'Interview',
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('sets the caption for an image if the following element is a text element with ul and li tags', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						image,
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li>Judy, just sitting in the square on her own in Walworth.</li></ul>',
						},
					],
				},
			],
		};

		const expectedOutput: CAPIType = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							...image,
							role: 'showcase',
							displayCredit: false,
							data: {
								...image.data,
								caption:
									'<ul><li>Judy, just sitting in the square on her own in Walworth.</li></ul>',
							},
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('creates a multi image element if 2 images in a row are halfWidth', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>Example text</h2>',
						},
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>Example text</h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.MultiImageBlockElement',
							elementId: images[0].elementId,
							images: [
								{
									...image,
									role: 'halfWidth',
									displayCredit: false,
									data: { ...image.data, caption: '' },
								},
								{
									...image,
									role: 'halfWidth',
									displayCredit: false,
									data: { ...image.data, caption: '' },
								},
							],
							caption:
								'<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('still creates images inline if roles are not halfWidth', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>Example text</h2>',
						},
						{ ...image, role: 'inline' },
						{ ...image, role: 'showcase' },
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>Example text</h2>',
						},
						{
							...image,
							role: 'inline',
							displayCredit: false,
							data: { ...image.data, caption: '' },
						},
						{
							...image,
							role: 'showcase',
							displayCredit: false,
							data: {
								...image.data,
								caption:
									'<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
							},
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('does not use a multi block element for a single image', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>Example text</h2>',
						},
						image,
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>Example text</h2>',
						},
						{
							...image,
							displayCredit: false,
							data: {
								...image.data,
								caption:
									'<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
							},
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('sets the title prop for the previous image element when a h2 caption is found', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						image,
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>Example title text</h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							...image,
							displayCredit: false,
							data: {
								...image.data,
								caption: '',
							},
							title: 'Example title text',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('handles when a caption, then a title follow an image, both are used', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						image,
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li><p>This is the caption</p></li></ul>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>The title</h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						{
							...image,
							displayCredit: false,
							data: {
								...image.data,
								caption:
									'<ul><li><p>This is the caption</p></li></ul>',
							},
							title: 'The title',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('handles when a title, then a caption follow an image, both are used', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						image,
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>The title</h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li><p>This is the caption</p></li></ul>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						{
							...image,
							displayCredit: false,
							data: {
								...image.data,
								caption:
									'<ul><li><p>This is the caption</p></li></ul>',
							},
							title: 'The title',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('handles if the last image has no caption', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						image,
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>The title</h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li><p>This is the caption</p></li></ul>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						image,
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						{
							...image,
							displayCredit: false,
							data: {
								...image.data,
								caption:
									'<ul><li><p>This is the caption</p></li></ul>',
							},
							title: 'The title',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						{
							...image,
							displayCredit: false,
							data: {
								...image.data,
								caption: '',
							},
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('handles if the last few images are not followed by any caption or title', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						image,
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>The title</h2>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li><p>This is the caption</p></li></ul>',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						{ ...image, role: 'inline' },
						{ ...image, role: 'immersive' },
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						{
							...image,
							displayCredit: false,
							data: {
								...image.data,
								caption:
									'<ul><li><p>This is the caption</p></li></ul>',
							},
							title: 'The title',
						},
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						{
							...image,
							role: 'inline',
							displayCredit: false,
							data: { ...image.data, caption: '' },
						},
						{
							...image,
							role: 'immersive',
							displayCredit: false,
							data: { ...image.data, caption: '' },
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	// Need to ignore TS to check test works for other element types
	it('will pass through other element types', () => {
		// @ts-ignore
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{
							// @ts-ignore
							_type:
								'model.dotcomrendering.pageElements.model.dotcomrendering.pageElements.PullquoteBlockElement',
							elementId: 'mockId',
							html: '<p>A Pullquote</p>',
							// @ts-ignore
							pillar: Pillar.News,
							designType: 'PhotoEssay',
							role: 'inline',
						},
						image,
						{
							_type:
								'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>The title</h2>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.model.dotcomrendering.pageElements.PullquoteBlockElement',
							elementId: 'mockId',
							html: '<p>A Pullquote</p>',
							pillar: Pillar.News,
							designType: 'PhotoEssay',
							role: 'inline',
						},
						{
							...image,
							displayCredit: false,
							data: {
								...image.data,
								caption: '',
							},
							title: 'The title',
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('creates two sets of multi image elements when there are 4 halfWidths images in a row', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.MultiImageBlockElement',
							elementId: images[0].elementId,
							images: [
								{
									...image,
									role: 'halfWidth',
									displayCredit: false,
									data: { ...image.data, caption: '' },
								},
								{
									...image,
									role: 'halfWidth',
									displayCredit: false,
									data: { ...image.data, caption: '' },
								},
							],
						},
						{
							_type:
								'model.dotcomrendering.pageElements.MultiImageBlockElement',
							elementId: images[0].elementId,
							images: [
								{
									...image,
									role: 'halfWidth',
									displayCredit: false,
									data: { ...image.data, caption: '' },
								},
								{
									...image,
									role: 'halfWidth',
									displayCredit: false,
									data: { ...image.data, caption: '' },
								},
							],
							caption:
								'<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});

	it('halfWidth images without an image to be paired with are placed as single images by themselves', () => {
		const input: CAPIType = {
			...photoEssay,
			blocks: [
				{
					...metaData,
					elements: [
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{
							_type:
								'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html:
								'<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			],
		};

		const expectedOutput = {
			...photoEssay,
			designType: 'PhotoEssay',
			blocks: [
				{
					...metaData,
					elements: [
						{
							_type:
								'model.dotcomrendering.pageElements.MultiImageBlockElement',
							elementId: images[0].elementId,
							images: [
								{
									...image,
									role: 'halfWidth',
									displayCredit: false,
									data: { ...image.data, caption: '' },
								},
								{
									...image,
									role: 'halfWidth',
									displayCredit: false,
									data: { ...image.data, caption: '' },
								},
							],
						},
						{
							...image,
							role: 'halfWidth',
							displayCredit: false,
							data: {
								...image.data,
								caption:
									'<ul><li><p>This is the caption</p></li></ul>',
							},
						},
					],
				},
			],
		};

		expect(enhancePhotoEssay(input)).toEqual(expectedOutput);
	});
});
