import { css } from '@emotion/react';
import { ArticleDisplay } from '@guardian/libs';

import { breakpoints } from '@guardian/src-foundations/mq';

/*
 * Working on this file? Checkout out 027-pictures.md for background information & context!
 */

type Props = {
	imageSources: ImageSource[];
	role: RoleType;
	format: ArticleFormat;
	alt: string;
	height: string;
	width: string;
	isMainMedia?: boolean;
	isLazy?: boolean;
};

type ResolutionType = 'hdpi' | 'mdpi';
type Pixel = number;
type Breakpoint = number;

export type DesiredWidth = {
	breakpoint: Breakpoint;
	width: Pixel;
};

/**
 * Given a desired width & array of SrcSetItems, return the closest match.
 * The match will always be greater than the desired width when available
 *
 * @param desiredWidth
 * @param inlineSrcSets
 * @returns {SrcSetItem}
 */
export const getBestSourceForDesiredWidth = (
	desiredWidth: Pixel,
	inlineSrcSets: SrcSetItem[],
): SrcSetItem => {
	const sorted = inlineSrcSets.slice().sort((a, b) => b.width - a.width);
	return sorted.reduce((best, current) => {
		if (current.width < best.width && current.width >= desiredWidth) {
			return current;
		}
		return best;
	});
};

const getSourcesForRoleAndResolution = (
	imageSources: ImageSource[],
	role: RoleType,
	resolution: ResolutionType,
) => {
	const setsForRole = imageSources.filter(
		({ weighting }) =>
			// Use toLowerCase to handle cases where we have halfWidth comparing to halfwidth
			weighting.toLowerCase() === role.toLowerCase(),
	)[0].srcSet;

	return resolution === 'hdpi'
		? setsForRole.filter((set) => set.src.includes('dpr=2'))
		: setsForRole.filter((set) => !set.src.includes('dpr=2'));
};

const getFallback = (sources: SrcSetItem[]): string | undefined => {
	if (sources.length === 0) return undefined;
	// The assumption here is readers on devices that do not support srcset are likely to be on poor
	// network connections so we're going to fallback to a small image
	return getBestSourceForDesiredWidth(300, sources).src;
};

/**
 * Removes redundant widths from an array of DesiredWidths
 *
 * This function specifically looks for *consecutive duplicates*,
 * in which case we should always keep the last consecutive element.
 *
 * @param {DesiredWidth[]} desiredWidths
 * @returns {DesiredWidth}
 */
export const removeRedundantWidths = (
	allDesiredWidths: DesiredWidth[],
): DesiredWidth[] => {
	const desiredWidths: DesiredWidth[] = [];

	for (const desiredWidth of allDesiredWidths) {
		if (
			desiredWidths[desiredWidths.length - 1]?.width ===
			desiredWidth.width
		) {
			// We overwrite the end element as we want to keep the *last* consecutive duplicate
			desiredWidths[desiredWidths.length - 1] = desiredWidth;
		} else desiredWidths.push(desiredWidth);
	}

	return desiredWidths;
};

/**
 * Returns the desired width for an image at the specified breakpoint, based on the image role, format, and if it's main media.
 * This function acts as a source of truth for widths of images based on the provided parameters
 *
 * Returns 'breakpoint', or 'breakpoint / x' when the image is expected to fill a % of the viewport,
 * instead of a fixed width.
 *
 * @param breakpoint
 * @param role
 * @param isMainMedia
 * @param format
 * @returns {Pixel}
 */
const getDesiredWidthForBreakpoint = (
	breakpoint: number,
	role: RoleType,
	isMainMedia: boolean,
	format: ArticleFormat,
): Pixel => {
	if (format.display === ArticleDisplay.Immersive && isMainMedia)
		return breakpoint;

	if (
		(format.display === ArticleDisplay.Showcase ||
			format.display === ArticleDisplay.NumberedList) &&
		isMainMedia
	) {
		// Showcase main media images (which includes numbered list articles) appear
		// larger than in body showcase images so we use a different set of image sizes
		if (breakpoint >= breakpoints.wide) return 1020;
		if (breakpoint >= breakpoints.leftCol) return 940;
		if (breakpoint >= breakpoints.tablet) return 700;
		if (breakpoint >= breakpoints.phablet) return 700;
		return breakpoint;
	}

	switch (role) {
		case 'inline':
			if (
				breakpoint >= breakpoints.tablet &&
				breakpoint < breakpoints.desktop
			)
				return 680;
			if (breakpoint >= breakpoints.phablet) return 620;
			return breakpoint;
		case 'halfWidth':
			if (breakpoint >= breakpoints.phablet) return 300;
			return Math.round(breakpoint / 2);
		case 'thumbnail':
			return 140;
		case 'immersive':
			if (breakpoint >= breakpoints.wide) return 1300;
			return breakpoint;
		case 'supporting':
			if (breakpoint >= breakpoints.wide) return 380;
			if (breakpoint >= breakpoints.tablet) return 300;
			return breakpoint;
		case 'showcase':
			if (breakpoint >= breakpoints.wide) return 860;
			if (breakpoint >= breakpoints.leftCol) return 780;
			if (breakpoint >= breakpoints.phablet) return 620;
			return breakpoint;
	}
};

