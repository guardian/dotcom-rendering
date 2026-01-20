import { Ticker } from '@guardian/source-development-kitchen/react-components';
import { templateSpacing } from '../../styles/templateStyles';
import type { BannerData } from '../BannerProps';

export const BannerTicker = ({
	bannerData,
}: {
	bannerData: BannerData;
}): JSX.Element | null => {
	if (
		!bannerData.tickerSettings?.tickerData ||
		bannerData.isCollapsed ||
		!bannerData.settings.tickerStylingSettings
	) {
		return null;
	}

	return (
		<div css={templateSpacing.bannerTicker}>
			<Ticker
				currencySymbol={bannerData.tickerSettings.currencySymbol}
				copy={{
					headline: bannerData.tickerSettings.copy.countLabel,
					goalCopy: bannerData.tickerSettings.copy.goalCopy,
				}}
				tickerData={bannerData.tickerSettings.tickerData}
				tickerStylingSettings={
					bannerData.settings.tickerStylingSettings
				}
				size={'medium'}
			/>
		</div>
	);
};
