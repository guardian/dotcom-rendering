import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';

const MOSTVIEWED_STICKY_HEIGHT = 1059;

/**
 * TopRightAdSlot NORMALLY decides if we should render the ShadyPie or not
 *
 * ShadyPie is disabled, pending the rollout of the new supporter plus product
 */
export const TopRightAdSlot = ({
	adStyles,
	isPaidContent,
}: {
	adStyles: SerializedStyles[];
	isPaidContent: boolean;
}) => {
	return (
		<div
			id="top-right-ad-slot"
			css={css`
				position: static;
				height: ${MOSTVIEWED_STICKY_HEIGHT}px;
			`}
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
