import React from 'react';
import { css } from 'emotion';
import { LinkButton } from '@guardian/src-button';
import { SvgPlus } from '@guardian/src-icons';

const widthOverride = css`
	iframe {
		min-width: 300px !important;
		max-width: 100%;
	}
`;

export const getDocumentCloudAssetUrl = (
	embedUrl?: string,
): string | undefined => {
	return (
		embedUrl &&
		embedUrl.replace(
			new RegExp(
				'https://embed.documentcloud.org/documents/([0-9]+)-([^/]+).*',
				'g',
			),
			'https://assets.documentcloud.org/documents/$1/$2.pdf',
		)
	);
};

export const DocumentBlockComponent: React.FC<{
	embedUrl?: string;
	height: number;
	width: number;
	title?: string;
	source?: string;
}> = ({ embedUrl, title, width, height, source }) => {
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
			{source === 'DocumentCloud' ? (
				<LinkButton
					priority="tertiary"
					size="small"
					href={getDocumentCloudAssetUrl(embedUrl)}
					target="_self"
					title={title}
					icon={<SvgPlus />}
				>
					View on DocumentCloud
				</LinkButton>
			) : (
				<></>
			)}
		</div>
	);
};
