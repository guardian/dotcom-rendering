import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source/foundations';
import { Fragment } from 'react';
import { getSourceImageUrl } from '../lib/getSourceImageUrl_temp_fix';
import { palette } from '../palette';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import {
	generateSources,
	getFallbackSource,
	type ImageWidthType,
} from './Picture';

const picture = css`
	height: 100%;
	width: 100%;
	overflow: hidden;
	min-width: 60px;
`;

const round = css`
	border-radius: 100%;
	background-color: ${palette('--avatar-background')};
`;

const img = css`
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

/**
 * Used on `picture` and `img` to prevent having a line-height,
 * as these elements are which are `inline` by default.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#styling_with_css
 */
const block = css`
	display: block;
`;

/**
 * Defines the possible shapes for the Avatar component.
 * - 'cutout': The avatar has a flat bottom and no background fill.
 * - 'round': The avatar is a round cutout with a filled background.
 */
type AvatarShape = 'cutout' | 'round';

/**
 * Props for the Avatar component.
 *
 * @property {string} src - The source URL of the avatar image.
 * @property {string} alt - The alternative text for the avatar image.
 * @property {AvatarShape} [shape='round'] - Determines the avatar design shape.  The default is 'round'.
 */
type Props = {
	src: string;
	alt: string;
	shape?: AvatarShape;
	imageSize?: ImageSizeType;
};

const decideImageWidths = (
	imageSize: ImageSizeType,
): [ImageWidthType, ...ImageWidthType[]] => {
	switch (imageSize) {
		case 'small':
			return [{ breakpoint: breakpoints.mobile, width: 80 }];

		case 'medium':
		default:
			return [
				{ breakpoint: breakpoints.mobile, width: 80 },
				{ breakpoint: breakpoints.desktop, width: 90 },
			];

		case 'large':
			return [
				{ breakpoint: breakpoints.mobile, width: 150 },
				{ breakpoint: breakpoints.tablet, width: 130 },
				{ breakpoint: breakpoints.desktop, width: 150 },
			];

		case 'jumbo':
			return [
				{ breakpoint: breakpoints.mobile, width: 180 },
				{ breakpoint: breakpoints.tablet, width: 160 },
				{ breakpoint: breakpoints.desktop, width: 190 },
			];
	}
};

const defaultImageSizes: [ImageWidthType, ...ImageWidthType[]] = [
	{ breakpoint: breakpoints.mobile, width: 75 },
	{ breakpoint: breakpoints.tablet, width: 140 },
];

export const Avatar = ({ src, alt, shape = 'round', imageSize }: Props) => {
	const imageWidths = imageSize
		? decideImageWidths(imageSize)
		: defaultImageSizes;

	const sources = generateSources(getSourceImageUrl(src), imageWidths);

	/**
	 * The assumption here is readers on devices that do not support srcset
	 * are likely to be on poor network connections so we're going
	 * to fallback to the smallest image at low resolution.
	 *
	 * Sources are ordered in `descendingByBreakpoint` order,
	 * so the last one is the smallest.
	 */
	const fallbackSource = getFallbackSource(sources);

	return (
		<picture
			// data-size={imageSize}
			css={[block, picture, shape === 'round' && round]}
		>
			{sources.map((source) => {
				return (
					<Fragment key={source.breakpoint}>
						{/* High resolution (HDPI) sources*/}
						<source
							srcSet={source.hiResUrl}
							media={`(min-width: ${source.breakpoint}px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: ${source.breakpoint}px) and (min-resolution: 120dpi)`}
						/>
						{/* Low resolution (MDPI) source*/}
						<source
							srcSet={source.lowResUrl}
							media={`(min-width: ${source.breakpoint}px)`}
						/>
					</Fragment>
				);
			})}

			<img alt={alt} src={fallbackSource.lowResUrl} css={[block, img]} />
		</picture>
	);
};
