import React from 'react';
import { css } from 'emotion';

const widthOverride = css`
	iframe {
		min-width: 300px !important;
		max-width: 100%;
	}
`;

export const DocumentBlockComponent: React.FC<{
	embedUrl?: string;
	height: number;
	width: number;
	title?: string;
}> = ({ embedUrl, title, width, height }) => {
	return (
		<div className={widthOverride}>
			<iframe
				src={embedUrl}
				title={title}
				height={height}
				width={width}
				allowFullScreen={true}
				data-cy="document-embed"
			/>
		</div>
	);
};
