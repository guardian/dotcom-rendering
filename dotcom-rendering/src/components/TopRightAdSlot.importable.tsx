import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import { useAB } from '../lib/useAB';

/**
 * # Top Right Ad Slot
 *
 * This component NORMALLY decides if we should render the `ShadyPie` or not.
 *
 * **Currently**, `ShadyPie` is  disabled, pending the rollout
 * of the new supporter plus product.
 *
 * ## Why does this need to be an Island?
 *
 * It relies on running `useAdBlockInUse` on the client.
 *
 * **Currently**, it does not need to be.
 *
 * ---
 *
 * (No visual story exists)
 */
export const TopRightAdSlot = ({
	adStyles,
	isPaidContent,
}: {
	adStyles: SerializedStyles[];
	isPaidContent: boolean;
}) => {
	const ABTestAPI = useAB()?.api;
	const shouldRestrictRightAdStickyHeight =
		ABTestAPI?.isUserInVariant(
			'LiveblogRightColumnAds',
			'minimum-stickiness',
		) ?? false;

	return (
		<div
			id="top-right-ad-slot"
			className="ad-slot-container"
			css={[
				css`
					position: static;
					height: 100%;
					max-height: ${shouldRestrictRightAdStickyHeight ? '1059px' : '100%'};
				`,
				adStyles,
			]}
		>
			<div
				id="dfp-ad--right"
				className={[
					'js-ad-slot',
					'ad-slot',
					'ad-slot--right',
					'ad-slot--mpu-banner-ad',
					'ad-slot--rendered',
					'js-sticky-mpu',
				].join(' ')}
				css={[
					css`
						position: sticky;
						/* Possibly account for the sticky Labs header and 6px of padding */
						top: ${isPaidContent ? LABS_HEADER_HEIGHT + 6 : 0}px;
					`,
					adStyles,
				]}
				data-link-name="ad slot right"
				data-name="right"
				aria-hidden="true"
			/>
		</div>
	);
};
