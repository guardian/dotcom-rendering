import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { border } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { timeAgo } from '@guardian/libs';
import {
	focusHalo,
	from,
	height,
	neutral,
	space,
	textSans,
	transitions,
	visuallyHidden,
} from '@guardian/source-foundations';
import {
	SvgMinus,
	SvgPinned,
	SvgPlus,
} from '@guardian/source-react-components';
import type { LiveBlock } from 'liveBlock';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

const pinnedPostContainerStyles = (
	format: ArticleFormat,
): SerializedStyles => css`
	border: 3px solid ${border.borderPinnedPost(format)};
	padding-bottom: ${space[1]}px;
	position: relative;
	background: ${neutral[100]};
	margin-bottom: 34px;

	#pinned-post-checkbox:checked ~ #collapsible-body {
		max-height: fit-content;
		margin-bottom: ${space[1]}px;
	}
	#pinned-post-checkbox:checked ~ #pinned-post-overlay,
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

	${darkModeCss`
		background: ${neutral[10]};
	`}
`;

const rowStyles = (format: ArticleFormat): SerializedStyles => css`
	background: ${border.borderPinnedPost(format)};
	height: 32px;
	display: flex;
	align-items: center;
	svg {
		fill: ${neutral[100]};
		height: 32px;
		margin-bottom: ${space[1]}px;
	}
`;

const timeAgoStyles = css`
	${textSans.small({ fontWeight: 'bold' })};
	color: ${neutral[100]};
	${from.tablet} {
		margin-left: 28px;
	}
	margin-bottom: ${space[1]}px;
`;

const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${neutral[100]},
		${neutral[100]} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 80px;
	position: absolute;
	bottom: 0;
	width: 100%;
	display: block;

	${darkModeCss`
		background-image: linear-gradient(
			0deg,
			${neutral[10]},
			${neutral[10]} 40%,
			rgba(255, 255, 255, 0)
		);
	`}
`;

const fakeButtonStyles = (format: ArticleFormat): SerializedStyles => css`
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
	background: ${border.borderPinnedPost(format)};
	margin-left: 10px;
	position: absolute;
	bottom: -24px;
	${textSans.medium({ fontWeight: 'bold' })};
	height: ${height.ctaMedium}px;
	min-height: ${height.ctaMedium}px;
	padding: 0 ${space[5]}px;
	border-radius: ${height.ctaMedium}px;
	padding-bottom: 2px;
	color: white;
	${from.tablet} {
		margin-left: 60px;
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
		margin-right: ${space[1]}px;
	}
`;

type Props = {
	pinnedPost: LiveBlock;
	children: React.ReactNode;
	format: ArticleFormat;
};

const PinnedPost: FC<Props> = ({ pinnedPost, children, format }: Props) => {
	return (
		<div
			id="pinned-post"
			css={pinnedPostContainerStyles(format)}
			data-gu-marker="pinned-post"
			data-component="pinned-post"
		>
			<input
				type="checkbox"
				css={css`
					visibility: hidden;
					${visuallyHidden};
				`}
				id="pinned-post-checkbox"
				name="pinned-post-checkbox"
				tabIndex={-1}
				key="PinnedPostCheckbox"
			/>
			<div css={rowStyles(format)}>
				<SvgPinned />
				<time data-relativeformat="med" css={timeAgoStyles}>
					From {timeAgo(pinnedPost.firstPublished.getTime())}
				</time>
			</div>
			<div id="collapsible-body" css={collapsibleBody}>
				{children}
			</div>
			<div id="pinned-post-overlay" css={overlayStyles} />
			<label
				css={fakeButtonStyles(format)}
				htmlFor="pinned-post-checkbox"
				id="pinned-post-button"
			>
				<>
					<span id="svgminus" css={buttonIcon}>
						<SvgMinus />
					</span>
					<span id="svgplus" css={buttonIcon}>
						<SvgPlus />
					</span>
				</>
			</label>
		</div>
	);
};

export default PinnedPost;
