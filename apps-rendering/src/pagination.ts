import {
	andThen,
	map,
	none,
	some,
	withDefault,
} from '../vendor/@guardian/types/index';
import type { Option } from '../vendor/@guardian/types/index';
import { index, pipe } from 'lib';
import type { LiveBlock } from 'liveBlock';

/**
 * This represents the data required to render the requested page of liveblocks.
 * It contains all the blog posts for a given page, plus some page meta data.
 * @typedef PageReference
 * @param blocks An array of liveblocks for the given page
 * @param pageNumber The page number for the given blog page (1-indexed)
 * @param suffix The query string for the given blog page
 */
export type PageReference = {
	blocks: LiveBlock[];
	pageNumber: number;
	suffix: string;
};

/**
 * This data allows us to render the pagination navigation component. It
 * contains a collection of query strings that, when appended to the liveblog
 * page url, will allow the user to navigate between 'pages' of a liveblog.
 * @typedef Pagination
 * @param newest A query string representing the newest page of the blog
 * @param newer A query string representing the newer page of the blog
 * (relative to current page)
 * @param oldest A query string representing the oldest page of the blog
 * @param older A query string representing the older page of the blog
 * (relative to current page)
 * @param numberOfPages Total number of pages in the blog
 */
export type Pagination = {
	newest: Option<string>;
	newer: Option<string>;
	oldest: Option<string>;
	older: Option<string>;
	numberOfPages: number;
};

/**
 * This is a paginated representation of a blog. It contains the blog posts
 * related to the requested page and some additional information about
 * surrounding pages.
 * @param PageReference Liveblocks related to the current page
 * @param Pagination Pagination navigation links
 */
export type LiveBlogPagedBlocks = {
	currentPage: PageReference;
	pagination: Pagination;
};

const maybePageRef = (
	pageIndex: number,
	pages: LiveBlock[][],
): Option<string> => {
	const maybeBlocks: (pages: LiveBlock[][]) => Option<LiveBlock[]> =
		index(pageIndex);
	const maybeFirstBlock: (blocks: LiveBlock[]) => Option<LiveBlock> =
		index(0);
	const pageRef = (block: LiveBlock): string =>
		`?page=with:block-${block.id}#liveblock-container`;

	return pipe(pages, maybeBlocks, andThen(maybeFirstBlock), map(pageRef));
};

const currentPageRef = (blocks: LiveBlock[][], pageIndex: number): string => {
	if (pageIndex === 0) {
		return '';
	}

	return withDefault('')(maybePageRef(pageIndex, blocks));
};

const getOldestPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): Option<string> => {
	if (pageNumber < pages.length) {
		return maybePageRef(pages.length - 1, pages);
	}

	return none;
};

const getOlderPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): Option<string> => {
	if (pageNumber < pages.length) {
		return maybePageRef(pageNumber, pages);
	}

	return none;
};

const getNewerPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): Option<string> => {
	if (pageNumber > 1) {
		return maybePageRef(pageNumber - 2, pages);
	}

	return none;
};

const getNewestPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): Option<string> => {
	if (pageNumber > 1) {
		return maybePageRef(0, pages);
	}

	return none;
};

const getFirstPageLength = (pageSize: number, blocks: LiveBlock[]): number => {
	const remainder = blocks.length % pageSize;
	return pageSize + remainder;
};

const getPages = (
	pageSize: number,
	blocks: LiveBlock[],
	firstPageLength: number,
): LiveBlock[][] => {
	const firstPage = blocks.slice(0, firstPageLength);
	const restOfPages = blocks.slice(firstPageLength, blocks.length);

	const pages = [firstPage];
	for (let i = 0; i < restOfPages.length; i += pageSize) {
		const page = restOfPages.slice(i, i + pageSize);
		pages.push(page);
	}
	return pages;
};

const getCurrentPage = (
	pages: LiveBlock[][],
	blockId: Option<string>,
): PageReference => {
	const emptyLiveBlocks: LiveBlock[] = [];
	const firstPage = {
		blocks: withDefault(emptyLiveBlocks)(index(0)(pages)),
		pageNumber: 1,
		suffix: '',
	};

	return pipe(
		blockId,
		andThen((id) => {
			for (let i = 0; i < pages.length; i += 1) {
				const blocks = withDefault(emptyLiveBlocks)(index(i)(pages));
				if (blocks.some((x) => x.id === id)) {
					return some({
						blocks,
						pageNumber: i + 1,
						suffix: currentPageRef(pages, i),
					});
				}
			}
			return none;
		}),
		withDefault(firstPage),
	);
};

export const getPagedBlocks = (
	pageSize: number,
	blocks: LiveBlock[],
	blockId: Option<string>,
): LiveBlogPagedBlocks => {
	const pages = getPages(
		pageSize,
		blocks,
		getFirstPageLength(pageSize, blocks),
	);
	const currentPage = getCurrentPage(pages, blockId);
	return {
		currentPage,
		pagination: {
			newer: getNewerPage(pages, currentPage.pageNumber),
			newest: getNewestPage(pages, currentPage.pageNumber),
			older: getOlderPage(pages, currentPage.pageNumber),
			oldest: getOldestPage(pages, currentPage.pageNumber),
			numberOfPages: pages.length,
		},
	};
};
