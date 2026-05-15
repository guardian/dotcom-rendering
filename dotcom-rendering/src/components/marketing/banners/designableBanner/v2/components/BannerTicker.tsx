import { Ticker } from '@guardian/source-development-kitchen/react-components';
import { templateSpacing } from '../../styles/templateStyles';
import type { BannerData } from '../BannerProps';

export const BannerTicker = ({
	bannerData,
}: {
	bannerData: BannerData;
}): JSX.Element | null => {
	const tickerSettings = bannerData.tickerSettings;
	const tickerStylingSettings = bannerData.settings.tickerStylingSettings;
	const tickerData = tickerSettings?.tickerData;

	if (
		!bannerData.selectors.showTicker ||
		!tickerSettings ||
		!tickerStylingSettings ||
		!tickerData
	) {
		return null;
	}

	return (
		<div css={templateSpacing.bannerTicker}>
			<Ticker
				currencySymbol={tickerSettings.currencySymbol}
				copy={{
					headline: tickerSettings.copy.countLabel,
					goalCopy: tickerSettings.copy.goalCopy,
				}}
				tickerData={tickerData}
				tickerStylingSettings={tickerStylingSettings}
				size={'medium'}
			/>
		</div>
	);
};
