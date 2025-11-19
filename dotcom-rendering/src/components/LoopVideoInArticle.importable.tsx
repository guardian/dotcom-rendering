import type { ArticleFormat } from '../lib/articleFormat';
import type { Source } from '../lib/video';
import type { VideoAssets } from '../types/content';
import { Caption } from './Caption';
import type { Props as CardPictureProps } from './CardPicture';
import { LoopVideo } from './LoopVideo.importable';
import type { SubtitleSize } from './LoopVideoPlayer';

type LoopVideoInArticleProps = {
	assets: VideoAssets[];
	atomId: string;
	caption?: string;
	fallbackImage: CardPictureProps['mainImage'];
	fallbackImageAlt: CardPictureProps['alt'];
	fallbackImageAspectRatio: CardPictureProps['aspectRatio'];
	fallbackImageLoading: CardPictureProps['loading'];
	fallbackImageSize: CardPictureProps['imageSize'];
	format: ArticleFormat;
	height: number;
	isMainMedia: boolean;
	linkTo: string;
	posterImage: string;
	uniqueId: string;
	width: number;
	subtitleSource?: string;
	subtitleSize?: string;
};

// The looping video player types its `sources` attribute as `Sources`
// However, looping videos in articles are delivered as media atoms, which type their `assets` as `VideoAssets`
// Which means that we need to alter the shape of the incoming `assets` to match the requirements of the outgoing `sources`
const convertAssetsToSources = (assets: VideoAssets[]): Source[] => {
	return assets.map((asset) => {
		return {
			src: asset.url ?? '',
			mimeType: 'video/mp4',
		};
	});
};

const convertSubtitleSize = (val?: string): SubtitleSize => {
	if (val == null) {
		return 'small' as SubtitleSize;
	}
	if (['small', 'medium', 'large'].includes(val)) {
		return val as SubtitleSize;
	}
	return 'small' as SubtitleSize;
};

export const LoopVideoInArticle = ({
	assets,
	atomId,
	caption,
	fallbackImage,
	fallbackImageAlt,
	fallbackImageAspectRatio,
	fallbackImageLoading,
	fallbackImageSize,
	format,
	height = 400,
	isMainMedia,
	linkTo,
	posterImage,
	subtitleSize,
	subtitleSource,
	uniqueId,
	width = 500,
}: LoopVideoInArticleProps) => {
	return (
		<>
			<LoopVideo
				atomId={atomId}
				fallbackImage={fallbackImage}
				fallbackImageAlt={fallbackImageAlt}
				fallbackImageAspectRatio={fallbackImageAspectRatio}
				fallbackImageLoading={fallbackImageLoading}
				fallbackImageSize={fallbackImageSize}
				height={height}
				linkTo={linkTo}
				posterImage={posterImage}
				sources={convertAssetsToSources(assets)}
				subtitleSize={convertSubtitleSize(subtitleSize)}
				subtitleSource={subtitleSource}
				uniqueId={uniqueId}
				width={width}
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
