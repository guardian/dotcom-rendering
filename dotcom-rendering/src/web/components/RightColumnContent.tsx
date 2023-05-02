import { css } from '@emotion/react';
import { AdSlot } from './AdSlot';
import { Island } from './Island';
import { MostViewedRightWrapper } from './MostViewedRightWrapper.importable';

type Props = {
	display: ArticleDisplay;
	isPaidContent: boolean;
	renderAds: boolean;
	shouldHideReaderRevenue: boolean;
};

/**
 * The maximum height of the container that may contain
 * a right ad slot and a most viewed component
 */
export const MAX_HEIGHT_PX = 1600;

export const RightColumnContent = ({
	display,
	isPaidContent,
	renderAds,
	shouldHideReaderRevenue,
}: Props) => {
	const componentDataAttribute = 'right-column-content';
	return (
		<div
			// This attribute is necessary so that most viewed wrapper
			// can measure the height of this component
			data-component={componentDataAttribute}
			css={css`
				/* The height can be smaller than the maximum height
				   For example if the article is very short */
				height: min(100%, ${MAX_HEIGHT_PX}px);
				display: flex;
				flex-direction: column;
			`}
		>
			{renderAds ? (
				<AdSlot
					position="right"
					display={display}
					shouldHideReaderRevenue={shouldHideReaderRevenue}
					isPaidContent={isPaidContent}
				/>
			) : null}

			{!isPaidContent ? (
				<Island clientOnly={true} deferUntil="visible">
					<MostViewedRightWrapper
						maxHeightPx={MAX_HEIGHT_PX}
						componentDataAttribute={componentDataAttribute}
						renderAds={renderAds}
					/>
				</Island>
			) : null}
		</div>
	);
};
