import { css } from '@emotion/react';
import { palette as sourcePalette, space } from '@guardian/source-foundations';
import { SvgPlus } from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { getMoreResponses } from '../../lib/discussionApi';
import type {
	CommentResponse,
	CommentType,
	SignedInUser,
	ThreadsType,
} from '../../types/discussion';
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
	onRecommend?: (commentId: number) => Promise<boolean>;
	onComment?: (shortUrl: string, body: string) => Promise<CommentResponse>;
	onReply?: (
		shortUrl: string,
		body: string,
		parentCommentId: number,
	) => Promise<CommentResponse>;
	onPreview?: (body: string) => Promise<string>;
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
	onRecommend,
	onComment,
	onReply,
	onPreview,
}: Props) => {
	// Filter logic
	const [expanded, setExpanded] = useState<boolean>(threads === 'expanded');
	const [responses, setResponses] = useState(comment.responses ?? []);
	const [loading, setLoading] = useState<boolean>(false);

	const showResponses = threads !== 'unthreaded';

	/**
	 * @param responseCount a number > 3
	 */
	const decideShowMoreText = (responseCount: number) => {
		const remainingResponses = responseCount - 3;
		if (remainingResponses === 1) return `Show 1 more reply`;
		return `Show ${remainingResponses} more replies`;
	};

	useEffect(() => {
		setResponses(comment.responses ?? []);
	}, [comment]);

	const expand = (commentId: number) => {
		setLoading(true);
		getMoreResponses(commentId)
			.then((json) => {
				setExpanded(true);
				setResponses(json.comment.responses ?? []);
			})
			.finally(() => {
				setLoading(false);
			});
	};

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
				onRecommend={onRecommend}
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
									/>
								</li>
							))}
						</ul>
						{!expanded &&
							comment.metaData &&
							!!comment.metaData.responseCount &&
							comment.metaData.responseCount > 3 && (
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
											: decideShowMoreText(
													comment.metaData
														.responseCount,
											  )}
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
									setResponses([...responses, response])
								}
								user={user}
								setCommentBeingRepliedTo={
									setCommentBeingRepliedTo
								}
								commentBeingRepliedTo={commentBeingRepliedTo}
								onComment={onComment}
								onReply={onReply}
								onPreview={onPreview}
							/>
						</div>
					)}
			</>
		</div>
	);
};
