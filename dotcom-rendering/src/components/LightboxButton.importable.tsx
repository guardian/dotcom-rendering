import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, log, storage } from '@guardian/libs';
import {
	from,
	neutral,
	space,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgArrowExpand } from '@guardian/source-react-components';
import libDebounce from 'lodash.debounce';
import React, { useEffect } from 'react';
import screenfull from 'screenfull';
import type { RoleType } from '../types/content';

type Props = {
	elementId: string;
	role: RoleType;
	format: ArticleFormat;
	isMainMedia?: boolean;
};

function decideSize(role: RoleType, format: ArticleFormat) {
	const smallStyles = css`
		height: 32px;
		width: 32px;
		svg {
			height: 22px;
			width: 22px;
		}
	`;
	const largeStyles = css`
		height: 44px;
		width: 44px;
		svg {
			height: 32px;
			width: 32px;
		}
	`;

	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog: {
			return smallStyles;
		}
		default: {
			switch (role) {
				case 'halfWidth':
				case 'supporting': {
					return smallStyles;
				}
				case 'inline':
				case 'showcase':
				case 'immersive':
				default: {
					return css`
						${smallStyles}
						${from.tablet} {
							${largeStyles}
						}
					`;
				}
			}
		}
	}
}

/**
 * All lightbox logic is here
 *
 * This function takes the lightbox element as creates a series of javascript functions
 * and listeners used to control the lightbox.
 *
 */
