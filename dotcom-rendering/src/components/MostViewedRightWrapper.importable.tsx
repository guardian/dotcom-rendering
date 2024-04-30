import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { MostViewedRight } from './MostViewedRight';

type Props = {
	componentDataAttribute: string;
	maxHeightPx: number;
	limitItems?: number;
	renderAds: boolean;
};

/**
 * Wrapping `MostViewedRight` so we can determine whether or not
 * there's enough vertical space in the container to render it.
 *
 * ## Why does this need to be an Island?
 *
 * We may show the most viewed component depending on the length of the article,
 * based on the computed height of the container.
 *
 * ---
 *
 * (No visual story exists)
 */
export const MostViewedRightWrapper = ({
	componentDataAttribute,
	maxHeightPx,
	limitItems,
	renderAds,
}: Props) => {
	const adBlockerDetected = useAdBlockInUse();
	const [heightIsAvailable, setHeightIsAvailable] = useState<boolean>(false);

	// We don't always show the most viewed component - it depends on the length of the article
	// This effect determines whether to show the most viewed, depending on the computed height of the container
	useEffect(() => {
		const containingElement = document.querySelector<HTMLDivElement>(
			`[data-container="${componentDataAttribute}"]`,
		);
		const height = containingElement?.getBoundingClientRect().height;
		setHeightIsAvailable(height !== undefined && height >= maxHeightPx);
	}, [componentDataAttribute, maxHeightPx]);

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
