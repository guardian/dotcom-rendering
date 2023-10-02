import { css } from '@emotion/react';
import {
	focusHalo,
	from,
	headline,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { SvgMediaControlsPlay } from '@guardian/source-react-components';
import { decidePalette } from '../../lib/decidePalette';
import { formatTime } from '../../lib/formatTime';
import type { Palette } from '../../types/palette';
import { YoutubeAtomPicture } from './YoutubeAtomPicture';

export type VideoCategory = 'live' | 'documentary' | 'explainer';

type Props = {
	uniqueId: string;
	overrideImage?: string;
	posterImage?: string;
	height: number;
	width: number;
	alt: string;
	duration?: number; // in seconds
	title?: string;
	onClick: () => void;
	videoCategory?: VideoCategory;
	kicker?: string;
	format: ArticleFormat;
	showTextOverlay?: boolean;
	showMainVideo: boolean;
};

const overlayStyles = css`
	background-size: cover;
	background-position: 49% 49%;
	background-repeat: no-repeat;
	text-align: center;
	height: 100%;
	width: 100%;
	position: absolute;
	max-height: 100vh;
	cursor: pointer;
	border: 0;
	padding: 0;

	img {
		width: 100%;
		height: 100%;
	}

	/* hard code "overlay-play-button" to be able to give play button animation on focus/hover of overlay */
	:focus {
		${focusHalo}
		.overlay-play-button {
			transform: scale(1.15);
			transition-duration: 300ms;
		}
	}
	:hover {
		.overlay-play-button {
			transform: scale(1.15);
			transition-duration: 300ms;
		}
	}
`;

const svgStyles = css`
	/* Nudge Icon to the right, so it appears optically centered
	/* https://medium.com/design-bridges/optical-effects-9fca82b4cd9a#f9d2 */
	padding-left: ${space[2]}px;
	svg {
		transform-origin: center;
		fill: ${palette.neutral[100]};
		height: 60px;
		transform: scale(1.15);
		transition-duration: 300ms;
	}
`;
const playButtonStyles = css`
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -40px; /* Half the height of the circle */
	margin-left: -40px;
	background-color: rgba(18, 18, 18, 0.6);
	border-radius: 100%;
	height: 80px;
	width: 80px;
	transform: scale(1);
	transition-duration: 300ms;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const pillStyles = css`
	position: absolute;
	top: ${space[2]}px;
	right: ${space[2]}px;
	${textSans.xxsmall({ fontWeight: 'bold' })};
	background-color: rgba(0, 0, 0, 0.7);
	color: ${palette.neutral[100]};
	border-radius: ${space[3]}px;
	padding: 0 6px;
	display: inline-flex;
`;

const pillItemStyles = css`
	/* Target all but the first element, and add a border */
	:nth-of-type(n + 2) {
		border-left: 1px solid rgba(255, 255, 255, 0.5);
	}
`;

const pillTextStyles = css`
	line-height: ${space[4]}px;
	padding: ${space[1]}px 6px;
`;

const liveStyles = css`
	::before {
		content: '';
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background-color: ${palette.news[500]};
		display: inline-block;
		position: relative;
		margin-right: 0.1875rem;
	}
`;

const textOverlayStyles = css`
	position: absolute;
	background: linear-gradient(
		180deg,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0.7) 25%
	);
	width: 100%;
	bottom: 0;
	color: ${palette.neutral[100]};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	text-align: start;
	padding: ${space[2]}px;
	padding-top: ${space[9]}px;
`;

const kickerStyles = (dcrPalette: Palette) => css`
	color: ${dcrPalette.text.youtubeOverlayKicker};
	${headline.xxxsmall({ fontWeight: 'bold' })};
	${from.tablet} {
		${headline.xxsmall({ fontWeight: 'bold' })};
	}
`;

const titleStyles = css`
	${headline.xxxsmall({ fontWeight: 'medium' })};
	${from.tablet} {
		${headline.xxsmall({ fontWeight: 'medium' })};
	}
`;
const capitalise = (str: string): string =>
	str.charAt(0).toUpperCase() + str.slice(1);

export const YoutubeAtomOverlay = ({
	uniqueId,
	overrideImage,
	posterImage,
	height,
	width,
	alt,
	duration,
	title,
	onClick,
	videoCategory,
	kicker,
	format,
	showTextOverlay,
	showMainVideo,
}: Props) => {
	const id = `youtube-overlay-${uniqueId}`;
	const hasDuration = duration !== undefined && duration > 0;
	const showPill = !!videoCategory || hasDuration;
	const isLive = videoCategory === 'live';
	const dcrPalette = decidePalette(format);
	const image = overrideImage ?? posterImage;

	return showMainVideo ? (
		<button
			data-cy={id}
			data-testid={id}
			onClick={onClick}
			css={overlayStyles}
			aria-label={title ? `Play video: ${title}` : `Play video`}
			type="button"
		>
			{!!image && (
				<YoutubeAtomPicture
					image={image}
					alt={alt}
					height={height}
					width={width}
				/>
			)}
			{showPill && (
				<div css={pillStyles}>
					{!!videoCategory && (
						<div css={pillItemStyles}>
							<div css={[pillTextStyles, isLive && liveStyles]}>
								{capitalise(videoCategory)}
							</div>
						</div>
					)}
					{!!hasDuration && (
						<div css={pillItemStyles}>
							<div css={pillTextStyles}>
								{formatTime(duration)}
							</div>
						</div>
					)}
				</div>
			)}
			<div className="overlay-play-button" css={playButtonStyles}>
				<span css={svgStyles}>
					<SvgMediaControlsPlay />
				</span>
			</div>

			{showTextOverlay && (
				<div css={textOverlayStyles}>
					<div css={kickerStyles(dcrPalette)}>{kicker}</div>
					<div css={titleStyles}>{title}</div>
				</div>
			)}
		</button>
	) : (
		<div css={overlayStyles}>
			<Picture
				imageSources={overrideImage ?? posterImage ?? []}
				role={role}
				alt={alt}
				height={height}
				width={width}
			/>
			{showPill && (
				<div css={pillStyles}>
					{!!videoCategory && (
						<div css={pillItemStyles}>
							<div css={[pillTextStyles, isLive && liveStyles]}>
								{capitalise(videoCategory)}
							</div>
						</div>
					)}
				</div>
			)}
			{showTextOverlay && (
				<div css={textOverlayStyles}>
					<div css={kickerStyles(dcrPalette)}>{kicker}</div>
					<div css={titleStyles}>{title}</div>
				</div>
			)}
		</div>
	);
};
