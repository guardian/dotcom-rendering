import { some } from '@guardian/types';
import { LiveBlock } from 'liveBlock';
import { getCurrentPage, Pagination, PageReference } from 'pagination';

describe('pagination', () => {
	it('', () => {
		const blocks = generateBlocks(10);
		const pageSize = 10;

		const expectedCurrentPage: PageReference = {
			blocks: blocks,
			pageNumber: 1,
			suffix: '',
			isArchivePage: false,
		};

		const expectedPagination: Pagination = {
			newest: {
				blocks: blocks,
				pageNumber: 1,
				suffix: '',
				isArchivePage: false,
			},
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
		};

		expect(getCurrentPage(pageSize, blocks).currentPage).toEqual(
			expectedCurrentPage,
		);
		expect(getCurrentPage(pageSize, blocks).pagination).toEqual(
			expectedPagination,
		);
	});
});

const generateBlocks = (numberOfBlocks: number): LiveBlock[] => {
	const block: LiveBlock = {
		id: '1',
		isKeyEvent: true,
		title: 'Block One',
		firstPublished: some(new Date('2021-11-02T12:00:00Z')),
		lastModified: some(new Date('2021-11-02T13:13:13Z')),
		body: [],
	};

	const liveBlocks = new Array(numberOfBlocks);
	liveBlocks.map((_, index) => {
		return { ...block, id: index };
	});

	return liveBlocks;
};
