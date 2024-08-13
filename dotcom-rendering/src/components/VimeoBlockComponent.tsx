import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { Caption } from './Caption';

const responsiveAspectRatio = (height: number, width: number) => css`
	/* https://css-tricks.com/aspect-ratio-boxes/ */
	padding-bottom: ${(height / width) * 100}%;
	position: relative;
	iframe {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
`;

type Props = {
	format: ArticleFormat;
	embedUrl?: string;
	height: number;
	width: number;
	caption?: string;
	credit?: string;
	title?: string;
	isMainMedia: boolean;
};

export const VimeoBlockComponent = ({
	embedUrl,
	caption,
	title,
	format,
	width,
	height,
	credit,
	isMainMedia,
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

	return (
		<div css={embedContainer}>
			<div css={responsiveAspectRatio(height, width)}>
				<iframe
					src={embedUrl}
					title={title}
					height={height}
					width={width}
					allowFullScreen={true}
				/>
			</div>
			{!!caption && (
				<Caption
					captionText={caption}
					format={format}
					credit={credit}
					mediaType="Video"
					isMainMedia={isMainMedia}
				/>
			)}
		</div>
	);
};
