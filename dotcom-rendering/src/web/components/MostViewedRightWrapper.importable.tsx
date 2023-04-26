import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { MostViewedRight } from './MostViewedRight';

type Props = {
	limitItems?: number;
	renderAds: boolean;
};

/**
 * Assume a typical height for the most viewed component
 *
 * The actual height can be vary based on the length of the links,
 * so could be larger than this
 */
const ASSUMED_MOST_VIEWED_HEIGHT = 482 + 24 + 24;

/**
 * The maximum height that can be occupied by an advert in the right column
 */
const MAX_ADVERT_HEIGHT = 600;

/**
 * The minimum space we'd like to require between the ad and the Most Viewed component in order to show Most Viewed
 */
const MIN_SPACE_BETWEEN = 200;

/**
 * The total height required is equal to sum of the three things above:
 */
const HEIGHT_REQUIRED =
	ASSUMED_MOST_VIEWED_HEIGHT + MAX_ADVERT_HEIGHT + MIN_SPACE_BETWEEN;

/**
 * Wrapping MostViewedRight so we can determine whether or not there's enough vertical space in the container to render it
 */
export const MostViewedRightWrapper = ({ limitItems, renderAds }: Props) => {
	const adBlockerDetected = useAdBlockInUse();
	const [heightIsAvailable, setHeightIsAvailable] = useState<boolean>(false);

	// We don't always show the most viewed component - it depends on the length of the article
	// This effect determines whether to show the most viewed, depending on the computed height of the
	// RightFurniture container
	useEffect(() => {
		const rightFurniture = document.querySelector<HTMLDivElement>(
			'[data-component="right-furniture"]',
		);
		const height = rightFurniture?.getBoundingClientRect().height;
		setHeightIsAvailable(height !== undefined && height >= HEIGHT_REQUIRED);
	}, []);

	if (!heightIsAvailable) {
		return null;
	}

	return (
		<div
			css={css`
				height: auto;
			`}
		>
			<MostViewedRight
				limitItems={limitItems}
				renderAds={renderAds}
				adBlockerDetected={!!adBlockerDetected}
			/>
		</div>
	);
};
