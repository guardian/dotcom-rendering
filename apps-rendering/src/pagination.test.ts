import { some } from '@guardian/types';
import { LiveBlock } from 'liveBlock';
import { getPagedBlocks, Pagination, PageReference } from 'pagination';

const generateBlocks = (numberOfBlocks: number): LiveBlock[] => {
	const block: LiveBlock = {
		id: '1',
		isKeyEvent: true,
		title: 'Block One',
		firstPublished: some(new Date('2021-11-02T12:00:00Z')),
		lastModified: some(new Date('2021-11-02T13:13:13Z')),
		body: [],
	};

	const liveBlocks = [];
	for (let i = 0; i < numberOfBlocks; i++) {
		liveBlocks.push({ ...block, id: `${i}` });
	}

	return liveBlocks;
};

describe('pagination', () => {
	// describe('first page', () => {
	// 	describe('given total number of blocks is less than page size', () => {
	// 		const blocks = generateBlocks(4);
	// 		const pageSize = 10;
	// 		const result = getPagedBlocks(pageSize, blocks);

	// 		it('should return expected currentPage object', () => {
	// 			const expectedCurrentPage: PageReference = {
	// 				blocks: blocks,
	// 				pageNumber: 1,
	// 				suffix: '',
	// 				isArchivePage: false,
	// 			};

	// 			expect(result.currentPage).toEqual(expectedCurrentPage);
	// 		});

	// 		it('should return expected pagination object', () => {
	// 			const expectedPagination: Pagination = {
	// 				numberOfPages: 1,
	// 			};

	// 			expect(result.pagination).toEqual(expectedPagination);
	// 		});
	// 	});

	// 	describe('given total number of blocks is greater than page size (only 1 page)', () => {
	// 		const blocks = generateBlocks(15);
	// 		const pageSize = 10;
	// 		const result = getPagedBlocks(pageSize, blocks);

	// 		it('should return expected currentPage object', () => {
	// 			const expectedCurrentPage: PageReference = {
	// 				blocks: blocks,
	// 				pageNumber: 1,
	// 				suffix: '',
	// 				isArchivePage: false,
	// 			};

	// 			expect(result.currentPage).toEqual(expectedCurrentPage);
	// 		});

	// 		it('should return expected pagination object', () => {
	// 			const expectedPagination: Pagination = {
	// 				numberOfPages: 1,
	// 			};

	// 			expect(result.pagination).toEqual(expectedPagination);
	// 		});
	// 	});

	// 	describe('given total number of blocks is greater than page size (2 pages)', () => {
	// 		const blocks = generateBlocks(29);
	// 		const pageSize = 10;
	// 		const result = getPagedBlocks(pageSize, blocks);

	// 		it('should return expected currentPage object', () => {
	// 			const expectedCurrentPage: PageReference = {
	// 				blocks: blocks.slice(0, 19),
	// 				pageNumber: 1,
	// 				suffix: '',
	// 				isArchivePage: false,
	// 			};

	// 			expect(result.currentPage).toEqual(expectedCurrentPage);
	// 		});

	// 		it('should return expected pagination object', () => {
	// 			const expectedPagination: Pagination = {
	// 				oldest: {
	// 					blocks: blocks.slice(19, 29),
	// 					pageNumber: 2,
	// 					suffix: '',
	// 					isArchivePage: false,
	// 				},
	// 				older: {
	// 					blocks: blocks.slice(19, 29),
	// 					pageNumber: 2,
	// 					suffix: '',
	// 					isArchivePage: false,
	// 				},
	// 				numberOfPages: 2,
	// 			};

	// 			expect(result.pagination).toEqual(expectedPagination);
	// 		});
	// 	});

	// 	describe('given total number of blocks is greater than page size (3 pages)', () => {
	// 		const blocks = generateBlocks(35);
	// 		const pageSize = 10;
	// 		const result = getPagedBlocks(pageSize, blocks);

	// 		it('should return expected currentPage object', () => {
	// 			const expectedCurrentPage: PageReference = {
	// 				blocks: blocks.slice(0, 15),
	// 				pageNumber: 1,
	// 				suffix: '',
	// 				isArchivePage: false,
	// 			};

	// 			expect(result.currentPage).toEqual(expectedCurrentPage);
	// 		});

	// 		it('should return expected pagination object', () => {
	// 			const expectedPagination: Pagination = {
	// 				oldest: {
	// 					blocks: blocks.slice(25, 35),
	// 					pageNumber: 3,
	// 					suffix: '',
	// 					isArchivePage: false,
	// 				},
	// 				older: {
	// 					blocks: blocks.slice(15, 25),
	// 					pageNumber: 2,
	// 					suffix: '',
	// 					isArchivePage: false,
	// 				},
	// 				numberOfPages: 3,
	// 			};

	// 			expect(result.pagination).toEqual(expectedPagination);
	// 		});
	// 	});
	// });

	describe('second page', () => {
		const blocks = generateBlocks(20);
		const pageSize = 10;
		const result = getPagedBlocks(pageSize, blocks, '14');

		it('should return expected currentPage object', () => {
			const expectedCurrentPage: PageReference = {
				blocks: blocks.slice(10, 20),
				pageNumber: 2,
				suffix: '',
				isArchivePage: false,
			};

			expect(result.currentPage).toEqual(expectedCurrentPage);
		});

		it('should return expected pagination object', () => {
			const expectedPagination: Pagination = {
				numberOfPages: 2,
			};

			expect(result.pagination).toEqual(expectedPagination);
		});
	});
});
