import type { ArticleFormat } from '../lib/articleFormat';
import { Caption } from './Caption';
import { MaintainAspectRatio } from './MaintainAspectRatio';

type AssetType = {
	url: string;
	mimeType?: string;
};

interface Props {
	assets: AssetType[];
	format: ArticleFormat;
	caption?: string;
	poster?: string;
	height?: number;
	width?: number;
	isMainMedia?: boolean;
}

export const VideoAtom = ({
	assets,
	poster,
	height = 259,
	width = 460,
	format,
	caption,
	isMainMedia,
}: Props) => {
	if (assets.length === 0) return null; // Handle empty assets array
	return (
		<div>
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
					{assets.map((asset) => (
						<source
							key={asset.url}
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
					displayCredit={false}
					mediaType="Video"
					isMainMedia={isMainMedia}
				/>
			)}
		</div>
	);
};
