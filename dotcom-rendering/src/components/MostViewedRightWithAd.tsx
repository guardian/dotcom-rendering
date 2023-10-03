import { css } from '@emotion/react';
import { RightAdsPlaceholder } from './AdPlaceholder.apps';
import { AdSlot } from './AdSlot.web';
import { useConfig } from './ConfigContext';
import { Island } from './Island';
import { MostViewedRightWrapper } from './MostViewedRightWrapper.importable';

type Props = {
	display: ArticleDisplay;
	isPaidContent: boolean;
	renderAds: boolean;
};

/**
 * The maximum height of the container that may contain
 * a right ad slot and a most viewed component
 */
const MAX_HEIGHT_PX = 1600;

export const MostViewedRightWithAd = ({
	display,
	isPaidContent,
	renderAds,
}: Props) => {
	const componentDataAttribute = 'most-viewed-right-container';
	const { renderingTarget } = useConfig();
	const isApps = renderingTarget === 'Apps';

	return (
		<div
			// This attribute is necessary so that most viewed wrapper
			// can measure the height of this component
			data-container={componentDataAttribute}
			css={css`
				height: 100%;
				display: flex;
				flex-direction: column;
			`}
		>
			{renderAds ? (
				<AdSlot
					position="right"
					display={display}
					isPaidContent={isPaidContent}
				/>
			) : null}

			{!isPaidContent ? (
				<Island
					clientOnly={true}
					deferUntil="visible"
					// Provide a much higher value for the top margin for the intersection observer
					// This is because the most viewed would otherwise only be lazy loaded when the
					// bottom of the container intersects with the viewport
					rootMargin="700px 100px"
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
