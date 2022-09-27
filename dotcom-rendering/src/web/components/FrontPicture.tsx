import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source-foundations';
import React from 'react';
import type { ImageWidthType } from './Picture';
import { descendingByBreakpoint, generateImageURL } from './Picture';

type Props = {
	master: string;
	alt: string;
};

/**
 * WIP: this should cover all use cases with a lot more precision
 */
const decideImageWidths = (): ImageWidthType[] => {
	return [
		{ breakpoint: breakpoints.mobile, width: 240 },
		{ breakpoint: breakpoints.tablet, width: 460 },
	];
};

/**
 * Used on `picture` and `img` to prevent having a line-height,
 * as these elements are which are `inline` by default.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#styling_with_css
 */
const block = css`
	display: block;
`;

/** On fronts, all images are 5:3 */
const aspectRatio = css`
	padding-top: ${(3 / 5) * 100}%;
	position: relative;

	& > * {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

export const FrontPicture = ({ master, alt }: Props) => {
	const imageWidths = decideImageWidths();
	const sources = imageWidths
		.slice()
		.sort(descendingByBreakpoint)
		.map(({ width: imageWidth, breakpoint }) => {
			return {
				breakpoint,
				width: imageWidth,
				hiResUrl: generateImageURL({
					master,
					imageWidth,
					resolution: 'high',
				}),
				lowResUrl: generateImageURL({
					master,
					imageWidth,
					resolution: 'low',
				}),
			};
		});

	/**
	 * The assumption here is readers on devices that do not support srcset
	 * are likely to be on poor network connections so we're going
	 * to fallback to the smallest image at low resolution.
	 *
	 * Sources are ordered in `descendingByBreakpoint` order,
	 * so the last one is the smallest.
	 */
	const [{ lowResUrl: fallbackSource }] = sources.slice(-1);

	return (
		<picture css={[block, aspectRatio]}>
			{sources.map((source) => {
				return (
					<React.Fragment key={source.breakpoint}>
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
					</React.Fragment>
				);
			})}

			<img alt={alt} src={fallbackSource} css={block} />
		</picture>
	);
};

// We use disableLazyLoading to decide if we want to turn off lazy loading of images site wide. We use this
// to prevent false negatives on Chromatic snapshots (see /.storybook/config)
FrontPicture.disableLazyLoading = false;
