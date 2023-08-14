import { css } from '@emotion/react';
import { from, until } from '@guardian/source-foundations';
import type {
	SignedInWithCookies,
	SignedInWithOkta,
} from '../../lib/useAuthStatus';
import type { CommentType, UserProfile } from '../../types/discussion';
import { TopPick } from './TopPick';

type Props = {
	format: ArticleFormat;
	user?: UserProfile;
	comments: CommentType[];
	authStatus?: SignedInWithCookies | SignedInWithOkta;
	onPermalinkClick: (commentId: number) => void;
	onRecommend?: (commentId: number) => Promise<boolean>;
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

export const TopPicks = ({
	format,
	user,
	comments,
	authStatus,
	onPermalinkClick,
	onRecommend,
}: Props) => {
	const leftColComments: CommentType[] = [];
	const rightColComments: CommentType[] = [];
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
							format={format}
							comment={comment}
							authStatus={authStatus}
							userMadeComment={
								!!user &&
								user.userId === comment.userProfile.userId
							}
							onPermalinkClick={onPermalinkClick}
							onRecommend={onRecommend}
						/>
					))}
				</div>
				<div css={[columWrapperStyles, paddingLeft]}>
					{rightColComments.map((comment) => (
						<TopPick
							key={comment.id}
							format={format}
							comment={comment}
							authStatus={authStatus}
							userMadeComment={
								!!user &&
								user.userId === comment.userProfile.userId
							}
							onPermalinkClick={onPermalinkClick}
							onRecommend={onRecommend}
						/>
					))}
				</div>
			</div>
			<div css={oneColCommentsStyles}>
				{comments.map((comment) => (
					<TopPick
						key={comment.id}
						format={format}
						comment={comment}
						authStatus={authStatus}
						userMadeComment={
							!!user && user.userId === comment.userProfile.userId
						}
						onPermalinkClick={onPermalinkClick}
						onRecommend={onRecommend}
					/>
				))}
			</div>
		</div>
	);
};
