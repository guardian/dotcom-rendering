import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	headlineMedium17,
	headlineMedium20,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../../lib/articleFormat';
import { palette } from '../../palette';
import type { AspectRatio } from '../../types/front';
import type {
	ImagePositionType,
	ImageSizeType,
} from '../Card/components/ImageWrapper';
import { PlayIcon } from '../Card/components/PlayIcon';
import { FormatBoundary } from '../FormatBoundary';
import { Kicker } from '../Kicker';
import { secondsToDuration } from '../MediaDuration';
import { Pill } from '../Pill';
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
	aspectRatio?: AspectRatio;
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
`;

const liveStyles = css`
	::before {
		content: '';
		display: inline-block;
		width: 0.75em;
		height: 0.75em;
		border-radius: 100%;
		background-color: ${sourcePalette.news[500]};
		margin-right: ${space[1]}px;
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
	aspectRatio,
}: Props) => {
	const id = `youtube-overlay-${uniqueId}`;
	const hasDuration = !isUndefined(duration) && duration > 0;
	const showPill = !!videoCategory || hasDuration;
	const isLive = videoCategory === 'live';
	const image = overrideImage ?? posterImage;
	// const hidePillOnMobile =
	// 	imagePositionOnMobile === 'right' || imagePositionOnMobile === 'left';

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
						aspectRatio={aspectRatio}
					/>
				)}
				{showPill && (
					<div css={pillStyles}>
						<Pill>
							{!!videoCategory && (
								<Pill.Segment>
									<span css={isLive && liveStyles}>
										{capitalise(videoCategory)}
									</span>
								</Pill.Segment>
							)}
							{!!hasDuration && (
								<Pill.Segment>
									{secondsToDuration(duration)}
								</Pill.Segment>
							)}
						</Pill>
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
