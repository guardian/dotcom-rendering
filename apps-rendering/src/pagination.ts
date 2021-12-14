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

const getFirstPage = (blocks: LiveBlock[], pageSize: number, pageNumber: number): PageReference => {
	const { remainder } = getPages(pageSize, blocks)
	console.log(getPages(pageSize, blocks))
	const sliceAt = remainder + pageSize;

	return {
		blocks:  blocks.slice(0, sliceAt),
		pageNumber,
		suffix: '',
		isArchivePage: false,
	};
}

const getOldestPage = (blocks: LiveBlock[], pageSize: number): PageReference | undefined => {
	const { numberOfPages } = getPages(pageSize, blocks);

	if (numberOfPages === 1) return undefined;

	return {
		blocks: blocks.slice(blocks.length - pageSize, blocks.length),
		pageNumber: numberOfPages,
		suffix: '',
		isArchivePage: false,
	}
}

const getOlderPage = (blocks: LiveBlock[], pageSize: number, pageNumber: number): PageReference | undefined => {

	const { firstPageLength, numberOfPages } = getPages(pageSize, blocks)
	// start slice from: end of the current page -> how many blocks first page has
	// end slice at: end of current page + page size

	if (numberOfPages === 1) return undefined;

	return {
		blocks: blocks.slice(firstPageLength, firstPageLength + pageSize),
		pageNumber,
		suffix: '',
		isArchivePage: false,
	}
}

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



const getPages = (pageSize: number, blocks: LiveBlock[]) => {
	const remainder = blocks.length % pageSize;
	return {
		length : blocks.length,
		remainder,
		numberOfPages : getNumberOfPages(pageSize, blocks),
		firstPageLength : pageSize + remainder,
	}
};

const getNumberOfPages = (pageSize: number, blocks: LiveBlock[]): number => {
	const noPages = Math.floor(blocks.length / pageSize);

	if (noPages < 1) return 1;
	return noPages;
};

export const getCurrentPage = (
	pageSize: number,
	blocks: LiveBlock[],
): LiveBlogCurrentPage => {
	let currentPage = 1;

	return {
		currentPage: getFirstPage(blocks, pageSize, currentPage),
		pagination: {
			older: getOlderPage(blocks, pageSize, currentPage + 1),
			oldest: getOldestPage(blocks, pageSize),
			numberOfPages: getNumberOfPages(pageSize, blocks),
		},
	};
};
