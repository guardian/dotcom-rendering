import type { Option } from '@guardian/types';
import type { LiveBlock } from 'liveBlock';

export type PageReference = {
	blocks: LiveBlock[];
	pageNumber: number;
	suffix: string;
	isArchivePage: boolean;
};

export type Pagination = {
	newest: PageReference;
	newer: PageReference;
	oldest: PageReference;
	older: PageReference;
	numberOfPages: number;
};

export type LiveBlogCurrentPage = {
	currentPage: PageReference;
	pagination: Option<Pagination>;
};

const firstPage = (
	blocks: LiveBlock[],
	filterKeyEvents: boolean,
): PageReference => {
	return {
		blocks: blocks,
		pageNumber: 1,
		suffix: `?filterKeyEvents=${filterKeyEvents}`,
		isArchivePage: false,
	};
};

const getPages = (pageSize: number, blocks: LiveBlock[]) => {
	const length = blocks.length;
	const remainder = length % pageSize;
};

export const getCurrentPage = (
	pageSize: number,
	blocks: LiveBlock[],
): LiveBlogCurrentPage => {
	return {
		currentPage: {
			blocks: blocks,
			pageNumber: 1,
			suffix: '',
			isArchivePage: false,
		},
		pagination: {
			newest: firstPage(blocks, false),
			newer: {
				blocks: blocks,
				pageNumber: 1,
				suffix: '',
				isArchivePage: false,
			},
			oldest: {
				blocks: blocks,
				pageNumber: 1,
				suffix: '',
				isArchivePage: false,
			},
			older: {
				blocks: blocks,
				pageNumber: 1,
				suffix: '',
				isArchivePage: false,
			},
			numberOfPages: 10,
		},
	};
};
