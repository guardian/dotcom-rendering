import { Ticker } from '@guardian/source-development-kitchen/react-components';
import { templateSpacing } from '../../styles/templateStyles';
import { useBanner } from '../useBanner';

export const BannerTicker = (): JSX.Element | null => {
	const { tickerSettings, settings, isCollapsed } = useBanner();

	if (
		!tickerSettings?.tickerData ||
		isCollapsed ||
		!settings.tickerStylingSettings
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
				tickerData={tickerSettings.tickerData}
				tickerStylingSettings={settings.tickerStylingSettings}
				size={'medium'}
			/>
		</div>
	);
};
