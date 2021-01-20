import React from 'react';
import { css } from 'emotion';
import { Caption } from '@root/src/web/components/Caption';
import { Display, Design } from '@guardian/types';

export const SpotifyBlockComponent: React.FC<{
	embedUrl?: string;
	height?: number;
	width?: number;
	title?: string;
	pillar: CAPIPillar;
	caption?: string;
	display: Display;
	design: Design;
	credit?: string;
}> = ({
	embedUrl,
	width,
	height,
	title,
	pillar,
	caption,
	display,
	design,
	credit,
}) => {
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
							design={design}
							pillar={pillar}
							display={display}
							credit={credit}
						/>
					)}
				</div>
			)}
		</>
	);
};
