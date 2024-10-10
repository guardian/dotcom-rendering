import { css } from '@emotion/react';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/format';
import { RightAdsPlaceholder } from './AdPlaceholder.apps';
import { AdSlot } from './AdSlot.web';
import { useConfig } from './ConfigContext';
import { MostViewedRightWrapper } from './MostViewedRightWrapper';

type Props = {
	format: ArticleFormat;
	isPaidContent: boolean;
	renderAds: boolean;
	shouldHideReaderRevenue: boolean;
};

/**
 * The maximum height of the container that may contain
 * a right ad slot and a most viewed component
 */
const MAX_HEIGHT_PX = 1600;

/**
 * Wrapping `MostViewedRight` so we can determine whether or not
 * there's enough vertical space in the container to render it.
 *
 * ## Why does this need to be an Island?
 *
 * We may show the most viewed component depending on the length of the article,
 * based on the computed height of the container and the height of this component is
 * changed dynamically.
 *
 * ---
 *
 * (No visual story exists)
 */
export const MostViewedRightWithAd = ({
	format,
	isPaidContent,
	renderAds,
	shouldHideReaderRevenue,
}: Props) => {
	const componentDataAttribute = 'most-viewed-right-container';
	const { renderingTarget } = useConfig();
	const isApps = renderingTarget === 'Apps';
	const useDarkColourScheme =
		(format.design === ArticleDesign.Video ||
			format.design === ArticleDesign.Audio) &&
		format.theme !== ArticleSpecial.Labs;

	return (
		<div
			// This attribute is necessary so that most viewed wrapper
			// can measure the height of this component
			data-container={componentDataAttribute}
			css={css`
				/* On Apps - we don't restrict the height, so the ads can be spaced along the entire article height
				 * On Web - we restrict the height to the maximum height, so that the top right ad can be sticky until the
				 *          most viewed component is in view at MAX_HEIGHT_PX, or 100% of the article height if it is a short article
				*/
				height: ${isApps ? '100%' : `min(100%, ${MAX_HEIGHT_PX}px)`};
				display: flex;
				flex-direction: column;
			`}
		>
			{renderAds ? (
				<AdSlot
					position="right"
					display={format.display}
					isPaidContent={isPaidContent}
					shouldHideReaderRevenue={shouldHideReaderRevenue}
					colourScheme={useDarkColourScheme ? 'dark' : 'light'}
				/>
			) : null}

			{!isPaidContent ? (
				<MostViewedRightWrapper
					maxHeightPx={MAX_HEIGHT_PX}
					componentDataAttribute={componentDataAttribute}
					renderAds={renderAds}
				/>
			) : null}

			{isApps && <RightAdsPlaceholder />}
		</div>
	);
};
