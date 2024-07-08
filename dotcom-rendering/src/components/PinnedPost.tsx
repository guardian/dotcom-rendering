import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	focusHalo,
	from,
	height,
	palette as sourcePalette,
	space,
	textSansBold15,
	textSansBold17,
	transitions,
	visuallyHidden,
} from '@guardian/source/foundations';
import {
	SvgMinus,
	SvgPinned,
	SvgPlus,
} from '@guardian/source/react-components';
import { palette } from '../palette';
import { DateTime } from './DateTime';

const pinnedPostContainer = css`
	border: 3px solid ${palette('--pinned-post-border')};
	padding-bottom: ${space[1]}px;
	position: relative;
	background: ${palette('--pinned-post-background')};
	${from.mobile} {
		margin-bottom: 34px;
	}
	${from.desktop} {
		margin-bottom: ${space[9]}px;
	}
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
`;

const rowStyles = css`
	background: ${palette('--pinned-post-border')};
	height: 32px;
	display: flex;
	align-items: center;
	svg {
		fill: ${sourcePalette.neutral[100]};
		height: 32px;
		margin-bottom: ${space[1]}px;
	}
`;

const timeAgoStyles = css`
	${textSansBold15};
	color: ${sourcePalette.neutral[100]};
	${from.tablet} {
		margin-left: 28px;
	}
	margin-bottom: ${space[1]}px;
`;

const overlayStyles = css`
	background-image: linear-gradient(
		0deg,
		${palette('--pinned-post-background')},
		${palette('--pinned-post-background')} 40%,
		rgba(255, 255, 255, 0)
	);
	height: 80px;
	position: absolute;
	bottom: 0;
	width: 100%;
	display: block;
`;

const fakeButtonStyles = css`
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
	background: ${palette('--pinned-post-border')};
	margin-left: 10px;
	position: absolute;
	bottom: -24px;
	${textSansBold17};
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
	pinnedPost: Block;
	children: React.ReactNode;
	absoluteServerTimes: boolean;
};

export const PinnedPost = ({
	pinnedPost,
	children,
	absoluteServerTimes,
}: Props) => {
	return (
		<div
			id="pinned-post"
			css={pinnedPostContainer}
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
			<div css={rowStyles}>
				<SvgPinned />
				{!isUndefined(pinnedPost.blockFirstPublished) && (
					<div css={timeAgoStyles}>
						From{' '}
						<DateTime
							date={new Date(pinnedPost.blockFirstPublished)}
							display="relative"
							absoluteServerTimes={absoluteServerTimes}
							showWeekday={false}
							showDate={true}
							showTime={false}
						/>
					</div>
				)}
			</div>
			<div id="collapsible-body" css={collapsibleBody}>
				{children}
			</div>
			<div id="pinned-post-overlay" css={overlayStyles} />
			<label
				css={fakeButtonStyles}
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
