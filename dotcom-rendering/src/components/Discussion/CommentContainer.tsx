import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgPlus } from '@guardian/source/react-components';
import { useState } from 'react';
import type {
	CommentType,
	ReplyType,
	SignedInUser,
	ThreadsType,
} from '../../lib/discussion';
import type { preview, reportAbuse } from '../../lib/discussionApi';
import { getAllReplies } from '../../lib/discussionApi';
import { palette as schemedPalette } from '../../palette';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import { CommentReplyPreview } from './CommentReplyPreview';
import { PillarButton } from './PillarButton';

type Props = {
	comment: CommentType | ReplyType;
	isClosedForComments: boolean;
	isClosedForRecommendations: boolean;
	shortUrl: string;
	user?: SignedInUser;
	threads: ThreadsType;
	commentBeingRepliedTo?: CommentType | ReplyType;
	setCommentBeingRepliedTo: (
		commentBeingRepliedTo?: CommentType | ReplyType,
	) => void;
	commentToScrollTo?: string;
	mutes: string[];
	toggleMuteStatus: (userId: string) => void;
	onPermalinkClick: (commentId: string) => void;
	onPreview?: typeof preview;
	error: string;
	setError: (error: string) => void;
	userNameMissing: boolean;
	setUserNameMissing: (isUserNameMissing: boolean) => void;
	previewBody: string;
	setPreviewBody: (previewBody: string) => void;
	reportAbuse: ReturnType<typeof reportAbuse>;
	expandCommentReplies: (commentId: string, responses: ReplyType[]) => void;
	isExpanded: boolean;
};

const nestingStyles = css`
	list-style-type: none;
	padding-left: ${space[2]}px;
	margin-left: ${space[12]}px;
`;

const topBorder = css`
	border-top: 1px solid ${schemedPalette('--discussion-border')};
`;

const commentContainerStyles = css`
	list-style-type: none;
	padding-left: 0;
`;

const selectedStyles = css`
	background-color: ${schemedPalette('--discussion-selected-background')};
	margin-left: -${space[2]}px;
	padding-left: ${space[2]}px;
	margin-right: -${space[2]}px;
	padding-right: ${space[2]}px;
`;

const removeMargin = css`
	margin: 0px;
`;

export const avatar = (avatarSize: number) => css`
	border-radius: ${avatarSize + 10}px;
	width: ${avatarSize}px;
	height: ${avatarSize}px;
`;

export const CommentContainer = ({
	comment,
	isClosedForComments,
	isClosedForRecommendations,
	user,
	shortUrl,
	threads,
	commentBeingRepliedTo,
	setCommentBeingRepliedTo,
	commentToScrollTo,
	mutes,
	toggleMuteStatus,
	onPermalinkClick,
	onPreview,
	error,
	setError,
	userNameMissing,
	setUserNameMissing,
	previewBody,
	setPreviewBody,
	reportAbuse,
	expandCommentReplies,
	isExpanded,
}: Props) => {
	const responses = comment.responses ? comment.responses : [];
	const totalResponseCount = comment.metaData?.responseCount ?? 0;

	// Filter logic
	const expanded = responses.length >= totalResponseCount;
	const [loading, setLoading] = useState<boolean>(false);

	const showResponses = threads !== 'unthreaded' && responses.length > 0;

	const decideShowMoreText = () => {
		const remainingResponses = totalResponseCount - responses.length;
		return remainingResponses === 1
			? `Show 1 more reply`
			: `Show ${remainingResponses} more replies`;
	};

	const expand = (commentId: string) => {
		setLoading(true);
		getAllReplies(commentId)
			.then((result) => {
				if (result.kind === 'error') {
					console.error(result.error);
					return;
				}
				expandCommentReplies(commentId, result.value);
			})
			.catch(() => {
				// do nothing
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onAddReply = (commentId: string, response: ReplyType) =>
		expandCommentReplies(commentId, [...responses, response]);

	return (
		<div css={[commentToScrollTo === comment.id && selectedStyles]}>
			<Comment
				comment={comment}
				isClosedForComments={isClosedForComments}
				isClosedForRecommendations={isClosedForRecommendations}
				setCommentBeingRepliedTo={setCommentBeingRepliedTo}
				user={user}
				isReply={false}
				isMuted={mutes.includes(comment.userProfile.userId)}
				toggleMuteStatus={toggleMuteStatus}
				onPermalinkClick={onPermalinkClick}
				reportAbuse={reportAbuse}
				isExpanded={isExpanded}
			/>

			<>
				{showResponses && responses.length > 0 && (
					<div css={nestingStyles}>
						<ul css={[commentContainerStyles, removeMargin]}>
							{responses.map((responseComment) => (
								<li key={responseComment.id}>
									<Comment
										comment={responseComment}
										isClosedForComments={
											isClosedForComments
										}
										isClosedForRecommendations={
											isClosedForRecommendations
										}
										setCommentBeingRepliedTo={
											setCommentBeingRepliedTo
										}
										user={user}
										isReply={true}
										wasScrolledTo={
											commentToScrollTo ===
											responseComment.id
										}
										isMuted={mutes.includes(
											responseComment.userProfile.userId,
										)}
										toggleMuteStatus={toggleMuteStatus}
										onPermalinkClick={onPermalinkClick}
										reportAbuse={reportAbuse}
										isExpanded={isExpanded}
									/>
								</li>
							))}
						</ul>
						{!expanded && (
							<div
								css={[
									topBorder,
									css`
										padding-top: ${space[3]}px;
										padding-bottom: ${space[3]}px;
									`,
								]}
							>
								<PillarButton
									priority="secondary"
									icon={<SvgPlus />}
									iconSide="left"
									linkName="Show more replies"
									onClick={() => expand(comment.id)}
									size="xsmall"
								>
									{loading
										? 'loading...'
										: decideShowMoreText()}
								</PillarButton>
							</div>
						)}
					</div>
				)}
				{commentBeingRepliedTo &&
					(commentBeingRepliedTo.id === comment.id ||
						responses.find(
							(response: ReplyType) =>
								response.id === commentBeingRepliedTo.id,
						)) &&
					user && (
						<div
							id={`comment-reply-form-${commentBeingRepliedTo.id}`}
							css={nestingStyles}
						>
							<CommentReplyPreview
								commentBeingRepliedTo={commentBeingRepliedTo}
							/>
							<CommentForm
								shortUrl={shortUrl}
								onAddComment={(response) => {
									if ('responses' in response) return;
									onAddReply(comment.id, response);
								}}
								user={user}
								setCommentBeingRepliedTo={
									setCommentBeingRepliedTo
								}
								commentBeingRepliedTo={commentBeingRepliedTo}
								onPreview={onPreview}
								error={error}
								setError={setError}
								userNameMissing={userNameMissing}
								setUserNameMissing={setUserNameMissing}
								previewBody={previewBody}
								setPreviewBody={setPreviewBody}
							/>
						</div>
					)}
			</>
		</div>
	);
};
