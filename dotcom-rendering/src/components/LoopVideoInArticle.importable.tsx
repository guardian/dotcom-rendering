import { LoopVideo } from './LoopVideo.importable';
import type { ArticleFormat } from '../lib/articleFormat';
import { Caption } from './Caption';
import type { Props as CardPictureProps } from './CardPicture';
import type { Source } from '../lib/video';

type LoopVideoInArticleProps = {
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
	sources: Source[];
	uniqueId: string;
	width: number;
};

export const LoopVideoInArticle = ({
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
	sources,
	uniqueId,
	width = 500,
}: LoopVideoInArticleProps) => {
	console.log('LVIAimp - atomId', atomId);
	return (
		<>
			<LoopVideo
				sources={sources}
				atomId={atomId}
				uniqueId={uniqueId}
				height={height}
				width={width}
				posterImage={posterImage}
				fallbackImage={fallbackImage}
				fallbackImageSize={fallbackImageSize}
				fallbackImageLoading={fallbackImageLoading}
				fallbackImageAlt={fallbackImageAlt}
				fallbackImageAspectRatio={fallbackImageAspectRatio}
				linkTo={linkTo}
			/>
			{!!caption && (
				<Caption
					captionText={caption}
					format={format}
					mediaType="Video"
					isMainMedia={isMainMedia}
				/>
			)}
		</>
	);
};
