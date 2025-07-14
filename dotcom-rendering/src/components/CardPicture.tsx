import { css } from '@emotion/react';
import { breakpoints, space, until } from '@guardian/source/foundations';
import type { ImgHTMLAttributes } from 'react';
import React from 'react';
import type { AspectRatio } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import type { ImageWidthType } from './Picture';
import { generateSources, getFallbackSource } from './Picture';

export type Loading = NonNullable<ImgHTMLAttributes<unknown>['loading']>;

export type Props = {
	imageSize: ImageSizeType;
	mainImage: string;
	loading: Loading;
	alt?: string;
	roundedCorners?: boolean;
	isCircular?: boolean;
	aspectRatio?: AspectRatio;
	mobileAspectRatio?: AspectRatio;
};

/**
 * **WIP – Some size may be unaccounted for**
 *
 * Currently, this only handles the five (5) image sizes of `ImageSizeType`.
 *
 * This method should cover all use cases with a lot more precision once
 * implemented thoroughly
 */
const decideImageWidths = (
	imageSize: ImageSizeType,
	aspectRatio: AspectRatio,
): [ImageWidthType, ...ImageWidthType[]] => {
	switch (imageSize) {
		// @TODO missing image size option
		// case 'tiny':
		// 	return [
		// 		{ breakpoint: breakpoints.mobile, width: 120 },
		// 		{ breakpoint: breakpoints.tablet, width: 130 },
		// 		{ breakpoint: breakpoints.desktop, width: 140 },
		// 	];

		case 'podcast':
			return [{ breakpoint: breakpoints.mobile, width: 80, aspectRatio }];

		case 'highlights-card':
			return [
				{ breakpoint: breakpoints.mobile, width: 112, aspectRatio },
			];

		case 'carousel':
			return [
				{ breakpoint: breakpoints.mobile, width: 220, aspectRatio },
			];

		case 'small':
			return [
				{ breakpoint: breakpoints.mobile, width: 120, aspectRatio },
				{ breakpoint: breakpoints.tablet, width: 160, aspectRatio },
				{ breakpoint: breakpoints.desktop, width: 220, aspectRatio },
			];

		case 'medium':
			return [
				{ breakpoint: breakpoints.mobile, width: 465, aspectRatio },
				{ breakpoint: breakpoints.tablet, width: 330, aspectRatio },
				{ breakpoint: breakpoints.desktop, width: 460, aspectRatio },
			];

		case 'large':
			return [
				{ breakpoint: breakpoints.mobile, width: 465, aspectRatio },
				{
					breakpoint: breakpoints.mobileLandscape,
					width: 480,
					aspectRatio,
				},
				{ breakpoint: breakpoints.tablet, width: 500, aspectRatio },
				{ breakpoint: breakpoints.desktop, width: 700, aspectRatio },
			];

		case 'jumbo':
			return [
				{ breakpoint: breakpoints.mobile, width: 465, aspectRatio },
				{
					breakpoint: breakpoints.mobileLandscape,
					width: 480,
					aspectRatio,
				},
				{ breakpoint: breakpoints.tablet, width: 680, aspectRatio },
				{ breakpoint: breakpoints.desktop, width: 940, aspectRatio },
			];

		case 'feature':
			return [
				{ breakpoint: breakpoints.mobile, width: 465, aspectRatio },
				{ breakpoint: breakpoints.tablet, width: 220, aspectRatio },
				{ breakpoint: breakpoints.desktop, width: 300, aspectRatio },
			];
		case 'feature-large':
			return [
				{ breakpoint: breakpoints.mobile, width: 465, aspectRatio },
				{ breakpoint: breakpoints.tablet, width: 340, aspectRatio },
				{ breakpoint: breakpoints.desktop, width: 460, aspectRatio },
			];
		case 'feature-immersive':
			return [
				{
					breakpoint: breakpoints.mobile,
					width: 465,
					aspectRatio: '4:5',
				},
				{
					breakpoint: breakpoints.tablet,
					width: 700,
					aspectRatio: '5:3',
					cropOffset: { x: 50, y: 0 },
				},
				{
					breakpoint: breakpoints.desktop,
					width: 940,
					aspectRatio: '5:3',
					cropOffset: { x: 50, y: 0 },
				},
			];
	}
};

/**
 * Used on `picture` and `img` to prevent having a line-height,
 * as these elements are which are `inline` by default.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#styling_with_css
 *
 */
const block = css`
	display: block;
`;

const getAspectRatioPadding = (aspectRatio?: AspectRatio): string => {
	switch (aspectRatio) {
		case '5:4':
			return '80%';
		case '4:5':
			return '125%';
		case '1:1':
			return '100%';
		case '5:3':
		default:
			return '60%';
	}
};
/**
 * On fronts, Fairground cards have an image ration of 5:4.
 * This is due to replace the existing card ratio of 5:3
 * For now, we are keeping both ratios.
 */
const decideAspectRatioStyles = (aspectRatio?: AspectRatio) => {
	const paddingRatio = getAspectRatioPadding(aspectRatio);
	return css`
		padding-top: ${paddingRatio};
		position: relative;
		& > * {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	`;
};

const borderRadius = css`
	& > * {
		border-radius: ${space[2]}px;
	}
`;

const circularStyles = css`
	border-radius: 100%;
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

const decideMobileAspectRatioStyles = (aspectRatio?: AspectRatio) => {
	const paddingRatio = getAspectRatioPadding(aspectRatio);
	return css`
		${until.tablet} {
			padding-top: ${paddingRatio};
		}
	`;
};

export const CardPicture = ({
	mainImage,
	alt,
	imageSize,
	loading,
	roundedCorners,
	isCircular,
	aspectRatio = '5:3',
	mobileAspectRatio,
}: Props) => {
	if (mainImage === '') {
		return null;
	}
	const sources = generateSources(
		mainImage,
		decideImageWidths(imageSize, aspectRatio),
	);

	const fallbackSource = getFallbackSource(sources);

	return (
		<picture
			data-size={imageSize}
			css={[
				block,
				decideAspectRatioStyles(aspectRatio),
				mobileAspectRatio &&
					decideMobileAspectRatioStyles(mobileAspectRatio),
				roundedCorners && borderRadius,
				isCircular && circularStyles,
			]}
		>
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

			<img
				alt={alt ?? ''}
				src={fallbackSource.lowResUrl}
				css={[block, isCircular && circularStyles]}
				loading={loading}
				data-chromatic="ignore"
			/>
		</picture>
	);
};
