import { css } from '@emotion/react';
import { isString, storage } from '@guardian/libs';
import { space, textSans } from '@guardian/source-foundations';
import { useEffect, useState } from 'react';
import type {
	AdditionalHeadersType,
	CommentFormProps,
	CommentType,
	FilterOptions,
	ReplyType,
	SignedInUser,
} from '../../lib/discussion';
import type { preview, reportAbuse } from '../../lib/discussionApi';
import { getPicks, initialiseApi } from '../../lib/discussionApi';
import { palette as schemedPalette } from '../../palette';
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
	onPreview?: typeof preview;
	idApiUrl: string;
	page: number;
	setPage: (page: number) => void;
	filters: FilterOptions;
	topLevelCommentCount: number;
	loading: boolean;
	comments: Array<CommentType | ReplyType>;
	addComment: (comment: CommentType) => void;
	addReply: (comment: ReplyType) => void;
	handleFilterChange: (newFilters: FilterOptions, page?: number) => void;
	pickError: string;
	setPickError: (error: string) => void;
	setTopFormUserMissing: (isUserMissing: boolean) => void;
	setReplyFormUserMissing: (isUserMissing: boolean) => void;
	setBottomFormUserMissing: (isUserMissing: boolean) => void;
	setTopFormError: (error: string) => void;
	setReplyFormError: (error: string) => void;
	setBottomFormError: (error: string) => void;
	setTopFormPreviewBody: (previewBody: string) => void;
	setReplyFormPreviewBody: (previewBody: string) => void;
	setBottomFormPreviewBody: (previewBody: string) => void;
	topForm: CommentFormProps;
	replyForm: CommentFormProps;
	bottomForm: CommentFormProps;
	reportAbuse: ReturnType<typeof reportAbuse>;
	expandCommentReplies: (commentId: number, responses: ReplyType[]) => void;
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
			color: ${schemedPalette('--discussion-subdued')};
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
	onPreview,
	idApiUrl,
	page,
	setPage,
	filters,
	topLevelCommentCount,
	loading,
	comments,
	pickError,
	setPickError,
	addComment,
	addReply,
	handleFilterChange,
	setTopFormUserMissing,
	setReplyFormUserMissing,
	setBottomFormUserMissing,
	setTopFormError,
	setReplyFormError,
	setBottomFormError,
	setTopFormPreviewBody,
	setReplyFormPreviewBody,
	setBottomFormPreviewBody,
	topForm,
	replyForm,
	bottomForm,
	reportAbuse,
	expandCommentReplies,
}: Props) => {
	const [picks, setPicks] = useState<Array<CommentType | ReplyType>>([]);
	const [commentBeingRepliedTo, setCommentBeingRepliedTo] = useState<
		CommentType | ReplyType
	>();
	const [mutes, setMutes] = useState<string[]>(readMutes());

	useEffect(() => {
		void getPicks(shortUrl).then((result) => {
			if (result.kind === 'error') {
				console.error(result.error);
				return;
			}
			setPicks(result.value);
		});
	}, [shortUrl]);

	/**
	 * Verify if there is a comment to scroll to; if found, scroll to the corresponding div.
	 * This JavaScript is necessary because the comments list isn't initially loaded with the
	 * page and is added to the DOM later, following an API call.
	 * */
	useEffect(() => {
		if (commentToScrollTo === undefined) return;
		if (loading) return;

		document
			.getElementById(`comment-${commentToScrollTo}`)
			?.scrollIntoView();
	}, [commentToScrollTo, loading]);

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
			topLevelCommentCount / newFilterObject.pageSize,
		);

		if (page > maxPagePossible) {
			handleFilterChange(newFilterObject, maxPagePossible);
		} else {
			handleFilterChange(newFilterObject);
		}
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
	const onAddComment = (comment: CommentType | ReplyType) => {
		if (comment.responses) {
			addComment(comment);
		} else {
			addReply(comment);
		}
		const commentElement = document.getElementById(`comment-${comment.id}`);
		commentElement?.scrollIntoView();
	};

	const onPageChange = (pageNumber: number) => {
		setPage(pageNumber);
	};

	initialiseApi({ additionalHeaders, baseUrl, apiKey, idApiUrl });

	const showPagination = topLevelCommentCount > filters.pageSize;

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
							user={user}
							onPermalinkClick={onPermalinkClick}
						/>
					</div>
				) : (
					<>
						<Filters
							filters={filters}
							onFilterChange={onFilterChange}
							topLevelCommentCount={topLevelCommentCount}
						/>
						{showPagination && (
							<Pagination
								currentPage={page}
								setCurrentPage={onPageChange}
								topLevelCommentCount={topLevelCommentCount}
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
											error={replyForm.error}
											setError={setReplyFormError}
											pickError={pickError}
											setPickError={setPickError}
											userNameMissing={
												replyForm.userNameMissing
											}
											setUserNameMissing={
												setReplyFormUserMissing
											}
											previewBody={replyForm.previewBody}
											setPreviewBody={
												setReplyFormPreviewBody
											}
											reportAbuse={reportAbuse}
											expandCommentReplies={
												expandCommentReplies
											}
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
					onPreview={onPreview}
					error={topForm.error}
					setError={setTopFormError}
					userNameMissing={topForm.userNameMissing}
					setUserNameMissing={setTopFormUserMissing}
					previewBody={topForm.previewBody}
					setPreviewBody={setTopFormPreviewBody}
				/>
			)}
			{!!picks.length && (
				<TopPicks
					comments={picks}
					user={user}
					onPermalinkClick={onPermalinkClick}
				/>
			)}
			<Filters
				filters={filters}
				onFilterChange={onFilterChange}
				topLevelCommentCount={topLevelCommentCount}
			/>
			{showPagination && (
				<Pagination
					currentPage={page}
					setCurrentPage={onPageChange}
					topLevelCommentCount={topLevelCommentCount}
					filters={filters}
				/>
			)}
			{loading ? (
				<LoadingComments />
			) : !comments.length ? (
				<NoComments />
			) : (
				<ul css={commentContainerStyles}>
					{comments.map((comment) => (
						<li key={comment.id}>
							<CommentContainer
								comment={comment}
								isClosedForComments={isClosedForComments}
								shortUrl={shortUrl}
								user={user}
								threads={filters.threads}
								commentBeingRepliedTo={commentBeingRepliedTo}
								setCommentBeingRepliedTo={
									setCommentBeingRepliedTo
								}
								commentToScrollTo={commentToScrollTo}
								mutes={mutes}
								toggleMuteStatus={toggleMuteStatus}
								onPermalinkClick={onPermalinkClick}
								error={replyForm.error}
								setError={setReplyFormError}
								pickError={pickError}
								setPickError={setPickError}
								userNameMissing={replyForm.userNameMissing}
								setUserNameMissing={setReplyFormUserMissing}
								previewBody={replyForm.previewBody}
								setPreviewBody={setReplyFormPreviewBody}
								reportAbuse={reportAbuse}
								expandCommentReplies={expandCommentReplies}
							/>
						</li>
					))}
				</ul>
			)}
			{showPagination && (
				<footer css={footerStyles}>
					<Pagination
						currentPage={page}
						setCurrentPage={onPageChange}
						topLevelCommentCount={topLevelCommentCount}
						filters={filters}
					/>
				</footer>
			)}
			{user && !isClosedForComments && comments.length > 10 && (
				<CommentForm
					shortUrl={shortUrl}
					onAddComment={onAddComment}
					user={user}
					onPreview={onPreview}
					error={bottomForm.error}
					setError={setBottomFormError}
					userNameMissing={bottomForm.userNameMissing}
					setUserNameMissing={setBottomFormUserMissing}
					previewBody={bottomForm.previewBody}
					setPreviewBody={setBottomFormPreviewBody}
				/>
			)}
		</div>
	);
};
