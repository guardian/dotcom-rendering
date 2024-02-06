import { Pillar } from '@guardian/libs';
import { PhotoEssay } from '../../fixtures/generated/articles/PhotoEssay';
import { Standard as ExampleArticle } from '../../fixtures/generated/articles/Standard';
import { images } from '../../fixtures/generated/images';
import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import { enhanceImages } from './enhance-images';

const image = {
	...images[0],
	data: {
		...images[0].data,
		caption: 'The original caption',
	},
};

describe('Enhance Images', () => {
	describe('for photo essays', () => {
		it('sets the caption for an image if the following element is a text element with ul and li tags', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						image,
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li>This new caption replaces the one on the image object.</li></ul>',
						},
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
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
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('creates a multi image element if 2 images in a row are halfWidth', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
						},
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
					elements: [
						{
							_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
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
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('does not create a multi image element if roles are not halfWidth', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'inline' },
						{ ...image, role: 'showcase' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
						},
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
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
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('does not use a multi block element for a single image, even when halfWidth', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'halfWidth' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>Judy, just sitting in the square on her own in Walworth.</p></li></ul>',
						},
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
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
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('sets the title prop for the previous image element when a h2 caption is found', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						image,
						{
							_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>Example title text</h2>',
						},
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
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
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('handles when a caption, then a title follow an image, both are used', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						image,
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
						{
							_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>The title</h2>',
						},
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
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
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('halfWidth images without an image to be paired with are placed as single images by themselves', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
					elements: [
						{
							_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
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
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('handles when a title, then a caption follow an image, both are used', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						image,
						{
							_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>The title</h2>',
						},
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
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
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
					],
				},
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('removes default captions for photo essays and sets none at all if no ul element is found', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [image],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
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
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});
		it('handles if the last few images are not followed by any caption or title', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						image,
						{
							_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>The title</h2>',
						},
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<p>Just some normal text</p>',
						},
						{ ...image, role: 'inline' },
						{ ...image, role: 'immersive' },
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
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
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
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
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('will pass through other element types', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{
							// @ts-expect-error -- Need to ignore TS to check test works for other element types
							_type: 'model.dotcomrendering.pageElements.model.dotcomrendering.pageElements.PullquoteBlockElement',
							elementId: 'mockId',
							html: '<p>A Pullquote</p>',
							pillar: Pillar.News,
							role: 'inline',
						},
						image,
						{
							_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>The title</h2>',
						},
					],
				},
			];

			const expectedOutput = [
				{
					...blockMetaData,
					elements: [
						{
							_type: 'model.dotcomrendering.pageElements.model.dotcomrendering.pageElements.PullquoteBlockElement',
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
			];

			expect(enhanceImages(input, PhotoEssay.format, [])).toEqual(
				expectedOutput,
			);
		});
	});

	describe('for normal articles', () => {
		it('keeps default captions for articles other than photo essays', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [image],
				},
			];

			const expectedOutput = [
				{
					...blockMetaData,
					elements: [
						{
							...image,
							displayCredit: false,
						},
					],
				},
			];

			expect(enhanceImages(input, ExampleArticle.format, [])).toEqual(
				expectedOutput,
			);
		});
		it('creates two sets of multi image elements when there are 4 halfWidths images in a row', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			];

			const expectedOutput = [
				{
					...blockMetaData,
					elements: [
						{
							_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
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
							_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
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
			];

			expect(enhanceImages(input, ExampleArticle.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('adds the lightbox position for a valid image', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{
							...image,
							role: 'inline',
							data: {
								caption:
									'This text starts in data but gets removed for photo essays',
								credit: 'but it is copied into the lightbox property so we can use it there',
							},
						},
					],
				},
			];

			const expectedOutput: Block[] = [
				{
					...blockMetaData,
					elements: [
						{
							...image,
							position: 4,
							role: 'inline',
							data: {
								caption: '',
								credit: '',
							},
						},
					],
				},
			];

			expect(
				enhanceImages(input, PhotoEssay.format, [
					{
						masterUrl:
							'https://media.guim.co.uk/7cffd9d6809318a9d92c719c473d193caf95d601/0_0_3110_2074/master/3110.jpg',
						elementId: '12345',
						width: 3110,
						height: 2074,
						position: 4,
					},
				]),
			).toEqual(expectedOutput);
		});

		it('does not strip the captions from any preceding halfwidth images if the special caption is not placed immediately after them', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'inline' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			];

			const expectedOutput = [
				{
					...blockMetaData,
					elements: [
						{
							_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
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
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			];

			expect(enhanceImages(input, ExampleArticle.format, [])).toEqual(
				expectedOutput,
			);
		});
		it('keeps the original captions and positions if there are 3 inline images in a row', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'inline' },
						{ ...image, role: 'inline' },
						{ ...image, role: 'inline' },
					],
				},
			];

			const expectedOutput = [
				{
					...blockMetaData,
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
			];

			expect(enhanceImages(input, ExampleArticle.format, [])).toEqual(
				expectedOutput,
			);
		});
		it('does not strip captions if not a photo essay and there are no halfWidth images in the buffer', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'inline' },
						{ ...image, role: 'inline' },
						{ ...image, role: 'inline' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			];

			const expectedOutput = input;

			expect(enhanceImages(input, ExampleArticle.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('does not strip captions if not a photo essay and there is only one halfWidth image in the buffer', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'inline' },
						{ ...image, role: 'inline' },
						{ ...image, role: 'halfWidth' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			];

			const expectedOutput = input;

			expect(enhanceImages(input, ExampleArticle.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('should only treat h2 text following an image as the image title on photo essays', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						image,
						{
							_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
							elementId: 'mockId',
							html: '<h2>Example title text</h2>',
						},
					],
				},
			];

			const expectedOutput = input;

			expect(enhanceImages(input, ExampleArticle.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('does not use the special caption outside photo essays if it does not immediately follow the halfWidth images', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'inline' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			];
			const expectedOutput = [
				{
					...blockMetaData,
					elements: [
						{
							_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
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
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			];

			expect(enhanceImages(input, ExampleArticle.format, [])).toEqual(
				expectedOutput,
			);
		});

		it('replaces the caption outside photo essays if there are two or more halfWidth images at the end of the buffer', () => {
			const input: Block[] = [
				{
					...blockMetaData,
					elements: [
						{ ...image, role: 'inline' },
						{ ...image, role: 'halfWidth' },
						{ ...image, role: 'halfWidth' },
						{
							_type: 'model.dotcomrendering.pageElements.TextBlockElement',
							elementId: 'mockId',
							html: '<ul><li><p>This is the caption</p></li></ul>',
						},
					],
				},
			];

			const expectedOutput = [
				{
					...blockMetaData,
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
							_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
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
			];

			expect(enhanceImages(input, ExampleArticle.format, [])).toEqual(
				expectedOutput,
			);
		});
	});
});
