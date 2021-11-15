import { css } from '@emotion/react';
import { ArticleDisplay } from '@guardian/libs';

import { breakpoints } from '@guardian/src-foundations/mq';

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

export const getClosestSetForWidth = (
	desiredWidth: number,
	inlineSrcSets: SrcSetItem[],
): SrcSetItem => {
	// For a desired width, find the SrcSetItem which is the closest match
	// A match greated than the desired width will always be picked when one is available
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
	return getClosestSetForWidth(300, sources).src;
};

// The image sources we're provided use double-widths for HDPI images
// We should therefor multiple the width based on if it's HDPI or not
// e.g { url: '... ?width=500&dpr=2 ...', width: '1000' }
export const getDesiredWidth = (width: number, hdpi: boolean) =>
	hdpi ? width * 2 : width;

// Turn SrsSets into a string which can be passed to the source element
export const getSourcesFromSrcSets = (sources: SrcSetItem[]) =>
	sources.map((srcSet) => `${srcSet.src} ${srcSet.width}w`).join(',');

export const optimiseBreakpointSizes = (
	breakpointSizes: [number, number][],
): [number, number][] =>
	breakpointSizes.filter(([, size], index) => {
		// If the NEXT element in the array has the SAME size as this one, we can trust that this current breakpoint is redundant
		// e.g
		// [[980, 620], [660, 620]] > [[660, 620]]
		// Because we use min-width, any source larger than 660 will get the 620px image, even without the min-width: 980 source element
		if (
			index + 1 < breakpointSizes.length &&
			breakpointSizes[index + 1][1] === size
		)
			return false;
		return true;
	});

// Returns the size image desired at a particular breakpoint based on the image role, format, and if it's main media.
const getSizeForBreakpoint = (
	breakpoint: number,
	role: RoleType,
	isMainMedia: boolean,
	format: ArticleFormat,
): number => {
	if (format.display === ArticleDisplay.Immersive && isMainMedia)
		return breakpoint; // 100vh

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
			return breakpoint; // 100vw
		case 'halfWidth':
			if (breakpoint >= breakpoints.phablet) return 300;
			return breakpoint / 2; // 50vw
		case 'thumbnail':
			return 140;
		case 'immersive':
			if (breakpoint >= breakpoints.wide) return 1300;
			return breakpoint; // 100vw
		case 'supporting':
			if (breakpoint >= breakpoints.wide) return 380;
			return breakpoint; // 100vw
		case 'showcase':
			if (breakpoint >= breakpoints.wide) return 860;
			if (breakpoint >= breakpoints.leftCol) return 780;
			if (breakpoint >= breakpoints.phablet) return 620;
			return breakpoint; // 100vw
	}
};

// Takes a size & sources, and returns a source set with 1 matching image with the desired size
const getSourceSetForSize = (
	size: number,
	sources: SrcSetItem[],
	hdpi: boolean,
) =>
	getSourcesFromSrcSets([
		getClosestSetForWidth(getDesiredWidth(size, hdpi), sources),
	]);

// Create sourcesets for portrait immersive
// TODO: In a future PR this system will be updated to solve scaling issues with DPR
const portraitImmersiveSource = (sources: SrcSetItem[], hdpi: boolean) => (
	<source
		media={
			hdpi
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
		srcSet={getSourcesFromSrcSets(sources)}
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
	const mdpiSourcesSets = getSourcesForRoleAndResolution(
		imageSources,
		role,
		'mdpi',
	);
	const fallbackSrc = getFallback(hdpiSourceSets);

	const breakpointSizes: [number, number][] = [
		...Object.values(breakpoints).reverse(),
		0,
	].map((breakpoint) => [
		breakpoint,
		getSizeForBreakpoint(breakpoint, role, isMainMedia, format),
	]);
	const optimisedBreakPointSizes: [number, number][] =
		optimiseBreakpointSizes(breakpointSizes);

	return (
		<picture itemProp="contentUrl">
			{format.display === ArticleDisplay.Immersive && isMainMedia ? (
				<>
					{portraitImmersiveSource(hdpiSourceSets, true)}
					{portraitImmersiveSource(mdpiSourcesSets, false)}
				</>
			) : (
				''
			)}

			{
				// Loop through the breakpoints from highest to lowest, adding '0' as the last option
				optimisedBreakPointSizes.map(([breakpoint, size]) => (
					<>
						{/* HDPI Source (DPR2) - images in this srcset have `dpr=2&quality=45` in the url */}
						<source
							srcSet={getSourceSetForSize(
								size,
								hdpiSourceSets,
								true,
							)}
							sizes={`${breakpoint || size}px`}
							media={`(min-width: ${breakpoint}px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: ${breakpoint}px) and (min-resolution: 120dpi)`}
						/>
						{/* MDPI Source - images in this srcset have `quality=85` in the url */}
						<source
							srcSet={getSourceSetForSize(
								size,
								mdpiSourcesSets,
								false,
							)}
							sizes={`${breakpoint || size}px`}
							media={`min-width: ${breakpoint}px`}
						/>
					</>
				))
			}

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
