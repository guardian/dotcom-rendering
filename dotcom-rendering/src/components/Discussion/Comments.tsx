import { css } from '@emotion/react';
import { isString, storage } from '@guardian/libs';
import {
	palette as sourcePalette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import type { comment, reply } from '../../lib/discussionApi';
import { getPicks, initialiseApi } from '../../lib/discussionApi';
import type {
	AdditionalHeadersType,
	CommentType,
	FilterOptions,
	SignedInUser,
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
	isClosedForComments: boolean;
	commentToScrollTo?: number;
	user?: SignedInUser;
	additionalHeaders: AdditionalHeadersType;
	expanded: boolean;
	onPermalinkClick: (commentId: number) => void;
	apiKey: string;
	onRecommend?: (commentId: number) => Promise<boolean>;
	onComment?: ReturnType<typeof comment>;
	onReply?: ReturnType<typeof reply>;
	onPreview?: (body: string) => Promise<string>;
	onExpand: () => void;
	idApiUrl: string;
	page: number;
	setPage: (page: number) => void;
	filters: FilterOptions;
	setFilters: (filters: FilterOptions) => void;
	commentCount: number;
	loading: boolean;
	totalPages: number;
	comments: CommentType[];
	setComments: (comments: CommentType[]) => void;
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

/** Reads mutes from local storage, if available. */
const readMutes = (): string[] => {
	const mutes = storage.local.get('gu.prefs.discussion.mutes') ?? [];
	return Array.isArray(mutes) && mutes.every(isString) ? mutes : [];
};

/** Writes mutes to local storage. */
const writeMutes = (mutes: string[]) => {
	storage.local.set('gu.prefs.discussion.mutes', mutes);
};

export const Comments = ({
	baseUrl,
	shortUrl,
	isClosedForComments,
	commentToScrollTo,
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
	page,
	setPage,
	filters,
	setFilters,
	commentCount,
	loading,
	totalPages,
	comments,
	setComments,
}: Props) => {
	const [picks, setPicks] = useState<CommentType[]>([]);
	const [commentBeingRepliedTo, setCommentBeingRepliedTo] =
		useState<CommentType>();
	const [numberOfCommentsToShow, setNumberOfCommentsToShow] = useState(10);
	const [mutes, setMutes] = useState<string[]>(readMutes());
	const [showPreview, setShowPreview] = useState<boolean>(false);
	const [isCommentFormActive, setIsCommentFormActive] = useState<boolean>(
		!!commentBeingRepliedTo,
	);
	const [userNameMissing, setUserNameMissing] = useState<boolean>(false);
	const [body, setBody] = useState('');

	const loadingMore = !loading && comments.length !== numberOfCommentsToShow;

	useEffect(() => {
		if (expanded) {
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
	}, [expanded, comments.length]);

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

	/**
	 * Verify if there is a comment to scroll to; if found, scroll to the corresponding div.
	 * This JavaScript is necessary because the comments list isn't initially loaded with the
	 * page and is added to the DOM later, following an API call.
	 * */
	useEffect(() => {
		if (commentToScrollTo !== undefined) {
			const commentElement = document.getElementById(
				`comment-${commentToScrollTo}`,
			);
			commentElement?.scrollIntoView();
		}
	}, [comments, commentToScrollTo]); // Add comments to deps so we rerun this effect when comments are loaded

	const onFilterChange = (newFilterObject: FilterOptions) => {
		/**
		 * When decreasing the page size, we adjust the current page
		 * to avoid requesting non-existent pages. For example,
		 * if we had 102 comments with a page size of 25, and the current
		 * page was 5 (showing 2 comments), reducing the page size to 50 eliminates page 5.
		 * To respect the reader's preference to stay on the last page,
		 * we calculate and use the maximum possible page instead.
		 */
		const maxPagePossible = Math.ceil(
			commentCount / newFilterObject.pageSize,
		);

		if (page > maxPagePossible) setPage(maxPagePossible);

		setFilters(newFilterObject);
		// Filters also show when the view is not expanded but we want to expand when they're changed
		onExpand();
	};

	useEffect(() => {
		const element = document.getElementById('comment-filters');
		element?.scrollIntoView();
	}, [page]);

	/** Remember updated mutes locally */
	useEffect(() => {
		writeMutes(mutes);
	}, [mutes]);

	const toggleMuteStatus = (userId: string) => {
		const updatedMutes = mutes.includes(userId)
			? mutes.filter((id) => id !== userId) // Already muted, unmute them
			: [...mutes, userId]; // Add this user to our list of mutes

		setMutes(updatedMutes); // Update local state
	};
	const onAddComment = (comment: CommentType) => {
		// Remove last item from our local array
		// Replace it with this new comment at the start
		setComments([comment, ...comments.slice(0, -1)]);

		// It's possible to post a comment without the view being expanded
		onExpand();

		const commentElement = document.getElementById(`comment-${comment.id}`);
		commentElement?.scrollIntoView();
	};

	const onPageChange = (pageNumber: number) => {
		setPage(pageNumber);
		onExpand();
	};

	initialiseApi({ additionalHeaders, baseUrl, apiKey, idApiUrl });

	const showPagination = totalPages > 1;

	if (!expanded && loading) {
		return <span data-testid="loading-comments"></span>;
	}

	if (!expanded) {
		return (
			<div data-component="discussion" css={commentContainerStyles}>
				{picks.length !== 0 ? (
					<div css={picksWrapper}>
						<TopPicks
							comments={picks.slice(0, 2)}
							authStatus={user?.authStatus}
							onPermalinkClick={onPermalinkClick}
							onRecommend={onRecommend}
						/>
					</div>
				) : (
					<>
						<Filters
							filters={filters}
							onFilterChange={onFilterChange}
							commentCount={commentCount}
						/>
						{showPagination && (
							<Pagination
								totalPages={totalPages}
								currentPage={page}
								setCurrentPage={onPageChange}
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
											showPreview={showPreview}
											setShowPreview={setShowPreview}
											isCommentFormActive={
												isCommentFormActive
											}
											setIsCommentFormActive={
												setIsCommentFormActive
											}
											userNameMissing={userNameMissing}
											setUserNameMissing={
												setUserNameMissing
											}
											body={body}
											setBody={setBody}
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
					shortUrl={shortUrl}
					onAddComment={onAddComment}
					user={user}
					onComment={onComment}
					onReply={onReply}
					onPreview={onPreview}
					showPreview={showPreview}
					setShowPreview={setShowPreview}
					isActive={isCommentFormActive}
					setIsActive={setIsCommentFormActive}
					userNameMissing={userNameMissing}
					setUserNameMissing={setUserNameMissing}
					body={body}
					setBody={setBody}
				/>
			)}
			{!!picks.length && (
				<TopPicks
					comments={picks}
					authStatus={user?.authStatus}
					onPermalinkClick={onPermalinkClick}
					onRecommend={onRecommend}
				/>
			)}
			<Filters
				filters={filters}
				onFilterChange={onFilterChange}
				commentCount={commentCount}
			/>
			{showPagination && (
				<Pagination
					totalPages={totalPages}
					currentPage={page}
					setCurrentPage={onPageChange}
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
									showPreview={showPreview}
									setShowPreview={setShowPreview}
									isCommentFormActive={isCommentFormActive}
									setIsCommentFormActive={
										setIsCommentFormActive
									}
									userNameMissing={userNameMissing}
									setUserNameMissing={setUserNameMissing}
									body={body}
									setBody={setBody}
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
						setCurrentPage={onPageChange}
						commentCount={commentCount}
						filters={filters}
					/>
				</footer>
			)}
			{user && !isClosedForComments && comments.length > 10 && (
				<CommentForm
					shortUrl={shortUrl}
					onAddComment={onAddComment}
					user={user}
					onComment={onComment}
					onReply={onReply}
					onPreview={onPreview}
					showPreview={showPreview}
					setShowPreview={setShowPreview}
					isActive={isCommentFormActive}
					setIsActive={setIsCommentFormActive}
					userNameMissing={userNameMissing}
					setUserNameMissing={setUserNameMissing}
					body={body}
					setBody={setBody}
				/>
			)}
		</div>
	);
};
