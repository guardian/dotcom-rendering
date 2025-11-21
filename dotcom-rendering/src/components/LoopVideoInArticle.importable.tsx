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

const getSubtitleAsset = (assets: VideoAssets[]) => {
	// Get the first subtitle asset from assets with a mimetype of 'text/vtt'

	const candidate = assets.find((asset) => asset.mimeType === 'text/vtt');
	return candidate?.url;
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
				subtitleSize={'small' as SubtitleSize}
				subtitleSource={getSubtitleAsset(assets)}
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
