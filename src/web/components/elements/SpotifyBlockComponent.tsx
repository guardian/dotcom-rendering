import React from 'react';
import { css } from 'emotion';
import { Caption } from '@root/src/web/components/Caption';

export const SpotifyBlockComponent: React.FC<{
	embedUrl?: string;
	height?: number;
	width?: number;
	title?: string;
	format: Format;
	palette: Palette;
	caption?: string;
	credit?: string;
}> = ({ embedUrl, width, height, title, format, palette, caption, credit }) => {
	const embedContainer = css`
		iframe {
			width: 100%;
		}
		margin-bottom: 16px;
	`;

	return (
		<>
			{embedUrl && title && width && height && (
				<div className={embedContainer} data-cy="spotify-embed">
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
