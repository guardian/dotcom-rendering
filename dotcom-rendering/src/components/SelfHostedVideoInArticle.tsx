import type { FEAspectRatio } from '../frontend/feFront';
import type { ArticleFormat } from '../lib/articleFormat';
import {
	convertAssetsToVideoSources,
	getFirstVideoAsset,
	getSubtitleAsset,
} from '../lib/video';
import type { MediaAtomBlockElement, RoleType } from '../types/content';
import type { VideoPlayerFormat } from '../types/mainMedia';
import { Island } from './Island';
import { SelfHostedVideo } from './SelfHostedVideo.importable';

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
	const firstVideoAsset = getFirstVideoAsset(element.assets);

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
					(firstVideoAsset?.aspectRatio ?? '5:4') as FEAspectRatio
				}
				fallbackImageLoading="lazy"
				fallbackImageSize="small"
				height={firstVideoAsset?.dimensions?.height ?? 400}
				linkTo="Article-embed-MediaAtomBlockElement"
				posterImage={posterImageUrl}
				sources={convertAssetsToVideoSources(element.assets)}
				subtitleSize="medium"
				subtitleSource={getSubtitleAsset(element.assets)}
				videoStyle={videoStyle}
				uniqueId={element.id}
				width={firstVideoAsset?.dimensions?.width ?? 500}
				caption={caption}
				format={format}
				isMainMedia={isMainMedia}
				role={role}
			/>
		</Island>
	);
};
