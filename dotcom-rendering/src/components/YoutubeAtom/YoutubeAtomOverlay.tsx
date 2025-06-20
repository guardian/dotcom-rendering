import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import type { ArticleFormat } from '../../lib/articleFormat';
import { secondsToDuration } from '../../lib/formatTime';
import { palette } from '../../palette';
import type { AspectRatio } from '../../types/front';
import type { PlayButtonSize } from '../Card/components/PlayIcon';
import { PlayIcon } from '../Card/components/PlayIcon';
import { FormatBoundary } from '../FormatBoundary';
import { Pill } from '../Pill';
import { SvgMediaControlsPlay } from '../SvgMediaControlsPlay';
import { YoutubeAtomPicture } from './YoutubeAtomPicture';

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

type Props = {
	uniqueId: string;
	height: number;
	width: number;
	onClick: () => void;
	format: ArticleFormat;
	alt: string;
	hidePillOnMobile: boolean;
	iconSizeOnDesktop: PlayButtonSize;
	iconSizeOnMobile: PlayButtonSize;
	title?: string;
	image?: string;
	duration?: number; // in seconds
	aspectRatio?: AspectRatio;
};

export const YoutubeAtomOverlay = ({
	uniqueId,
	height,
	width,
	onClick,
	format,
	alt,
	hidePillOnMobile,
	iconSizeOnDesktop,
	iconSizeOnMobile,
	title,
	image,
	duration,
	aspectRatio,
}: Props) => {
	const id = `youtube-overlay-${uniqueId}`;
	const hasDuration = !isUndefined(duration) && duration > 0;
	/**
	 * We infer that a video is a livestream if the duration is set to 0. This is
	 * a soft contract with Editorial who manual set the duration of videos
	 */
	const isLiveStream = !isUndefined(duration) && duration === 0;

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
				{isLiveStream ? (
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
							content="Live"
							icon={<div css={[liveBulletStyles]} />}
						/>
					</div>
				) : hasDuration ? (
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
							icon={<SvgMediaControlsPlay width={18} />}
						/>
					</div>
				) : null}
				<PlayIcon
					iconWidth="wide"
					iconSizeOnDesktop={iconSizeOnDesktop}
					iconSizeOnMobile={iconSizeOnMobile}
				/>
			</button>
		</FormatBoundary>
	);
};
