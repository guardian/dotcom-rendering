import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';
import type {
	CommentType,
	ResponseType,
	SignedInUser,
} from '../../lib/discussion';
import { TopPick } from './TopPick';

type Props = {
	user?: SignedInUser;
	comments: Array<CommentType | ResponseType>;
	onPermalinkClick: (commentId: number) => void;
};

const columWrapperStyles = css`
	width: 50%;
	display: flex;
	flex-direction: column;
`;
const paddingRight = css`
	padding-right: 10px;
`;
const paddingLeft = css`
	padding-left: 10px;
`;

const picksWrapper = css`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const twoColCommentsStyles = css`
	width: 100%;
	display: flex;
	flex-direction: row;
	${until.tablet} {
		display: none;
	}
`;
const oneColCommentsStyles = css`
	width: 100%;
	${from.tablet} {
		display: none;
	}
`;

export const TopPicks = ({ user, comments, onPermalinkClick }: Props) => {
	const leftColComments: Array<CommentType | ResponseType> = [];
	const rightColComments: Array<CommentType | ResponseType> = [];
	for (const [index, comment] of comments.entries())
		index % 2 === 0
			? leftColComments.push(comment)
			: rightColComments.push(comment);
	return (
		<div css={picksWrapper}>
			<div css={twoColCommentsStyles}>
				<div css={[columWrapperStyles, paddingRight]}>
					{leftColComments.map((comment) => (
						<TopPick
							key={comment.id}
							comment={comment}
							user={user}
							userMadeComment={
								user?.profile.userId ===
								comment.userProfile.userId
							}
							onPermalinkClick={onPermalinkClick}
						/>
					))}
				</div>
				<div css={[columWrapperStyles, paddingLeft]}>
					{rightColComments.map((comment) => (
						<TopPick
							key={comment.id}
							comment={comment}
							user={user}
							userMadeComment={
								user?.profile.userId ===
								comment.userProfile.userId
							}
							onPermalinkClick={onPermalinkClick}
						/>
					))}
				</div>
			</div>
			<div css={oneColCommentsStyles}>
				{comments.map((comment) => (
					<TopPick
						key={comment.id}
						comment={comment}
						userMadeComment={
							user?.profile.userId === comment.userProfile.userId
						}
						onPermalinkClick={onPermalinkClick}
					/>
				))}
			</div>
		</div>
	);
};
