/* eslint-disable jsx-a11y/label-has-associated-control */
import {
	neutral,
	space,
	textSans,
	news,
	from,
	visuallyHidden,
	transitions,
	focusHalo,
	height,
} from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { timeAgo } from '@guardian/libs';
import { css } from '@emotion/react';

// TODO: replace with source pinned icon once this has been merged and released.
// See PR here: https://github.com/guardian/source/pull/1292
// See Ticket here: https://trello.com/c/xZr6SP9H/272-pinned-post-replace-local-pinned-svg-with-source
import PinIcon from '../../static/icons/pin.svg';

const pinnedPostContainer = css`
	border: 3px solid ${news[300]};
	padding-bottom: ${space[1]}px;
	margin-bottom: ${space[9]}px;
	position: relative;
	background: ${neutral[100]};
	#pinned-post-checkbox:checked ~ #collapsible-body {
		max-height: fit-content;
	}
	#pinned-post-checkbox:checked ~ #overlay,
	#pinned-post-checkbox ~ label #svgminus,
	#pinned-post-checkbox:checked ~ label #svgplus {
		display: none;
	}
	#pinned-post-checkbox ~ label #svgplus,
	#pinned-post-checkbox:checked ~ label #svgminus {
		display: block;
	}
	#pinned-post-checkbox ~ label::after {
		content: 'Show more';
	}
	#pinned-post-checkbox:checked ~ label::after {
		content: 'Show less';
	}
`;

const pinnedPostRow = css`
	background: ${news[300]};
	height: 2rem;
	display: flex;
	align-items: center;
	svg {
		fill: ${neutral[100]};
		width: 1.125rem;
		height: 1.5rem;
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
	display: block;
`;

const button = css`
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	border: none;
	cursor: pointer;
	transition: ${transitions.medium};
	text-decoration: none;
	white-space: nowrap;
	:disabled {
		cursor: not-allowed;
	}
	&:focus {
		${focusHalo};
	}
	background: ${news[300]};
	margin-left: 0.625rem;
	position: absolute;
	bottom: -1.5rem;
	${textSans.medium({ fontWeight: 'bold' })};
	height: ${height.ctaMedium}px;
	min-height: ${height.ctaMedium}px;
	padding: 0 ${space[5]}px;
	border-radius: ${height.ctaMedium}px;
	padding-bottom: 0.125rem;
	color: white;
	${from.tablet} {
		margin-left: 3.75rem;
	}
`;

const collapsibleBody = css`
	max-height: 40vh;
	overflow: hidden;
`;

const buttonIcon = css`
	svg {
		flex: 0 0 auto;
		display: block;
		fill: white;
		position: relative;
		width: 24px;
		height: auto;
		margin-left: -${space[1]}px;
	}
`;

type Props = {
	pinnedPost: Block;
	children: React.ReactNode;
};

export const PinnedPost = ({ pinnedPost, children }: Props) => {
	return (
		<div css={[pinnedPostContainer]} data-gu-marker="pinned-post">
			<input
				type="checkbox"
				css={css`
					${visuallyHidden};
				`}
				id="pinned-post-checkbox"
				name="pinned-post-checkbox"
				tabIndex={-1}
				key="PinnedPostCheckbox"
			/>
			<div css={pinnedPostRow}>
				<PinIcon fill="white" />
				{pinnedPost.blockFirstPublished && (
					<time data-relativeformat="med" css={timeAgoText}>
						From {timeAgo(pinnedPost.blockFirstPublished)}
					</time>
				)}
			</div>
			<div id="collapsible-body" css={collapsibleBody}>
				{children}
			</div>
			<div id="overlay" css={overlay} />
			<label
				css={button}
				htmlFor="pinned-post-checkbox"
				id="pinned-post-button"
			>
				<div>
					<span id="svgminus" css={buttonIcon}>
						<SvgMinus />
					</span>
					<span id="svgplus" css={buttonIcon}>
						<SvgPlus />
					</span>
				</div>
			</label>
		</div>
	);
};
