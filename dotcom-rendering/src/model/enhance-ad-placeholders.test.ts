import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type {
	AdPlaceholderBlockElement,
	FEElement,
	ImageBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
} from '../types/content';
import { enhanceAdPlaceholders } from './enhance-ad-placeholders';

const exampleFormat = {
	design: ArticleDesign.Feature,
	display: ArticleDisplay.Immersive,
	theme: Pillar.Culture,
};

const galleryFormat = {
	design: ArticleDesign.Gallery,
	display: ArticleDisplay.Immersive,
	theme: Pillar.News,
};

// Test helper functions

const getTestParagraphElements = (length: number): TextBlockElement[] =>
	Array<TextBlockElement>(length).fill({
		_type: 'model.dotcomrendering.pageElements.TextBlockElement',
		elementId: 'mockId',
		html: '<p>I am a paragraph</p>',
	});

const getTestImageBlockElements = (length: number): ImageBlockElement[] =>
	Array<ImageBlockElement>(length).fill({
		_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
		elementId: 'mockId',
		media: { allImages: [] },
		data: {},
		displayCredit: true,
		imageSources: [],
		role: 'inline',
	});

const getInlineImageElement = (): ImageBlockElement => ({
	_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
	media: { allImages: [] },
	data: {},
	displayCredit: true,
	role: 'inline',
	imageSources: [],
	elementId: '12345',
});

const getThumbnailImageElement = (): ImageBlockElement => ({
	_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
	media: { allImages: [] },
	data: {},
	displayCredit: true,
	role: 'thumbnail',
	imageSources: [],
	elementId: '12345',
});

const getSubheadingElement = (): SubheadingBlockElement => ({
	_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
	elementId: 'mockId',
	html: "<h2 id='i-am-a-subheading'>I am a subheading.</h2>",
});

const elementIsAdPlaceholder = (
	element: FEElement,
): element is AdPlaceholderBlockElement =>
	element._type ===
	'model.dotcomrendering.pageElements.AdPlaceholderBlockElement';

