/**
 * Body copy can contain h3 and h4 subheadings as well as h2s. Only h2s are
 * given an id (see `enhanceH2s`) and so only they can be linked to, which means
 * lower level headings must be kept out of the table of contents and the
 * interactive contents nav.
 *
 * This deliberately tests for the absence of a lower level heading rather than
 * the presence of an h2, because a `SubheadingBlockElement` whose html is bare
 * text — with no element at all — is still treated as an h2 subheading.
 */
const lowerLevelHeading = /<h[3-6][\s>]/i;

export const isH2Subheading = (html: string): boolean =>
	!lowerLevelHeading.test(html);
