import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button, SvgIndent } from '@guardian/source-react-components';
import { useState } from 'react';
import { palette as themePalette } from '../../palette';
import type { CommentType } from '../../types/discussion';
import { Row } from './Row';

type Props = {
	commentBeingRepliedTo: CommentType;
};

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
	<div
		css={css`
			width: ${space[amount]}px;
		`}
	/>
);

const indentStyles = css`
	width: 18px;
	svg {
		/* stylelint-disable-next-line declaration-no-important */
		fill: ${sourcePalette.neutral[46]} !important;
	}
`;

const smallFontStyles = css`
	${textSans.small()};
	line-height: 19px;
`;

const replyPreviewHeaderStyle = css`
	${textSans.small({ fontWeight: 'bold' })};
	margin-top: 0px;
	margin-bottom: ${space[2]}px;
`;

const arrowSize = 15;
const bg = sourcePalette.neutral[93];
const previewStyle = css`
	padding-top: ${space[3]}px;
	padding-bottom: ${space[3]}px;
	padding-left: ${space[5]}px;
	padding-right: ${space[5]}px;
	background-color: ${bg};
	margin-top: ${arrowSize}px;
	margin-bottom: ${arrowSize + 5}px;
	position: relative;
	display: flex;
	flex-direction: column;
	:before {
		content: '';
		position: absolute;
		border-left: ${arrowSize}px solid ${bg};
		border-top: ${arrowSize}px solid transparent;
		top: -${arrowSize - 1}px;
		margin-left: ${space[9]}px;
	}
`;

const commentStyles = css`
	p {
		${textSans.small()};
		margin-top: 0px;
		margin-bottom: ${space[3]}px;
	}
`;

const blueLink = css`
	color: ${sourcePalette.brand[500]};
`;

const buttonLinkPillarBaseStyles = css`
	button {
		color: ${themePalette('--discussion-colour')};
		background-color: transparent;
		height: 18px;
		min-height: 18px;
		/* Radius 0 is used to style focus halo */
		border-radius: 0;

		:hover {
			text-decoration: underline;
			text-decoration-color: ${themePalette('--discussion-colour')};
		}
	}
`;

const buttonLinkBaseStyles = css`
	button {
		color: ${sourcePalette.neutral[46]};
		background-color: transparent;
		height: 18px;
		min-height: 18px;
		/* Radius 0 is used to style focus halo */
		border-radius: 0;

		:hover {
			text-decoration: underline;
			text-decoration-color: ${sourcePalette.neutral[46]};
		}
	}
`;

export const CommentReplyPreview = ({ commentBeingRepliedTo }: Props) => {
	const [displayReplyComment, setDisplayReplyComment] =
		useState<boolean>(false);
	return (
		<>
			<Row>
				<div css={indentStyles}>
					<SvgIndent />
				</div>
				<Space amount={1} />
				<div css={smallFontStyles}>
					{commentBeingRepliedTo.userProfile.displayName}
				</div>
				<Space amount={3} />
				<div
					css={[
						buttonLinkPillarBaseStyles,
						css`
							button {
								${textSans.small({ fontWeight: 'bold' })}
							}
						`,
					]}
				>
					<Button
						priority="subdued"
						onClick={() =>
							setDisplayReplyComment(!displayReplyComment)
						}
						data-link-name={
							displayReplyComment
								? 'reply-comment-hide'
								: 'reply-comment-show'
						}
					>
						{displayReplyComment ? 'Hide Comment' : 'Show comment'}
					</Button>
				</div>
			</Row>
			{displayReplyComment && (
				<Preview
					commentBeingRepliedTo={commentBeingRepliedTo}
					setDisplayReplyComment={setDisplayReplyComment}
					displayReplyComment={displayReplyComment}
				/>
			)}
		</>
	);
};

export const Preview = ({
	commentBeingRepliedTo,
	setDisplayReplyComment,
	displayReplyComment,
}: {
	commentBeingRepliedTo: CommentType;
	setDisplayReplyComment: (displayReplyComment: boolean) => void;
	displayReplyComment: boolean;
}) => {
	return (
		<div css={previewStyle}>
			<p css={replyPreviewHeaderStyle}>
				{commentBeingRepliedTo.userProfile.displayName} @{' '}
				{commentBeingRepliedTo.date} said:
			</p>
			<div
				css={commentStyles}
				dangerouslySetInnerHTML={{
					__html: commentBeingRepliedTo.body || '',
				}}
			/>

			<div
				css={[
					buttonLinkBaseStyles,
					css`
						button {
							${textSans.small()}
						}
					`,
				]}
			>
				<Button
					priority="subdued"
					onClick={() => setDisplayReplyComment(!displayReplyComment)}
					data-link-name="hide-comment"
				>
					<span css={blueLink}>Hide Comment</span>
				</Button>
			</div>
		</div>
	);
};
