/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/DesignableBannerCtas.tsx
 */
import { LinkButton } from '@guardian/source/react-components';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type { BannerRenderedContent } from '../../common/types';
import type { CtaSettings } from '../settings';
import { buttonStyles, buttonThemes } from '../styles/buttonStyles';

interface DesignableBannerCtasProps {
	mainOrMobileContent: BannerRenderedContent;
	onPrimaryCtaClick: () => void;
	onSecondaryCtaClick: () => void;
	primaryCtaSettings: CtaSettings;
	secondaryCtaSettings: CtaSettings;
}

export function DesignableBannerCtas({
	mainOrMobileContent,
	onPrimaryCtaClick,
	onSecondaryCtaClick,
	primaryCtaSettings,
	secondaryCtaSettings,
}: DesignableBannerCtasProps): JSX.Element {
	const { primaryCta, secondaryCta } = mainOrMobileContent;

	return (
		<>
			{primaryCta && (
				<LinkButton
					href={primaryCta?.ctaUrl}
					onClick={onPrimaryCtaClick}
					size="small"
					priority="primary"
					cssOverrides={buttonStyles(primaryCtaSettings)}
					theme={buttonThemes(primaryCtaSettings, 'primary')}
				>
					{primaryCta?.ctaText}
				</LinkButton>
			)}
			{secondaryCta?.type === SecondaryCtaType.Custom && (
				<LinkButton
					href={secondaryCta?.cta.ctaUrl}
					onClick={onSecondaryCtaClick}
					size="small"
					priority="secondary"
					cssOverrides={buttonStyles(secondaryCtaSettings)}
					theme={buttonThemes(secondaryCtaSettings, 'secondary')}
				>
					{secondaryCta.cta.ctaText}
				</LinkButton>
			)}
		</>
	);
}
