type HTMLTag = keyof HTMLElementTagNameMap;

type Prefix = `<${HTMLTag}${'' | ` ${string}`}>`;
type Suffix = `</${HTMLTag}>`;

const stripTags = (html: string, prefix: Prefix, suffix: Suffix) =>
	html.slice(prefix.length, html.length - suffix.length);

/**
 * This method unwraps a string of HTML from an enclosing tag.
 *
 * If the HTML passed in matches any of the fixes, in order, we will unwrap.
 * A fix matches if it starts with the prefix and ends with the suffix provided.
 *
 * - `willUnwrap === true`:
 * 	Return the html with the prefix and suffix stripped off,
 * 	as well as the matching element that we want to rewrap the HTML in.
 *
 * - `willUnwrap === false`:
 * 	Return the original HTML string and the `p` unwrappedElement.
 */
export const unwrapHtml = ({
	fixes,
	html,
}: {
	fixes: {
		prefix: Prefix;
		suffix: Suffix;
		unwrappedElement?: HTMLTag;
	}[];
	html: string;
}): {
	unwrappedHtml: string;
	willUnwrap: boolean;
	unwrappedElement: HTMLTag;
} => {
	const matchingFix = fixes.find(
		({ prefix, suffix }) => html.startsWith(prefix) && html.endsWith(suffix),
	);

	const unwrappedHtml = matchingFix
		? // Chop off the start and end tags if we have matches to unwrap the html
		  stripTags(html, matchingFix.prefix, matchingFix.suffix)
		: html;

	/** `p` is the default unwrappedElement */
	const unwrappedElement = matchingFix?.unwrappedElement || 'p';

	return {
		unwrappedHtml,
		willUnwrap: !!matchingFix,
		unwrappedElement,
	};
};

export type { HTMLTag };
