import { AdSlot as BridgetAdSlot } from '@guardian/bridget/AdSlot';
import { PurchaseScreenReason } from '@guardian/bridget/PurchaseScreenReason';
import type { IRect as BridgetRect } from '@guardian/bridget/Rect';
import { breakpoints } from '@guardian/source/foundations';
import type { Breakpoint } from '@guardian/source/foundations';
import libDebounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
	getAcquisitionsClient,
	getCommercialClient,
	getUserClient,
} from '../lib/bridgetApi';
import { useMatchMedia } from '../lib/useMatchMedia';
import {
	adPlaceholderClass,
	rightAdsPlaceholderClass,
} from './AdPlaceholder.apps';
import { AdSlot } from './AdSlot.apps';

const calculateAdPosition = (element: Element): BridgetRect => {
	const elementRect = element.getBoundingClientRect();

	const scrollLeft =
		document.scrollingElement !== null
			? document.scrollingElement.scrollLeft
			: document.body.scrollLeft;
	const scrollTop =
		document.scrollingElement !== null
			? document.scrollingElement.scrollTop
			: document.body.scrollTop;

	/**
	 * Potential optimisation: round these numbers so they are less specific
	 * when we compare past and current ad positions. This may result in fewer
	 * calls to Bridget to update ad positions.
	 */
	return {
		x: elementRect.left + scrollLeft,
		y: elementRect.top + scrollTop,
		width: elementRect.width,
		height: elementRect.height,
	};
};

const positionsEqual = (a: BridgetRect, b: BridgetRect): boolean =>
	a.height === b.height && a.width === b.width && a.x === b.x && a.y === b.y;

const calculateAdPositions = (adSlots: HTMLDivElement[]): BridgetAdSlot[] =>
	adSlots.map(
		(slot, index) =>
			new BridgetAdSlot({
				rect: calculateAdPosition(slot),
				isSquare: index === 0,
			}),
	);

const adsHaveMoved = (
	oldPositions: BridgetAdSlot[],
	newPositions: BridgetAdSlot[],
): boolean =>
	newPositions.some((newPosition, index) => {
		const oldPositionRect = oldPositions[index]?.rect;

		if (oldPositionRect === undefined) {
			return false;
		} else {
			return !positionsEqual(newPosition.rect, oldPositionRect);
		}
	});

const updateAds = (positions: BridgetAdSlot[]) =>
	getCommercialClient()
		.updateAdverts(positions)
		.catch(() => console.error('Error updating adverts'));

const debounceUpdateAds = libDebounce(updateAds, 100, { leading: true });

/* ********* AD PORTALS ********* \
 * AD POSITIONS IN RIGHT COLUMN
 * If we're on a screen bigger than the `rightAlignFrom` prop (defaults to desktop)
 * We attempt to find the right aligned ad placeholder
 * If we find it, we create a single portal for the right aligned adverts
 * And include the individual adverts inside it (spaced out using flexbox)
 * .________._________________.________.
 * |        |_________________|        |
 * |        |_________________|########|
 * |        |_________________|        |
 * |        |_________________|        |
 * |        |_________________|########|
 * |________|_________________|________|
 *
 *
 * INLINE ADVERTS
 * If we're on a screen smaller than the `rightAlignFrom` prop (defaults to desktop)
 * Or we are unable to find the right aligned ad placeholder
 * We fall back to the inline ad placeholders
 * And we create individual portals for each inline advert
 * .________________.
 * |________________|
 * |################|
 * |________________|
 * |________________|
 * |################|
 * .________________.
 *
 */

