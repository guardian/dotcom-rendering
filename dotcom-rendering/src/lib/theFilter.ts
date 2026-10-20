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
 * Tags that identify Filter content: the Filter series tags, which Composer
 * uses to present an article as The Filter, and the Filter commissioning desk
 * tracking tags. Matching either one counts as Filter content, so prefer this
 * over the pageId when deciding whether something is The Filter.
 */
const FILTER_TAG_IDS = [
	'thefilter/series/the-filter',
	'thefilter-us/series/thefilter-us',
	'tracking/commissioningdesk/the-filter',
	'tracking/commissioningdesk/filter-us',
];

export const hasFilterTag = (tags: Array<Pick<TagType, 'id'>>): boolean =>
	tags.some((tag) => FILTER_TAG_IDS.includes(tag.id));
