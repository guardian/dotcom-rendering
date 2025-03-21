import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source/foundations';
import { getSourceImageUrl } from '../../lib/getSourceImageUrl_temp_fix';
import type { AspectRatio } from '../../types/front';
import { generateSources, getFallbackSource, Sources } from '../Picture';

type Props = {
	image: string;
	alt: string;
	height: number;
	width: number;
	aspectRatio?: AspectRatio;
};

export const YoutubeAtomPicture = ({
	image,
	alt,
	height,
	width,
	aspectRatio,
}: Props) => {
	const sources = generateSources(getSourceImageUrl(image), [
		{ breakpoint: breakpoints.mobile, width: 465, aspectRatio },
		{ breakpoint: breakpoints.mobileLandscape, width: 645, aspectRatio },
		{ breakpoint: breakpoints.phablet, width: 620, aspectRatio },
		{ breakpoint: breakpoints.tablet, width: 700, aspectRatio },
		{ breakpoint: breakpoints.desktop, width: 620, aspectRatio },
	]);
	const fallbackSource = getFallbackSource(sources);

	return (
		<picture itemProp="contentUrl">
			<Sources sources={sources} />

			<img
				alt={alt}
				src={fallbackSource.lowResUrl}
				height={height}
				width={width}
				// https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom
				// why did we add the css `vertical-align: middle;` to the img tag
				css={css`
					vertical-align: middle;
				`}
			/>
		</picture>
	);
};
