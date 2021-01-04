const stripTags = (html: string, prefix: string, suffix: string) => {
	return html.slice(prefix.length, html.length - suffix.length);
};

/**
unwrapHtml will check whether the html passed in starts with any of the prefixes
and ends with the suffixes and will then return the html with the prefix and
suffix stripped off, as well as the matching element that we want to 'rewrap'
the html in
 */
export const unwrapHtml = ({
	fixes,
	html,
}: {
	fixes: { prefix: string; suffix: string; unwrappedElement?: string }[];
	html: string;
}): {
	unwrappedHtml: string;
	willUnwrap: boolean;
	unwrappedElement: string;
} => {
	const fixFilteredToMatchingHtmlTags = fixes.filter(
		({ prefix, suffix }) =>
			html.startsWith(prefix) && html.endsWith(suffix),
	);

	// We only unwrap if we have a match on the start and end html tags to one of the passed 'fixes'
	const willUnwrap = fixFilteredToMatchingHtmlTags.length === 1;
	const matchingFix =
		fixFilteredToMatchingHtmlTags && fixFilteredToMatchingHtmlTags[0];

	const unwrappedHtml =
		(willUnwrap &&
			matchingFix &&
			// Chop off the start and end tags if we have matches to unwrap the html
			stripTags(html, matchingFix.prefix, matchingFix.suffix)) ||
		html;

	// span is the default unwrappedElement
	const unwrappedElement =
		(willUnwrap && matchingFix && matchingFix.unwrappedElement) || 'p';

	return {
		unwrappedHtml,
		willUnwrap,
		unwrappedElement,
	};
};