export const AdPortals = ({
	rightAlignFrom = 'desktop',
}: {
	// In most cases, we want to try to display ads in the right column from desktop upwards.
	// For blogs, we want right aligned from wide upwards.
	rightAlignFrom?: Breakpoint;
}) => {
	// Server-rendered placeholder elements for inline ad slots to be inserted into (below desktop breakpoint)
	const [adPlaceholders, setAdPlaceholders] = useState<Element[]>([]);
	// Server-rendered placeholder elements for right aligned ad slots to be inserted into (above desktop breakpoint)
	const [rightAdPlaceholder, setRightAdPlaceholder] = useState<Element>();
	// References to client-side rendered ad slots.
	const adSlots = useRef<HTMLDivElement[]>([]);
	// Reset list of ad slot references, they're re-populated during rendering
	adSlots.current = [];
	// Positions of client-side rendered ad slots.
	const adPositions = useRef<BridgetAdSlot[]>([]);
	// The height of the body element.
	const bodyHeight = useRef(0);
	const tryRightAligned = useMatchMedia(
		`(min-width: ${breakpoints[rightAlignFrom]}px)`,
	);

	/**
	 * Setup Ads
	 *
	 * After first render, and only after first render, check if the user has
	 * the premium tier. If not, set up ads by looking for ad placeholder
	 * elements in the page and storing them. These will be used to render
	 * client-side ad slots.
	 */
	useEffect(() => {
		void getUserClient()
			.isPremium()
			.then((isPremium) => {
				if (!isPremium) {
					setAdPlaceholders(
						Array.from(
							document.getElementsByClassName(adPlaceholderClass),
						),
					);
					setRightAdPlaceholder(
						document.getElementsByClassName(
							rightAdsPlaceholderClass,
						)[0],
					);
				}
			})
			.catch(() => console.error('Error setting up ads'));
	}, []);

	/**
	 * Insert Ads
	 *
	 * Once the list of ad placeholders is available, the last render should
	 * have populated the client-side ad slots. We can use references to those
	 * ad slots to calculate their positions, and pass these to the native
	 * layer so that it can insert ads. If the number of ad slots doesn't match
	 * the number of placeholders, then the ad slot references haven't been set
	 * up correctly and we shouldn't try to insert or update ads.
	 *
	 * Update Ads
	 *
	 * Ask the native layer to update the positions of the adverts whenever the
	 * body element's height changes, because this typically means the ad slot
	 * positions will have changed. To minimise the number of calls to the
	 * native layer we:
	 * - Check the new ad positions against the previous ones to make sure
	 * they've changed.
	 * - Debounce any calls to the Bridget `updateAdverts` method.
	 */
	useEffect(() => {
		let resizeObserver: ResizeObserver | undefined = undefined;

		if (
			adPlaceholders.length !== 0 &&
			adPlaceholders.length === adSlots.current.length
		) {
			adPositions.current = calculateAdPositions(adSlots.current);
			bodyHeight.current = document.body.clientHeight;
			void getCommercialClient()
				.insertAdverts(adPositions.current)
				.catch(() => console.error('Error inserting ads'));

			resizeObserver = new ResizeObserver((entries) => {
				if (
					entries[0] !== undefined &&
					entries[0].target.clientHeight !== bodyHeight.current
				) {
					bodyHeight.current = entries[0].target.clientHeight;
					const newAdPositions = calculateAdPositions(
						adSlots.current,
					);

					if (adsHaveMoved(adPositions.current, newAdPositions)) {
						void debounceUpdateAds(newAdPositions);
						adPositions.current = newAdPositions;
					}
				}
			});

			resizeObserver.observe(document.body);

			/**
			 *  Observe the rightAdPlaceholder which contains most viewed, which may render after the
			 *  ad portals have been set up (pushing down the ad slots)
			 **/
			if (tryRightAligned && rightAdPlaceholder) {
				resizeObserver.observe(rightAdPlaceholder);
			}
		}

		return () => resizeObserver?.disconnect();
	}, [adPlaceholders, rightAdPlaceholder, tryRightAligned]);

	const handleClickSupportButton = () => {
		void getAcquisitionsClient()
			.launchPurchaseScreen(PurchaseScreenReason.hideAds)
			.catch(() => console.error('Error launching purchase screen'));
	};

	const renderAdSlot = (id: string, index: number) => (
		<AdSlot
			key={id}
			isFirstAdSlot={index === 0}
			onClickSupportButton={handleClickSupportButton}
			ref={(node) => {
				if (node !== null) {
					adSlots.current = [...adSlots.current, node];
				}
			}}
		/>
	);

	if (tryRightAligned && rightAdPlaceholder) {
		return createPortal(
			<>
				{adPlaceholders.map((ad, index) => renderAdSlot(ad.id, index))}
			</>,
			rightAdPlaceholder,
		);
	}

	return (
		<>
			{adPlaceholders.map((ad, index) =>
				createPortal(renderAdSlot(ad.id, index), ad),
			)}
		</>
	);
};
