/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/DesignableBannerCtas.tsx
 */
import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
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
		</div>
	);
}

const styles = {
	container: css`
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		gap: ${space[4]}px;
		justify-content: center;
		margin-left: ${space[2]}px;
		margin-right: ${space[2]}px;

		> a {
			flex: 1 0 100%;
			justify-content: center;
		}

		${from.tablet} {
			justify-content: start;
		}

		${from.desktop} {
			> a {
				flex-direction: row;
				flex: 1 0 auto;
				justify-self: stretch;
			}
			flex-direction: row;
			flex-wrap: nowrap;
		}
	`,
};
