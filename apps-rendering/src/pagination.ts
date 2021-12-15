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

const getFirstPage = (
	blocks: LiveBlock[],
	pageSize: number,
	pageNumber: number,
): PageReference => {
	const { remainder } = getPageDetails(pageSize, blocks);
	console.log(getPageDetails(pageSize, blocks));
	const sliceAt = remainder + pageSize;

	return {
		blocks: blocks.slice(0, sliceAt),
		pageNumber,
		suffix: '',
		isArchivePage: false,
	};
};

const getOldestPage = (
	blocks: LiveBlock[],
	pageSize: number,
): PageReference | undefined => {
	const { numberOfPages } = getPageDetails(pageSize, blocks);

	if (numberOfPages === 1) return undefined;

	return {
		blocks: blocks.slice(blocks.length - pageSize, blocks.length),
		pageNumber: numberOfPages,
		suffix: '',
		isArchivePage: false,
	};
};

const getOlderPage = (
	blocks: LiveBlock[],
	pageSize: number,
	pageNumber: number,
): PageReference | undefined => {
	const { firstPageLength, numberOfPages } = getPageDetails(pageSize, blocks);
	// start slice from: end of the current page -> how many blocks first page has
	// end slice at: end of current page + page size

	if (numberOfPages === 1) return undefined;

	return {
		blocks: blocks.slice(firstPageLength, firstPageLength + pageSize),
		pageNumber,
		suffix: '',
		isArchivePage: false,
	};
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

	const liveblog2DArray: LiveBlock[][] = [];

	restOfPages.reduce(function (arr, block) {
		if (arr.length === 0) {
			arr.push([block]);
		}

		if (arr[0].length < pageSize) {
			arr[0].push(block);
		} else {
			arr.push([block]);
		}

		return arr;
	}, liveblog2DArray);

	return liveblog2DArray;
};

const getCurrentPage = (
	pageSize: number,
	blocks: LiveBlock[],
	blockId?: string,
): PageReference => {
	return {
		blocks: [],
		pageNumber: 1,
		suffix: '',
		isArchivePage: false,
	};
};

export const getPagedBlocks = (
	pageSize: number,
	blocks: LiveBlock[],
	blockId?: string,
): LiveBlogCurrentPage => {
	const currentPage = getCurrentPage(pageSize, blocks, blockId);
	const pages = getPages(pageSize, blocks, getPageDetails(pageSize, blocks));
	console.log('pages: ');
	console.log(pages);
	return {
		currentPage: getFirstPage(blocks, pageSize, currentPage.pageNumber),
		pagination: {
			older: getOlderPage(blocks, pageSize, currentPage.pageNumber + 1),
			oldest: getOldestPage(blocks, pageSize),
			numberOfPages: getNumberOfPages(pageSize, blocks),
		},
	};
};
