import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import type { ArticleFormat } from '../../lib/articleFormat';
import { secondsToDuration } from '../../lib/formatTime';
import { palette } from '../../palette';
import type { AspectRatio } from '../../types/front';
import { CardFooter } from '../Card/components/CardFooter';
import { PlayIcon } from '../Card/components/PlayIcon';
import { TrailText } from '../Card/components/TrailText';
import type { ResponsiveFontSize } from '../CardHeadline';
import { CardHeadline } from '../CardHeadline';
import { FormatBoundary } from '../FormatBoundary';
import { Kicker } from '../Kicker';
import { Pill } from '../Pill';
import { SvgMediaControlsPlay } from '../SvgMediaControlsPlay';
import { YoutubeAtomPicture } from './YoutubeAtomPicture';

const buttonStyles = css`
	width: 100%;
	height: 100%;
	position: absolute;
	max-height: 100vh;
	cursor: pointer;
	border: 0;
	padding: 0;

	img {
		width: 100%;
		height: 100%;
	}
`;

const hoverStyles = css`
	:hover .image-overlay {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		left: 0;
		background-color: ${palette('--card-background-hover')};
	}

	/* Only underline the headline element we want to target (not kickers/sublink headlines) */
	:hover .card-headline .show-underline {
		text-decoration: underline;
	}
`;

const textOverlayStyles = css`
	width: 100%;
	position: absolute;
	bottom: 0;
	display: flex;
	flex-direction: column;
	text-align: start;
	gap: ${space[1]}px;
	padding: 64px ${space[2]}px ${space[2]}px;
	mask-image: linear-gradient(
		180deg,
		transparent 0px,
		rgba(0, 0, 0, 0.0381) 8px,
		rgba(0, 0, 0, 0.1464) 16px,
		rgba(0, 0, 0, 0.3087) 24px,
		rgba(0, 0, 0, 0.5) 32px,
		rgba(0, 0, 0, 0.6913) 40px,
		rgba(0, 0, 0, 0.8536) 48px,
		rgba(0, 0, 0, 0.9619) 56px,
		rgb(0, 0, 0) 64px
	);
	backdrop-filter: blur(12px) brightness(0.5);
`;

const videoPillStyles = css`
	position: absolute;
	top: ${space[2]}px;
	right: ${space[2]}px;
`;

type Props = {
	uniqueId: string;
	height: number;
	width: number;
	alt: string;
	format: ArticleFormat;
	title?: string;
	onClick?: () => void;
	headlineSizes?: ResponsiveFontSize;
	image?: string;
	duration?: number; // in seconds
	kicker?: string;
	aspectRatio?: AspectRatio;
	trailText?: string;
	isVideoArticle?: boolean;
};

export const YoutubeAtomFeatureCardOverlay = ({
	uniqueId,
	height,
	width,
	alt,
	title,
	headlineSizes,
	image,
	duration,
	onClick,
	kicker,
	format,
	aspectRatio,
	trailText,
	isVideoArticle,
}: Props) => {
	const id = `youtube-overlay-${uniqueId}`;
	const hasDuration = !isUndefined(duration) && duration > 0;

	return (
		<FormatBoundary format={format}>
			<button
				data-testid={id}
				onClick={onClick}
				css={[buttonStyles, hoverStyles]}
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
				{hasDuration && !isVideoArticle ? (
					<div css={videoPillStyles}>
						<Pill
							content={secondsToDuration(duration)}
							icon={<SvgMediaControlsPlay />}
						/>
					</div>
				) : null}
				<div className="image-overlay" />
				<PlayIcon iconWidth="narrow" />
				<div css={[textOverlayStyles]}>
					{!!kicker && (
						<Kicker
							text={kicker}
							color={palette('--youtube-overlay-kicker')}
							fontWeight="regular"
						/>
					)}
					{!!title && (
						<CardHeadline
							headlineText={title}
							format={format}
							fontSizes={headlineSizes}
							headlineColour={palette('--feature-card-headline')}
							kickerColour={palette('--feature-card-kicker-text')}
							isBetaContainer={true}
						/>
					)}
					{!!trailText && (
						<div
							css={css`
								margin-top: ${space[3]}px;
								margin-bottom: ${space[1]}px;
							`}
						>
							<TrailText
								trailText={trailText}
								trailTextColour={palette(
									'--feature-card-trail-text',
								)}
								trailTextSize="regular"
								padBottom={false}
							/>
						</div>
					)}
					<CardFooter
						format={format}
						showLivePlayable={false}
						mainMedia={{ type: 'Video', duration: duration ?? 0 }}
					/>
				</div>
			</button>
		</FormatBoundary>
	);
};
