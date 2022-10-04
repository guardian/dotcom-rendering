import { AdSlot } from '@guardian/bridget/AdSlot';
import { Image } from '@guardian/bridget/Image';
import { PurchaseScreenReason } from '@guardian/bridget/PurchaseScreenReason';
import type { IRect } from '@guardian/bridget/Rect';
import { Rect } from '@guardian/bridget/Rect';
import { VideoSlot } from '@guardian/bridget/VideoSlot';
import { errorToString, isObject, memoise } from 'lib';
import { logger } from 'logger';
import {
	acquisitionsClient,
	analyticsClient,
	commercialClient,
	galleryClient,
	userClient,
	videoClient,
} from '../native/nativeApi';

const TEADS_ENABLED = true;

type Slot = AdSlot | VideoSlot;

function areRectsEqual(rectA: IRect, rectB: IRect): boolean {
	return (
		rectA.height === rectB.height &&
		rectA.width === rectB.width &&
		rectA.x === rectB.x &&
		rectA.y === rectB.y
	);
}

function positionChanged(slotsA: Slot[], slotsB: Slot[]): boolean {
	if (slotsA.length !== slotsB.length) return true;
	return !slotsA.every((slot, index) =>
		areRectsEqual(slot.rect, slotsB[index].rect),
	);
}

function getRect(slotPosition: DOMRect): Rect {
	const scrollLeft = document.scrollingElement
		? document.scrollingElement.scrollLeft
		: document.body.scrollLeft;
	const scrollTop = document.scrollingElement
		? document.scrollingElement.scrollTop
		: document.body.scrollTop;

	return new Rect({
		x: slotPosition.left + scrollLeft,
		y: slotPosition.top + scrollTop,
		width: slotPosition.width,
		height: slotPosition.height,
	});
}

const getTargetingParams: () => Map<string, string> = memoise(() => {
	const content =
		document.getElementById('targeting-params')?.innerHTML ?? '{}';
	const parsed: unknown = JSON.parse(content);
	const map = new Map<string, string>();

	if (!isObject(parsed)) {
		return map;
	}

	for (const key in parsed) {
		const value = parsed[key];

		if (typeof value === 'string') {
			map.set(key, value);
		}
	}

	return map;
});

function getAdSlots(): AdSlot[] {
	const advertSlots = document.getElementsByClassName('ad-slot');
	const targetingParams = getTargetingParams();

	if (advertSlots.length === 0) {
		return [];
	}

	return Array.from(advertSlots).map((adSlot, idx) => {
		/* eslint-disable @typescript-eslint/no-unnecessary-condition --
		To easily turn teads square ads on, we can use the TEADS_ENABLED boolean flag above
		Therefore we need to disable a rule for unnecessary conditions. */
		const isSquare = TEADS_ENABLED && idx === 0;
		if (isSquare) {
			adSlot.classList.add('ad-slot-square');
		}
		const slotPosition = adSlot.getBoundingClientRect();
		return new AdSlot({
			rect: getRect(slotPosition),
			targetingParams,
			isSquare,
		});
		/* eslint-enable @typescript-eslint/no-unnecessary-condition */
	});
}

function insertAds(): void {
	const adSlots = getAdSlots();
	if (adSlots.length > 0) {
		void commercialClient.insertAdverts(adSlots);
	}
}

function ads(): void {
	void userClient.isPremium().then((premiumUser) => {
		if (!premiumUser) {
			const articleLength =
				document.querySelector('.js-article')?.getBoundingClientRect()
					.bottom ?? Infinity;
			const placeholders = Array.from(
				document.querySelectorAll('.ad-placeholder'),
			);
			placeholders.forEach((placeholder) =>
				placeholder.classList.remove('hidden'),
			);
			placeholders
				.filter(
					(slot) =>
						slot.getBoundingClientRect().bottom > articleLength,
				)
				.forEach((slot) => slot.remove());

			insertAds();
			Array.from(
				document.querySelectorAll('.ad-labels, .support-banner button'),
			).forEach((adLabel) => {
				adLabel.addEventListener('click', () => {
					void acquisitionsClient.launchPurchaseScreen(
						PurchaseScreenReason.hideAds,
					);
				});
			});
		}
	});
}

function getImageWidth(src: string): number {
	const url = new URL(src);
	const width = parseInt(url.searchParams.get('width') ?? '0');
	const dpr = window.devicePixelRatio >= 1.25 ? 2 : 1;
	return Math.max(screen.height * dpr, screen.width * dpr, width);
}

