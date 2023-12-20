import { isUndefined, log, storage } from '@guardian/libs';
import libDebounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import screenfull from 'screenfull';
import type { ImageForLightbox } from '../types/content';
import { LightboxImages } from './LightboxImages';

/**
 * Translate the pixel (scrollLeft) document value into a numeric
 * position value
 */
const getPosition = (
	lightbox: HTMLElement,
	imageList: HTMLUListElement,
): number | undefined => {
	const scrollPosition = imageList.scrollLeft;
	const liWidth = lightbox.querySelector('li')?.clientWidth;
	if (scrollPosition === 0 && liWidth === 0) return;
	if (isUndefined(liWidth)) return;
	if (Number.isNaN(liWidth) || Number.isNaN(scrollPosition)) return;
	if (scrollPosition === 0) return 1;
	return Math.round(scrollPosition / liWidth) + 1;
};

/**
 * **getTabableElements**
 *
 * Returns a list of all the html elements on the *active* page that can be tabbed to
 *
 * Any elements that are off screen, such as caption links for images that are not
 * currently showing, are ignored
 */
const getTabableElements = (
	lightbox: HTMLElement,
	imageList: HTMLUListElement,
): HTMLElement[] => {
	function getElements(parent: HTMLElement): HTMLElement[] {
		return Array.from(
			parent.querySelectorAll(
				'button:not([disabled]), a:not([disabled]), input:not([disabled]), select:not([disabled])',
			),
		);
	}
	const currentPosition = getPosition(lightbox, imageList);
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
};

const requestFullscreen = async (lightbox: Element) => {
	if (screenfull.isEnabled) {
		return screenfull.request(lightbox);
	}
};

const exitFullscreen = async () => {
	if (screenfull.isEnabled && screenfull.isFullscreen) {
		return screenfull.exit();
	}
};

const restoreFocus = (previouslyFocused: Element) => {
	if (!(previouslyFocused instanceof HTMLElement)) return;
	previouslyFocused.focus();
};

/**
 * Each time a new image is selected, this function is called so we can update
 * the state of the page/lightbox to reflect the new image
 */
const onSelect = (
	positionIndicator: HTMLElement,
	position: number,
	length: number,
	closeButton: HTMLButtonElement,
): void => {
	positionIndicator.innerHTML = position.toString();

	// Update the url based on the fact we've selected (navigated
	// to) a new image
	window.history.replaceState({}, '', `#img-${position}`);
	// Ensure the close button is always visible on the last slide on mobile
	closeButton.classList.toggle('reveal', position === length);
};

/**
 * Images are 'selected' simply by being scrolled to. You can even select an image
 * by swiping left and right. Because of this, scrollTo is how we navigate the lightbox
 */
const scrollTo = (
	position: number,
	lightbox: HTMLElement,
	imageList: HTMLUListElement,
): void => {
	// liWidth is the actual dom width in pixels of the containing li element for each image
	const liWidth = lightbox.querySelector('li')?.clientWidth;
	if (isUndefined(liWidth)) return;
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
};

const getPreviousPosition = (position: number, length: number): number =>
	position <= 1
		? // Cycle around to the end
		  length
		: position - 1;

const getNextPosition = (position: number, length: number): number =>
	position >= length
		? // Cycle back to the start
		  1
		: position + 1;

const eagerLoad = (images: HTMLImageElement[], position: number) => {
	const image = images[position - 1];
	if (image) image.loading = 'eager';
};

/**
 * We eager load adjacent images by adding the loading=eager attribute
 * to their img tag
 */
const loadAdjacentImages = (
	images: HTMLImageElement[],
	currentPosition: number,
): void => {
	const { length } = images;
	const previousImage = getPreviousPosition(currentPosition, length);
	const nextImage = getNextPosition(currentPosition, length);
	eagerLoad(images, previousImage);
	eagerLoad(images, nextImage);
};

const pulseButton = (button: HTMLButtonElement): void => {
	button.classList.add('active');

	const timer = setTimeout(() => {
		button.classList.remove('active');
		clearTimeout(timer);
	}, 75);
};

const goBack = (
	lightbox: HTMLElement,
	images: HTMLImageElement[],
	previousButton: HTMLButtonElement,
	imageList: HTMLUListElement,
) => {
	const { length } = images;
	pulseButton(previousButton);
	const positionNow = getPosition(lightbox, imageList);
	if (positionNow != null) {
		const newPosition = getPreviousPosition(positionNow, length);
		scrollTo(newPosition, lightbox, imageList);
	}
};

const goForward = (
	lightbox: HTMLElement,
	images: HTMLImageElement[],
	nextButton: HTMLButtonElement,
	imageList: HTMLUListElement,
) => {
	const { length } = images;
	pulseButton(nextButton);
	const positionNow = getPosition(lightbox, imageList);
	if (positionNow != null) {
		const newPosition = getNextPosition(positionNow, length);
		scrollTo(newPosition, lightbox, imageList);
	}
};

