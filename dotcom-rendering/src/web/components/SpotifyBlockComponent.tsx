import { css } from '@emotion/react';
import { Caption } from '@root/src/web/components/Caption';
import { decidePalette } from '@root/src/web/lib/decidePalette';

export const SpotifyBlockComponent: React.FC<{
	embedUrl?: string;
	height?: number;
	width?: number;
	title?: string;
	format: ArticleFormat;
	caption?: string;
	credit?: string;
}> = ({ embedUrl, width, height, title, format, caption, credit }) => {
	const embedContainer = css`
		iframe {
			width: 100%;
		}
		margin-bottom: 16px;
	`;

	const palette = decidePalette(format);

	return (
		<>
			{embedUrl && title && width && height && (
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
			)}
		</>
	);
};
