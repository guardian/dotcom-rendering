import { css } from '@emotion/react';
import { palette as sourcePalette, space } from '@guardian/source-foundations';
import { SvgPlus } from '@guardian/source-react-components';
import { useState } from 'react';
import type {
	CommentType,
	SignedInUser,
	ThreadsType,
} from '../../lib/discussion';
import type { preview, reportAbuse } from '../../lib/discussionApi';
import { getMoreResponses } from '../../lib/discussionApi';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import { CommentReplyPreview } from './CommentReplyPreview';
import { PillarButton } from './PillarButton';

type Props = {
	comment: CommentType;
	isClosedForComments: boolean;
	shortUrl: string;
	user?: SignedInUser;
	threads: ThreadsType;
	commentBeingRepliedTo?: CommentType;
	setCommentBeingRepliedTo: (commentBeingRepliedTo?: CommentType) => void;
	commentToScrollTo?: number;
	mutes: string[];
	toggleMuteStatus: (userId: string) => void;
	onPermalinkClick: (commentId: number) => void;
	onPreview?: typeof preview;
	error: string;
	setError: (error: string) => void;
	pickError: string;
	setPickError: (error: string) => void;
	userNameMissing: boolean;
	setUserNameMissing: (isUserNameMissing: boolean) => void;
	previewBody: string;
	setPreviewBody: (previewBody: string) => void;
	reportAbuse: ReturnType<typeof reportAbuse>;
	expandCommentReplies: (commentId: number, responses: CommentType[]) => void;
};

const nestingStyles = css`
	list-style-type: none;
	padding-left: ${space[2]}px;
	margin-left: ${space[12]}px;
`;

const topBorder = css`
	border-top: 1px solid ${sourcePalette.neutral[86]};
`;

const commentContainerStyles = css`
	list-style-type: none;
	padding-left: 0;
`;

const selectedStyles = css`
	background-color: ${sourcePalette.neutral[97]};
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
	pickError,
	setPickError,
	userNameMissing,
	setUserNameMissing,
	previewBody,
	setPreviewBody,
	reportAbuse,
	expandCommentReplies,
}: Props) => {
	const responses = comment.responses ?? [];
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

	const expand = (commentId: number) => {
		setLoading(true);
		getMoreResponses(commentId)
			.then((result) => {
				if (result.kind === 'error') {
					console.error(result.error);
					return;
				}
				expandCommentReplies(commentId, result.value);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onAddComment = (commentId: number, response: CommentType) =>
		expandCommentReplies(commentId, [...responses, response]);

	return (
		<div css={[commentToScrollTo === comment.id && selectedStyles]}>
			<Comment
				comment={comment}
				isClosedForComments={isClosedForComments}
				setCommentBeingRepliedTo={setCommentBeingRepliedTo}
				user={user}
				isReply={false}
				isMuted={mutes.includes(comment.userProfile.userId)}
				toggleMuteStatus={toggleMuteStatus}
				onPermalinkClick={onPermalinkClick}
				pickError={pickError}
				setPickError={setPickError}
				reportAbuse={reportAbuse}
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
										pickError={pickError}
										setPickError={setPickError}
										reportAbuse={reportAbuse}
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
							(response: CommentType) =>
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
								onAddComment={(response) =>
									onAddComment(comment.id, response)
								}
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
