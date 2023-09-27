import { AdSlot as BridgetAdSlot } from '@guardian/bridget/AdSlot';
import { until, from } from '@guardian/source-foundations';
import { PurchaseScreenReason } from '@guardian/bridget/PurchaseScreenReason';
import type { IRect as BridgetRect } from '@guardian/bridget/Rect';
import libDebounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
	getAcquisitionsClient,
	getCommercialClient,
	getUserClient,
} from '../lib/bridgetApi';
import { AdSlot } from './AdSlot.apps';
import { css } from '@emotion/react';

const inlineAdStyles = css`
	${from.desktop} {
		position: none;
	}
`;
const rightAdStyles = css`
	${until.desktop} {
		position: none;
	}
`;

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
	getCommercialClient().updateAdverts(positions);

const debounceUpdateAds = libDebounce(updateAds, 100, { leading: true });

export const AdPortals = () => {
	// Server-rendered placeholder elements for ad slots to be inserted into.
	const [adPlaceholders, setAdPlaceholders] = useState<Element[]>([]);
	const [rightAdPlaceholder, setRightAdPlaceholder] = useState<Element>();
	// References to client-side rendered ad slots.
	const adSlots = useRef<HTMLDivElement[]>([]);
	// Positions of client-side rendered ad slots.
	const adPositions = useRef<BridgetAdSlot[]>([]);
	// The height of the body element.
	const bodyHeight = useRef(0);

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
							document.getElementsByClassName(
								'ad-portal-placeholder',
							),
						),
					);
					setRightAdPlaceholder(
						document.getElementsByClassName(
							'right-ad-portal-placeholder',
						)[0],
					);
				}
			});
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
			void getCommercialClient().insertAdverts(adPositions.current);

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
		}

		return () => resizeObserver?.disconnect();
	}, [adPlaceholders]);

	const handleClickSupportButton = () => {
		void getAcquisitionsClient().launchPurchaseScreen(
			PurchaseScreenReason.hideAds,
		);
	};

	console.log('*** rightAdPlaceholder', rightAdPlaceholder);
	console.log('*** adPlaceholders', adPlaceholders);

	return (
		<>
			<div css={inlineAdStyles}>
				{adPlaceholders.map((ad, index) =>
					createPortal(
						<AdSlot
							key={ad.id}
							isFirstAdSlot={index === 0}
							onClickSupportButton={handleClickSupportButton}
							ref={(node) => {
								if (node !== null) {
									adSlots.current = [
										...adSlots.current,
										node,
									];
								}
							}}
						/>,
						ad,
					),
				)}
			</div>
			{rightAdPlaceholder && (
				<div css={rightAdStyles}>
					{createPortal(
						<>
							{adPlaceholders.map((ad, index) => (
								<AdSlot
									key={ad.id}
									isFirstAdSlot={index === 0}
									onClickSupportButton={
										handleClickSupportButton
									}
									ref={(node) => {
										if (node !== null) {
											adSlots.current = [
												...adSlots.current,
												node,
											];
										}
									}}
								/>
							))}
						</>,
						rightAdPlaceholder,
					)}
				</div>
			)}
		</>
	);
};
