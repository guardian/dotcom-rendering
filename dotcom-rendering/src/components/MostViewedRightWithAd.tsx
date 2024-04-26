import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { RightAdsPlaceholder } from './AdPlaceholder.apps';
import { AdSlot } from './AdSlot.web';
import { useConfig } from './ConfigContext';
import { Island } from './Island';
import { MostViewedRightWrapper } from './MostViewedRightWrapper.importable';

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

export const MostViewedRightWithAd = ({
	format,
	isPaidContent,
	renderAds,
	shouldHideReaderRevenue,
}: Props) => {
	const componentDataAttribute = 'most-viewed-right-container';
	const { renderingTarget } = useConfig();
	const isApps = renderingTarget === 'Apps';
	const isMedia =
		format.design === ArticleDesign.Video ||
		format.design === ArticleDesign.Audio;

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
					isDark={isMedia}
				/>
			) : null}

			{!isPaidContent ? (
				<Island
					priority="feature"
					defer={{
						until: 'visible',
						// Provide a much higher value for the top margin for the intersection observer
						// This is because the most viewed would otherwise only be lazy loaded when the
						// bottom of the container intersects with the viewport
						rootMargin: '700px 100px',
					}}
				>
					<MostViewedRightWrapper
						maxHeightPx={MAX_HEIGHT_PX}
						componentDataAttribute={componentDataAttribute}
						renderAds={renderAds}
					/>
				</Island>
			) : null}

			{isApps && <RightAdsPlaceholder />}
		</div>
	);
};
