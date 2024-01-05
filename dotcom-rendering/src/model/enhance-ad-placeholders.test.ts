import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import type {
	AdPlaceholderBlockElement,
	FEElement,
	ImageBlockElement,
	TextBlockElement,
} from '../types/content';
import { enhanceAdPlaceholders } from './enhance-ad-placeholders';

// Test helper functions

const getTestParagraphElements = (length: number): TextBlockElement[] =>
	Array<TextBlockElement>(length).fill({
		_type: 'model.dotcomrendering.pageElements.TextBlockElement',
		elementId: 'mockId',
		html: '<p>I am a paragraph</p>',
	});

const getImageElement = (): ImageBlockElement => ({
	_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
	media: { allImages: [] },
	data: {},
	displayCredit: true,
	role: 'supporting',
	imageSources: [],
	elementId: '12345',
});

const elementIsAdPlaceholder = (
	element: FEElement,
): element is AdPlaceholderBlockElement =>
	element._type ===
	'model.dotcomrendering.pageElements.AdPlaceholderBlockElement';

const getElementsFromBlocks = (blocks: Block[]): FEElement[] =>
	blocks.flatMap(({ elements }) => elements);

// Tests
describe('Enhancing ad placeholders', () => {
	const testCases = [
		{ paragraphs: 0, expectedPlaceholders: 0, expectedPositions: [] },
		{ paragraphs: 1, expectedPlaceholders: 0, expectedPositions: [] },
		{ paragraphs: 3, expectedPlaceholders: 0, expectedPositions: [] },
		{ paragraphs: 6, expectedPlaceholders: 1, expectedPositions: [3] },
		{ paragraphs: 9, expectedPlaceholders: 1, expectedPositions: [3] },
		{ paragraphs: 11, expectedPlaceholders: 2, expectedPositions: [3, 10] },
	];

	describe.each(testCases)(
		'for $paragraphs paragraph(s) in an article',
		({ paragraphs, expectedPlaceholders, expectedPositions }) => {
			const elements = getTestParagraphElements(paragraphs);

			const input: Block[] = [
				{
					...blockMetaData,
					elements,
				},
			];

			const output = enhanceAdPlaceholders(input);
			const outputElements = getElementsFromBlocks(output);
			const outputPlaceholders = outputElements.filter(
				elementIsAdPlaceholder,
			);

			it(`should insert ${expectedPlaceholders} ad placeholder(s)`, () => {
				expect(outputPlaceholders.length).toEqual(expectedPlaceholders);
			});

			if (expectedPlaceholders > 0) {
				it(`should insert ad placeholder(s) in the expected positions (${JSON.stringify(
					expectedPositions,
				)})`, () => {
					const indexesOfPlaceholders = outputElements.flatMap(
						(el, idx) => (elementIsAdPlaceholder(el) ? [idx] : []),
					);

					expect(indexesOfPlaceholders).toEqual(expectedPositions);
				});
			}
		},
	);

	describe('should not insert an ad placeholder after a non text element', () => {
		const threeParagraphs = getTestParagraphElements(3);

		const elements = [
			...threeParagraphs,
			getImageElement(),
			...threeParagraphs,
		];

		const input: Block[] = [
			{
				...blockMetaData,
				elements,
			},
		];

		const output = enhanceAdPlaceholders(input);
		const outputElements = getElementsFromBlocks(output);
		const outputPlaceholders = outputElements.filter(
			elementIsAdPlaceholder,
		);

		expect(outputPlaceholders.length).toEqual(1);

		const indexesOfPlaceholders = outputElements.flatMap((el, idx) =>
			elementIsAdPlaceholder(el) ? [idx] : [],
		);

		// Expect one placeholder to be present after the third paragraph only
		expect(indexesOfPlaceholders).toEqual([3]);
	});
});
