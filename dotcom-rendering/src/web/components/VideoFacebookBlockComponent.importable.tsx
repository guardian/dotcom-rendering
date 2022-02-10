import { css } from '@emotion/react';

import { Caption } from './Caption';
import { MaintainAspectRatio } from './MaintainAspectRatio';
import { decidePalette } from '../lib/decidePalette';
import { ClickToView } from './ClickToView';

type Props = {
	isMainMedia: boolean;
	isTracking: boolean;
	role?: RoleType;
	source?: string;
	sourceDomain?: string;
	format: ArticleFormat;
	embedUrl?: string;
	height: number;
	width: number;
	caption?: string;
	credit?: string;
	title?: string;
};

export const VideoFacebookBlockComponent = ({
	isMainMedia,
	isTracking,
	role,
	source,
	sourceDomain,
	embedUrl,
	caption,
	title,
	format,
	width,
	height,
	credit,
}: Props) => {
	// 812 is the full height on an iphone X. This ensures that the embed doesn't display any larger than the available viewport
	// Constrain iframe embeds with a width to their natural width
	// rather than stretch them to the container using
	// a max that would prevent portrait videos from being taller than an iphone X (baseline)
	// More context: https://github.com/guardian/frontend/pull/17902
	const maxHeight = 812;
	const aspectRatio = width / height;
	const maxWidth = maxHeight * aspectRatio;

	const embedContainer = css`
		max-width: ${maxWidth}px;
		width: 100%;
		margin-bottom: ${caption ? `0px` : `6px`};
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
			<div css={embedContainer}>
				<MaintainAspectRatio height={height} width={width}>
					<iframe
						src={embedUrl}
						title={title}
						height={height}
						width={width}
						allowFullScreen={true}
					/>
				</MaintainAspectRatio>
				{caption && (
					<Caption
						captionText={caption}
						format={format}
						palette={palette}
						credit={credit}
						mediaType="Video"
					/>
				)}
			</div>
		</ClickToView>
	);
};
