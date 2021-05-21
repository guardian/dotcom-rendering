import { Pagination } from './Pagination';

export default {
	component: Pagination,
	title: 'AMP/Components/Pagination',
};

const pagination: Pagination = {
	currentPage: 1,
	totalPages: 2,
	oldest: '?page=with:block-5b3ad778e4b05bcf5a69676d',
	older: '?page=with:block-5b3b2ef5e4b05bcf5a6968f4',
	newest: '?page=with:block-5b3ad778e4b05bcf5a69676d',
	newer: '?page=with:block-5b3b2ef5e4b05bcf5a6968f4',
};

export const PaginationDefault = () => (
	<Pagination pagination={pagination} guardianURL="" />
);

const paginationOlder: Pagination = {
	currentPage: 1,
	totalPages: 2,
	oldest: '?page=with:block-5b3ad778e4b05bcf5a69676d',
	older: '?page=with:block-5b3b2ef5e4b05bcf5a6968f4',
};

export const PaginationWithOlder = () => (
	<Pagination pagination={paginationOlder} guardianURL="" />
);

const paginationNewer: Pagination = {
	currentPage: 1,
	totalPages: 2,
	newest: '?page=with:block-5b3ad778e4b05bcf5a69676d',
	newer: '?page=with:block-5b3b2ef5e4b05bcf5a6968f4',
};

export const PaginationWithNewer = () => (
	<Pagination pagination={paginationNewer} guardianURL="" />
);

export const EmptyPagination = () => <Pagination guardianURL="" />;
