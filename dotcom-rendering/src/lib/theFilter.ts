/**
 * The Filter is the Guardian's shopping/product-review vertical. Its
 * article pageIds always start with one of these section prefixes,
 * e.g. `thefilter/2026/jul/02/best-thing-ever`.
 */
const FILTER_PAGE_ID_PREFIXES = ['thefilter/', 'thefilter-us/'];

export const isFilterPageId = (pageId: string): boolean =>
	FILTER_PAGE_ID_PREFIXES.some((prefix) => pageId.startsWith(prefix));
