import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { generateImageURL } from '../lib/image';
import type { RoleType } from '../types/content';

/**
 * Working on this file? Checkout out 027-pictures.md & 029-signing-image-urls.md for background information & context
 **/

export type Orientation = 'portrait' | 'landscape';

type Props = {
	role: RoleType;
	format: ArticleFormat;
	master: string;
	alt: string;
	height: number;
	width: number;
	isMainMedia?: boolean;
	isLazy?: boolean;
	isLightbox?: boolean;
	orientation?: Orientation;
	onLoad?: () => void;
};

export type ImageWidthType = { breakpoint: number; width: number };

/**
 * All business logic for image sizing is contained in this one function. This
 * is the source of truth.
 *
 * Based on image role, if it's main media or not, if we're in a lightbox or not
 * and the format of the article it is in, this function decides the width the
 * image should have at different breakpoints.
 *
 * Previously, this logic was set [in this Frontend file](https://github.com/guardian/frontend/blob/oliver/immersives-for-all/common/app/layout/ContentWidths.scala)
 *
 * Order is not important because the resulting array is sorted by breakpoint
 * prior to use.
 *
 */
const decideImageWidths = ({
	role,
	isMainMedia,
	format,
	isLightbox,
	orientation,
}: {
	role: RoleType;
	isMainMedia?: boolean;
	format: ArticleFormat;
	isLightbox: boolean;
	orientation: Orientation;
}): [ImageWidthType, ...ImageWidthType[]] => {
	if (isLightbox) {
		switch (orientation) {
			case 'portrait':
				return [
					{ breakpoint: breakpoints.mobile, width: 480 },
					{ breakpoint: breakpoints.mobileLandscape, width: 480 },
					{ breakpoint: breakpoints.phablet, width: 480 },
					{ breakpoint: breakpoints.tablet, width: 660 },
					{ breakpoint: breakpoints.desktop, width: 740 },
					{ breakpoint: breakpoints.leftCol, width: 980 },
					{ breakpoint: breakpoints.wide, width: 1140 },
				];

			case 'landscape':
			default:
				return [
					{ breakpoint: breakpoints.mobile, width: 480 },
					{ breakpoint: breakpoints.mobileLandscape, width: 660 },
					{ breakpoint: breakpoints.phablet, width: 740 },
					{ breakpoint: breakpoints.tablet, width: 980 },
					{ breakpoint: breakpoints.desktop, width: 1140 },
					{ breakpoint: breakpoints.leftCol, width: 1300 },
					{ breakpoint: breakpoints.wide, width: 1900 },
				];
		}
	}
	if (format.design === ArticleDesign.Picture) {
		// the order is important here. Picture content type images come through as main media, so needs to appear
		// above `isMainMedia`, so the images do not appear low quality.
		return [
			{ breakpoint: breakpoints.mobile, width: 480 },
			{ breakpoint: breakpoints.mobileLandscape, width: 660 },
			{ breakpoint: breakpoints.phablet, width: 740 },
			{ breakpoint: breakpoints.tablet, width: 980 },
			{ breakpoint: breakpoints.desktop, width: 1140 },
			{ breakpoint: breakpoints.leftCol, width: 1300 },
			{ breakpoint: breakpoints.wide, width: 1900 },
		];
	}
	if (isMainMedia) {
		switch (format.display) {
			case ArticleDisplay.Immersive: {
				// If display is Immersive then main media should *always*
				// use these larger image sources
				return [
					{ breakpoint: breakpoints.mobile, width: 480 },
					{ breakpoint: breakpoints.mobileLandscape, width: 660 },
					{ breakpoint: breakpoints.phablet, width: 740 },
					{ breakpoint: breakpoints.tablet, width: 980 },
					{ breakpoint: breakpoints.desktop, width: 1140 },
					{ breakpoint: breakpoints.leftCol, width: 1300 },
					{ breakpoint: breakpoints.wide, width: 1900 },
				];
			}
			case ArticleDisplay.Showcase:
			case ArticleDisplay.NumberedList: {
				if (format.design === ArticleDesign.Feature) {
					// The main image on feature articles gets larger sources when showcase
					// e.g.: http://www.theguardian.com/politics/2015/may/02/nicola-sturgeon-im-the-boss-now
					return [
						{ breakpoint: breakpoints.mobile, width: 465 },
						{ breakpoint: breakpoints.mobileLandscape, width: 645 },
						{ breakpoint: breakpoints.phablet, width: 725 },
						{ breakpoint: breakpoints.tablet, width: 965 },
						{ breakpoint: breakpoints.desktop, width: 1125 },
						{ breakpoint: breakpoints.leftCol, width: 1140 },
						{ breakpoint: breakpoints.wide, width: 1300 },
					];
				} else {
					return [
						{ breakpoint: breakpoints.mobile, width: 465 },
						{ breakpoint: breakpoints.mobileLandscape, width: 645 },
						{ breakpoint: breakpoints.phablet, width: 660 },
						{ breakpoint: breakpoints.tablet, width: 700 }, // desktop is also 700px
						{ breakpoint: breakpoints.leftCol, width: 940 },
						{ breakpoint: breakpoints.wide, width: 1020 },
					];
				}
			}
			default:
				return [
					{ breakpoint: breakpoints.mobile, width: 465 },
					{ breakpoint: breakpoints.mobileLandscape, width: 645 },
					{ breakpoint: breakpoints.phablet, width: 620 },
					{ breakpoint: breakpoints.tablet, width: 700 },
					{ breakpoint: breakpoints.desktop, width: 620 },
				];
		}
	} else if (
		format.design === ArticleDesign.LiveBlog ||
		format.design === ArticleDesign.DeadBlog
	) {
		switch (role) {
			case 'thumbnail':
				return [
					{ breakpoint: breakpoints.mobile, width: 120 }, // mobileLandscape and tablet are also 120px
					{ breakpoint: breakpoints.tablet, width: 140 }, // desktop, leftCol and wide are also 140px
				];
			case 'showcase':
			case 'immersive':
			case 'supporting':
			case 'halfWidth':
				return [{ breakpoint: breakpoints.mobile, width: 445 }];
			case 'inline':
			default:
				return [
					{ breakpoint: breakpoints.mobile, width: 465 },
					{ breakpoint: breakpoints.phablet, width: 700 },
				];
		}
	} else {
		switch (role) {
			case 'showcase':
				return [
					{ breakpoint: breakpoints.mobile, width: 445 },
					{ breakpoint: breakpoints.mobileLandscape, width: 605 },
					{ breakpoint: breakpoints.phablet, width: 620 }, // tablet is also 620px
					{ breakpoint: breakpoints.desktop, width: 640 },
					{ breakpoint: breakpoints.leftCol, width: 800 },
					{ breakpoint: breakpoints.wide, width: 880 },
				];
			case 'supporting':
				return [
					{ breakpoint: breakpoints.mobile, width: 445 },
					{ breakpoint: breakpoints.mobileLandscape, width: 605 },
					{ breakpoint: breakpoints.phablet, width: 620 }, // tablet is also 620px
					{ breakpoint: breakpoints.desktop, width: 300 }, // leftCol is also 300px
					{ breakpoint: breakpoints.wide, width: 380 },
				];
			case 'thumbnail':
				return [
					{ breakpoint: breakpoints.mobile, width: 120 }, // mobileLandscape and tablet are also 120px
					{ breakpoint: breakpoints.tablet, width: 140 }, // desktop, leftCol and wide are also 140px
				];
			case 'immersive':
				return [
					{ breakpoint: breakpoints.mobile, width: 465 },
					{ breakpoint: breakpoints.mobileLandscape, width: 645 },
					{ breakpoint: breakpoints.phablet, width: 725 },
					{ breakpoint: breakpoints.tablet, width: 965 },
					{ breakpoint: breakpoints.desktop, width: 1125 },
					{ breakpoint: breakpoints.leftCol, width: 1140 },
					{ breakpoint: breakpoints.wide, width: 1300 },
				];
			case 'halfWidth':
				return [{ breakpoint: breakpoints.mobile, width: 445 }];
			case 'inline':
			default:
				return [
					{ breakpoint: breakpoints.mobile, width: 445 },
					{ breakpoint: breakpoints.mobileLandscape, width: 605 },
					{ breakpoint: breakpoints.phablet, width: 620 },
				];
		}
	}
};

