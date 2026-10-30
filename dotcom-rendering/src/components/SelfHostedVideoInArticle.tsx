import { css } from '@emotion/react';
import { space, until } from '@guardian/source/foundations';
import type { FEAspectRatio } from '../frontend/feFront';
import { isInteractive } from '../layouts/lib/interactiveLegacyStyling';
import { ArticleDisplay, type ArticleFormat } from '../lib/articleFormat';
import {
	extractValidSourcesFromAssets,
	getAspectRatioFromSources,
	getSubtitleAsset,
} from '../lib/video';
import type { MediaAtomBlockElement, RoleType } from '../types/content';
import type { VideoPlayerFormat } from '../types/mainMedia';
import { Island } from './Island';
import { SelfHostedVideo } from './SelfHostedVideo.island';

const containerStyles = css`
	margin-bottom: ${space[3]}px;
`;

const immersiveMainMediaStyles = css`
	&& {
		height: 100%;
		margin-bottom: 0;

		> gu-island,
		.video-container,
		.video-container > div,
		.video-container > div > div {
			display: block;
			height: 100%;
			aspect-ratio: auto;
		}

		video {
			height: 100%;
			aspect-ratio: auto;
			object-fit: cover;

			${until.tablet} {
				object-position: center top;
			}
		}
	}
`;

type SelfHostedVideoInArticleProps = {
	element: MediaAtomBlockElement;
	format: ArticleFormat;
	isMainMedia: boolean;
	videoStyle: VideoPlayerFormat;
	role?: RoleType;
	caption?: string;
};

export const SelfHostedVideoInArticle = ({
	element,
	format,
	isMainMedia,
	videoStyle,
	role = 'inline',
	caption,
}: SelfHostedVideoInArticleProps) => {
	const posterImageUrl = element.posterImage?.[0]?.url;
	const sources = extractValidSourcesFromAssets(
		element.assets,
		videoStyle,
		element.duration,
	);
	const aspectRatio = getAspectRatioFromSources(sources);
	const isVerticalVideo = aspectRatio < 1;
	const firstVideoSource = sources[0];
	const useImmersiveMainMediaStyles =
		isMainMedia &&
		format.display === ArticleDisplay.Immersive &&
		(videoStyle === 'Loop' || videoStyle === 'Cinemagraph');

	if (!posterImageUrl) {
		return null;
	}

	return (
		<div
			css={[
				containerStyles,
				useImmersiveMainMediaStyles && immersiveMainMediaStyles,
			]}
			data-spacefinder-role="inline"
		>
			<Island priority="critical" defer={{ until: 'visible' }}>
				<SelfHostedVideo
					atomId={element.id}
					fallbackImage={posterImageUrl}
					fallbackImageAlt={caption}
					fallbackImageAspectRatio={
						(firstVideoSource?.aspectRatio ??
							'5:4') as FEAspectRatio
					}
					fallbackImageLoading="lazy"
					fallbackImageSize="small"
					aspectRatio={aspectRatio}
					linkTo="Article-embed-MediaAtomBlockElement"
					posterImage={posterImageUrl}
					posterImageAspectRatio={
						firstVideoSource?.aspectRatio ?? '5:4'
					}
					sources={sources}
					subtitleSize="medium"
					subtitleSource={getSubtitleAsset(element.assets)}
					videoStyle={videoStyle}
					uniqueId={element.id}
					caption={caption}
					format={format}
					isMainMedia={isMainMedia}
					role={role}
					preventAutoplay={videoStyle === 'Default'}
					restrictHeightOnDesktop={
						!useImmersiveMainMediaStyles &&
						isVerticalVideo &&
						!isInteractive(format.design)
					}
				/>
			</Island>
		</div>
	);
};
