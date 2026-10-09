import type { TagType } from '../types/tag';

/**
 * The Filter is the Guardian's shopping/product-review vertical. Its
 * article pageIds always start with one of these section prefixes,
 * e.g. `thefilter/2026/jul/02/best-thing-ever`.
 */
const FILTER_PAGE_ID_PREFIXES = ['thefilter/', 'thefilter-us/'];

export const isFilterPageId = (pageId: string): boolean =>
	FILTER_PAGE_ID_PREFIXES.some((prefix) => pageId.startsWith(prefix));

/**
 * The Filter's series tags. Composer identifies Filter content by these, so
 * prefer this over the pageId when deciding whether something is The Filter.
 */
const FILTER_SERIES_TAG_IDS = [
	'thefilter/series/the-filter',
	'thefilter-us/series/thefilter-us',
];

export const hasFilterSeriesTag = (tags: Array<Pick<TagType, 'id'>>): boolean =>
	tags.some((tag) => FILTER_SERIES_TAG_IDS.includes(tag.id));