function launchSlideshow(src: string | null): void {
	const images = Array.from(
		document.querySelectorAll('.js-launch-slideshow'),
	);
	const title = document.title;
	const imagesWithCaptions: Image[] = images.flatMap((image: Element) => {
		if (image instanceof HTMLImageElement) {
			const url = image.currentSrc === '' ? image.src : image.currentSrc;
			const caption = image.getAttribute('data-caption') ?? undefined;
			const credit = image.getAttribute('data-credit') ?? undefined;
			const width = getImageWidth(url);
			const height =
				width * parseFloat(image.getAttribute('data-ratio') ?? '0.56');
			if (isNaN(width) || isNaN(height)) {
				return [];
			}
			return new Image({ url, caption, credit, width, height });
		} else {
			return [];
		}
	});
	const clickedImageIndex = images.findIndex(
		(image: Element) => image.getAttribute('src') === src,
	);
	if (imagesWithCaptions.length && clickedImageIndex >= 0) {
		void galleryClient.launchSlideshow(
			imagesWithCaptions,
			clickedImageIndex,
			title,
		);
	}
}

function slideshow(): void {
	const images = document.querySelectorAll('.js-launch-slideshow');
	Array.from(images).forEach((image: Element) =>
		image.addEventListener('click', (e: Event) => {
			launchSlideshow(image.getAttribute('src'));
		}),
	);
}

function getVideoSlots(): VideoSlot[] {
	const videoSlots = document.querySelectorAll('.js-native-video');

	if (videoSlots.length === 0) {
		return [];
	}

	return Array.from(videoSlots).reduce((slots: VideoSlot[], elem) => {
		const slotPosition = elem.getBoundingClientRect();
		const videoId = elem.getAttribute('data-videoid');
		const posterUrl = elem.getAttribute('data-posterurl');
		const durationString = elem.getAttribute('data-duration');
		const rect = getRect(slotPosition);
		if (videoId && posterUrl) {
			if (durationString && !isNaN(parseInt(durationString))) {
				const duration = parseInt(durationString);
				return [
					...slots,
					new VideoSlot({ rect, videoId, posterUrl, duration }),
				];
			} else {
				return [...slots, new VideoSlot({ rect, videoId, posterUrl })];
			}
		}
		return slots;
	}, []);
}

function videos(): void {
	const videoSlots = getVideoSlots();
	if (videoSlots.length > 0) {
		void videoClient.insertVideos(videoSlots);
	}
}

function reportNativeElementPositionChanges(): void {
	let adSlots = getAdSlots();
	let videoSlots = getVideoSlots();

	const targetNode = document.querySelector('html') as Node;
	const config: MutationObserverInit = {
		childList: true,
		subtree: true,
		attributeFilter: ['style'],
	};
	const callback = function (): void {
		const currentAdSlots = getAdSlots();
		const currentVideoSlots = getVideoSlots();

		if (positionChanged(currentAdSlots, adSlots)) {
			adSlots = currentAdSlots;
			void commercialClient.updateAdverts(currentAdSlots);
		}

		if (positionChanged(currentVideoSlots, videoSlots)) {
			videoSlots = currentVideoSlots;
			void videoClient.updateVideos(currentVideoSlots);
		}
	};

	let currentAnimationFrame: number | null = null;
	window.addEventListener(
		'resize',
		() => {
			if (currentAnimationFrame !== null) {
				window.cancelAnimationFrame(currentAnimationFrame);
			}
			currentAnimationFrame = window.requestAnimationFrame(callback);
		},
		false,
	);

	window.addEventListener('load', callback);

	const observer = new MutationObserver(callback);
	observer.observe(targetNode, config);

	try {
		void document.fonts.ready.then(() => {
			void commercialClient.updateAdverts(getAdSlots());
			void videoClient.updateVideos(getVideoSlots());
		});
	} catch (e) {
		logger.error(
			`font loading API not supported: ${errorToString(
				e,
				'unknown reason',
			)}`,
		);
	}
}

function sendTargetingParams(): void {
	const targetingParams = getTargetingParams();
	void analyticsClient.sendTargetingParams(targetingParams);
}

export {
	ads,
	slideshow,
	videos,
	reportNativeElementPositionChanges,
	sendTargetingParams,
	getAdSlots,
};
