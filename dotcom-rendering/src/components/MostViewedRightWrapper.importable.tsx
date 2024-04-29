import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useAB } from '../lib/useAB';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { DeeplyReadRight } from './DeeplyReadRight';
import { MostViewedDeeplyReadRight } from './MostViewedDeeplyReadRight';
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
	const ABTestAPI = useAB()?.api;
	const inDeeplyReadTestVariant =
		ABTestAPI?.isUserInVariant('DeeplyReadTest', 'deeply-read-only') ??
		false;
	const inMostViewedDeeplyReadTestVariant =
		ABTestAPI?.isUserInVariant(
			'DeeplyReadTest',
			'deeply-read-and-most-read',
		) ?? false;
	const inControlTestVariant =
		ABTestAPI?.isUserInVariant('DeeplyReadTest', 'control') ?? false;

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
			{(inControlTestVariant ||
				(!inDeeplyReadTestVariant &&
					!inMostViewedDeeplyReadTestVariant)) && (
				<MostViewedRight
					limitItems={limitItems}
					stickToTop={stickToTop}
				/>
			)}
			{inDeeplyReadTestVariant && (
				<DeeplyReadRight
					limitItems={limitItems}
					stickToTop={stickToTop}
				/>
			)}
			{inMostViewedDeeplyReadTestVariant && (
				<MostViewedDeeplyReadRight
					limitItems={limitItems}
					stickToTop={stickToTop}
				/>
			)}
		</div>
	);
};
