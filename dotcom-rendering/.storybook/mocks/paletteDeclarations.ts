import { ArticleFormat } from '@guardian/libs';
import { paletteDeclarations } from '../../src/palette';

/**
 * For some unknown reason, Storybook rejects all CSS variables if one of them ends in the text "label"
 * This helper function throws an error in Storybook if such a variable exists, so developers get earlier feedback.
 */
const storybookPaletteDeclarations = (
	format: ArticleFormat,
	colourScheme: 'light' | 'dark',
): string[] =>
	paletteDeclarations(format, colourScheme).map((colourDefinition) => {
		const [varName] = colourDefinition.split(':');
		if (varName?.endsWith('label')) {
			throw new Error(
				`CSS variable ${varName} ends with text "label". This will not work with Storybook.`,
			);
		}
		return colourDefinition;
	});

export { storybookPaletteDeclarations };
