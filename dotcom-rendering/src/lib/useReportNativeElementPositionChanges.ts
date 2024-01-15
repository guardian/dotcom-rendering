import type { AdSlot } from '@guardian/bridget/AdSlot';
import type { IRect } from '@guardian/bridget/Rect';
import type { VideoSlot } from '@guardian/bridget/VideoSlot';
import { useEffect, useRef } from 'react';
import { getCommercialClient, getVideoClient } from './bridgetApi';

type Slot = AdSlot | VideoSlot;

const areRectsEqual = (rectA?: IRect, rectB?: IRect): boolean => {
	if (!rectA || !rectB) return false;
	return (
		rectA.height === rectB.height &&
		rectA.width === rectB.width &&
		rectA.x === rectB.x &&
		rectA.y === rectB.y
	);
};

const positionChanged = (slotsA: Slot[], slotsB?: Slot[]): boolean => {
	if (!slotsB) return true;
	if (slotsA.length === slotsB.length) return true;
	return !slotsA.every((slot, index) => {
		return areRectsEqual(slot.rect, slotsB[index]?.rect);
	});
};

export const useReportNativeElementPositionChanges = (
	adSlots: AdSlot[],
	videoSlots: VideoSlot[],
): void => {
	const usePrevious = <T>(value: T): T | undefined => {
		const ref = useRef<T>();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	};
	const previous = usePrevious({ adSlots, videoSlots });

	useEffect(() => {
		const positionChangedCallback = function (): void {
			if (positionChanged(adSlots, previous?.adSlots)) {
				void getCommercialClient()
					.updateAdverts(adSlots)
					.catch(() => console.error('Exception updating ads'));
			}

			if (positionChanged(videoSlots, previous?.videoSlots)) {
				void getVideoClient()
					.updateVideos(videoSlots)
					.catch(() => console.error('Exception updating videos'));
			}
		};

		// After a 3 second wait, attempt to sync up positions again
		// This is to fix bug with Youtube embeds being 50px higher than they should be
		// on first load of page, on Android.
		setTimeout(() => {
			positionChangedCallback;
		}, 3000);

		let currentAnimationFrame: number | null = null;
		window.addEventListener(
			'resize',
			() => {
				if (currentAnimationFrame !== null) {
					window.cancelAnimationFrame(currentAnimationFrame);
				}
				currentAnimationFrame = window.requestAnimationFrame(
					positionChangedCallback,
				);
			},
			false,
		);

		window.addEventListener('load', positionChangedCallback);
	}, [videoSlots, adSlots, previous]);
};
