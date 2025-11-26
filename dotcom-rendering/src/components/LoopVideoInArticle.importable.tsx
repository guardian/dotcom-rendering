import type { ArticleFormat } from '../lib/articleFormat';
import { convertAssetsToVideoSources, getSubtitleAsset } from '../lib/video';
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

	if (!posterImageUrl) {
		return null;
	}

	return (
		<>
			<SelfHostedVideo
				atomId={element.id}
				fallbackImage={posterImageUrl}
				fallbackImageAlt={caption}
				fallbackImageAspectRatio="5:4"
				fallbackImageLoading="lazy"
				fallbackImageSize="small"
				height={400}
				linkTo="Article-embed-MediaAtomBlockElement"
				posterImage={posterImageUrl}
				sources={convertAssetsToVideoSources(element.assets)}
				subtitleSize="medium"
				subtitleSource={getSubtitleAsset(element.assets)}
				videoStyle="Loop"
				uniqueId={element.id}
				width={500}
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
