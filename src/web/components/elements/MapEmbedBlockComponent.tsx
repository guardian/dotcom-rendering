import { css } from '@emotion/react';

import { MaintainAspectRatio } from '@frontend/web/components/MaintainAspectRatio';
import { Caption } from '@root/src/web/components/Caption';

export const MapEmbedBlockComponent: React.FC<{
	embedUrl?: string;
	height: number;
	width: number;
	title?: string;
	caption?: string;
	format: Format;
	palette: Palette;
	credit?: string;
}> = ({ embedUrl, title, width, height, caption, format, palette, credit }) => {
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
					palette={palette}
					credit={credit}
				/>
			)}
		</div>
	);
};
