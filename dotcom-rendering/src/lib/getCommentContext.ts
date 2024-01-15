import { isOneOf, isString, joinUrl, storage } from '@guardian/libs';

// GET http://discussion.guardianapis.com/discussion-api/comment/3519111/context
// {
//     status: 'ok',
//     commentId: 3519111,
//     commentAncestorId: 3519111,
//     discussionKey: '/p/27y27',
//     discussionWebUrl:
//         'https://www.theguardian.com/commentisfree/cifamerica/2009/may/14/washington-post-torture-libel',
//     discussionApiUrl:
//         'https://discussion.guardianapis.com/discussion-api/discussion//p/27y27?orderBy=oldest&pageSize=20&page=1',
//     orderBy: 'oldest',
//     pageSize: 20,
//     page: 1,
// };

const orderByTypes = ['newest', 'oldest', 'recommendations'] as const;
const threadTypes = ['collapsed', 'expanded', 'unthreaded'] as const;
const pageSizeTypes = [25, 50, 100] as const;

type OrderByType = (typeof orderByTypes)[number];
type ThreadsType = (typeof threadTypes)[number];
type PageSizeType = (typeof pageSizeTypes)[number];

type CommentContextType = {
	status: 'ok' | 'error';
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
const initFiltersFromLocalStorage = (): FilterOptions => {
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

const buildParams = (filters: FilterOptions) => {
	return {
		// Frontend uses the 'recommendations' key to store this options but the api expects
		// 'mostRecommended' so we have to map here to support both
		orderBy:
			filters.orderBy === 'recommendations'
				? 'mostRecommended'
				: filters.orderBy,
		pageSize: String(filters.pageSize),
		displayThreaded: String(
			filters.threads === 'collapsed' || filters.threads === 'expanded',
		),
	};
};

export const getCommentContext = async (
	ajaxUrl: string,
	commentId: number,
): Promise<CommentContextType> => {
	const url = joinUrl(ajaxUrl, 'comment', commentId.toString(), 'context');
	const filters = initFiltersFromLocalStorage();
	const params = new URLSearchParams(buildParams(filters));

	return fetch(url + '?' + params.toString())
		.then((response) => {
			if (!response.ok) {
				throw Error(
					response.statusText ||
						`getCommentContext | An api call returned HTTP status ${response.status}`,
				);
			}
			return response;
		})
		.then((response) => response.json())
		.catch((error) => {
			window.guardian.modules.sentry.reportError(
				error,
				'get-comment-page',
			);
		});
};
