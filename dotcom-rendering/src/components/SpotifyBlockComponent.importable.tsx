import { css } from '@emotion/react';
import type { RoleType } from '../types/content';
import { Caption } from './Caption';
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
	if (!embedUrl || !title || width === undefined || height === undefined)
		return null;

	const embedContainer = css`
		iframe {
			width: 100%;
		}
		margin-bottom: 16px;
	`;

	return (
		<ClickToView
			role={role}
			isTracking={isTracking}
			isMainMedia={isMainMedia}
			source={source}
			sourceDomain={sourceDomain}
		>
			<div css={embedContainer} data-testid="spotify-embed">
				<iframe
					src={embedUrl}
					title={title}
					height={height}
					width={width}
					allowFullScreen={true}
				/>
				{!!caption && (
					<Caption
						captionText={caption}
						format={format}
						credit={credit}
						isMainMedia={isMainMedia}
					/>
				)}
			</div>
		</ClickToView>
	);
};