function initialiseLightbox(lightbox: HTMLElement) {
	log('dotcom', '💡 Initialising lightbox');

	// --------------------------------------------------------------------------------
	// SELECTORS
	//
	// We start by defining some variables that reference parts of the dom. These page
	// parts are either on the document or in the lightbox element itself
	// --------------------------------------------------------------------------------
	/**
	 * Each image has a lightbox button that is used to trigger the lightbox
	 */
	const lightboxButtons = document.querySelectorAll<HTMLButtonElement>(
		'button.open-lightbox',
	);
	/**
	 * Each image also has an overlay that captures click events on the image itself
	 */
	const overlays =
		document.querySelectorAll<HTMLElement>('div.open-lightbox');

	// Lightbox selectors
	const nextButton = lightbox.querySelector<HTMLButtonElement>('button.next');
	const previousButton =
		lightbox.querySelector<HTMLButtonElement>('button.previous');
	const infoButton = lightbox.querySelector<HTMLButtonElement>('button.info');
	const closeButton =
		lightbox.querySelector<HTMLButtonElement>('button.close');
	const positionIndicator =
		lightbox.querySelector<HTMLElement>('nav .selected'); // Eg. 2/4, as in image 2 of 4
	/**
	 * imageList is the horizontal list of all images. We use it to scroll left and right
	 * effectively navigating the lightbox
	 */
	const imageList = lightbox.querySelector<HTMLElement>('ul');
	const pictures = lightbox.querySelectorAll('li picture');
	const images = lightbox.querySelectorAll('li img');
	const captionLinks = lightbox.querySelectorAll('li aside a');

	// Remember a user's preference for the caption info
	try {
		if (storage.local.get('gu.prefs.lightbox-hideinfo') === true) {
			hideInfo();
		} else {
			showInfo();
		}
	} catch (error) {
		// Do nothing. Errors accessing local storage are common
	}

	// --------------------------------------------------------------------------------
	// FUNCTIONS
	// --------------------------------------------------------------------------------
	/**
	 * **getTabableElements**
	 *
	 * Returns a list of all the html elements on the *active* page that can be tabbed to
	 *
	 * Any elements that are off screen, such as caption links for images that are not
	 * currently showing, are ignored
	 */
	function getTabableElements(): HTMLElement[] {
		function getElements(parent: HTMLElement): HTMLElement[] {
			return Array.from(
				parent.querySelectorAll(
					'button:not([disabled]), a:not([disabled]), input:not([disabled]), select:not([disabled])',
				),
			);
		}
		const currentPosition = getPosition();
		const currentPage = lightbox.querySelector<HTMLElement>(
			`li[data-index="${currentPosition}"]`,
		);
		const nav = lightbox.querySelector('nav');
		const elementsFromCaption = currentPage ? getElements(currentPage) : [];
		const elementsFromNav = nav ? getElements(nav) : [];
		if (lightbox.classList.contains('hide-info')) {
			// The caption is hidden
			return elementsFromNav;
		} else {
			return [...elementsFromCaption, ...elementsFromNav];
		}
	}

	function requestFullscreen() {
		if (screenfull.isEnabled) {
			return screenfull.request(lightbox);
		}
		return;
	}

	function exitFullscreen() {
		if (screenfull.isEnabled && screenfull.isFullscreen) {
			return screenfull.exit();
		}
		return;
	}

	/**
	 * Each time a new image is selected, this function is called so we can update
	 * the state of the page/lightbox to reflect the new image
	 */
	function onSelect(position: number): void {
		if (positionIndicator) {
			positionIndicator.innerHTML = position.toString();
		}
		if (window.location.hash !== `#img-${position}`) {
			// Update the url based on the fact we've selected (navigated
			// to) a new image
			window.history.replaceState({}, '', `#img-${position}`);
		}
		// Ensure the close button is always visible on the last slide on mobile
		if (position === images.length) {
			closeButton?.classList.add('reveal');
		} else {
			closeButton?.classList.remove('reveal');
		}
	}

	function pulseButton(button: HTMLButtonElement): void {
		button.classList.add('active');

		window.setTimeout(() => {
			button.classList.remove('active');
		}, 75);
	}

	/**
	 * Images are 'selected' simply by being scrolled to. You can even select an image
	 * by swiping left and right. Because of this, scrollTo is how we navigate the lightbox
	 */
	function scrollTo(position: number): void {
		// liWidth is the actual dom width in pixels of the containing li element for each image
		const liWidth = lightbox.querySelector('li')?.clientWidth;
		if (!imageList || liWidth == null) return;
		switch (position) {
			case 0:
			case 1: {
				imageList.scrollLeft = 0;
				break;
			}
			default: {
				imageList.scrollLeft = (position - 1) * liWidth;
			}
		}
	}

	/**
	 * Translate the pixel (scrollLeft) document value into a numeric
	 * position value
	 */
	function getPosition(): number {
		const scrollPosition = imageList?.scrollLeft;
		const liWidth = lightbox.querySelector('li')?.clientWidth;
		if (liWidth != null && scrollPosition != null) {
			return Math.round(scrollPosition / liWidth) + 1;
		}
		return 1;
	}

	function getPreviousPosition(positionNow: number): number {
		if (positionNow === 1) {
			// Cycle around to the end
			return images.length;
		} else {
			return positionNow - 1;
		}
	}

	function getNextPosition(positionNow: number): number {
		if (positionNow === images.length) {
			// Cycle back to the start
			return 1;
		} else {
			return positionNow + 1;
		}
	}

	// We eager load adjacent images by adding the loading=eager attribute
	// to their img tag
	function loadAdjacentImages(currentPosition: number): void {
		function eagerLoad(position: number) {
			const allImages =
				lightbox.querySelectorAll<HTMLImageElement>('li img');
			const imgArray = Array.from(allImages);
			const imgElement = imgArray[position - 1];
			if (imgElement) imgElement.loading = 'eager';
		}
		const previousImage = getPreviousPosition(currentPosition);
		const nextImage = getNextPosition(currentPosition);
		eagerLoad(previousImage);
		eagerLoad(nextImage);
	}

	function goBack(): void {
		if (previousButton) pulseButton(previousButton);
		const positionNow = getPosition();
		const newPosition = getPreviousPosition(positionNow);
		scrollTo(newPosition);
	}

	function goForward(): void {
		if (nextButton) pulseButton(nextButton);
		const positionNow = getPosition();
		const newPosition = getNextPosition(positionNow);
		scrollTo(newPosition);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.ctrlKey || event.metaKey || event.altKey) return;
		switch (event.code) {
			case 'Tab': {
				event.preventDefault();
				const tabableElements = getTabableElements();
				const activeElement = tabableElements.find(
					(element) => element === document.activeElement,
				);
				const firstTabableElement = tabableElements[0];
				const lastTabableElement =
					tabableElements[tabableElements.length - 1];

				if (!activeElement) {
					// Start at the start
					firstTabableElement?.focus();
				} else {
					const currentPosition =
						tabableElements.indexOf(activeElement);
					const firstElementHasFocus = currentPosition === 0;
					const lastElementHasFocus =
						currentPosition === tabableElements.length - 1;

					if (event.shiftKey) {
						if (firstElementHasFocus) {
							lastTabableElement?.focus();
						} else {
							tabableElements[currentPosition - 1]?.focus();
						}
					} else {
						if (lastElementHasFocus) {
							firstTabableElement?.focus();
						} else {
							tabableElements[currentPosition + 1]?.focus();
						}
					}
				}

				break;
			}
			case 'ArrowLeft':
				goBack();
				break;
			case 'ArrowRight':
				goForward();
				break;
			case 'KeyI':
				toggleInfo();
				break;
			case 'KeyQ':
				close();
				break;
			case 'ArrowUp':
				showInfo();
				break;
			case 'ArrowDown':
				hideInfo();
				break;
			case 'Escape':
				close();
				break;
		}
	}

	let previouslyFocused: Element;
	async function open(position: number) {
		log('dotcom', '💡 Opening lightbox.');
		// Remember where we were so we can restore focus
		if (document.activeElement) previouslyFocused = document.activeElement;
		// We use this class to prevent the main page from scrolling in the background while lightbox is open
		document.documentElement.classList.add('lightbox-open');
		// Show lightbox
		lightbox.removeAttribute('hidden');
		// Try to open the lightbox in fullscreen mode. This may fail
		try {
			await requestFullscreen();
		} catch {
			// Do nothing, requests to open fullscreen are just requests and can fail
		}
		// When opening the lightbox, if one doesn't exist already, add a history state referencing
		// the currently selected image. Doing this means the back action will take the reader back
		// to the article
		if (!window.location.hash.startsWith('#img-')) {
			window.history.pushState({}, '', `#img-${position}`);
		}
		// Now we have the index of the image that was clicked, show it
		// in the lightbox
		scrollTo(position);
		// We only want this listener active while the lightbox is open
		window.addEventListener('keydown', handleKeydown);
	}

	async function onClose(): Promise<void> {
		log('dotcom', '💡 Closing lightbox.');
		// Re-enable scrolling
		document.documentElement.classList.remove('lightbox-open');
		// The lightbox was closed by clicking the close button so we need
		// to exit fullscreen
		await exitFullscreen();
		// Restore focus
		// Okay, sure, it 👋 might not 👋 be an HTMLButtonElement but it *will* be
		// focusable because it came from activeElement
		(previouslyFocused as HTMLButtonElement).focus();
		// Hide lightbox
		lightbox.setAttribute('hidden', 'true');
		// Stop listening for keyboard shortcuts
		window.removeEventListener('keydown', handleKeydown);
	}

	/**
	 * Close the lightbox
	 *
	 * How does navigating back close the lightbox?
	 * --------------------------------------------
	 * The history back call being made here triggers a popstate event and it is inside the listener
	 * for this event that the actual calls are made to remove the lightbox from the dom and tidy
	 * up.
	 *
	 * Why are we use History push state as the source of truth?
	 * ---------------------------------------------------------
	 * Like this, browser based navigation actions will also close and hide the lightbox without
	 * the need for complex imperative logic
	 *
	 * Frontend does [a similar thing](https://github.com/guardian/frontend/blob/main/static/src/javascripts/projects/common/modules/gallery/lightbox.js#L387)
	 *
	 */
	function close(): void {
		// By navigating back the lightbox is closed
		history.back();
	}

	function showInfo(): void {
		infoButton?.classList.add('active');
		lightbox.classList.remove('hide-info');
		try {
			storage.local.set('gu.prefs.lightbox-hideinfo', false);
		} catch (error) {
			// Do nothing. Errors accessing local storage are common
		}
	}

	function hideInfo(): void {
		infoButton?.classList.remove('active');
		lightbox.classList.add('hide-info');
		try {
			storage.local.set('gu.prefs.lightbox-hideinfo', true);
		} catch (error) {
			// Do nothing. Errors accessing local storage are common
		}
	}

	function toggleInfo(): void {
		if (lightbox.classList.contains('hide-info')) {
			showInfo();
		} else {
			hideInfo();
		}
	}

	// --------------------------------------------------------------------------------
	// EVENT LISTENERS
	// --------------------------------------------------------------------------------
	lightboxButtons.forEach((button) => {
		button.addEventListener('click', () => {
			// Extract the element id for this image out of the button that was clicked on
			const elementId = button.dataset.elementId;
			// Find the image inside the lightbox and get its index
			const imageWrapper: HTMLLIElement | null = elementId
				? lightbox.querySelector(`li[data-element-id="${elementId}"]`)
				: null;
			const stringIndex: string = imageWrapper?.dataset.index ?? '1';
			const indexOfImageClicked = parseInt(stringIndex);
			void open(indexOfImageClicked);
		});
	});

	overlays.forEach((overlay) => {
		overlay.addEventListener('click', (event) => {
			(event.target as HTMLElement)
				.querySelector('button')
				?.dispatchEvent(new MouseEvent('click'));
		});
	});

	pictures.forEach((picture) => {
		picture.addEventListener('mousedown', (event) => {
			toggleInfo();
			// We want to maintain focus so halt all further actions
			event.preventDefault();
			event.stopPropagation();
		});
	});

	imageList?.addEventListener(
		'scroll',
		libDebounce(
			() => {
				const currentPosition = getPosition();
				onSelect(currentPosition);
				loadAdjacentImages(currentPosition);
			},
			300,
			{ leading: true },
		),
	);

	closeButton?.addEventListener('click', () => {
		close();
	});
	previousButton?.addEventListener('click', goBack);
	nextButton?.addEventListener('click', goForward);
	infoButton?.addEventListener('click', toggleInfo);

	captionLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			// This prevents the event listener from this element's LI parent
			// from firing. That LI event listener would have tried to hide the
			// caption but the reader clicked a link inside the caption so they
			// want to navigate, not hide stuff, and if we did hide it it would
			// cause a weird flash
			event.stopPropagation();
		});
	});

	/**
	 * We listen for the fullscreenchange event here so that we can fire our
	 * close function in response to the reader closing fullscreen mode. Like
	 * this there's no need to press escape twice to exit the lightbox
	 */

	if (screenfull.isEnabled) {
		screenfull.on('change', () => {
			if (screenfull.isFullscreen) {
				log('dotcom', `💡 entered fullscreen mode.`);
			} else {
				log('dotcom', `💡 leaving fullscreen mode.`);
				if (!lightbox.hasAttribute('hidden')) {
					// If lightbox is still showing then the escape key was probably pressed
					// which closes fullscreen mode but not the lightbox, so let's close it
					close();
				}
			}
		});
	}

	/**
	 * popstate is fired when a user goes back or forward, either using buttons
	 * or the keyboard or via history.back() or history.forward()
	 *
	 * If this happens, and if the url has no img- hash, we close the lightbox.
	 * This means you can open the lightbox, navigate back, and the lightbox will
	 * be closed.
	 *
	 * LightboxHash contains the other side of this logic where we are checking
	 * for when a user navigates *to* a url that contains an img hash and we want
	 * to open the lightbox
	 *
	 * @see {@link ../src/web/components/LightboxHash.importable.tsx}
	 */
	window.addEventListener('popstate', () => {
		const hash = window.location.hash;
		if (!hash.startsWith('#img-')) {
			// There's no img hash so close the lightbox
			void onClose();
		}
	});

	// Mark the lightbox as ready so that we don't try to re-initialise it on subsequent button clicks
	lightbox.setAttribute('data-gu-ready', 'true');
}