// Takes a size & sources, and returns a source set with 1 matching image with the desired size
const getSourceForDesiredWidth = (
	desiredWidth: Pixel,
	sources: SrcSetItem[],
	resolution: ResolutionType,
) => {
	// The image sources we're provided use double-widths for HDPI images
	// We should therefor multiply the width based on if it's HDPI or not
	// e.g { url: '... ?width=500&dpr=2 ...', width: '1000' }
	const source = getBestSourceForDesiredWidth(
		resolution === 'hdpi' ? desiredWidth * 2 : desiredWidth,
		sources,
	);
	return `${source.src} ${source.width}w`;
};

// Create sourcesets for portrait immersive
// TODO: In a future PR this system will be updated to solve scaling issues with DPR
const portraitImmersiveSource = (
	sources: SrcSetItem[],
	resolution: ResolutionType,
) => (
	<source
		media={
			resolution === 'hdpi'
				? '(orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.25), (orientation: portrait) and (min-resolution: 120dpi)'
				: '(orientation: portrait)'
		}
		// Immersive MainMedia elements fill the height of the viewport, meaning
		// on mobile devices even though the viewport width is small, we'll need
		// a larger image to maintain quality. To solve this problem we're using
		// the viewport height (vh) to calculate width. The value of 167vh
		// relates to an assumed image ratio of 5:3 which is equal to
		// 167 (viewport height)  : 100 (viewport width).
		sizes="167vh"
		srcSet={sources
			.map((srcSet) => `${srcSet.src} ${srcSet.width}w`)
			.join(',')}
	/>
);

export const Picture = ({
	imageSources,
	role,
	format,
	alt,
	height,
	width,
	isMainMedia = false,
	isLazy = true,
}: Props) => {
	const hdpiSourceSets = getSourcesForRoleAndResolution(
		imageSources,
		role,
		'hdpi',
	);
	const mdpiSourceSets = getSourcesForRoleAndResolution(
		imageSources,
		role,
		'mdpi',
	);
	const fallbackSrc = getFallback(
		hdpiSourceSets.length ? hdpiSourceSets : mdpiSourceSets,
	);

	const allDesiredWidths: DesiredWidth[] = [
		// Create an array of breakpoints going from highest to lowest, with 0 as the final option
		breakpoints.wide,
		breakpoints.leftCol,
		breakpoints.desktop,
		breakpoints.tablet,
		breakpoints.phablet,
		breakpoints.mobileLandscape,
		breakpoints.mobileMedium,
		breakpoints.mobile,
		0,
	].map((breakpoint) => ({
		breakpoint,
		width: getDesiredWidthForBreakpoint(
			breakpoint,
			role,
			isMainMedia,
			format,
		),
	}));

	const desiredWidths: DesiredWidth[] =
		removeRedundantWidths(allDesiredWidths);

	return (
		<picture itemProp="contentUrl">
			{format.display === ArticleDisplay.Immersive && isMainMedia && (
				<>
					{portraitImmersiveSource(hdpiSourceSets, 'hdpi')}
					{portraitImmersiveSource(mdpiSourceSets, 'mdpi')}
				</>
			)}

			{desiredWidths.map(({ breakpoint, width: desiredWidth }) => (
				<>
					{/* HDPI Source (DPR2) - images in this srcset have `dpr=2&quality=45` in the url */}
					{hdpiSourceSets.length > 0 && (
						<source
							srcSet={getSourceForDesiredWidth(
								desiredWidth,
								hdpiSourceSets,
								'hdpi',
							)}
							sizes={`${desiredWidth}px`}
							media={`(min-width: ${breakpoint}px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: ${breakpoint}px) and (min-resolution: 120dpi)`}
						/>
					)}
					{/* MDPI Source - images in this srcset have `quality=85` in the url */}
					<source
						srcSet={getSourceForDesiredWidth(
							desiredWidth,
							mdpiSourceSets,
							'mdpi',
						)}
						sizes={`${desiredWidth}px`}
						media={`(min-width: ${breakpoint}px)`}
					/>
				</>
			))}

			<img
				alt={alt}
				src={fallbackSrc}
				height={height}
				width={width}
				loading={
					isLazy && !Picture.disableLazyLoading ? 'lazy' : undefined
				}
				// https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom
				// why did we add the css `vertical-align: middle;` to the img tag
				css={css`
					vertical-align: middle;
				`}
			/>
		</picture>
	);
};

// We use disableLazyLoading to decide if we want to turn off lazy loading of images site wide. We use this
// to prevent false negatives on Chromatic snapshots (see /.storybook/config)
Picture.disableLazyLoading = false;
