import { css } from '@emotion/react';
import { isString, storage } from '@guardian/libs';
import {
	palette as sourcePalette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import {
	getDiscussion,
	getPicks,
	initialiseApi,
} from '../../lib/discussionApi';
import {
	type AdditionalHeadersType,
	type CommentResponse,
	type CommentType,
	type FilterOptions,
	isOrderBy,
	isPageSize,
	isThreads,
	type OrderByType,
	type PageSizeType,
	type SignedInUser,
} from '../../types/discussion';
import { CommentContainer } from './CommentContainer';
import { CommentForm } from './CommentForm';
import { Filters } from './Filters';
import { LoadingComments } from './LoadingComments';
import { Pagination } from './Pagination';
import { TopPicks } from './TopPicks';

type Props = {
	shortUrl: string;
	baseUrl: string;
	format: ArticleFormat;
	isClosedForComments: boolean;
	commentToScrollTo?: number;
	initialPage?: number;
	pageSizeOverride?: PageSizeType;
	orderByOverride?: OrderByType;
	user?: SignedInUser;
	additionalHeaders: AdditionalHeadersType;
	expanded: boolean;
	onPermalinkClick: (commentId: number) => void;
	apiKey: string;
	onRecommend?: (commentId: number) => Promise<boolean>;
	onComment?: (shortUrl: string, body: string) => Promise<CommentResponse>;
	onReply?: (
		shortUrl: string,
		body: string,
		parentCommentId: number,
	) => Promise<CommentResponse>;
	onPreview?: (body: string) => Promise<string>;
	onExpand?: () => void;
	idApiUrl: string;
};

const footerStyles = css`
	display: flex;
	justify-content: flex-end;
`;

const commentColumnWrapperStyles = css`
	display: flex;
	flex-direction: column;
	max-width: 100%;
`;

const commentContainerStyles = css`
	display: flex;
	flex-direction: column;
	list-style-type: none;
	padding-left: 0;
	margin: 0;
`;

const picksWrapper = css`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const DEFAULT_FILTERS = {
	orderBy: 'newest',
	pageSize: 100,
	threads: 'collapsed',
} as const satisfies FilterOptions;

const NoComments = () => (
	<div
		css={css`
			color: ${sourcePalette.neutral[46]};
			${textSans.small()}
			padding-top: ${space[5]}px;
			padding-left: ${space[1]}px;
			padding-bottom: ${space[9]}px;
		`}
	>
		No comments found
	</div>
);

const rememberFilters = ({ threads, pageSize, orderBy }: FilterOptions) => {
	storage.local.set('gu.prefs.discussion.threading', threads);
	storage.local.set('gu.prefs.discussion.pagesize', pageSize);
	storage.local.set('gu.prefs.discussion.order', orderBy);
};

const initialiseFilters = ({
	pageSizeOverride,
	orderByOverride,
	permalinkBeingUsed,
	isClosedForComments,
}: {
	pageSizeOverride?: PageSizeType;
	orderByOverride?: OrderByType;
	permalinkBeingUsed: boolean;
	isClosedForComments: boolean;
}) => {
	const initialisedFilters = initFiltersFromLocalStorage({
		isClosedForComments,
	});
	return {
		...initialisedFilters,
		// Override if prop given
		pageSize: pageSizeOverride ?? initialisedFilters.pageSize,
		orderBy: orderByOverride ?? initialisedFilters.orderBy,
		threads:
			initialisedFilters.threads === 'collapsed' && permalinkBeingUsed
				? 'expanded'
				: initialisedFilters.threads,
	};
};

const decideDefaultOrderBy = (isClosedForComment: boolean): OrderByType =>
	isClosedForComment ? 'oldest' : 'newest';

/**
 * This function handles the fact that some readers have legacy values
 * stored in the browsers
 */
const checkPageSize = (size: PageSizeType | 'All'): PageSizeType =>
	size === 'All' ? DEFAULT_FILTERS.pageSize : size;

const initFiltersFromLocalStorage = ({
	isClosedForComments,
}: {
	isClosedForComments: boolean;
}): FilterOptions => {
	const orderBy =
		storage.local.get('gu.prefs.discussion.order') ??
		decideDefaultOrderBy(isClosedForComments);
	const threads =
		storage.local.get('gu.prefs.discussion.threading') ??
		DEFAULT_FILTERS.threads;
	const pageSize =
		storage.local.get('gu.prefs.discussion.pagesize') ??
		DEFAULT_FILTERS.pageSize;

	// If we found something in LS, use it, otherwise return defaults
	//todo: stop typecasting these and parse these properly instead
	return {
		orderBy: isOrderBy(orderBy)
			? orderBy
			: decideDefaultOrderBy(isClosedForComments),
		threads: isThreads(threads) ? threads : DEFAULT_FILTERS.threads,
		pageSize:
			isPageSize(pageSize) || pageSize === 'All'
				? checkPageSize(pageSize)
				: DEFAULT_FILTERS.pageSize,
	};
};

const readMutes = (): string[] => {
	const mutes = storage.local.get('gu.prefs.discussion.mutes') ?? [];

	return Array.isArray(mutes) && mutes.every(isString) ? mutes : [];
};

const writeMutes = (mutes: string[]) => {
	storage.local.set('gu.prefs.discussion.mutes', mutes);
};

export const Comments = ({
	baseUrl,
	shortUrl,
	format,
	isClosedForComments,
	initialPage,
	commentToScrollTo,
	pageSizeOverride,
	orderByOverride,
	user,
	additionalHeaders,
	expanded,
	onPermalinkClick,
	apiKey,
	onRecommend,
	onComment,
	onReply,
	onPreview,
	onExpand,
	idApiUrl,
}: Props) => {
	const [filters, setFilters] = useState<FilterOptions>(
		initialiseFilters({
			pageSizeOverride,
			orderByOverride,
			permalinkBeingUsed:
				commentToScrollTo !== undefined &&
				!Number.isNaN(commentToScrollTo),
			isClosedForComments,
		}),
	);
	const [isExpanded, setIsExpanded] = useState<boolean>(
		expanded || window.location.hash === '#comments',
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [page, setPage] = useState<number>(initialPage ?? 1);
	const [picks, setPicks] = useState<CommentType[]>([]);
	const [commentBeingRepliedTo, setCommentBeingRepliedTo] =
		useState<CommentType>();
	const [comments, setComments] = useState<CommentType[]>([]);
	const [numberOfCommentsToShow, setNumberOfCommentsToShow] =
		useState<number>(10);
	const [commentCount, setCommentCount] = useState<number>(0);
	const [mutes, setMutes] = useState<string[]>(readMutes());

	const loadingMore = !loading && comments.length !== numberOfCommentsToShow;

	useEffect(() => {
		if (isExpanded) {
			// We want react to complete the current work and render, without trying to batch this update
			// before resetting the number of comments
			// to the total comment amount.
			// This allows a quick render of minimal comments and then immediately begin rendering
			// the remaining comments.
			const timer = setTimeout(() => {
				setNumberOfCommentsToShow(comments.length);
			}, 0);
			return () => clearTimeout(timer);
		} else return;
	}, [isExpanded, comments.length]);

	useEffect(() => {
		// We need this use effect to capture any changes in the expanded prop. This is typicallly
		// seen when clicking permalinks
		setIsExpanded(expanded);
	}, [expanded]);

	useEffect(() => {
		setLoading(true);
		//todo: come back and handle the error case
		void getDiscussion(shortUrl, { ...filters, page }).then((json) => {
			setLoading(false);
			if (json && json.status !== 'error') {
				setComments(json.discussion.comments);
				setCommentCount(json.discussion.topLevelCommentCount);
			}
			//todo: come back and parse this properly (apologies for the horribleness)
			setTotalPages(json?.pages as number);
		});
	}, [filters, page, shortUrl]);

	//todo: parse this properly
	useEffect(() => {
		const fetchPicks = async () => {
			const json = await getPicks(shortUrl);
			if (json !== undefined) {
				setPicks(json);
			}
		};
		void fetchPicks();
	}, [shortUrl]);

	// If these override props are updated we want to respect them
	useEffect(() => {
		setFilters((oldFilters) => {
			return {
				...oldFilters,
				orderBy: orderByOverride ?? oldFilters.orderBy,
				pageSize: pageSizeOverride ?? oldFilters.pageSize,
			};
		});
	}, [pageSizeOverride, orderByOverride]);

	// Keep initialPage prop in sync with page
	useEffect(() => {
		if (initialPage !== undefined) setPage(initialPage);
		// We added commentToScrollTo to the deps here because the initialPage alone wasn't triggered the effect
		// and we want to ensure the discussion rerenders with the right page when the reader clicks Jump To Comment
		// for a comment on a different page
	}, [initialPage, commentToScrollTo]);

	// Check if there is a comment to scroll to and if
	// so, scroll to the div with this id.
	// We need to do this in javascript like this because the comments list isn't
	// loaded on the inital page load and only gets added to the dom later, after
	// an api call is made.
	useEffect(() => {
		if (commentToScrollTo !== undefined) {
			const commentElement = document.getElementById(
				`comment-${commentToScrollTo}`,
			);
			commentElement?.scrollIntoView();
		}
	}, [comments, commentToScrollTo]); // Add comments to deps so we rerun this effect when comments are loaded

	const onFilterChange = (newFilterObject: FilterOptions) => {
		// If we're reducing the pageSize then we may need to override the page we're on to prevent making
		// requests for pages that don't exist.
		// E.g. If we used to have 102 comments and a pageSize of 25 then the current page could be 5 (showing 2
		// comments). If we then change pageSize to be 50 then there is no longer a page 5 and trying to ask for it
		// from the api would return an error so, in order to respect the readers desire to be on the last page, we
		// need to work out the maximum page possible and use that instead.
		let maxPagePossible = Math.floor(
			commentCount / newFilterObject.pageSize,
		);
		// Add 1 if there is a remainder
		if (commentCount % newFilterObject.pageSize) {
			maxPagePossible = maxPagePossible + 1;
		}
		// Check
		if (page > maxPagePossible) setPage(maxPagePossible);

		rememberFilters(newFilterObject);
		// Filters also show when the view is not expanded but we want to expand when they're changed
		setIsExpanded(true);
		onExpand?.();
		setFilters(newFilterObject);
	};

	const onPageChange = (pageNumber: number) => {
		// Pagination also show when the view is not expanded so we want to expand when clicked
		setIsExpanded(true);
		const element = document.getElementById('comment-filters');
		element?.scrollIntoView();
		setPage(pageNumber);
	};

	const toggleMuteStatus = (userId: string) => {
		let updatedMutes;
		if (mutes.includes(userId)) {
			// Already muted, unmute them
			updatedMutes = mutes.filter((id) => id !== userId);
		} else {
			// Add this user to our list of mutes
			updatedMutes = [...mutes, userId];
		}
		// Update local state
		setMutes(updatedMutes);
		// Remember these new values
		writeMutes(updatedMutes);
	};

	const onAddComment = (comment: CommentType) => {
		// Remove last item from our local array
		// Replace it with this new comment at the start
		setComments([comment, ...comments.slice(0, -1)]);

		if (!isExpanded) {
			// It's possible to post a comment without the view being expanded
			setIsExpanded(true);
			if (typeof onExpand === 'function') onExpand();
		}

		const commentElement = document.getElementById(`comment-${comment.id}`);
		commentElement?.scrollIntoView();
	};

	initialiseApi({ additionalHeaders, baseUrl, apiKey, idApiUrl });

	const showPagination = totalPages > 1;

	if (!isExpanded && loading) {
		return <span data-testid="loading-comments"></span>;
	}

	if (!isExpanded) {
		return (
			<div data-component="discussion" css={commentContainerStyles}>
				{picks.length !== 0 ? (
					<div css={picksWrapper}>
						<TopPicks
							format={format}
							comments={picks.slice(0, 2)}
							authStatus={user?.authStatus}
							onPermalinkClick={onPermalinkClick}
							onRecommend={onRecommend}
						/>
					</div>
				) : (
					<>
						<Filters
							format={format}
							filters={filters}
							onFilterChange={onFilterChange}
							totalPages={totalPages}
							commentCount={commentCount}
						/>
						{showPagination && (
							<Pagination
								totalPages={totalPages}
								currentPage={page}
								setCurrentPage={(newPage: number) => {
									onPageChange(newPage);
								}}
								commentCount={commentCount}
								filters={filters}
							/>
						)}
						{!comments.length ? (
							<NoComments />
						) : (
							<ul css={commentContainerStyles}>
								{comments.slice(0, 2).map((comment) => (
									<li key={comment.id}>
										<CommentContainer
											comment={comment}
											format={format}
											isClosedForComments={
												isClosedForComments
											}
											shortUrl={shortUrl}
											user={user}
											threads={filters.threads}
											commentBeingRepliedTo={
												commentBeingRepliedTo
											}
											setCommentBeingRepliedTo={
												setCommentBeingRepliedTo
											}
											mutes={mutes}
											toggleMuteStatus={toggleMuteStatus}
											onPermalinkClick={onPermalinkClick}
											onRecommend={onRecommend}
										/>
									</li>
								))}
							</ul>
						)}
					</>
				)}
			</div>
		);
	}

	return (
		<div data-component="discussion" css={commentColumnWrapperStyles}>
			{user && !isClosedForComments && (
				<CommentForm
					format={format}
					shortUrl={shortUrl}
					onAddComment={onAddComment}
					user={user}
					onComment={onComment}
					onReply={onReply}
					onPreview={onPreview}
				/>
			)}
			{!!picks.length && (
				<TopPicks
					format={format}
					comments={picks}
					authStatus={user?.authStatus}
					onPermalinkClick={onPermalinkClick}
					onRecommend={onRecommend}
				/>
			)}
			<Filters
				format={format}
				filters={filters}
				onFilterChange={onFilterChange}
				totalPages={totalPages}
				commentCount={commentCount}
			/>
			{showPagination && (
				<Pagination
					totalPages={totalPages}
					currentPage={page}
					setCurrentPage={(newPage: number) => {
						onPageChange(newPage);
					}}
					commentCount={commentCount}
					filters={filters}
				/>
			)}
			{loading ? (
				<LoadingComments />
			) : !comments.length ? (
				<NoComments />
			) : (
				<ul css={commentContainerStyles}>
					{comments
						.slice(0, numberOfCommentsToShow)
						.map((comment) => (
							<li key={comment.id}>
								<CommentContainer
									comment={comment}
									format={format}
									isClosedForComments={isClosedForComments}
									shortUrl={shortUrl}
									user={user}
									threads={filters.threads}
									commentBeingRepliedTo={
										commentBeingRepliedTo
									}
									setCommentBeingRepliedTo={
										setCommentBeingRepliedTo
									}
									commentToScrollTo={commentToScrollTo}
									mutes={mutes}
									toggleMuteStatus={toggleMuteStatus}
									onPermalinkClick={onPermalinkClick}
									onRecommend={onRecommend}
									onReply={onReply}
								/>
							</li>
						))}
				</ul>
			)}
			{loadingMore && <LoadingComments />}
			{showPagination && (
				<footer css={footerStyles}>
					<Pagination
						totalPages={totalPages}
						currentPage={page}
						setCurrentPage={(newPage: number) => {
							onPageChange(newPage);
						}}
						commentCount={commentCount}
						filters={filters}
					/>
				</footer>
			)}
			{user && !isClosedForComments && comments.length > 10 && (
				<CommentForm
					format={format}
					shortUrl={shortUrl}
					onAddComment={onAddComment}
					user={user}
					onComment={onComment}
					onReply={onReply}
					onPreview={onPreview}
				/>
			)}
		</div>
	);
};
