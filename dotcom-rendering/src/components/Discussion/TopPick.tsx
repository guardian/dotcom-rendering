import { css } from '@emotion/react';
import {
	brand,
	from,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { decidePalette } from '../../lib/decidePalette';
import type {
	SignedInWithCookies,
	SignedInWithOkta,
} from '../../lib/useAuthStatus';
import type { CommentType } from '../../types/discussion';
import { Avatar } from './Avatar';
import { GuardianContributor, GuardianStaff } from './Badges';
import { Column } from './Column';
import { RecommendationCount } from './RecommendationCount';
import { Row } from './Row';
import { Timestamp } from './Timestamp';

type Props = {
	format: ArticleFormat;
	comment: CommentType;
	authStatus?: SignedInWithCookies | SignedInWithOkta;
	userMadeComment: boolean;
	onPermalinkClick: (commentId: number) => void;
	onRecommend?: (commentId: number) => Promise<boolean>;
	isClosedForComments: boolean;
};

const pickStyles = css`
	display: flex;
	flex-direction: column;
	width: 100%;
	min-width: 250px;
	margin-bottom: ${space[5]}px;
	${textSans.small()};

	blockquote {
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
		margin-left: ${space[5]}px;
		margin-right: ${space[5]}px;
		padding-left: ${space[2]}px;
		color: ${neutral[46]};
	}
`;

const arrowSize = 25;
const bg = neutral[93];

const userNameStyles = (format: ArticleFormat) => css`
	margin-top: 3px;
	margin-bottom: -6px;
	font-weight: bold;
	color: ${decidePalette(format).discussionGeneric};
`;

const avatarMargin = css`
	margin-right: ${space[2]}px;
`;

const smallFontSize = css`
	a {
		${textSans.small()}
	}
`;

const linkStyles = css`
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

// to override a tag styles from dangerouslySetInnerHTML
const inCommentLinkStyling = css`
	a {
		color: ${brand[500]};
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;

const titleStyles = css`
	${textSans.small()};
	font-weight: bold;
	margin: 0px;
	margin-bottom: ${space[1]}px;
`;

const inheritColour = css`
	color: inherit;
`;

const wrapStyles = css`
	word-break: break-word;
`;

const PickBubble = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			padding: ${space[3]}px;
			background-color: ${bg};
			border-radius: 15px;
			margin-bottom: ${arrowSize + 5}px;
			position: relative;

			${from.tablet} {
				min-height: 150px;
			}

			:before {
				content: '';
				margin-left: ${space[6]}px;
				position: absolute;
				border-right: ${arrowSize}px solid transparent;
				border-top: ${arrowSize}px solid ${bg};
				bottom: -${arrowSize - 1}px;
			}

			p {
				margin-top: 0;
				margin-bottom: ${space[3]}px;
			}
		`}
	>
		{children}
	</div>
);

const Top = ({ children }: { children: React.ReactNode }) => (
	<div>{children}</div>
);

const Bottom = ({ children }: { children: React.ReactNode }) => (
	<div>{children}</div>
);

const PickMeta = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			justify-content: space-between;
			padding-top: ${space[1]}px;
		`}
	>
		{children}
	</div>
);

const truncateText = (input: string, limit: number) => {
	// If input greater than limit trucate by limit and append an ellipsis
	if (input.length > limit) return input.substr(0, limit) + '&#8230;';
	return input;
};

export const TopPick = ({
	format,
	comment,
	authStatus,
	userMadeComment,
	onPermalinkClick,
	onRecommend,
	isClosedForComments,
}: Props) => {
	const showStaffBadge = comment.userProfile.badge.some(
		(obj) => obj['name'] === 'Staff',
	);

	const showContributorBadge = comment.userProfile.badge.some(
		(obj) => obj['name'] === 'Contributor',
	);

	return (
		<div css={pickStyles}>
			<PickBubble>
				<Top>
					<h3 css={titleStyles}>Guardian Pick</h3>
					<p
						css={[wrapStyles, inCommentLinkStyling]}
						dangerouslySetInnerHTML={{
							__html: truncateText(comment.body, 450),
						}}
					></p>
				</Top>
				<Bottom>
					<div css={smallFontSize}>
						<Link
							priority="primary"
							href={comment.webUrl}
							onClick={(
								e: React.MouseEvent<HTMLAnchorElement>,
							) => {
								onPermalinkClick(comment.id);
								e.preventDefault();
							}}
							rel="nofollow"
						>
							Jump to comment
						</Link>
					</div>
				</Bottom>
			</PickBubble>
			<PickMeta>
				<Row>
					<div css={avatarMargin}>
						<Avatar
							imageUrl={comment.userProfile.avatar}
							displayName={''}
							size="medium"
						/>
					</div>
					<Column>
						<span css={userNameStyles(format)}>
							<a
								href={comment.userProfile.webUrl}
								css={[linkStyles, inheritColour]}
								rel="nofollow"
							>
								{comment.userProfile.displayName}
							</a>
						</span>
						<Timestamp
							isoDateTime={comment.isoDateTime}
							webUrl={comment.webUrl}
							commentId={comment.id}
							onPermalinkClick={onPermalinkClick}
						/>
						{showStaffBadge && <GuardianStaff />}
						{showContributorBadge && !showStaffBadge && (
							<GuardianContributor />
						)}
					</Column>
				</Row>
				<RecommendationCount
					commentId={comment.id}
					initialCount={comment.numRecommends}
					alreadyRecommended={false}
					authStatus={authStatus}
					userMadeComment={userMadeComment}
					onRecommend={onRecommend}
					isClosedForComments={isClosedForComments}
				/>
			</PickMeta>
		</div>
	);
};
