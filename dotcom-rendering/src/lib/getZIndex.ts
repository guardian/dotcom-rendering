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
 *    z-index: ${getZIndex('TheGuardian')};
 * `;
 *
 * As new items are added, all z-indexes are adjusted
 */
const indices = [
	// Modals will go here at the top
	'lightbox',
	'youTubeFullscreen',

	// Sticky video and button need to be above everything
	'sticky-video-button',
	'sticky-video',
	'banner',
	'dropdown',
	'burger',
	'mastheadVeggieBurgerExpandedMobile',
	'expanded-veggie-menu-wrapper',
	'expanded-veggie-menu',

	//header wrapper needs to be in line with veggie menus to ensure it stands above various banners
	'fullPageInteractiveHeaderWrapper',

	// Mobile sticky appears below banners
	'mobileSticky',

	// Headers with sticky ads
	'stickyAdWrapperLabsHeader',
	'stickyAdWrapper',
	'stickyAdWrapperNav',

	// My Account dropdown in masthead - needs to be below stickyAdWrapper
	'mastheadMyAccountDropdown',

	// Edition selector in masthead - needs to be below stickyAdWrapper
	'mastheadEditionDropdown',

	// Edition selector in nav - needs to be below stickyAdWrapper
	'editionDropdown',

	// The content displayed by the Details component
	'summaryDetails',

	// Liveblog toast
	'toast',

	// Onwards Carousel (Related content etc)
	'onwardsCarousel',

	// Search link should be above The Guardian svg
	'myAccountDropdown',
	'searchHeaderLink',
	'TheGuardian',

	// The edition switcher banner needs to be below the Edition selector
	// and the myAccount dropdown in the nav
	'editionSwitcherBanner',

	// Sticky table of contents element
	'tableOfContents',

	// Article headline (should be above main media)
	'articleHeadline',
	'immersiveBlackBox',

	// Body
	'bodyArea',
	'rightColumnArea',

	// Loop video container
	'loop-video-progress-bar-foreground',
	'loop-video-progress-bar-background',
	'loop-video-container',

	// Main media
	'mainMedia',

	// The carousel buttons of the highlights container that sits above the header.
	// Needs to be above 'card-link'.
	'highlights-carousel-buttons',

	// Nested links in cards should sit above the main card link
	// See: https://www.sarasoueidan.com/blog/nested-links/
	'card-nested-link',
	'card-link',
	'card-podcast-image',
] as const;

// Implementation code - you don't need to change this to get a new index
export type ZIndex = (typeof indices)[number];

export const getZIndex = (name: ZIndex): number => {
	const index = indices.indexOf(name);
	if (index === -1) return -1; // indexOf returns -1 if there is no match
	return indices.length - index; // reverse the indices: last item gets 1
};
