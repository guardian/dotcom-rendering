import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { ArticleFormat } from '@guardian/libs';
import { timeAgo } from '@guardian/libs';
import {
	focusHalo,
	from,
	neutral,
	remHeight,
	remSpace,
	textSans,
	transitions,
	visuallyHidden,
} from '@guardian/source-foundations';
import {
	SvgMinus,
	SvgPinned,
	SvgPlus,
} from '@guardian/source-react-components';
import LiveBlock from 'components/LiveBlock';
import type { LiveBlock as LiveBlockType } from 'liveBlock';
import { background, border } from 'palette';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

const pinnedPostContainerStyles = (
	format: ArticleFormat,
): SerializedStyles => css`
	border: 0.1875rem solid ${border.pinnedPost(format)};
	padding-bottom: ${remSpace[1]};
	position: relative;
	background: ${neutral[100]};
	margin-bottom: 2.125rem;

	#pinned-post-checkbox:checked ~ #collapsible-body {
		max-height: fit-content;
		margin-bottom: ${remSpace[1]};
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
	background: ${background.pinnedPost(format)};
	height: 2rem;
	display: flex;
	align-items: center;
	svg {
		fill: ${neutral[100]};
		height: 2rem;
		margin-bottom: ${remSpace[1]};
	}
`;

const timeAgoStyles = css`
	${textSans.small({ fontWeight: 'bold' })};
	color: ${neutral[100]};
	${from.tablet} {
		margin-left: 1.75rem;
	}
	margin-bottom: ${remSpace[1]};
`;

const overlayStyles = css`
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
	&:focus {
		${focusHalo};
	}
	background: ${background.pinnedPost(format)};
	margin-left: 0.625rem;
	position: absolute;
	bottom: -1.5rem;
	${textSans.medium({ fontWeight: 'bold' })};
	height: ${remHeight.ctaMedium}rem;
	min-height: ${remHeight.ctaMedium}rem;
	padding: 0 ${remSpace[5]} 0.125rem;
	border-radius: ${remHeight.ctaMedium}rem;
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
		display: block;
		fill: white;
		width: 1.5rem;
		height: auto;
		margin-left: -${remSpace[1]};
		margin-right: ${remSpace[1]};
	}
`;

type Props = {
	pinnedPost: LiveBlockType;
	format: ArticleFormat;
	edition: Edition;
};

const PinnedPost: FC<Props> = ({ pinnedPost, format, edition }: Props) => {
	return (
		<div
			id="pinned-post"
			css={pinnedPostContainerStyles(format)}
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
				<time css={timeAgoStyles}>
					From {timeAgo(pinnedPost.firstPublished.getTime())}
				</time>
			</div>
			<div id="collapsible-body" css={collapsibleBody}>
				<LiveBlock
					block={pinnedPost}
					format={format}
					isPinnedPost={true}
					isOriginalPinnedPost={false}
					edition={edition}
				/>
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
