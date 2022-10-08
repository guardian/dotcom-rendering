import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticlePillar, getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import type { EditionId } from '../../types/edition';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import { useAB } from '../lib/useAB';
import { useAdBlockInUse } from '../lib/useAdBlockInUse';
import { ShadyPie } from './ShadyPie';

const MOSTVIEWED_STICKY_HEIGHT = 1059;

/**
 * TopRightAdSlot decides if we should render the ShadyPie or not
 *
 * The rules for when to show <ShadyPie /> are:
 *
 *  1. An ad blocker has been detected
 *  2. The reader is not signed in
 *  3. shouldHideReaderRevenue is false ("Prevent membership/contribution appeals" is not
 *     checked in Composer)
 *  4. The article is not paid content
 *  5. We're not on the server
 *
 * @returns either the ShadyPie image the standard top right ad slot
 */
export const TopRightAdSlot = ({
	adStyles,
	shouldHideReaderRevenue,
	isPaidContent,
	editionId,
	format,
}: {
	adStyles: SerializedStyles[];
	shouldHideReaderRevenue: boolean;
	isPaidContent: boolean;
	editionId?: EditionId;
	format?: ArticleFormat;
}) => {
	const adBlockerDetected = useAdBlockInUse();
	const [isShady, setIsShady] = useState(false);

	const ABTestAPI = useAB();

	const userInShadyPieTestVariant =
		ABTestAPI?.isUserInVariant('ShadyPieClickThrough', 'variant') &&
		format?.theme == ArticlePillar.Lifestyle;

	useEffect(() => {
		const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
		setIsShady(
			(adBlockerDetected || !!userInShadyPieTestVariant) &&
				!isSignedIn &&
				!shouldHideReaderRevenue &&
				!isPaidContent,
		);
	}, [
		shouldHideReaderRevenue,
		isPaidContent,
		adBlockerDetected,
		userInShadyPieTestVariant,
	]);

	if (!isShady) {
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
							top: ${isPaidContent
								? LABS_HEADER_HEIGHT + 6
								: 0}px;
						`,
						adStyles,
					]}
					data-link-name="ad slot right"
					data-name="right"
					aria-hidden="true"
				/>
			</div>
		);
	} else {
		return (
			<ShadyPie
				format={format}
				editionId={editionId}
				abTest={userInShadyPieTestVariant}
			/>
		);
	}
};
