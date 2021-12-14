import type { LiveBlock } from 'liveBlock';

export type PageReference = {
	blocks: LiveBlock[];
	pageNumber: number;
};

export type LiveBlogCurrentPage = {
	newest: PageReference;
	newer: PageReference;
	oldest: PageReference;
	older: PageReference;
	numberOfPages: number;
};

export const getCurrentPage = (
	pageSize: number,
	blocks: LiveBlock[],
): LiveBlogCurrentPage => {
	return {
		newest: { blocks: blocks, pageNumber: 1 },
		newer: { blocks: blocks, pageNumber: 1 },
		oldest: { blocks: blocks, pageNumber: 1 },
		older: { blocks: blocks, pageNumber: 1 },
		numberOfPages: 10,
	};
};
