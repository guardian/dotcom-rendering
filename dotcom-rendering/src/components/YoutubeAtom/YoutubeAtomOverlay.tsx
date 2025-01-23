import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	headlineMedium17,
	headlineMedium20,
	palette as sourcePalette,
	space,
	textSansBold12,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../../lib/articleFormat';
import { secondsToDuration } from '../../lib/formatTime';
import { palette } from '../../palette';
import type { AspectRatio } from '../../types/front';
import type {
	ImagePositionType,
	ImageSizeType,
} from '../Card/components/ImageWrapper';
import { PlayIcon } from '../Card/components/PlayIcon';
import { FormatBoundary } from '../FormatBoundary';
import { Kicker } from '../Kicker';
import { YoutubeAtomPicture } from './YoutubeAtomPicture';
import { Pill } from '../Pill';
import { SvgMediaControlsPlay } from '../SvgMediaControlsPlay';

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

const liveBulletStyles = css`
	width: 9px;
	height: 9px;
	border-radius: 50%;
	background-color: ${palette('--pill-bullet')};
	margin-right: ${space[1]}px;
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
	kicker,
	format,
	showTextOverlay,
	imageSize,
	imagePositionOnMobile,
	aspectRatio,
}: Props) => {
	const id = `youtube-overlay-${uniqueId}`;
	const hasDuration = !isUndefined(duration) && duration > 0;
	//** We infer that a video is a livestream if the duration is set to 0. This is a soft contract with Editorial who manual set the duration of videos   */
	const isLiveStream = duration === 0;
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
						aspectRatio={aspectRatio}
					/>
				)}
				{isLiveStream && (
					<div
						css={
							hidePillOnMobile
								? css`
										display: none;
								  `
								: pillStyles
						}
					>
						<Pill
							content={'Live'}
							icon={<div css={[liveBulletStyles]} />}
							iconSize={'small'}
						/>
					</div>
				)}
				{hasDuration && (
					<div
						css={
							hidePillOnMobile
								? css`
										display: none;
								  `
								: pillStyles
						}
					>
						<Pill
							content={secondsToDuration(duration)}
							icon={<SvgMediaControlsPlay />}
							iconSize={'small'}
						/>
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
