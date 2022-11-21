/**
 * How do I get a z-index for my new item?
 *
 * Decide a meaningful name for your item and then insert it
 * in the indices array below. The higher up your item visually,
 * then the higher it will be in the z-index stack,
 * 'higher' means _earlier_ in the array.
 *
 * Eg. stickyAdWrapper will be given a higher z-index than bodyArea
 *
 * Once inserted in the array, use getZIndex() to return the css
 *
 * Eg.
 *
 * import { getZIndex } from './getZIndex';
 *
 * const myCss = css`
 *    color: blue;
 *    ${getZIndex('TheGuardian')}
 * `;
 *
 * As new items are added, all z-indexes are adjusted
 */
const indices = [
	// Modals will go here at the top

	// Sticky video and button need to be above everything
	'sticky-video-button',
	'sticky-video',
	'banner',
	'dropdown',
	'burger',
	'expanded-veggie-menu-wrapper',
	'expanded-veggie-menu',

	// Mobile sticky appears below banners
	'mobileSticky',

	// Headers with sticky ads
	'stickyAdWrapperLabsHeader',
	'stickyAdWrapper',
	'stickyAdWrapperNav',

	// Edition selector in nav - needs to be below stickyAdWrapper
	'editionDropdown',

	// Liveblog toast
	'toast',

	// Onwards Carousel (Related content etc)
	'onwardsCarousel',

	// Search link should be above The Guardian svg
	'myAccountDropdown',
	'searchHeaderLink',
	'TheGuardian',

	// Wrapper after nav stuff
	'headerWrapper',

	// Article headline (should be above main media)
	'articleHeadline',
	'immersiveBlackBox',

	// Body
	'bodyArea',
	'rightColumnArea',

	// Main media
	'mainMedia',

	// Nested links in cards should sit above the main card link
	// See: https://www.sarasoueidan.com/blog/nested-links/
	'card-nested-link',
	'card-link',
] as const;

// Implementation code - you don't need to change this to get a new index
export type ZIndex = typeof indices[number];

const decideIndex = (name: ZIndex): number => {
	const index = indices.indexOf(name);
	if (index === -1) return -1; // indexOf returns -1 if there is no match
	return indices.length - index; // reverse the indices: last item gets 1
};

export const getZIndex = (zIndex: ZIndex): string =>
	`z-index: ${decideIndex(zIndex)};`;

export const getZIndexImportant = (zIndex: ZIndex): string =>
	`z-index: ${decideIndex(zIndex)} !important;`;