/**
 * This overlay makes it possible to click anywhere on an image and the lightbox
 * will hydrate/appear.
 *
 * How?
 * ----
 * ```html
 * <gu-island deferUntil="onInteraction">
 *   <ClickOverlay>
 *     <button>Open lightbox</button>
 *   </ClickOverlay>
 * </gu-island>
 * ```
 *
 * Both gu-island and ClickOverlay have click event listeners that will replay any
 * click event to their children using synthetic events. The gu-island listener is
 * set on page load which in turn triggers hydration for this file, adding event
 * listeners to the ClickOverlay and button.
 *
 * The flow is:
 *
 * 1) Page loads, gu-island has a click event listener set
 * 2) User clicks on the island (which wraps both button and overlay)
 * 3) This file is hydrated, setting listeners on both the ClickOverlay and the button
 * 4) gu-island fires a synthetic click event to the element originally clicked
 * 5) If that was ClickOverlay, another synthetic event is sent to the button
 * 6) If it was the button then the lightbox is opened
 *
 * Why?
 * ----
 * This approach means that it is possible for images to be clickable without the
 * requirement to hydrate images - we never want to serialize images into the page! It
 * also means we keep the feature where the lightbox code is only downloaded on
 * interaction.
 *
 * What about accessibility?
 * -------------------------
 * The child button element is still the primary method for opening
 * the lightbox and this is the element that we want assitive technologies like
 * screen readers to interact with. This overlay is intentionally hidden from
 * keyboards and screen readers and can be thought of as progressive enhancement
 * for mouse and touch users.
 *
 */
