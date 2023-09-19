import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import {
	AD_CONTAINER_HEIGHT,
	PADDING_BOTTOM,
	SPACE_BETWEEN_ADS,
	TOP_RIGHT_AD_STICKY_HEIGHT,
} from '../lib/liveblog-right-ad-constants';
import { useAB } from '../lib/useAB';
import { AdSlot } from './AdSlot.web';

export const calculateNumAdsThatFit = (rightColHeight: number) => {
	if (rightColHeight < AD_CONTAINER_HEIGHT) return 0;

	const rightAdTotalSpace = TOP_RIGHT_AD_STICKY_HEIGHT + SPACE_BETWEEN_ADS;
	const spaceForLiveblogAds =
		rightColHeight - rightAdTotalSpace - PADDING_BOTTOM;

	return Math.floor(
		(spaceForLiveblogAds + SPACE_BETWEEN_ADS) /
			(AD_CONTAINER_HEIGHT + SPACE_BETWEEN_ADS),
	);
};

const rightAdContainerStyles = css`
	width: 300px;
	display: flex;
	flex-direction: column;
	gap: ${SPACE_BETWEEN_ADS}px;
	margin-top: ${SPACE_BETWEEN_ADS}px;
	padding-bottom: ${PADDING_BOTTOM}px;
`;

type Props = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
};

/**
 * In the right hand column, there will be the right ad slot, followed
 * by as many liveblog-right ad slots that can fit
 *
 * ## Why does this need to be an Island?
 *
 * Ads are rendered client-side.
 *
 * ---
 *
 * (No visual story exists)
 */
export const LiveblogRightMultipleAdSlots = ({
	display,
	isPaidContent,
}: Props) => {
	const [rightColHeight, setRightColHeight] = useState<number | null>(null);
	const [numberAdvertsThatFit, setNumberAdvertsThatFit] = useState<number>(0);
	const [numberAdvertsInserted, setNumberAdvertsInserted] =
		useState<number>(0);

	// Recalculate whether we have room to insert a new ad
	// each time the height of the right column changes.
	useEffect(() => {
		if (rightColHeight === null) return;

		const numAdsThatFit = calculateNumAdsThatFit(rightColHeight);
		setNumberAdvertsThatFit(numAdsThatFit);
	}, [rightColHeight]);

	// If a new ad slot has been created, send an event
	// to commercial to fill the slot with an advert.
	useEffect(() => {
		if (numberAdvertsThatFit === numberAdvertsInserted) return;

		// Dispatch event to instruct commercial to display an ad in new slot(s).
		const event = new CustomEvent('liveblog-right-ads-inserted', {
			detail: {
				numAdsToInsert: numberAdvertsThatFit - numberAdvertsInserted,
				fromIndex: numberAdvertsInserted + 1,
			},
		});

		document.dispatchEvent(event);

		setNumberAdvertsInserted(numberAdvertsThatFit);
	}, [numberAdvertsThatFit, numberAdvertsInserted]);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(
			(entries: ResizeObserverEntry[]) => {
				for (const entry of entries) {
					const newRightColHeight = Math.round(
						entry.contentRect.height,
					);
					setRightColHeight(newRightColHeight);
				}
			},
		);

		const rightColumn: HTMLElement | null = window.document.querySelector(
			'[data-gu-name="right-column"]',
		);
		if (rightColumn !== null) {
			setRightColHeight(rightColumn.offsetHeight);
			resizeObserver.observe(rightColumn);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const ABTestAPI = useAB()?.api;
	const shouldInsertMultipleAdverts =
		ABTestAPI?.isUserInVariant(
			'LiveblogRightColumnAds',
			'multiple-adverts',
		) ?? false;

	if (!shouldInsertMultipleAdverts) return null;

	if (numberAdvertsThatFit === 0) return null;

	return (
		<div css={[rightAdContainerStyles]}>
			{[...new Array<undefined>(numberAdvertsThatFit)].map((_, i) => {
				return (
					<AdSlot
						key={i}
						position="liveblog-right"
						index={i + 1}
						display={display}
						isPaidContent={isPaidContent}
					/>
				);
			})}
		</div>
	);
};
