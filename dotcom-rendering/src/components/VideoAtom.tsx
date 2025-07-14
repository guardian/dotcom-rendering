import type { ArticleFormat } from '../lib/articleFormat';
import { Caption } from './Caption';
import { MaintainAspectRatio } from './MaintainAspectRatio';

type AssetType = {
	url: string;
	mimeType?: string;
};

interface Props {
	format: ArticleFormat;
	assets: AssetType[];
	isMainMedia: boolean;
	poster?: string;
	caption?: string;
	height?: number;
	width?: number;
}

export const VideoAtom = ({
	format,
	assets,
	isMainMedia,
	poster,
	caption,
	height = 259,
	width = 460,
}: Props) => {
	if (assets.length === 0) return null; // Handle empty assets array
	return (
		<>
			<MaintainAspectRatio
				height={height}
				width={width}
				data-spacefinder-role="inline"
			>
				{/* eslint-disable-next-line jsx-a11y/media-has-caption -- caption not available */}
				<video
					controls={true}
					preload="metadata"
					width={width}
					height={height}
					poster={poster}
				>
					{assets.map((asset, index) => (
						<source
							key={index}
							src={asset.url}
							type={asset.mimeType}
						/>
					))}
					<p>
						{`Your browser doesn't support HTML5 video. Here is a `}
						<a href={assets[0]?.url}>link to the video</a> instead.
					</p>
				</video>
			</MaintainAspectRatio>
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