const ClickOverlay = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				position: absolute;
				top: 0;
				width: 100%;
				height: 100%;
				cursor: pointer;
				:hover > button.open-lightbox {
					opacity: 0.7;
				}
			`}
			className="open-lightbox"
		>
			{children}
		</div>
	);
};

export const LightboxButton = ({
	elementId,
	role,
	format,
	isMainMedia,
}: Props) => {
	useEffect(() => {
		/**
		 * We only want to initialise the lightbox once (because there's only one lightbox and we
		 * only need to initialise it one time). So before we run the initialiseLightbox function
		 * below as part of this button click we first check to see if it is already marked as ready
		 */
		const lightbox = document.querySelector<HTMLElement>('#gu-lightbox');
		if (!lightbox) return;
		if (lightbox.dataset.guReady) {
			log(
				'dotcom',
				'💡 Lightbox already initialised, skipping initialisation',
			);
			return;
		}
		initialiseLightbox(lightbox);
	}, [elementId]);

	return (
		<ClickOverlay>
			<button
				data-element-id={elementId}
				type="button"
				className="open-lightbox"
				aria-haspopup="dialog"
				css={[
					css`
						position: absolute;
						right: 0;
						svg {
							margin-top: 4px;
							fill: ${neutral[100]};
						}
						margin: ${space[2]}px;
						border-radius: 50%;
						border: none;
						cursor: pointer;
						background-color: ${neutral[46]};
						/* We start with zero and then hovering the ClickOverlay increases opacity  */
						opacity: 0;
						:hover {
							filter: brightness(85%);
							opacity: 0.8;
						}
						:focus {
							opacity: 0.7;
						}
					`,
					/* Don't show the button over thumbnails; they're too small */
					role === 'thumbnail' &&
						css`
							display: none;
						`,
					decideSize(role, format),
					isMainMedia &&
						format.display === ArticleDisplay.Immersive &&
						visuallyHidden,
				]}
			>
				<SvgArrowExpand isAnnouncedByScreenReader={false} />
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					View in fullscreen
				</span>
			</button>
		</ClickOverlay>
	);
};
