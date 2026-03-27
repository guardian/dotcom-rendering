import type { FEAspectRatio } from '../frontend/feFront';
import type { ArticleFormat } from '../lib/articleFormat';
import {
	extractValidSourcesFromAssets,
	getAspectRatioFromSources,
	getSubtitleAsset,
} from '../lib/video';
import type { MediaAtomBlockElement, RoleType } from '../types/content';
import type { VideoPlayerFormat } from '../types/mainMedia';
import { Island } from './Island';
import { SelfHostedVideo } from './SelfHostedVideo.island';

type SelfHostedVideoInArticleProps = {
	element: MediaAtomBlockElement;
	format: ArticleFormat;
	isMainMedia: boolean;
	videoStyle: VideoPlayerFormat;
	role?: RoleType;
};

export const SelfHostedVideoInArticle = ({
	element,
	format,
	isMainMedia,
	videoStyle,
	role = 'inline',
}: SelfHostedVideoInArticleProps) => {
	const posterImageUrl = element.posterImage?.[0]?.url;
	const caption = element.title;

	const sources = extractValidSourcesFromAssets(element.assets);
	const aspectRatio = getAspectRatioFromSources(sources);
	const firstVideoSource = sources[0];

	if (!posterImageUrl) {
		return null;
	}

	return (
		<Island priority="critical" defer={{ until: 'visible' }}>
			<SelfHostedVideo
				atomId={element.id}
				fallbackImage={posterImageUrl}
				fallbackImageAlt={caption}
				fallbackImageAspectRatio={
					(firstVideoSource?.aspectRatio ?? '5:4') as FEAspectRatio
				}
				fallbackImageLoading="lazy"
				fallbackImageSize="small"
				aspectRatio={aspectRatio}
				linkTo="Article-embed-MediaAtomBlockElement"
				posterImage={posterImageUrl}
				sources={sources}
				subtitleSize="medium"
				subtitleSource={getSubtitleAsset(element.assets)}
				videoStyle={videoStyle}
				uniqueId={element.id}
				caption={caption}
				format={format}
				isMainMedia={isMainMedia}
				role={role}
			/>
		</Island>
	);
};
