import { isOneOf, isString, storage } from '@guardian/libs';

const orderByTypes = ['newest', 'oldest', 'recommendations'] as const;
const threadTypes = ['collapsed', 'expanded', 'unthreaded'] as const;
const pageSizeTypes = [25, 50, 100] as const;

type OrderByType = (typeof orderByTypes)[number];
type ThreadsType = (typeof threadTypes)[number];
type PageSizeType = (typeof pageSizeTypes)[number];

/**
 * @see http://discussion.guardianapis.com/discussion-api/comment/3519111/context
 */
export type CommentContextType = {
	status: 'ok';
	commentId: number;
	commentAncestorId: number;
	discussionKey: string;
	discussionWebUrl: string;
	discussionApiUrl: string;
	orderBy: OrderByType;
	pageSize: PageSizeType; // TODO: Review these https://trello.com/c/7v4VDNY0/1326-review-page-size-values
	page: number;
};

interface FilterOptions {
	orderBy: OrderByType;
	pageSize: PageSizeType;
	threads: ThreadsType;
}

const getOrderByType = (value: unknown) =>
	isString(value) && isOneOf(orderByTypes)(value) ? value : 'newest';
const getThreadType = (value: unknown) =>
	isString(value) && isOneOf(threadTypes)(value) ? value : 'collapsed';
const getPageSizeType = (value: unknown) =>
	typeof value === 'number' && isOneOf(pageSizeTypes)(value) ? value : 25;

/** Retrieves stored values from local storage if available, otherwise it returns defaults */
export const initFiltersFromLocalStorage = (): FilterOptions => {
	const orderBy: OrderByType = getOrderByType(
		storage.local.get('gu.prefs.discussion.order'),
	);
	const threads: ThreadsType = getThreadType(
		storage.local.get('gu.prefs.discussion.threading'),
	);
	const pageSize: PageSizeType = getPageSizeType(
		storage.local.get('gu.prefs.discussion.pagesize'),
	);

	return {
		orderBy,
		threads,
		pageSize,
	};
};
