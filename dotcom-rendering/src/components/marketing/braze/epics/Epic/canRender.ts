import { containsNonAllowedPlaceholder } from './placeholders';
import type { BrazeMessageProps } from './index';

export const COMPONENT_NAME = 'Epic';

/** These are in a separate file to enable tree shaking of the logic deciding if a Braze message can be rendered
 * this means the user won't download the Braze components bundle when the component can't be shown.
 */
export const canRender = (brazeMessageProps: BrazeMessageProps): boolean => {
	const { buttonText, buttonUrl, ophanComponentId, highlightedText } =
		brazeMessageProps;
	const paragraphs = parseParagraphs(brazeMessageProps);
	const allText = (highlightedText ?? '') + ' ' + paragraphs.join(' ');
	const invalidPlaceholders = containsNonAllowedPlaceholder(allText);

	return Boolean(
		buttonText &&
			buttonUrl &&
			ophanComponentId &&
			paragraphs.length > 0 &&
			!invalidPlaceholders,
	);
};

export const parseParagraphs = (
	brazeMessageProps: BrazeMessageProps,
): string[] => {
	const isParagraphKey = (k: string): boolean => /^paragraph\d$/.test(k);
	const orderedParagraphKeys = Object.keys(brazeMessageProps)
		.filter(isParagraphKey)
		.sort();

	const paragraphs = [];

	for (const key of orderedParagraphKeys) {
		const value = brazeMessageProps[key as keyof BrazeMessageProps];
		if (value) {
			paragraphs.push(value);
		}
	}

	return paragraphs;
};
