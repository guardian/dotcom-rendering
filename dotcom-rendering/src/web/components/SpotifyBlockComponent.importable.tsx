import { css } from '@emotion/react';
import { Caption } from './Caption';
import { decidePalette } from '../lib/decidePalette';
import { ClickToView } from './ClickToView';

/**
 * Example article
 * https://www.theguardian.com/music/2020/jun/15/pet-shop-boys-where-to-start-in-their-back-catalogue
 */

type Props = {
	embedUrl?: string;
	height?: number;
	width?: number;
	title?: string;
	format: ArticleFormat;
	caption?: string;
	credit?: string;
	role?: RoleType;
	isTracking: boolean;
	isMainMedia: boolean;
	source?: string;
	sourceDomain?: string;
};

export const SpotifyBlockComponent = ({
	embedUrl,
	width,
	height,
	title,
	format,
	caption,
	credit,
	role,
	isTracking,
	isMainMedia,
	source,
	sourceDomain,
}: Props) => {
	if (!embedUrl || !title || !width || !height) return null;

	const embedContainer = css`
		iframe {
			width: 100%;
		}
		margin-bottom: 16px;
	`;

	const palette = decidePalette(format);

	return (
		<ClickToView
			role={role}
			isTracking={isTracking}
			isMainMedia={isMainMedia}
			source={source}
			sourceDomain={sourceDomain}
		>
			<div css={embedContainer} data-cy="spotify-embed">
				<iframe
					src={embedUrl}
					title={title}
					height={height}
					width={width}
					allowFullScreen={true}
				/>
				{caption && (
					<Caption
						captionText={caption}
						format={format}
						palette={palette}
						credit={credit}
					/>
				)}
			</div>
		</ClickToView>
	);
};
