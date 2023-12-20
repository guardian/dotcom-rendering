import { none, some } from '../vendor/@guardian/types/index';
import { LiveBlock } from 'liveBlock';
import { Optional } from 'optional';
import { getPagedBlocks, Pagination, PageReference } from 'pagination';

const generateBlocks = (numberOfBlocks: number): LiveBlock[] => {
	const block: LiveBlock = {
		id: '1',
		isKeyEvent: true,
		title: Optional.some('Block One'),
		firstPublished: new Date('2021-11-02T12:00:00Z'),
		lastModified: new Date('2021-11-02T13:13:13Z'),
		body: [],
		contributors: [],
		isPinned: false,
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
			const result = getPagedBlocks(pageSize, blocks, none);

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks,
					pageNumber: 1,
					suffix: '',
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					newer: none,
					newest: none,
					older: none,
					oldest: none,
					numberOfPages: 1,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given block is not found', () => {
			const blocks = generateBlocks(4);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, some('jhgjgh'));

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks,
					pageNumber: 1,
					suffix: '',
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					newer: none,
					newest: none,
					older: none,
					oldest: none,
					numberOfPages: 1,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given total number of blocks is less than page size', () => {
			const blocks = generateBlocks(4);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, some('2'));

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks,
					pageNumber: 1,
					suffix: '',
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					newer: none,
					newest: none,
					older: none,
					oldest: none,
					numberOfPages: 1,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given total number of blocks is greater than page size (only 1 page)', () => {
			const blocks = generateBlocks(15);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, some('12'));

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks,
					pageNumber: 1,
					suffix: '',
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					newer: none,
					newest: none,
					older: none,
					oldest: none,
					numberOfPages: 1,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given total number of blocks is greater than page size (2 pages)', () => {
			const blocks = generateBlocks(29);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, some('12'));

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks.slice(0, 19),
					pageNumber: 1,
					suffix: '',
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					newer: none,
					newest: none,
					oldest: some(`?page=with:block-19#liveblock-container`),
					older: some(`?page=with:block-19#liveblock-container`),
					numberOfPages: 2,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given total number of blocks is greater than page size (3 pages)', () => {
			const blocks = generateBlocks(35);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, some('1'));

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks.slice(0, 15),
					pageNumber: 1,
					suffix: '',
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					newer: none,
					newest: none,
					oldest: some(`?page=with:block-25#liveblock-container`),
					older: some(`?page=with:block-15#liveblock-container`),
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
			const result = getPagedBlocks(pageSize, blocks, some('14'));

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks.slice(10, 20),
					pageNumber: 2,
					suffix: '?page=with:block-10#liveblock-container',
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					newer: some('?page=with:block-0#liveblock-container'),
					newest: some('?page=with:block-0#liveblock-container'),
					older: none,
					oldest: none,
					numberOfPages: 2,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});

		describe('given second page is not the last page', () => {
			const blocks = generateBlocks(44);
			const pageSize = 10;
			const result = getPagedBlocks(pageSize, blocks, some('15'));

			it('should return expected currentPage object', () => {
				const expectedCurrentPage: PageReference = {
					blocks: blocks.slice(14, 24),
					pageNumber: 2,
					suffix: '?page=with:block-14#liveblock-container',
				};

				expect(result.currentPage).toEqual(expectedCurrentPage);
			});

			it('should return expected pagination object', () => {
				const expectedPagination: Pagination = {
					newer: some('?page=with:block-0#liveblock-container'),
					newest: some('?page=with:block-0#liveblock-container'),
					older: some(`?page=with:block-24#liveblock-container`),
					oldest: some(`?page=with:block-34#liveblock-container`),
					numberOfPages: 4,
				};

				expect(result.pagination).toEqual(expectedPagination);
			});
		});
	});

	describe('middle page', () => {
		const blocks = generateBlocks(54);
		const pageSize = 10;
		const result = getPagedBlocks(pageSize, blocks, some('25'));

		it('should return expected currentPage object', () => {
			const expectedCurrentPage: PageReference = {
				blocks: blocks.slice(24, 34),
				pageNumber: 3,
				suffix: '?page=with:block-24#liveblock-container',
			};

			expect(result.currentPage).toEqual(expectedCurrentPage);
		});

		it('should return expected pagination object', () => {
			const expectedPagination: Pagination = {
				newer: some(`?page=with:block-14#liveblock-container`),
				newest: some('?page=with:block-0#liveblock-container'),
				older: some(`?page=with:block-34#liveblock-container`),
				oldest: some(`?page=with:block-44#liveblock-container`),
				numberOfPages: 5,
			};

			expect(result.pagination).toEqual(expectedPagination);
		});
	});

	describe('penultimate page', () => {
		const blocks = generateBlocks(54);
		const pageSize = 10;
		const result = getPagedBlocks(pageSize, blocks, some('37'));

		it('should return expected currentPage object', () => {
			const expectedCurrentPage: PageReference = {
				blocks: blocks.slice(34, 44),
				pageNumber: 4,
				suffix: '?page=with:block-34#liveblock-container',
			};

			expect(result.currentPage).toEqual(expectedCurrentPage);
		});

		it('should return expected pagination object', () => {
			const expectedPagination: Pagination = {
				newer: some(`?page=with:block-24#liveblock-container`),
				newest: some('?page=with:block-0#liveblock-container'),
				older: some(`?page=with:block-44#liveblock-container`),
				oldest: some(`?page=with:block-44#liveblock-container`),
				numberOfPages: 5,
			};

			expect(result.pagination).toEqual(expectedPagination);
		});
	});

	describe('final page', () => {
		const blocks = generateBlocks(54);
		const pageSize = 10;
		const result = getPagedBlocks(pageSize, blocks, some('53'));

		it('should return expected currentPage object', () => {
			const expectedCurrentPage: PageReference = {
				blocks: blocks.slice(44, 54),
				pageNumber: 5,
				suffix: '?page=with:block-44#liveblock-container',
			};

			expect(result.currentPage).toEqual(expectedCurrentPage);
		});

		it('should return expected pagination object', () => {
			const expectedPagination: Pagination = {
				older: none,
				oldest: none,
				newer: some(`?page=with:block-34#liveblock-container`),
				newest: some('?page=with:block-0#liveblock-container'),
				numberOfPages: 5,
			};

			expect(result.pagination).toEqual(expectedPagination);
		});
	});

	describe('blog with no blocks', () => {
		const pageSize = 10;
		const result = getPagedBlocks(pageSize, [], none);

		it('should return expected current page', () => {
			const expectedCurrentPage: PageReference = {
				blocks: [],
				pageNumber: 1,
				suffix: '',
			};

			expect(result.currentPage).toEqual(expectedCurrentPage);
		});

		it('should return expected pagination object', () => {
			const expectedPagination: Pagination = {
				newer: none,
				newest: none,
				older: none,
				oldest: none,
				numberOfPages: 1,
			};

			expect(result.pagination).toEqual(expectedPagination);
		});
	});
});
