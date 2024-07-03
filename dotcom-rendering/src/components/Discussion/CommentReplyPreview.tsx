import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import { Button, SvgIndent } from '@guardian/source/react-components';
import { useState } from 'react';
import type { CommentType, ReplyType } from '../../lib/discussion';
import { palette as schemedPalette } from '../../palette';
import { Row } from './Row';

type Props = {
	commentBeingRepliedTo: CommentType | ReplyType;
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
		fill: ${schemedPalette('--discussion-subdued')} !important;
	}
`;

const smallFontStyles = css`
	${textSans15};
	line-height: 19px;
`;

const replyPreviewHeaderStyle = css`
	${textSansBold15};
	margin-top: 0px;
	margin-bottom: ${space[2]}px;
`;

const arrowSize = 15;

const previewStyle = css`
	padding-top: ${space[3]}px;
	padding-bottom: ${space[3]}px;
	padding-left: ${space[5]}px;
	padding-right: ${space[5]}px;
	background-color: ${schemedPalette('--discussion-top-pick-background')};
	margin-top: ${arrowSize}px;
	margin-bottom: ${arrowSize + 5}px;
	position: relative;
	display: flex;
	flex-direction: column;
	:before {
		content: '';
		position: absolute;
		border-left: ${arrowSize}px solid
			${schemedPalette('--discussion-top-pick-background')};
		border-top: ${arrowSize}px solid transparent;
		top: -${arrowSize - 1}px;
		margin-left: ${space[9]}px;
	}
`;

const commentStyles = css`
	p {
		${textSans15};
		margin-top: 0px;
		margin-bottom: ${space[3]}px;
	}
`;

const blueLink = css`
	color: ${schemedPalette('--discussion-link')};
`;

const buttonLinkPillarBaseStyles = css`
	button {
		color: ${schemedPalette('--discussion-accent-text')};
		background-color: transparent;
		height: 18px;
		min-height: 18px;
		/* Radius 0 is used to style focus halo */
		border-radius: 0;

		:hover {
			text-decoration: underline;
			text-decoration-color: ${schemedPalette(
				'--discussion-accent-text',
			)};
		}
	}
`;

const buttonLinkBaseStyles = css`
	button {
		color: ${schemedPalette('--discussion-subdued')};
		background-color: transparent;
		height: 18px;
		min-height: 18px;
		/* Radius 0 is used to style focus halo */
		border-radius: 0;

		:hover {
			text-decoration: underline;
			text-decoration-color: ${schemedPalette('--discussion-subdued')};
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
								${textSansBold15}
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
	commentBeingRepliedTo: CommentType | ReplyType;
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
							${textSans15}
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