let previouslyFocused: Element | undefined;
const open = async (
	lightbox: HTMLElement,
	imageList: HTMLUListElement,
	position: number,
	handleKeydown: (event: KeyboardEvent) => void,
) => {
	log('dotcom', '💡 Opening lightbox.');
	// Remember where we were so we can restore focus
	if (document.activeElement) previouslyFocused = document.activeElement;
	// We use this class to prevent the main page from scrolling in the background while lightbox is open
	document.documentElement.classList.add('lightbox-open');
	// Show lightbox
	lightbox.removeAttribute('hidden');
	// Now we have the index of the image that was clicked, show it
	// in the lightbox
	scrollTo(position, lightbox, imageList);
	// We only want this listener active while the lightbox is open
	window.addEventListener('keydown', handleKeydown);
	// Try to open the lightbox in fullscreen mode. This may fail
	try {
		await requestFullscreen(lightbox);
	} catch {
		// Do nothing, requests to open fullscreen are just requests and can fail
	}
};

const closeLightbox = (
	lightbox: HTMLElement,
	handleKeydown: (ev: KeyboardEvent) => void,
) => {
	// Re-enable scrolling
	document.documentElement.classList.remove('lightbox-open');
	// Hide lightbox
	lightbox.setAttribute('hidden', 'true');
	// Stop listening for keyboard shortcuts
	window.removeEventListener('keydown', handleKeydown);
};

const close = async (
	lightbox: HTMLElement,
	handleKeydown: (ev: KeyboardEvent) => void,
) => {
	log('dotcom', '💡 Closing lightbox.');
	await exitFullscreen();
	closeLightbox(lightbox, handleKeydown);
	history.back();
	previouslyFocused && restoreFocus(previouslyFocused);
};

const toggleInfo = (
	lightbox: HTMLElement,
	button: HTMLButtonElement,
	force?: 'hide' | 'show',
): void => {
	const action =
		force ?? (lightbox.classList.contains('hide-info') ? 'show' : 'hide');

	button.classList.toggle('active', action === 'show');
	lightbox.classList.toggle('hide-info', action === 'hide');
	storage.local.set('gu.prefs.lightbox-info', action);
};

/**
 * 💡 Lightbox
 *
 * `initialiseLightbox` contains the core javascript used to control the DCR lightbox.
 *
 * The lightbox works by keeping state in the url. When the url has an image hash in the form
 * `img-12` then the lightbox will open. As soon as it no longer has an img- hash, the lightbox
 * will close. This reactivity is achieved using event listeners.
 *
 * Like this, opening the lightbox is as simple as navigating to a url with a hash. To close
 * the lightbox you use history.back()
 *
 * Each image in the article that has a lightboxable image is overlayed with a transparent <a>
 * tag on the server. This <a> tag points to the hash value for the image, e.g. `href="#img-2"`.
 * Like this, when a reader clicks on an image it fires the <a> tag, mutates the url, and
 * triggers hydration for lightbox (we hydrate on 'hash') causing lightbox to open
 *
 */