const descendingByBreakpoint = (a: ImageWidthType, b: ImageWidthType) => {
	// We need to list the largest images first as browsers read top down and stop
	// as soon as they hit a matching media query
	return b.breakpoint - a.breakpoint;
};

/**
 * Used on `picture` and `img` to prevent them having a line-height,
 * as these are `inline` by default and only inline elements can have
 * line-height.
 *
 * We use flex for lightbox images because this ensures space is
 * reserved for the image as it loads
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#styling_with_css
 */
const block = css`
	display: block;
`;
const flex = css`
	display: flex;
`;

type ImageSource = {
	breakpoint: number;
	width: number;
	hiResUrl: string;
	lowResUrl: string;
};

/**
 * Generate image sources for an image.
 *
 * @param mainImage source image URL
 * @param imageWidths list of image widths
 */
export const generateSources = (
	mainImage: string,
	imageWidths: readonly [ImageWidthType, ...ImageWidthType[]],
): ImageSource[] =>
	imageWidths
		.slice()
		.sort(descendingByBreakpoint)
		.map(({ width: imageWidth, breakpoint }) => {
			return {
				breakpoint,
				width: imageWidth,
				hiResUrl: generateImageURL({
					mainImage,
					imageWidth,
					resolution: 'high',
				}),
				lowResUrl: generateImageURL({
					mainImage,
					imageWidth,
					resolution: 'low',
				}),
			};
		});

