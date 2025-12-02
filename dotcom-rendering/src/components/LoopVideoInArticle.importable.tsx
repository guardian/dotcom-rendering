import type { FEAspectRatio } from '../frontend/feFront';
import type { ArticleFormat } from '../lib/articleFormat';
import {
	convertAssetsToVideoSources,
	getFirstVideoAsset,
	getSubtitleAsset,
} from '../lib/video';
import type { MediaAtomBlockElement } from '../types/content';
import { Caption } from './Caption';
import { SelfHostedVideo } from './SelfHostedVideo.importable';

type LoopVideoInArticleProps = {
	element: MediaAtomBlockElement;
	format: ArticleFormat;
	isMainMedia: boolean;
};

export const LoopVideoInArticle = ({
	element,
	format,
	isMainMedia,
}: LoopVideoInArticleProps) => {
	const posterImageUrl = element.posterImage?.[0]?.url;
	const caption = element.title;
	const firstVideoAsset = getFirstVideoAsset(element.assets);

	if (!posterImageUrl) {
		return null;
	}

	return (
		<>
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
				videoStyle="Loop"
				uniqueId={element.id}
				width={firstVideoAsset?.dimensions?.width ?? 500}
			/>
			{!!caption && (
				<Caption
					captionText={caption}
					format={format}
					isMainMedia={isMainMedia}
					mediaType="SelfHostedVideo"
				/>
			)}
		</>
	);
};
