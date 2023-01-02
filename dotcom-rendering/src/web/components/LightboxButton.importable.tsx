import { css } from '@emotion/react';
import { storage } from '@guardian/libs';
import { neutral, space, visuallyHidden } from '@guardian/source-foundations';
import { SvgArrowExpand } from '@guardian/source-react-components';
import libDebounce from 'lodash.debounce';
import { useEffect } from 'react';
import type { RoleType } from '../../types/content';

type Props = {
	elementId: string;
	role: RoleType;
};

function decideSize(role: RoleType) {
	switch (role) {
		case 'halfWidth':
		case 'supporting': {
			return css`
				height: 30px;
				width: 30px;
			`;
		}
		case 'inline':
		case 'showcase':
		case 'immersive':
		default: {
			return css`
				height: 44px;
				width: 44px;
			`;
		}
	}
}

function initialiseLightbox(lightbox: HTMLDialogElement) {
	// Document selectors
	const lightboxButtons = document.querySelectorAll<HTMLButtonElement>(
		'button.open-lightbox',
	);

	// Lightbox selectors
	const nextButton = lightbox.querySelector<HTMLButtonElement>('button.next');
	const previousButton =
		lightbox.querySelector<HTMLButtonElement>('button.previous');
	const infoButton = lightbox.querySelector<HTMLButtonElement>('button.info');
	const closeButton =
		lightbox.querySelector<HTMLButtonElement>('button.close');
	const positionDisplay = lightbox.querySelector<HTMLElement>('.selected');
	const imageList = lightbox.querySelector<HTMLElement>('ul');
	const LIs = lightbox.querySelectorAll('li');
	const images = lightbox.querySelectorAll('li img');
	const captionLinks = lightbox.querySelectorAll('li aside a');

	if (storage.local.get('gu.prefs.lightbox-hideinfo') === true) {
		hideInfo();
	} else {
		showInfo();
	}

	// Functions
	function select(position: number): void {
		if (positionDisplay) {
			positionDisplay.innerHTML = position.toString();
		}
	}

	function pulseButton(button: HTMLButtonElement): void {
		button.classList.add('selected');

		window.setTimeout(() => {
			button.classList.remove('selected');
		}, 75);
	}

	function scrollTo(position: number): void {
		const liWidth = lightbox.querySelector('li')?.clientWidth;
		if (!imageList || !liWidth) return;
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

	function getPosition(): number {
		const scrollPosition = imageList?.scrollLeft;
		const liWidth = lightbox.querySelector('li')?.clientWidth;
		if (liWidth && scrollPosition) {
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

	function loadAdjacentImages(currentPosition: number): void {
		function eagerLoad(position: number) {
			const allImages =
				lightbox.querySelectorAll<HTMLImageElement>('li img');
			const imgArray = allImages ? Array.from(allImages) : [];
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
		select(newPosition);
		scrollTo(newPosition);
		loadAdjacentImages(newPosition);
	}

	function goForward(): void {
		if (nextButton) pulseButton(nextButton);
		const positionNow = getPosition();
		const newPosition = getNextPosition(positionNow);
		select(newPosition);
		scrollTo(newPosition);
		loadAdjacentImages(newPosition);
	}

	function close(): void {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access , @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any -- because it's a known issue
		(lightbox as any)?.close(); // See: https://github.com/microsoft/TypeScript/issues/48267
	}

	function showInfo(): void {
		infoButton?.classList.add('selected');
		imageList?.classList.remove('hide-info');
		storage.local.set('gu.prefs.lightbox-hideinfo', false);
	}

	function hideInfo(): void {
		infoButton?.classList.remove('selected');
		imageList?.classList.add('hide-info');
		storage.local.set('gu.prefs.lightbox-hideinfo', true);
	}

	function toggleInfo(): void {
		if (imageList?.classList.contains('hide-info')) {
			showInfo();
		} else {
			hideInfo();
		}
	}

	// Event listeners
	lightboxButtons.forEach((button) => {
		button.addEventListener('click', () => {
			// We use this class to prevent the main page from scrolling
			document.documentElement.classList.add('lightbox-open');
			// Extract the element id for this image out of the button that was clicked on
			const elementId = button.dataset.elementId;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access , @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any -- because it's a known issue
			(lightbox as any)?.showModal(); // See: https://github.com/microsoft/TypeScript/issues/48267
			// Find the image inside the lightbox and get its index
			const imageWrapper: HTMLLIElement | null = elementId
				? lightbox.querySelector(`li[data-element-id="${elementId}"]`)
				: null;
			const stringIndex: string = imageWrapper?.dataset.index ?? '1';
			const indexOfImageClicked = parseInt(stringIndex);
			// Now we have the index of the image that was clicked, show it
			// in the lightbox
			select(indexOfImageClicked);
			scrollTo(indexOfImageClicked);
			loadAdjacentImages(indexOfImageClicked);
		});
	});

	LIs.forEach((LI) => {
		LI.addEventListener('click', () => {
			toggleInfo();
		});
	});

	lightbox.addEventListener('keydown', (event) => {
		switch (event.code) {
			case 'Tab': {
				// We're completely taking over tabbing to keep focus inside
				// the dialog
				event.preventDefault();
				switch (document.activeElement) {
					case closeButton:
						event.shiftKey
							? infoButton?.focus()
							: previousButton?.focus();
						break;
					case previousButton:
						event.shiftKey
							? closeButton?.focus()
							: nextButton?.focus();
						break;
					case nextButton:
						event.shiftKey
							? previousButton?.focus()
							: infoButton?.focus();
						break;
					case infoButton:
						event.shiftKey
							? nextButton?.focus()
							: closeButton?.focus();
						break;
					default:
						break;
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
		}
	});

	imageList?.addEventListener(
		'scroll',
		libDebounce(() => {
			const currentPosition = getPosition();
			select(currentPosition);
			loadAdjacentImages(currentPosition);
		}, 300),
	);

	closeButton?.addEventListener('click', () => {
		close();
	});

	previousButton?.addEventListener('click', () => {
		goBack();
	});

	nextButton?.addEventListener('click', () => {
		goForward();
	});

	infoButton?.addEventListener('click', () => {
		toggleInfo();
	});

	lightbox.addEventListener('close', () => {
		document.documentElement.classList.remove('lightbox-open');
	});

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
}

export const LightboxButton = ({ elementId, role }: Props) => {
	useEffect(() => {
		const lightbox =
			document.querySelector<HTMLDialogElement>('#gu-lightbox');
		if (lightbox) initialiseLightbox(lightbox);
	}, []);

	// Don't show the button over thumbnails; they're too small
	if (role === 'thumbnail') return null;
	return (
		<button
			data-element-id={elementId}
			type="button"
			className="open-lightbox"
			aria-haspopup="dialog"
			css={[
				css`
					position: absolute;
					top: 3px;
					right: 3px;
					svg {
						margin-top: 4px;
						fill: ${neutral[100]};
					}
					margin: ${space[2]}px;
					border-radius: 50%;
					border: none;
					cursor: pointer;
					background-color: ${neutral[46]};
					opacity: 0.7;
					:hover {
						filter: brightness(85%);
						opacity: 0.8;
					}
				`,
				decideSize(role),
			]}
		>
			<SvgArrowExpand />
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				View in fullscreen
			</span>
		</button>
	);
};
