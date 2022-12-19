import { css } from '@emotion/react';
import { Fragment } from 'react';
import type { DCRContainerPalette } from '../../types/front';
import type { Palette } from '../../types/palette';
import { decidePalette } from '../lib/decidePalette';
import { getSourceImageUrl } from '../lib/getSourceImageUrl_temp_fix';
import { generateSources, getFallbackSource } from './Picture';

const picture = css`
	border-radius: 100%;
	height: 100%;
	width: 100%;
	overflow: hidden;
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

const backgroundStyles = (palette: Palette) =>
	css`
		background-color: ${palette.background.avatar};
	`;

type Props = {
	src: string;
	alt: string;
	format: ArticleFormat;
	containerPalette?: DCRContainerPalette;
};

export const Avatar = ({ src, alt, format, containerPalette }: Props) => {
	const palette = decidePalette(format, containerPalette);
	const sources = generateSources(getSourceImageUrl(src), [
		{ breakpoint: 320, width: 75 },
		{ breakpoint: 740, width: 140 },
	]);

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
			css={[block, picture, backgroundStyles(palette)]}
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
