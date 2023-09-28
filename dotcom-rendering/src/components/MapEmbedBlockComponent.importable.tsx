import { css } from '@emotion/react';
import type { RoleType } from '../types/content';
import { Caption } from './Caption';
import { ClickToView } from './ClickToView';
import { MaintainAspectRatio } from './MaintainAspectRatio';

type Props = {
	embedUrl?: string;
	height: number;
	width: number;
	title?: string;
	caption?: string;
	format: ArticleFormat;
	credit?: string;
	role?: RoleType;
	isTracking: boolean;
	isMainMedia: boolean;
	source?: string;
	sourceDomain?: string;
};

export const MapEmbedBlockComponent = ({
	embedUrl,
	title,
	width,
	height,
	caption,
	format,
	credit,
	role,
	isTracking,
	isMainMedia,
	source,
	sourceDomain,
}: Props) => {
	// 812 is the full height on an iphone X. This ensures that the embed doesn't display any larger than the available viewport
	// Constrain iframe embeds with a width to their natural width
	// rather than stretch them to the container using
	// a max that would prevent portrait videos from being taller than an iphone X (baseline)
	// More context: https://github.com/guardian/frontend/pull/17902
	const maxHeight = 812;
	const aspectRatio = width / height;
	const maxWidth = maxHeight * aspectRatio;

	const hasCaption = caption != null;

	const embedContainer = css`
		max-width: ${maxWidth}px;
		width: 100%;
		margin-bottom: ${hasCaption ? `0px` : `6px`};
	`;

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
				{hasCaption && (
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
