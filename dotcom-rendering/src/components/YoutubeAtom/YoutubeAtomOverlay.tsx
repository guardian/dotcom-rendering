import { css } from '@emotion/react';
import {
	from,
	headlineMedium17,
	headlineMedium20,
	palette as sourcePalette,
	space,
	textSansBold12,
} from '@guardian/source/foundations';
import { palette } from '../../palette';
import type {
	ImagePositionType,
	ImageSizeType,
} from '../Card/components/ImageWrapper';
import { PlayIcon } from '../Card/components/PlayIcon';
import { FormatBoundary } from '../FormatBoundary';
import { Kicker } from '../Kicker';
import { secondsToDuration } from '../MediaDuration';
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
	imageSize: ImageSizeType;
	imagePositionOnMobile: ImagePositionType;
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

	.play-icon {
		transition: transform 300ms;
	}

	/* We scale the play icon on hover and focus to indicate it's playable content. */
	:focus .play-icon,
	:hover .play-icon {
		transform: translate(-50%, -50%) scale(1.15);
	}
`;

const pillStyles = css`
	position: absolute;
	top: ${space[2]}px;
	right: ${space[2]}px;
	${textSansBold12};
	background-color: rgba(0, 0, 0, 0.7);
	color: ${sourcePalette.neutral[100]};
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
		background-color: ${sourcePalette.news[500]};
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
	color: ${sourcePalette.neutral[100]};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	text-align: start;
	padding: ${space[2]}px;
	padding-top: ${space[9]}px;
`;

const titleStyles = css`
	${headlineMedium17};
	${from.tablet} {
		${headlineMedium20};
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
	imageSize,
	imagePositionOnMobile,
}: Props) => {
	const id = `youtube-overlay-${uniqueId}`;
	const hasDuration = duration !== undefined && duration > 0;
	const showPill = !!videoCategory || hasDuration;
	const isLive = videoCategory === 'live';
	const image = overrideImage ?? posterImage;
	const hidePillOnMobile =
		imagePositionOnMobile === 'right' || imagePositionOnMobile === 'left';

	return (
		<FormatBoundary format={format}>
			<button
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
					<div
						css={
							hidePillOnMobile
								? css`
										display: none;
								  `
								: pillStyles
						}
					>
						{!!videoCategory && (
							<div css={pillItemStyles}>
								<div
									css={[pillTextStyles, isLive && liveStyles]}
								>
									{capitalise(videoCategory)}
								</div>
							</div>
						)}
						{!!hasDuration && (
							<div css={pillItemStyles}>
								<div css={pillTextStyles}>
									{secondsToDuration(duration)}
								</div>
							</div>
						)}
					</div>
				)}
				<PlayIcon
					imageSize={imageSize}
					imagePositionOnMobile={imagePositionOnMobile}
				/>
				{showTextOverlay && (
					<div css={textOverlayStyles}>
						{!!kicker && (
							<Kicker
								text={kicker}
								color={palette('--youtube-overlay-kicker')}
								fontWeight="bold"
							/>
						)}
						<div css={titleStyles}>{title}</div>
					</div>
				)}
			</button>
		</FormatBoundary>
	);
};
