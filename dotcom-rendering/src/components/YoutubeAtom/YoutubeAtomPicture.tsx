import { css } from '@emotion/react';
import { breakpoints } from '@guardian/source/foundations';
import { getSourceImageUrl } from '../../lib/getSourceImageUrl_temp_fix';
import type { AspectRatio } from '../../types/front';
import {
	generateSources,
	getFallbackSource,
	type ImageWidthType,
	Sources,
} from '../Picture';

type Props = {
	image: string;
	alt: string;
	height: number;
	width: number;
	aspectRatio?: AspectRatio;
	mobileAspectRatio?: AspectRatio;
	isImmersive?: boolean;
	isHosted?: boolean;
};

export const YoutubeAtomPicture = ({
	image,
	alt,
	height,
	width,
	aspectRatio,
	mobileAspectRatio,
	isImmersive = false,
	isHosted = false,
}: Props) => {
	const mobileAspect = mobileAspectRatio ?? aspectRatio;
	const imageWidths: [ImageWidthType, ...ImageWidthType[]] = isHosted
		? [
				{
					breakpoint: breakpoints.mobile,
					width: breakpoints.mobileLandscape,
					aspectRatio: mobileAspect,
				},
				{
					breakpoint: breakpoints.mobileLandscape,
					width: breakpoints.phablet,
					aspectRatio: mobileAspect,
				},
				{
					breakpoint: breakpoints.phablet,
					width: breakpoints.tablet,
					aspectRatio: mobileAspect,
				},
				{
					breakpoint: breakpoints.tablet,
					width: breakpoints.desktop,
					aspectRatio,
				},
				{
					breakpoint: breakpoints.desktop,
					width: breakpoints.leftCol,
					aspectRatio,
				},
			]
		: [
				{
					breakpoint: breakpoints.mobile,
					width: 465,
					aspectRatio: mobileAspect,
				},
				{
					breakpoint: breakpoints.mobileLandscape,
					width: 645,
					aspectRatio: mobileAspect,
				},
				{
					breakpoint: breakpoints.phablet,
					width: 620,
					aspectRatio: mobileAspect,
				},
				{
					breakpoint: breakpoints.tablet,
					width: 700,
					aspectRatio,
					cropOffset: isImmersive ? { x: 50, y: 0 } : undefined,
				},
				{
					breakpoint: breakpoints.desktop,
					width: 620,
					aspectRatio,
					cropOffset: isImmersive ? { x: 50, y: 0 } : undefined,
				},
			];
	const sources = generateSources(getSourceImageUrl(image), [...imageWidths]);
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
					object-fit: cover;
					vertical-align: middle;
				`}
			/>
		</picture>
	);
};
