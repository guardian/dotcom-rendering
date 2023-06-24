import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, log, storage } from '@guardian/libs';
import {
	from,
	neutral,
	until,
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
			height: 20px;
			width: 20px;
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
		if (currentPosition == null) return [];
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

	/**
	 * Each time a new image is selected, this function is called so we can update
	 * the state of the page/lightbox to reflect the new image
	 */
	function onSelect(position: number): void {
		if (positionIndicator) {
			positionIndicator.innerHTML = position.toString();
		}
		// Update the url based on the fact we've selected (navigated
		// to) a new image
		window.history.replaceState({}, '', `#img-${position}`);
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
	function getPosition(): number | null {
		const scrollPosition = imageList?.scrollLeft;
		const liWidth = lightbox.querySelector('li')?.clientWidth;
		if (scrollPosition === 0 && liWidth === 0) return null;
		if (scrollPosition == undefined || liWidth == undefined) return null;
		if (Number.isNaN(liWidth) || Number.isNaN(scrollPosition)) return null;
		if (scrollPosition === 0) return 1;
		return Math.round(scrollPosition / liWidth) + 1;
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
		if (positionNow != null) {
			const newPosition = getPreviousPosition(positionNow);
			scrollTo(newPosition);
		}
	}

	function goForward(): void {
		if (nextButton) pulseButton(nextButton);
		const positionNow = getPosition();
		if (positionNow != null) {
			const newPosition = getNextPosition(positionNow);
			scrollTo(newPosition);
		}
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
				void close();
				break;
			case 'ArrowUp':
				showInfo();
				break;
			case 'ArrowDown':
				hideInfo();
				break;
			case 'Escape':
				void close();
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
		// Try to open the lightbox in fullscreen mode. This may fail
		try {
			await requestFullscreen();
		} catch {
			// Do nothing, requests to open fullscreen are just requests and can fail
		}
	}

	function exitFullscreen() {
		if (screenfull.isEnabled && screenfull.isFullscreen) {
			return screenfull.exit();
		}
		return Promise.resolve();
	}

	async function close() {
		log('dotcom', '💡 Closing lightbox.');
		await exitFullscreen();
		closeLightbox();
		history.back();
	}

	function closeLightbox() {
		log('dotcom', '💡 Closing lightbox.');
		// Re-enable scrolling
		document.documentElement.classList.remove('lightbox-open');
		// Restore focus
		// Okay, sure, it 👋 might not 👋 be an HTMLButtonElement but it *will* be
		// focusable because it came from activeElement
		(previouslyFocused as HTMLButtonElement).focus();
		// Hide lightbox
		lightbox.setAttribute('hidden', 'true');
		// Stop listening for keyboard shortcuts
		window.removeEventListener('keydown', handleKeydown);
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
				if (currentPosition != null) {
					onSelect(currentPosition);
					loadAdjacentImages(currentPosition);
				}
			},
			300,
			{ leading: true },
		),
	);

	closeButton?.addEventListener('click', () => {
		void close();
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
				// setTimeout(() => {
				if (!lightbox.hasAttribute('hidden')) {
					// If lightbox is still showing then the escape key was probably pressed
					// which closes fullscreen mode but not the lightbox, so let's close it
					closeLightbox();
					history.back();
				}
				// });
			}
		});
	}

	/**
	 * popstate is fired when a user goes back or forward, either using buttons
	 * or the keyboard or via history.back() or history.forward()
	 *
	 * If this happens, and if the url has no img- hash, we close the lightbox.
	 * This means you can open the lightbox, navigate back, and the lightbox will
	 * close.
	 */
	window.addEventListener('popstate', () => {
		const hash = window.location.hash;
		if (!hash.startsWith('#img-')) {
			// There's no img hash so close the lightbox
			void exitFullscreen();
			closeLightbox();
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
 * the lightbox and this is the element that we want assistive technologies like
 * screen readers to interact with. This overlay is intentionally hidden from
 * keyboards and screen readers and can be thought of as progressive enhancement
 * for mouse and touch users.
 *
 */
const ClickOverlay = ({ children }: { children: React.ReactNode }) => {
	return (
		/**
		 * Why does this div have an onClick event?
		 *
		 * Because Mobile safari does not support click event delgation. The workaround for
		 * this is to add an empty click handler
		 *
		 * @see {@link https://www.quirksmode.org/blog/archives/2010/09/click_event_del.html}
		 *
		 */
		// eslint-disable-next-line, jsx-a11y/no-static-element-interactions -- see above
		<div
			css={css`
				position: absolute;
				top: 0;
				width: 100%;
				height: 100%;
				cursor: pointer;
				${from.tablet} {
					:hover > button.open-lightbox {
						opacity: 0.7;
					}
				}
			`}
			className="open-lightbox"
			aria-hidden="true"
			// eslint-disable-next-line @typescript-eslint/no-empty-function -- see above
			onClick={() => {}}
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
			log('dotcom', '💡 Lightbox already initialised, skipping');
			return;
		}
		initialiseLightbox(lightbox);
		// Now that the lightbox is initialised, mark all buttons as gu-ready so that they won't
		// be hydrated
		document
			.querySelectorAll<HTMLButtonElement>('button.open-lightbox')
			.forEach((button) => {
				button
					.closest('gu-island')
					?.setAttribute('data-gu-ready', 'true');
			});
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
							margin-top: 3px;
							fill: ${neutral[100]};
						}
						margin: 6px;
						${until.tablet} {
							padding: 0;
						}
						border-radius: 50%;
						border: none;
						cursor: pointer;
						background: rgba(18, 18, 18, 0.8);
						opacity: 0.7;
						${from.tablet} {
							/**
							 * On desktop we start with zero and then hovering or focussing the
							 * ClickOverlay increases opacity
							 */
							opacity: 0;
							:hover {
								filter: brightness(85%);
								opacity: 0.8;
							}
							:focus {
								opacity: 0.7;
							}
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