const initialiseLightbox = (lightbox: HTMLElement) => {
	log('dotcom', '💡 Initialising lightbox');

	// --------------------------------------------------------------------------------
	// SELECTORS
	//
	// We start by defining some variables that reference parts of the dom. These page
	// parts are either on the document or in the lightbox element itself
	// --------------------------------------------------------------------------------
	// Lightbox selectors
	const nextButton = lightbox.querySelector<HTMLButtonElement>('button.next');
	const previousButton =
		lightbox.querySelector<HTMLButtonElement>('button.previous');
	const infoButton = lightbox.querySelector<HTMLButtonElement>('button.info');
	const closeButton =
		lightbox.querySelector<HTMLButtonElement>('button.close');
	/**
	 * imageList is the horizontal list of all images. We use it to scroll left and right
	 * effectively navigating the lightbox
	 */
	const imageList = lightbox.querySelector<HTMLUListElement>('ul');
	const pictures =
		lightbox.querySelectorAll<HTMLPictureElement>('li picture');
	const images = Array.from(
		lightbox.querySelectorAll<HTMLImageElement>('li img'),
	);

	const captionLinks =
		lightbox.querySelectorAll<HTMLAnchorElement>('li aside a');

	if (!imageList) return;
	if (!closeButton) return;
	if (!previousButton) return;
	if (!nextButton) return;
	if (!infoButton) return;

	// --------------------------------------------------------------------------------
	// FUNCTIONS
	// --------------------------------------------------------------------------------

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.ctrlKey || event.metaKey || event.altKey) return;
		switch (event.code) {
			case 'Tab': {
				event.preventDefault();
				const tabableElements = getTabableElements(lightbox, imageList);
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
				return goBack(lightbox, images, previousButton, imageList);
			case 'ArrowRight':
				return goForward(lightbox, images, nextButton, imageList);
			case 'KeyI':
				return toggleInfo(lightbox, infoButton);
			case 'ArrowUp':
				return toggleInfo(lightbox, infoButton, 'show');
			case 'ArrowDown':
				return toggleInfo(lightbox, infoButton, 'hide');
			case 'KeyQ':
			case 'Escape':
				return void close(lightbox, handleKeydown);
		}
	};

	// --------------------------------------------------------------------------------
	// EVENT LISTENERS
	// --------------------------------------------------------------------------------
	for (const picture of pictures) {
		// Clicking on the image toggles the caption
		picture.addEventListener('mousedown', (event) => {
			toggleInfo(lightbox, infoButton);
			// We want to maintain focus so halt all further actions
			event.preventDefault();
			event.stopPropagation();
		});
	}

	imageList.addEventListener(
		'scroll',
		libDebounce(
			() => {
				const currentPosition = getPosition(lightbox, imageList);
				if (isUndefined(currentPosition)) return;
				const positionIndicator =
					lightbox.querySelector<HTMLElement>('nav .selected'); // Eg. 2/4, as in image 2 of 4
				if (!positionIndicator) return;

				onSelect(
					positionIndicator,
					currentPosition,
					images.length,
					closeButton,
				);
				loadAdjacentImages(images, currentPosition);
			},
			150,
			{ leading: true },
		),
	);

	closeButton.addEventListener('click', () => {
		void close(lightbox, handleKeydown);
	});
	previousButton.addEventListener('click', () => {
		goBack(lightbox, images, previousButton, imageList);
	});
	nextButton.addEventListener('click', () => {
		goForward(lightbox, images, nextButton, imageList);
	});
	infoButton.addEventListener('click', () => {
		toggleInfo(lightbox, infoButton);
	});

	for (const link of captionLinks) {
		link.addEventListener('click', (event) => {
			// This prevents the event listener from this element's LI parent
			// from firing. That LI event listener would have tried to hide the
			// caption but the reader clicked a link inside the caption so they
			// want to navigate, not hide stuff, and if we did hide it it would
			// cause a weird flash
			event.stopPropagation();
		});
	}

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
					closeLightbox(lightbox, handleKeydown);
					history.back();
					previouslyFocused && restoreFocus(previouslyFocused);
				}
			}
		});
	}

	/**
	 * popstate is fired when a user goes back or forward, either using buttons
	 * or the keyboard or via history.back() or history.forward()
	 *
	 * We use the url as the source of truth so we open and close the lightbox
	 * here depending on if we have an img hash or not.
	 */
	window.addEventListener('popstate', () => {
		const hash = window.location.hash;
		if (hash.startsWith('#img-') && !lightbox.hasAttribute('open')) {
			const position = parseInt(hash.substring(5), 10);
			void open(lightbox, imageList, position, handleKeydown);
		} else {
			// There's no img hash so close the lightbox
			void exitFullscreen();
			closeLightbox(lightbox, handleKeydown);
			previouslyFocused && restoreFocus(previouslyFocused);
		}
	});

	// --------------------------------------------------------------------------------
	// STARTUP
	// This code is run once when the lightbox first opens
	// --------------------------------------------------------------------------------

	// Check the user's preferences to decide if we show the caption or not
	const info = storage.local.get('gu.prefs.lightbox-info');
	if (info === 'hide') toggleInfo(lightbox, infoButton, 'hide');

	// Open the lightbox at the position given in the url hash
	const { hash } = window.location;
	if (hash.startsWith('#img-')) {
		const position = parseInt(hash.substring(5), 10);
		void open(lightbox, imageList, position, handleKeydown);
	}

	// Mark the lightbox as ready so that we don't try to re-initialise it later
	lightbox.setAttribute('data-island-status', 'rendered');
};

const useElementById = (id: string) => {
	const [element, setElement] = useState<HTMLElement>();

	useEffect(() => {
		setElement(window.document.getElementById(id) ?? undefined);
	}, [id]);

	return element;
};

export const LightboxJavascript = ({
	format,
	images,
}: {
	format: ArticleFormat;
	images: ImageForLightbox[];
}) => {
	/**
	 * Hydration has been requested so the first step is to render the list of images and put them into
	 * the DOM
	 *
	 * LightboxLayout provides a marker for where these images should go `ul#lightbox-images`. We look for
	 * this and then use createPortal to insert LightboxImages into this location.
	 *
	 * Why do we do this here, and not on the server?
	 * Because the size of the html generated by LightboxImages is very large (because the Picture element
	 * is so verbose) and we don't want every page view to have to download it, only those that are opening
	 * lightbox
	 */
	const root = useElementById('lightbox-images');
	const lightbox = useElementById('gu-lightbox');
	const [initialised, setInitialised] = useState(false);

	useEffect(() => {
		if (!lightbox) return;
		if (initialised) {
			log('dotcom', '💡 Lightbox already initialised, skipping');
			return;
		}
		initialiseLightbox(lightbox);
		setInitialised(true);
	}, [initialised, lightbox]);

	if (!root || !lightbox) return null;

	log('dotcom', '💡 Generating HTML for lightbox images...');
	return createPortal(
		<LightboxImages format={format} images={images} />,
		root,
	);
};
