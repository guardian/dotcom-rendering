/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/DesignableBannerCtas.tsx
 */
import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import { isSupportUrl } from '../../../lib/tracking';
import { PaymentCards } from '../../common/PaymentCards';
import type { BannerRenderedContent } from '../../common/types';
import type { CtaSettings } from '../settings';
import { buttonStyles } from '../styles/buttonStyles';

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
	const hasSupportCta = primaryCta ? isSupportUrl(primaryCta.ctaUrl) : false;

	return (
		<div css={styles.container}>
			{primaryCta && (
				<LinkButton
					href={primaryCta?.ctaUrl}
					onClick={onPrimaryCtaClick}
					size="small"
					priority="primary"
					cssOverrides={buttonStyles(primaryCtaSettings)}
				>
					{primaryCta?.ctaText}
				</LinkButton>
			)}
			{secondaryCta?.type === SecondaryCtaType.Custom && (
				<LinkButton
					href={secondaryCta?.cta.ctaUrl}
					onClick={onSecondaryCtaClick}
					size="small"
					priority="tertiary"
					cssOverrides={buttonStyles(secondaryCtaSettings)}
				>
					{secondaryCta.cta.ctaText}
				</LinkButton>
			)}

			{primaryCta && hasSupportCta && <PaymentCards />}
		</div>
	);
}

const styles = {
	container: css`
		display: flex;
		flex-wrap: wrap;
		gap: ${space[4]}px;
		justify-content: center;

		> a {
			flex: 1 0 100%;
			justify-content: center;

			${from.tablet} {
				flex: 0 1 auto;
			}
		}

		${from.tablet} {
			justify-content: start;
		}
	`,
};
