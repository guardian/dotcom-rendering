import { css } from '@emotion/react';

import { breakpoints } from '@guardian/src-foundations/mq';

type Props = {
	imageSources: ImageSource[];
	role: RoleType;
	alt: string;
	height: string;
	width: string;
	isMainMedia?: boolean;
	isLazy?: boolean;
};

type ResolutionType = 'hdpi' | 'mdpi';

const getClosestSetForWidth = (
	desiredWidth: number,
	inlineSrcSets: SrcSetItem[],
): SrcSetItem => {
	// For a desired width, find the SrcSetItem which is the closest match
	const sorted = inlineSrcSets.sort((a, b) => b.width - a.width);
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

const getFallback = (
	role: RoleType,
	resolution: ResolutionType,
	imageSources: ImageSource[],
): string | undefined => {
	// Get the sources for this role and resolution
	const sources: SrcSetItem[] = getSourcesForRoleAndResolution(
		imageSources,
		role,
		resolution,
	);
	if (sources.length === 0) return undefined;
	// The assumption here is readers on devices that do not support srcset are likely to be on poor
	// network connections so we're going to fallback to a small image
	return getClosestSetForWidth(300, sources).src;
};

const getSources = (
	role: RoleType,
	resolution: ResolutionType,
	imageSources: ImageSource[],
): string => {
	// Get the sources for this role and resolution
	const sources: SrcSetItem[] = getSourcesForRoleAndResolution(
		imageSources,
		role,
		resolution,
	);

	return sources.map((srcSet) => `${srcSet.src} ${srcSet.width}w`).join(',');
};

/**
 *       mobile: 320
 *       mobileMedium: 375
 *       mobileLandscape: 480
 *       phablet: 660
 *       tablet: 740
 *       desktop: 980
 *       leftCol: 1140
 *       wide: 1300
 */

const getSizes = (role: RoleType, isMainMedia: boolean): string => {
	switch (role) {
		case 'inline':
			return `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;
		case 'halfWidth':
			return `(min-width: ${breakpoints.phablet}px) 300px, 50vw`;
		case 'thumbnail':
			return '140px';
		case 'immersive':
			// Immersive MainMedia elements fill the height of the viewport, meaning
			// on mobile devices even though the viewport width is small, we'll need
			// a larger image to maintain quality. To solve this problem we're using
			// the viewport height (vh) to calculate width. The value of 167vh
			// relates to an assumed image ratio of 5:3 which is equal to
			// 167 (viewport height)  : 100 (viewport width).

			// Immersive body images stretch the full viewport width below wide,
			// but do not stretch beyond 1300px after that.
			return isMainMedia
				? `(orientation: portrait) 167vh, 100vw`
				: `(min-width: ${breakpoints.wide}px) 1300px, 100vw`;
		case 'supporting':
			return `(min-width: ${breakpoints.wide}px) 380px, 300px`;
		case 'showcase':
			return isMainMedia
				? `(min-width: ${breakpoints.wide}px) 1020px, (min-width: ${breakpoints.leftCol}px) 940px, (min-width: ${breakpoints.tablet}px) 700px, (min-width: ${breakpoints.phablet}px) 660px, 100vw`
				: `(min-width: ${breakpoints.wide}px) 860px, (min-width: ${breakpoints.leftCol}px) 780px, (min-width: ${breakpoints.phablet}px) 620px, 100vw`;
	}
};

export const Picture = ({
	imageSources,
	role,
	alt,
	height,
	width,
	isMainMedia = false,
	isLazy = true,
}: Props) => {
	const hdpiSources = getSources(role, 'hdpi', imageSources);
	const mdpiSources = getSources(role, 'mdpi', imageSources);
	const fallbackSrc = getFallback(role, 'hdpi', imageSources);
	const sizes = getSizes(role, isMainMedia);

	return (
		<picture itemProp="contentUrl">
			{/* HDPI Source (DPR2) - images in this srcset have `dpr=2&quality=45` in the url */}
			<source
				srcSet={hdpiSources}
				sizes={sizes}
				media="(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)"
			/>
			{/* MDPI Source (DPR1) - images in this srcset have `quality=85` in the url */}
			<source srcSet={mdpiSources} sizes={sizes} />
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
