import { Pillar } from '@guardian/types';
import { PhotoEssay } from '@root/fixtures/generated/articles/PhotoEssay';
import { Article } from '@root/fixtures/generated/articles/Article';
import { images } from '@root/fixtures/generated/images';

import { enhanceImages } from './enhance-images';

const image = {
	...images[0],
	data: {
		...images[0].data,
		caption: 'The original caption',
	},
};

const metaData = {
	id: '123',
	primaryDateLine: 'Wed 9 Dec 2020 06.30 GMT',
	secondaryDateLine: 'Last modified on Wed 9 Dec 2020 13.40 GMT',
};

describe('Enhance Images', () => {
	describe('for photo essays', () => {
		it('sets the caption for an image if the following element is a text element with ul and li tags', () => {
			const input: CAPIType = {
				...PhotoEssay,
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
									'<ul><li>This new caption replaces the one on the image object.</li></ul>',
							},
						],
					},
				],
			};

			const expectedOutput: CAPIType = {
				...PhotoEssay,
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
										'<ul><li>This new caption replaces the one on the image object.</li></ul>',
									credit: '',
								},
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('creates a multi image element if 2 images in a row are halfWidth', () => {
			const input: CAPIType = {
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
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
				...PhotoEssay,
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
										data: {
											...image.data,
											caption: '',
											credit: '',
										},
									},
									{
										...image,
										role: 'halfWidth',
										displayCredit: false,
										data: {
											...image.data,
											caption: '',
											credit: '',
										},
									},
								],
								caption:
									'<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('does not create a multi image element if roles are not halfWidth', () => {
			const input: CAPIType = {
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
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
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
							{
								...image,
								role: 'inline',
								displayCredit: false,
								data: {
									...image.data,
									caption: '',
									credit: '',
								},
							},
							{
								...image,
								role: 'showcase',
								displayCredit: false,
								data: {
									...image.data,
									caption:
										'<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
									credit: '',
								},
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('does not use a multi block element for a single image, even when halfWidth', () => {
			const input: CAPIType = {
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
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
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
							{
								...image,
								role: 'halfWidth',
								displayCredit: false,
								data: {
									...image.data,
									caption:
										'<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
									credit: '',
								},
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('sets the title prop for the previous image element when a h2 caption is found', () => {
			const input: CAPIType = {
				...PhotoEssay,
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
						],
					},
				],
			};

			const expectedOutput = {
				...PhotoEssay,
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
									credit: '',
								},
								title: 'Example title text',
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('handles when a caption, then a title follow an image, both are used', () => {
			const input: CAPIType = {
				...PhotoEssay,
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
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
							{
								...image,
								displayCredit: false,
								data: {
									...image.data,
									caption:
										'<ul><li><p>This is the caption</p></li></ul>',
									credit: '',
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

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('halfWidth images without an image to be paired with are placed as single images by themselves', () => {
			const input: CAPIType = {
				...PhotoEssay,
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
				...PhotoEssay,
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
										data: {
											...image.data,
											caption: '',
											credit: '',
										},
									},
									{
										...image,
										role: 'halfWidth',
										displayCredit: false,
										data: {
											...image.data,
											caption: '',
											credit: '',
										},
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
									credit: '',
								},
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('handles when a title, then a caption follow an image, both are used', () => {
			const input: CAPIType = {
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
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
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
							{
								...image,
								displayCredit: false,
								data: {
									...image.data,
									caption:
										'<ul><li><p>This is the caption</p></li></ul>',
									credit: '',
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

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('removes default captions for photo essays and sets none at all if no ul element is found', () => {
			const input: CAPIType = {
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [image],
					},
				],
			};

			const expectedOutput = {
				...PhotoEssay,
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
									credit: '',
								},
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});
		it('handles if the last few images are not followed by any caption or title', () => {
			const input: CAPIType = {
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
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
				...PhotoEssay,
				blocks: [
					{
						...metaData,
						elements: [
							{
								...image,
								displayCredit: false,
								data: {
									...image.data,
									caption:
										'<ul><li><p>This is the caption</p></li></ul>',
									credit: '',
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
								data: {
									...image.data,
									caption: '',
									credit: '',
								},
							},
							{
								...image,
								role: 'immersive',
								displayCredit: false,
								data: {
									...image.data,
									caption: '',
									credit: '',
								},
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		// Need to ignore TS to check test works for other element types
		it('will pass through other element types', () => {
			// @ts-ignore
			const input: CAPIType = {
				...PhotoEssay,
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
				...PhotoEssay,
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
								role: 'inline',
							},
							{
								...image,
								displayCredit: false,
								data: {
									...image.data,
									caption: '',
									credit: '',
								},
								title: 'The title',
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});
	});

	describe('for normal articles', () => {
		it('keeps default captions for articles other than photo essays', () => {
			const input: CAPIType = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [image],
					},
				],
			};

			const expectedOutput = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{
								...image,
								displayCredit: false,
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});
		it('creates two sets of multi image elements when there are 4 halfWidths images in a row', () => {
			const input: CAPIType = {
				...Article,
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
				...Article,
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

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});
		it('does nothing with normal articles', () => {
			const someText: TextBlockElement = {
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				elementId: 'mockId',
				html: '<p>Just some normal text</p>',
			};

			const input: CAPIType = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{ ...images[0], role: 'inline' },
							someText,
							someText,
							{ ...images[1], role: 'showcase' },
							someText,
							someText,
							someText,
							{ ...images[2], role: 'inline' },
							someText,
							someText,
							someText,
							{ ...images[3], role: 'immersive' },
							someText,
							someText,
						],
					},
				],
			};

			const expectedOutput = input;

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('does not strip the captions from any preceding halfwidth images if the special caption is not placed immediately after them', () => {
			const input: CAPIType = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{ ...image, role: 'halfWidth' },
							{ ...image, role: 'halfWidth' },
							{ ...image, role: 'inline' },
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
				...Article,
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
							{ ...image, role: 'inline' },
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

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});
		it('keeps the original captions and positions if there are 3 inline images in a row', () => {
			const input: CAPIType = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{ ...image, role: 'inline' },
							{ ...image, role: 'inline' },
							{ ...image, role: 'inline' },
						],
					},
				],
			};

			const expectedOutput = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{
								...image,
								role: 'inline',
								displayCredit: false,
								data: {
									...image.data,
								},
							},
							{
								...image,
								role: 'inline',
								displayCredit: false,
								data: {
									...image.data,
								},
							},
							{
								...image,
								role: 'inline',
								displayCredit: false,
								data: {
									...image.data,
								},
							},
						],
					},
				],
			};

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});
		it('does not strip captions if not a photo essay and there are no halfWidth images in the buffer', () => {
			const input: CAPIType = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{ ...image, role: 'inline' },
							{ ...image, role: 'inline' },
							{ ...image, role: 'inline' },
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

			const expectedOutput = input;

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('does not strip captions if not a photo essay and there is only one halfWidth image in the buffer', () => {
			const input: CAPIType = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{ ...image, role: 'inline' },
							{ ...image, role: 'inline' },
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

			const expectedOutput = input;

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('should only treat h2 text following an image as the image title on photo essays', () => {
			const input: CAPIType = {
				...Article,
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
						],
					},
				],
			};

			const expectedOutput = input;

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('does not use the special caption outside photo essays if it does not immediately follow the halfWidth images', () => {
			const input: CAPIType = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{ ...image, role: 'halfWidth' },
							{ ...image, role: 'halfWidth' },
							{ ...image, role: 'inline' },
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
				...Article,
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
							{ ...image, role: 'inline' },
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

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});

		it('replaces the caption outside photo essays if there are two or more halfWidth images at the end of the buffer', () => {
			const input: CAPIType = {
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{ ...image, role: 'inline' },
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
				...Article,
				blocks: [
					{
						...metaData,
						elements: [
							{
								...image,
								role: 'inline',
								displayCredit: false,
								data: {
									...image.data,
								},
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

			expect(enhanceImages(input)).toEqual(expectedOutput);
		});
	});
});