/**
 * The assumption here is readers on devices that do not support srcset
 * are likely to be on poor network connections so we're going
 * to fallback to the smallest image.
 *
 * Sources are ordered in `descendingByBreakpoint` order,
 * so the last one is the smallest.
 */
export const getFallbackSource = (sources: ImageSource[]): ImageSource => {
	const [fallback] = sources.slice(-1);
	if (!fallback) throw new Error('No fallback images found');
	return fallback;
};

export const Sources = ({ sources }: { sources: ImageSource[] }) => {
	return (
		<>
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
		</>
	);
};

export const Picture = ({
	role,
	format,
	master,
	alt,
	height,
	width,
	isMainMedia = false,
	isLazy = true,
	isLightbox = false,
	orientation = 'landscape',
	onLoad,
}: Props) => {
	const [loaded, setLoaded] = useState(false);
	const ref = useCallback((node: HTMLImageElement) => {
		if (node.complete) {
			setLoaded(true);
		} else {
			node.addEventListener('load', () => setLoaded(true));
		}
	}, []);

	useEffect(() => {
		if (loaded && onLoad) onLoad();
	}, [loaded, onLoad]);

	const sources = generateSources(
		master,
		decideImageWidths({
			role,
			format,
			isMainMedia,
			isLightbox,
			orientation,
		}),
	);

	/** portrait if higher than 1 or landscape if lower than 1 */
	const ratio = height / width;

	/**
	 * Immersive MainMedia elements fill the height of the viewport, meaning on mobile
	 * devices even though the viewport width is small, we'll need a larger image to
	 * maintain quality. To solve this problem we're using the viewport height (vh) to
	 * calculate width on portrait devices.

	 * If either of these media queries match then the browser will choose an image from the
	 * list of sources in srcset based on the viewport list. If the media query doesn't match
	 * it continues checking using the standard sources underneath
	 */
	const sizes =
		ratio >= 1
			? // portrait or square
			  '100vw'
			: // landscape
			  `${Math.round(100 / ratio)}vh`;

	const fallbackSource = getFallbackSource(sources);

	return (
		<picture css={isLightbox ? flex : block}>
			{/* Immersive Main Media images get additional sources specifically for when in portrait orientation */}
			{format.display === ArticleDisplay.Immersive && isMainMedia && (
				<>
					{/* High resolution (HDPI) portrait sources*/}
					<source
						media="(orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.25), (orientation: portrait) and (min-resolution: 120dpi)"
						sizes={sizes}
						srcSet={sources
							.map(
								(source) =>
									`${source.hiResUrl} ${source.width}w`,
							)
							.join(',')}
					/>
					{/* Low resolution (MDPI) portrait sources*/}
					<source
						media="(orientation: portrait)"
						sizes={sizes}
						srcSet={sources
							.map(
								(source) =>
									`${source.lowResUrl} ${source.width}w`,
							)
							.join(',')}
					/>
				</>
			)}
			<Sources sources={sources} />
			<img
				ref={ref}
				alt={alt}
				src={fallbackSource.lowResUrl}
				width={fallbackSource.width}
				height={fallbackSource.width * ratio}
				loading={
					isLazy && !Picture.disableLazyLoading ? 'lazy' : undefined
				}
				css={isLightbox ? flex : block}
			/>
		</picture>
	);
};

// We use disableLazyLoading to decide if we want to turn off lazy loading of images site wide. We use this
// to prevent false negatives on Chromatic snapshots (see /.storybook/config)
Picture.disableLazyLoading = false;
