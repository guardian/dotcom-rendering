import {
	neutral,
	space,
	textSans,
	news,
	from,
} from '@guardian/source-foundations';
import { useState } from 'react';
import {
	Button,
	Props,
	SvgMinus,
	SvgPlus,
} from '@guardian/source-react-components';
import { timeAgo } from '@guardian/libs';
import { css } from '@emotion/react';

// TODO: replace with source pinned icon once this has been merged and released.
// See PR here: https://github.com/guardian/source/pull/1292
// See Ticket here: https://trello.com/c/xZr6SP9H/272-pinned-post-replace-local-pinned-svg-with-source
import PinIcon from '../../static/icons/pin.svg';
import { ServerSideOnly } from './ServerSideOnly';

const pinnedPostContainer = css`
	border: 3px solid ${news[300]};
	padding-bottom: ${space[1]}px;
	margin-bottom: ${space[9]}px;
	position: relative;
	background: ${neutral[100]};
`;

const pinnedPostRow = css`
	background: ${news[300]};
	height: 2rem;
	display: flex;
	align-items: center;
	svg {
		fill: ${neutral[100]};
		width: 18px;
		height: 24px;
	}
`;

const timeAgoText = css`
	${textSans.small({ fontWeight: 'bold' })};
	color: ${neutral[100]};
	margin-left: 2.6rem;
`;

const overlay = css`
	background-image: linear-gradient(
		0deg,
		${neutral[100]},
		${neutral[100]} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 5rem;
	position: absolute;
	bottom: 0;
	width: 100%;
`;

const button = css`
	background: ${news[300]};
	margin-left: 0.625rem;
	position: absolute;
	bottom: -1.5rem;

	&:hover {
		background: ${news[400]};
	}

	${from.tablet} {
		margin-left: 3.75rem;
	}
`;

const expandedBody = css`
	overflow: hidden;
	height: auto;
`;

const collapsedBody = css`
	max-height: 40vh;
	overflow: hidden;
`;

export interface PinnedPostProps extends Props {
	pinnedPost: Block;
	children: React.ReactNode;
}

export const PinnedPost = ({ pinnedPost, children }: PinnedPostProps) => {
	const [expanded, setExpanded] = useState(false);
	const isClient = typeof window !== 'undefined';
	const showButton =
		isClient &&
		document.documentElement.scrollHeight >
			document.documentElement.clientHeight;

	return (
		<div css={pinnedPostContainer}>
			<div css={pinnedPostRow}>
				<PinIcon fill="white" />
				{pinnedPost.blockFirstPublished && (
					<time data-relativeformat="med" css={timeAgoText}>
						From {timeAgo(pinnedPost.blockFirstPublished)}
					</time>
				)}
			</div>

			<div css={expanded ? expandedBody : collapsedBody}>
				<ServerSideOnly>{children}</ServerSideOnly>
			</div>

			{!expanded && <div css={overlay} />}
			{showButton && (
				<Button
					aria-expanded={expanded}
					cssOverrides={button}
					iconSide="left"
					icon={expanded ? <SvgMinus /> : <SvgPlus />}
					onClick={() => setExpanded(!expanded)}
				>
					{expanded ? 'Show Less' : 'Show More'}
				</Button>
			)}
		</div>
	);
};

// TODO: When a user doesn't have JS enabled we should use a pure css/html accordion instead
// See ticket: https://trello.com/c/J8siXSp2/261-create-non-js-version-of-accordian-container