// Tests
describe('enhanceAdPlaceholders', () => {
	describe('for general articles', () => {
		const testCases = [
			{ paragraphs: 0, expectedPositions: [] },
			{ paragraphs: 1, expectedPositions: [] },
			{ paragraphs: 3, expectedPositions: [] },
			{ paragraphs: 6, expectedPositions: [3] },
			{ paragraphs: 9, expectedPositions: [3] },
			{ paragraphs: 11, expectedPositions: [3, 10] },
			{ paragraphs: 12, expectedPositions: [3, 10] },
			{
				paragraphs: 16,
				expectedPositions: [3, 10],
			},
			{
				paragraphs: 87,
				expectedPositions: [
					3, 10, 17, 24, 31, 38, 45, 52, 59, 66, 73, 80, 87, 94,
				],
			},
			{
				paragraphs: 88,
				expectedPositions: [
					3, 10, 17, 24, 31, 38, 45, 52, 59, 66, 73, 80, 87, 94,
				],
			},
			{
				paragraphs: 999,
				expectedPositions: [
					3, 10, 17, 24, 31, 38, 45, 52, 59, 66, 73, 80, 87, 94, 101,
				],
			},
		] satisfies Array<{ paragraphs: number; expectedPositions: number[] }>;

		describe.each(testCases)(
			'for $paragraphs paragraph(s) in an article',
			({ paragraphs, expectedPositions }) => {
				const elements = getTestParagraphElements(paragraphs);
				const expectedPlaceholders = expectedPositions.length;
				const input: FEElement[] = elements;

				const output = enhanceAdPlaceholders(
					exampleFormat,
					'Apps',
					false,
				)(input);
				const placeholderIndices = output.flatMap((el, idx) =>
					elementIsAdPlaceholder(el) ? [idx] : [],
				);

				it(`should insert ${expectedPlaceholders} ad placeholder(s)`, () => {
					expect(placeholderIndices.length).toEqual(
						expectedPlaceholders,
					);
				});

				if (expectedPlaceholders > 0) {
					it(`should insert ad placeholder(s) in the expected position(s): ${expectedPositions.join(
						',',
					)}`, () => {
						expect(placeholderIndices).toEqual(expectedPositions);
					});
				}
			},
		);

		it('should not insert an ad placeholder before an inline image element, but can insert it after the image', () => {
			const threeParagraphs = getTestParagraphElements(3);

			const elements = [
				...threeParagraphs,
				getInlineImageElement(),
				...threeParagraphs,
			];

			const input: FEElement[] = elements;

			const output = enhanceAdPlaceholders(
				exampleFormat,
				'Apps',
				false,
			)(input);
			const outputPlaceholders = output.filter(elementIsAdPlaceholder);

			expect(outputPlaceholders.length).toEqual(1);

			const placeholderIndices = output.flatMap((el, idx) =>
				elementIsAdPlaceholder(el) ? [idx] : [],
			);

			// Expect one placeholder to be present after the fourth element only
			expect(placeholderIndices).toEqual([4]);
		});

		it('should not insert an ad placeholder after a thumbnail image element', () => {
			const threeParagraphs = getTestParagraphElements(3);

			const elements = [
				...threeParagraphs,
				getThumbnailImageElement(),
				...threeParagraphs,
			];

			const input: FEElement[] = elements;

			const output = enhanceAdPlaceholders(
				exampleFormat,
				'Apps',
				false,
			)(input);
			const outputPlaceholders = output.filter(elementIsAdPlaceholder);

			expect(outputPlaceholders.length).toEqual(1);

			const placeholderIndices = output.flatMap((el, idx) =>
				elementIsAdPlaceholder(el) ? [idx] : [],
			);

			// Expect one placeholder to be present after the fifth element only
			expect(placeholderIndices).toEqual([5]);
		});

		it('should not insert an ad placeholder after an element which is not an image or text', () => {
			const threeParagraphs = getTestParagraphElements(3);

			const elements = [
				...threeParagraphs,
				getSubheadingElement(),
				...threeParagraphs,
			];

			const input: FEElement[] = elements;

			const output = enhanceAdPlaceholders(
				exampleFormat,
				'Apps',
				false,
			)(input);
			const outputPlaceholders = output.filter(elementIsAdPlaceholder);

			expect(outputPlaceholders.length).toEqual(1);

			const placeholderIndices = output.flatMap((el, idx) =>
				elementIsAdPlaceholder(el) ? [idx] : [],
			);

			// Expect one placeholder to be present after the fifth element only
			expect(placeholderIndices).toEqual([5]);
		});

		it('should not insert ad placeholders if shouldHideAds is true', () => {
			const input: FEElement[] = getTestParagraphElements(6);

			const output = enhanceAdPlaceholders(
				exampleFormat,
				'Apps',
				true,
			)(input);
			const outputPlaceholders = output.filter(elementIsAdPlaceholder);

			expect(outputPlaceholders.length).toEqual(0);
		});
	});

	describe('for gallery articles', () => {
		const testCases = [
			{ images: 0, expectedPositions: [] },
			{ images: 1, expectedPositions: [] },
			{ images: 4, expectedPositions: [4] },
			{ images: 6, expectedPositions: [4] },
			{ images: 9, expectedPositions: [4, 9] },
			{ images: 16, expectedPositions: [4, 9, 14, 19] },
			{
				images: 87,
				expectedPositions: [
					4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74,
					79, 84, 89, 94, 99, 104,
				],
			},
		] satisfies Array<{ images: number; expectedPositions: number[] }>;

		describe.each(testCases)(
			'for $images images(s) in a gallery article',
			({ images, expectedPositions }) => {
				const elements = getTestImageBlockElements(images);
				const expectedPlaceholders = expectedPositions.length;
				const input: FEElement[] = elements;

				const output = enhanceAdPlaceholders(
					galleryFormat,
					'Apps',
					false,
				)(input);
				const placeholderIndices = output.flatMap((el, idx) =>
					elementIsAdPlaceholder(el) ? [idx] : [],
				);

				it(`should insert ${expectedPlaceholders} ad placeholder(s)`, () => {
					expect(placeholderIndices.length).toEqual(
						expectedPlaceholders,
					);
				});

				if (expectedPlaceholders > 0) {
					it(`should insert ad placeholder(s) in the expected position(s): ${expectedPositions.join(
						',',
					)}`, () => {
						expect(placeholderIndices).toEqual(expectedPositions);
					});
				}
			},
		);

		it('should not insert ad placeholders if shouldHideAds is true', () => {
			const input: FEElement[] = getTestParagraphElements(6);

			const output = enhanceAdPlaceholders(
				galleryFormat,
				'Apps',
				true,
			)(input);
			const outputPlaceholders = output.filter(elementIsAdPlaceholder);

			expect(outputPlaceholders.length).toEqual(0);
		});

		it('should still insert ad placeholders if renderingTarget is web', () => {
			const input: FEElement[] = getTestParagraphElements(6);

			const output = enhanceAdPlaceholders(
				galleryFormat,
				'Web',
				false,
			)(input);
			const outputPlaceholders = output.filter(elementIsAdPlaceholder);

			expect(outputPlaceholders.length).toBeGreaterThan(0);
		});
	});
});
