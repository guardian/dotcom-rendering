import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { MostViewedRight } from './MostViewedRight';

type Props = {
	limitItems?: number;
	renderAds: boolean;
};

/**
 * Wrapping MostViewedRight so we can determine whether or not there's enough vertical space in the container to render it
 */
export const MostViewedRightWrapper = ({ limitItems, renderAds }: Props) => {
	const adBlockerDetected = useAdBlockInUse();
	const [heightIsAvailable, setHeightIsAvailable] = useState<boolean>(false);

	// We don't always show the most viewed component - it depends on the length of the article
	// This effect determines whether to show the most viewed, depending on the computed height of the container
	useEffect(() => {
		const rightFurniture = document.querySelector<HTMLDivElement>(
			'[data-component="right-column-content"]',
		);
		const height = rightFurniture?.getBoundingClientRect().height;
		setHeightIsAvailable(height !== undefined && height >= 1600);
	}, []);

	if (!heightIsAvailable) {
		return null;
	}

	const stickToTop = !!adBlockerDetected || !renderAds;

	return (
		<div
			css={css`
				height: auto;
			`}
		>
			<MostViewedRight limitItems={limitItems} stickToTop={stickToTop} />
		</div>
	);
};
