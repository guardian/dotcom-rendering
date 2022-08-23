import { createHash } from 'crypto';
import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import React from 'react';

/**
 * Working on this file? Checkout out 027-pictures.md & 029-signing-image-urls.md for background information & context
 **/

type Props = {
	role: RoleType;
	format: ArticleFormat;
	master: string;
	alt: string;
	height: string;
	width: string;
	isMainMedia?: boolean;
	isLazy?: boolean;
};

type ImageWidthType = { breakpoint: number; width: number };

/**
 * All business logic for image sizing is contained in this one function. This
 * is the source of truth.
 *
 * Based on image role, if it's main media or not and the format of the article
 * it is in, this function decides the width the image should have at different
 * breakpoints.
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
}: {
	role: RoleType;
	isMainMedia?: boolean;
	format: ArticleFormat;
}): ImageWidthType[] => {
	if (isMainMedia) {
		switch (role) {
			case 'showcase':
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
			case 'immersive':
				return [
					{ breakpoint: breakpoints.mobile, width: 480 },
					{ breakpoint: breakpoints.mobileLandscape, width: 660 },
					{ breakpoint: breakpoints.phablet, width: 740 },
					{ breakpoint: breakpoints.tablet, width: 980 },
					{ breakpoint: breakpoints.desktop, width: 1140 },
					{ breakpoint: breakpoints.leftCol, width: 1300 },
					{ breakpoint: breakpoints.wide, width: 1900 },
				];
			case 'supporting':
			case 'thumbnail':
			case 'halfWidth':
			case 'inline':
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

/**
 * Generates a url for calling the Fastly Image Optimiser
 *
 * @see {@link https://developer.fastly.com/reference/io/}
 *
 */
const generateSignedUrl = ({
	master,
	imageWidth,
	resolution,
}: {
	master: string;
	imageWidth: number;
	resolution: 'low' | 'high';
}): string => {
	const sign = (salt: string, path: string): string => {
		return createHash('md5')
			.update(salt + path)
			.digest('hex');
	};

	const salt = process.env.IMAGE_SALT;
	if (!salt && process.env.NODE_ENV === 'production' && !process.env.CI) {
		// If no IMAGE_SALT env variable is set in production then something has
		// gone wrong and we want to know about it
		throw new Error(
			'No IMAGE_SALT value found when constructing picture source',
		);
	} else if (!salt) {
		// If no IMAGE_SALT is set outside of production it likely means the
		// developer has yet to set the env file. In this case we continue
		// using a default image
		return 'https://i.guim.co.uk/img/media/52f8e9183bbc03c48fcdf4ed9a4e12b3a19a9927/0_0_5000_3000/master/5000.jpg?width=700&quality=45&auto=format&fit=max&dpr=2&s=196c7f25bf2fddcb45512d3ff25e20c0';
	}

	// Construct and sign the url
	const url = new URL(master);
	const [service = 'unknown'] = url.hostname.split('.');
	const params = new URLSearchParams({
		width: imageWidth.toString(),
		// Why 45 and 85?
		// See: https://github.com/guardian/fastly-image-service/blob/21312b81955d57338b3efd7a0c21b3987f13e7ed/fastly-io_guim_co_uk/src/main/resources/varnish/main.vcl
		quality: resolution === 'high' ? '45' : '85',
		fit: 'max',
	});
	if (resolution === 'high') params.set('dpr', '2');
	const path = `${url.pathname}?${params.toString()}`;
	const sig = sign(salt, path);
	return `https://i.guim.co.uk/img/${service}${path}&s=${sig}`;
};

const descendingByBreakpoint = (a: ImageWidthType, b: ImageWidthType) => {
	// We need to list the largest images first as browsers read top down and stop
	// as soon as they hit a matching media query
	return b.breakpoint - a.breakpoint;
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

export const Picture = ({
	role,
	format,
	master,
	alt,
	height,
	width,
	isMainMedia = false,
	isLazy = true,
}: Props) => {
	const imageWidths = decideImageWidths({ role, format, isMainMedia });
	const sources = imageWidths
		.slice()
		.sort(descendingByBreakpoint)
		.map(({ width: imageWidth, breakpoint }) => {
			return {
				breakpoint,
				width: imageWidth,
				hiResUrl: generateSignedUrl({
					master,
					imageWidth,
					resolution: 'high',
				}),
				lowResUrl: generateSignedUrl({
					master,
					imageWidth,
					resolution: 'low',
				}),
			};
		});

	if (!sources[0]) return null;

	return (
		<picture css={block}>
			{/* Immersive Main Media images get additional sources specifically for when in portrait orientation */}
			{format.display === ArticleDisplay.Immersive && isMainMedia && (
				<>
					{/*
						Immersive MainMedia elements fill the height of the viewport, meaning on mobile
						devices even though the viewport width is small, we'll need a larger image to
						maintain quality. To solve this problem we're using the viewport height (vh) to
						calculate width. The value of 167vh relates to an assumed image ratio of 5:3
						which is equal to 167 (viewport height) : 100 (viewport width)

						If either of these media queires match then the browser will choose an image from the
						list of sources in srcset based on the viewport list. If the media query doesn't match
						it continues checking using the standard sources underneath
					*/}
					{/* High resolution (HDPI) portrait sources*/}
					<source
						media="(orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.25), (orientation: portrait) and (min-resolution: 120dpi)"
						sizes="167vh"
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
						sizes="167vh"
						srcSet={sources
							.map(
								(source) =>
									`${source.lowResUrl} ${source.width}w`,
							)
							.join(',')}
					/>
				</>
			)}
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
				alt={alt}
				// The assumption here is readers on devices that do not support srcset are likely to be on poor
				// network connections so we're going to fallback to the smallest image
				src={sources[0].lowResUrl}
				height={height}
				width={width}
				loading={
					isLazy && !Picture.disableLazyLoading ? 'lazy' : undefined
				}
				css={block}
			/>
		</picture>
	);
};

// We use disableLazyLoading to decide if we want to turn off lazy loading of images site wide. We use this
// to prevent false negatives on Chromatic snapshots (see /.storybook/config)
Picture.disableLazyLoading = false;
