import { map, none, some, withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import { pipe } from 'lib';
import type { LiveBlock } from 'liveBlock';

export type PageReference = {
	blocks: LiveBlock[];
	pageNumber: number;
	suffix: string;
};

export type Pagination = {
	newest: Option<string>;
	newer: Option<string>;
	oldest: Option<string>;
	older: Option<string>;
	numberOfPages: number;
};

export type LiveBlogPagedBlocks = {
	currentPage: PageReference;
	pagination: Pagination;
};

const navContainerId = 'liveblog-navigation';

const getOldestPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): Option<string> => {
	if (pageNumber >= pages.length) return none;

	const blocks = pages[pages.length - 1];
	return some(`?page=with:block-${blocks[0].id}#${navContainerId}`);
};

const getOlderPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): Option<string> => {
	if (pageNumber < pages.length) {
		const blocks = pages[pageNumber];
		return some(`?page=with:block-${blocks[0].id}#${navContainerId}`);
	}

	return none;
};

const getNewerPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): Option<string> => {
	if (pageNumber > 2) {
		const blocks = pages[pageNumber - 2];
		return some(`?page=with:block-${blocks[0].id}#${navContainerId}`);
	}

	if (pageNumber === 2) {
		return some(`?`);
	}

	return none;
};

const getNewestPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): Option<string> => {
	if (pageNumber > 1) {
		return some(`?`);
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
	const firstPage = {
		blocks: pages[0],
		pageNumber: 1,
		suffix: '',
	};

	return pipe(
		blockId,
		map((id) => {
			for (let i = 0; i < pages.length; i += 1) {
				if (pages[i].some((x) => x.id === id)) {
					return {
						blocks: pages[i],
						pageNumber: i + 1,
						suffix: '',
					};
				}
			}
			return firstPage;
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
