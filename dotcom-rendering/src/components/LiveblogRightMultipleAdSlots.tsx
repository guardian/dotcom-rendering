import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { isServer } from '../lib/isServer';
import {
	AD_CONTAINER_HEIGHT,
	PADDING_BOTTOM,
	SPACE_BETWEEN_ADS,
} from '../lib/liveblog-right-ad-constants';
import { AdSlot } from './AdSlot';

const rightColumn: HTMLElement | null = !isServer
	? window.document.querySelector('[data-gu-name="right-column"]')
	: null;

const calculateNumAdsThatFit = (rightColHeight: number) => {
	if (rightColHeight < AD_CONTAINER_HEIGHT) return 0;

	return (
		Math.floor(
			(rightColHeight - PADDING_BOTTOM + SPACE_BETWEEN_ADS) /
				(AD_CONTAINER_HEIGHT + SPACE_BETWEEN_ADS),
		) || 1
	);
};

const rightAdContainerStyles = css`
	height: 100%;
	max-height: 100%;
	width: 300px;
	display: flex;
	flex-direction: column;
	gap: ${SPACE_BETWEEN_ADS}px;
	padding-bottom: ${PADDING_BOTTOM}px;
`;

type Props = {
	display?: ArticleDisplay;
	isPaidContent?: boolean;
};

export const LiveblogRightMultipleAdSlots = ({
	display,
	isPaidContent,
}: Props) => {
	const [rightColHeight, setRightColHeight] = useState<number | null>(null);
	const [numberAdvertsThatFit, setNumberAdvertsThatFit] = useState<number>(0);
	const [numberAdvertsInserted, setNumberAdvertsInserted] = useState<number>(0);

	useEffect(() => {
		if (rightColHeight === null) return;

		const numAdsThatFit = calculateNumAdsThatFit(rightColHeight);
		setNumberAdvertsThatFit(numAdsThatFit);
	}, [rightColHeight]);

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
					const newRightColHeight = Math.round(entry.contentRect.height);
					setRightColHeight(newRightColHeight);
				}
			},
		);

		if (rightColumn !== null) {
			setRightColHeight(rightColumn.offsetHeight);
			resizeObserver.observe(rightColumn);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	if (numberAdvertsThatFit === 0) return null;

	return (
		<div id="right-ad-container" css={[rightAdContainerStyles]}>
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
