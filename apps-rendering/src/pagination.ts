import type { LiveBlock } from 'liveBlock';

export type PageReference = {
	blocks: LiveBlock[];
	pageNumber: number;
	suffix: string;
	isArchivePage: boolean;
};

export type Pagination = {
	newest?: PageReference;
	newer?: PageReference;
	oldest?: PageReference;
	older?: PageReference;
	numberOfPages: number;
};

export type LiveBlogCurrentPage = {
	currentPage: PageReference;
	pagination: Pagination;
};

type PaginationData = {
	firstPageLength: number;
	length: number;
	numberOfPages: number;
	remainder: number;
};

// const getFirstPage = (
// 	blocks: LiveBlock[],
// 	pageSize: number,
// 	pageNumber: number,
// ): PageReference => {
// 	const { remainder } = getPageDetails(pageSize, blocks);
// 	console.log(getPageDetails(pageSize, blocks));
// 	const sliceAt = remainder + pageSize;

// 	return {
// 		blocks: blocks.slice(0, sliceAt),
// 		pageNumber,
// 		suffix: '',
// 		isArchivePage: false,
// 	};
// };

const getOldestPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): PageReference | undefined => {
	if (pageNumber === pages.length) return undefined;

	return {
		blocks: pages[pages.length - 1],
		pageNumber: pages.length,
		suffix: '',
		isArchivePage: false,
	};
};

const getOlderPage = (
	pages: LiveBlock[][],
	pageNumber: number,
): PageReference | undefined => {
	console.log('pages: ');
	console.log(pages.length);
	console.log(pageNumber);
	if (pageNumber < pages.length) {
		return {
			blocks: pages[pageNumber],
			pageNumber: pageNumber + 1,
			suffix: '',
			isArchivePage: false,
		};
	}

	return undefined;
};

// const firstPage = (
// 	blocks: LiveBlock[],
// 	filterKeyEvents: boolean,
// ): PageReference => {
// 	return {
// 		blocks: blocks,
// 		pageNumber: 1,
// 		suffix: `?filterKeyEvents=${filterKeyEvents}`,
// 		isArchivePage: false,
// 	};
// };

const getPageDetails = (
	pageSize: number,
	blocks: LiveBlock[],
): PaginationData => {
	const remainder = blocks.length % pageSize;
	return {
		firstPageLength: pageSize + remainder,
		length: blocks.length,
		numberOfPages: getNumberOfPages(pageSize, blocks),
		remainder,
	};
};

const getNumberOfPages = (pageSize: number, blocks: LiveBlock[]): number => {
	const noPages = Math.floor(blocks.length / pageSize);

	if (noPages < 1) return 1;
	return noPages;
};

const getPages = (
	pageSize: number,
	blocks: LiveBlock[],
	paginationDetail: PaginationData,
): LiveBlock[][] => {
	const firstPage = blocks.slice(0, paginationDetail.firstPageLength);
	const restOfPages = blocks.slice(
		paginationDetail.firstPageLength,
		blocks.length,
	);

	const liveblog2DArray = [firstPage];
	for (let i = 0; i < restOfPages.length; i += pageSize) {
		const chunk = restOfPages.slice(i, i + pageSize);
		liveblog2DArray.push(chunk);
	}
	return liveblog2DArray;
};

const getCurrentPage = (
	pages: LiveBlock[][],
	blockId?: string,
): PageReference => {
	const firstPage = {
		blocks: pages[0],
		pageNumber: 1,
		suffix: '',
		isArchivePage: false,
	};
	if (!blockId) {
		return firstPage;
	}
	for (let i = 0; i < pages.length; i += 1) {
		if (pages[i].some((x) => x.id === blockId)) {
			return {
				blocks: pages[i],
				pageNumber: i + 1,
				suffix: '',
				isArchivePage: false,
			};
		}
	}
	return firstPage;
};

export const getPagedBlocks = (
	pageSize: number,
	blocks: LiveBlock[],
	blockId?: string,
): LiveBlogCurrentPage => {
	const pages = getPages(pageSize, blocks, getPageDetails(pageSize, blocks));
	const currentPage = getCurrentPage(pages, blockId);
	return {
		currentPage: currentPage,
		pagination: {
			older: getOlderPage(pages, currentPage.pageNumber),
			oldest: getOldestPage(pages, currentPage.pageNumber),
			numberOfPages: getNumberOfPages(pageSize, blocks),
		},
	};
};
