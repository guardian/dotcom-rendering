import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import type { AdPlaceholderSlot, FEElement } from '../types/content';
import { enhanceAdPlaceholders } from './enhance-ad-placeholders';

// Test helper functions

const getTestElements = (length: number): FEElement[] => {
	const textElement: FEElement = {
		_type: 'model.dotcomrendering.pageElements.TextBlockElement',
		elementId: 'mockId',
		html: '<p>I am a paragraph</p>',
	};
	return Array(length).fill(textElement) as FEElement[];
};

const elementIsAdPlaceholder = (element: FEElement): boolean =>
	element._type === 'model.dotcomrendering.pageElements.AdPlaceholderSlot';

const getElementsFromBlocks = (blocks: Block[]): FEElement[] =>
	blocks.map((o) => o.elements).flat();

// Tests
describe('Enhancing ad placeholders', () => {
	const testCases = [
		{ paragraphs: 0, expectedPlaceholders: 0, expectedPositions: [] },
		{ paragraphs: 1, expectedPlaceholders: 0, expectedPositions: [] },
		{ paragraphs: 3, expectedPlaceholders: 0, expectedPositions: [] },
		{ paragraphs: 6, expectedPlaceholders: 1, expectedPositions: [3] },
		{ paragraphs: 9, expectedPlaceholders: 1, expectedPositions: [3] },
		{ paragraphs: 10, expectedPlaceholders: 2, expectedPositions: [3, 9] },
	];

	describe.each(testCases)(
		'for $paragraphs paragraph(s) in an article',
		({ paragraphs, expectedPlaceholders, expectedPositions }) => {
			const elements = getTestElements(paragraphs);

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
			) as AdPlaceholderSlot[];

			it(`should insert ${expectedPlaceholders} ad placeholder(s)`, () => {
				expect(outputPlaceholders.length).toEqual(expectedPlaceholders);
			});

			if (expectedPlaceholders > 0) {
				it('should insert a square placeholder in the first ad placeholder position', () => {
					const [firstPlaceholder, ...otherPlaceholders] =
						outputPlaceholders;

					// First ad placeholder should be square
					expect(firstPlaceholder?.isSquare).toBeTruthy();

					if (otherPlaceholders.length) {
						// All other ad placeholders should not be square
						expect(
							otherPlaceholders.every((p) => !p.isSquare),
						).toBeTruthy();
					}
				});

				it(`should insert ad placeholder(s) in the expected positions (${JSON.stringify(
					expectedPositions,
				)})`, () => {
					console.log({ outputElements });
					const firstPlaceholderIdx = outputElements.findIndex(
						elementIsAdPlaceholder,
					);

					expect(firstPlaceholderIdx).toEqual(expectedPositions[0]);
				});
			}
		},
	);
});
