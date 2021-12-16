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
	describe('first page', () => {
		describe('given no block id', () => {
			const blocks = generateBlocks(4);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks);

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks,
					pageNumber: 1,
					suffix: '',
					isArchivePage: false,
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					numberOfPages: 1,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given block if is not found', () => {
			const blocks = generateBlocks(4);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, 'jhgjgh');

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks,
					pageNumber: 1,
					suffix: '',
					isArchivePage: false,
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					numberOfPages: 1,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given total number of blocks is less than page size', () => {
			const blocks = generateBlocks(4);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, '2');

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks,
					pageNumber: 1,
					suffix: '',
					isArchivePage: false,
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					numberOfPages: 1,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given total number of blocks is greater than page size (only 1 page)', () => {
			const blocks = generateBlocks(15);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, '12');

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks,
					pageNumber: 1,
					suffix: '',
					isArchivePage: false,
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					numberOfPages: 1,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given total number of blocks is greater than page size (2 pages)', () => {
			const blocks = generateBlocks(29);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, '12');

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks.slice(0, 19),
					pageNumber: 1,
					suffix: '',
					isArchivePage: false,
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					oldest: {
						blocks: blocks.slice(19, 29),
						pageNumber: 2,
						suffix: '',
						isArchivePage: false,
					},
					older: {
						blocks: blocks.slice(19, 29),
						pageNumber: 2,
						suffix: '',
						isArchivePage: false,
					},
					numberOfPages: 2,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given total number of blocks is greater than page size (3 pages)', () => {
			const blocks = generateBlocks(35);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, '1');

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks.slice(0, 15),
					pageNumber: 1,
					suffix: '',
					isArchivePage: false,
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					oldest: {
						blocks: blocks.slice(25, 35),
						pageNumber: 3,
						suffix: '',
						isArchivePage: false,
					},
					older: {
						blocks: blocks.slice(15, 25),
						pageNumber: 2,
						suffix: '',
						isArchivePage: false,
					},
					numberOfPages: 3,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});
	});

	describe('second page', () => {

		describe('given second page is the last page', () => {
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
					newer: {
						blocks: blocks.slice(0, 10),
						pageNumber: 1,
						suffix: '',
						isArchivePage: false,
					},
					newest: {
						blocks: blocks.slice(0, 10),
						pageNumber: 1,
						suffix: '',
						isArchivePage: false,
					},
					numberOfPages: 2,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given second page is not the last page', () => {
			const blocks = generateBlocks(44);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, '15');

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks.slice(14, 24),
					pageNumber: 2,
					suffix: '',
					isArchivePage: false,
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					newer: {
						blocks: blocks.slice(0, 14),
						pageNumber: 1,
						suffix: '',
						isArchivePage: false,
					},
					newest: {
						blocks: blocks.slice(0, 14),
						pageNumber: 1,
						suffix: '',
						isArchivePage: false,
					},
					older: {
						blocks: blocks.slice(24, 34),
						pageNumber: 3,
						suffix: '',
						isArchivePage: false,
					},
					oldest: {
						blocks: blocks.slice(34, 44),
						pageNumber: 4,
						suffix: '',
						isArchivePage: false,
					},
					numberOfPages: 4,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

	});

	describe('middle page', () => {
		const blocks = generateBlocks(54);
		const pageSize = 10;
		const result = getPagedBlocks(pageSize, blocks, '25');

		it('should return expected currentPage object', () => {
			const expectedCurrentPage: PageReference = {
				blocks: blocks.slice(24, 34),
				pageNumber: 3,
				suffix: '',
				isArchivePage: false,
			};

			expect(result.currentPage).toEqual(expectedCurrentPage);
		});

		it('should return expected pagination object', () => {
			const expectedPagination: Pagination = {
				newer: {
					blocks: blocks.slice(14, 24),
					pageNumber: 2,
					suffix: '',
					isArchivePage: false,
				},
				newest: {
					blocks: blocks.slice(0, 14),
					pageNumber: 1,
					suffix: '',
					isArchivePage: false,
				},
				older: {
					blocks: blocks.slice(34, 44),
					pageNumber: 4,
					suffix: '',
					isArchivePage: false,
				},
				oldest: {
					blocks: blocks.slice(44, 54),
					pageNumber: 5,
					suffix: '',
					isArchivePage: false,
				},
				numberOfPages: 5,
			};

			expect(result.pagination).toEqual(expectedPagination);
		});
	});

	describe('penultimate page', () => {
		const blocks = generateBlocks(54);
		const pageSize = 10;
		const result = getPagedBlocks(pageSize, blocks, '37');

		it('should return expected currentPage object', () => {
			const expectedCurrentPage: PageReference = {
				blocks: blocks.slice(34, 44),
				pageNumber: 4,
				suffix: '',
				isArchivePage: false,
			};

			expect(result.currentPage).toEqual(expectedCurrentPage);
		});

		it('should return expected pagination object', () => {
			const expectedPagination: Pagination = {
				newer: {
					blocks: blocks.slice(24, 34),
					pageNumber: 3,
					suffix: '',
					isArchivePage: false,
				},
				newest: {
					blocks: blocks.slice(0, 14),
					pageNumber: 1,
					suffix: '',
					isArchivePage: false,
				},
				older: {
					blocks: blocks.slice(44, 54),
					pageNumber: 5,
					suffix: '',
					isArchivePage: false,
				},
				oldest: {
					blocks: blocks.slice(44, 54),
					pageNumber: 5,
					suffix: '',
					isArchivePage: false,
				},
				numberOfPages: 5,
			};

			expect(result.pagination).toEqual(expectedPagination);
		});
	});

	describe('final page', () => {
		const blocks = generateBlocks(54);
		const pageSize = 10;
		const result = getPagedBlocks(pageSize, blocks, '53');

		it('should return expected currentPage object', () => {
			const expectedCurrentPage: PageReference = {
				blocks: blocks.slice(44, 54),
				pageNumber: 5,
				suffix: '',
				isArchivePage: false,
			};

			expect(result.currentPage).toEqual(expectedCurrentPage);
		});

		it('should return expected pagination object', () => {
			const expectedPagination: Pagination = {
				newer: {
					blocks: blocks.slice(34, 44),
					pageNumber: 4,
					suffix: '',
					isArchivePage: false,
				},
				newest: {
					blocks: blocks.slice(0, 14),
					pageNumber: 1,
					suffix: '',
					isArchivePage: false,
				},
				numberOfPages: 5,
			};

			expect(result.pagination).toEqual(expectedPagination);
		});
	});
});
