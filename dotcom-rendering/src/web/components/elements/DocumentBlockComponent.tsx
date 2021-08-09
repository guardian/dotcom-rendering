import { css } from '@emotion/react';
import { LinkButton } from '@guardian/src-button';

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
		<div css={widthOverride}>
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
					priority="subdued"
					size="small"
					href={getDocumentCloudAssetUrl(embedUrl)}
					title={title}
					download={true}
				>
					Download original document
				</LinkButton>
			) : (
				<></>
			)}
		</div>
	);
};
