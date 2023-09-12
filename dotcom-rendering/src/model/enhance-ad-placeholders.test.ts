import { blockMetaData } from '../../fixtures/manual/block-meta-data';
import type { AdPlaceholderSlot, FEElement } from '../types/content';
import { enhanceAdPlaceholders } from './enhance-ad-placeholders';

const textElement: FEElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: 'mockId',
	html: '<p>I am a paragraph</p>',
};
const getTestElements = (length: number): FEElement[] =>
	Array(length).fill(textElement) as FEElement[];

const elementIsAdPlaceholder = (element: FEElement): boolean =>
	element._type === 'model.dotcomrendering.pageElements.AdPlaceholderSlot';

const filterAdPlaceholders = (blocks: Block[]): AdPlaceholderSlot[] =>
	blocks
		.map((o) => o.elements)
		.flat()
		.filter(elementIsAdPlaceholder) as AdPlaceholderSlot[];

describe('Enhancing ad placeholders', () => {
	const testCases = [
		{ paragraphs: 0, expectedPlaceholders: 0 },
		{ paragraphs: 1, expectedPlaceholders: 0 },
		{ paragraphs: 3, expectedPlaceholders: 0 },
		{ paragraphs: 6, expectedPlaceholders: 1 },
		{ paragraphs: 9, expectedPlaceholders: 1 },
		{ paragraphs: 10, expectedPlaceholders: 2 },
	];

	it.each(testCases)(
		'should insert $expectedPlaceholders ad placeholder(s) for $paragraphs paragraph(s)',
		({ paragraphs, expectedPlaceholders }) => {
			const elements = getTestElements(paragraphs);

			const input: Block[] = [
				{
					...blockMetaData,
					elements,
				},
			];

			const output = enhanceAdPlaceholders(input);

			expect(filterAdPlaceholders(output).length).toEqual(
				expectedPlaceholders,
			);

			// First ad should be square
			if (expectedPlaceholders === 1) {
				expect(filterAdPlaceholders(output)[0]?.isSquare).toBe(true);
			}
		},
	);
});
