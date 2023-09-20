import { css } from '@emotion/react';
import { LinkButton } from '@guardian/source-react-components';
import type { RoleType } from '../types/content';
import { ClickToView } from './ClickToView';

const widthOverride = css`
	iframe {
		/* stylelint-disable-next-line declaration-no-important */
		min-width: 300px !important;
		max-width: 100%;
	}
`;

export const getDocumentCloudAssetUrl = (
	embedUrl?: string,
): string | undefined => {
	return embedUrl?.replace(
		new RegExp(
			'https://embed.documentcloud.org/documents/([0-9]+)-([^/]+).*',
			'g',
		),
		'https://assets.documentcloud.org/documents/$1/$2.pdf',
	);
};

type Props = {
	embedUrl?: string;
	height?: number;
	isMainMedia: boolean;
	isTracking: boolean;
	role?: RoleType;
	source?: string;
	sourceDomain?: string;
	title?: string;
	width?: number;
};

export const DocumentBlockComponent = ({
	embedUrl,
	height,
	isMainMedia,
	isTracking,
	role,
	source,
	sourceDomain,
	title,
	width,
}: Props) => {
	return (
		<ClickToView
			role={role}
			isTracking={isTracking}
			isMainMedia={isMainMedia}
			source={source}
			sourceDomain={sourceDomain}
		>
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
		</ClickToView>
	);
};
