import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import { buttonStyles, buttonThemes } from '../../styles/buttonStyles';
import { useBanner } from '../useBanner';

const styles = {
	/* ctas for use with main images */
	outerImageCtaContainer: css`
		grid-area: cta-container;

		display: flex;
		background-color: inherit;
		align-items: center;
		justify-content: stretch;
		flex-direction: column;
		gap: ${space[4]}px;

		${until.phablet} {
			width: 100vw;
			position: sticky;
			bottom: 0;
			padding-top: ${space[2]}px;
			padding-bottom: ${space[2]}px;
			box-shadow: 0 -${space[1]}px ${space[3]}px 0 rgba(0, 0, 0, 0.25);
			margin-right: -${space[3]}px;
			margin-left: -${space[3]}px;

			a {
				width: calc(100% - 24px);
			}
		}
		${from.phablet} {
			justify-self: stretch;
			align-items: start;
			width: 100%;
			margin-bottom: ${space[2]}px;
			margin-left: 0px;
			margin-right: 0px;
		}
		${from.desktop} {
			width: 100%;
			flex-wrap: nowrap;
			margin-bottom: ${space[2]}px;
		}
		${from.leftCol} {
			align-items: center;
		}
	`,
	innerImageCtaContainer: css`
		display: flex;
		width: calc(100% - 24px);
		flex-wrap: wrap;
		flex-direction: row;
		gap: ${space[2]}px;
		justify-content: stretch;
		margin: 0;

		> a {
			flex: 1 0 100%;
			justify-content: center;
		}

		${from.tablet} {
			justify-content: center;
			max-width: 100%;
		}

		${from.desktop} {
			> a {
				flex-direction: column;
				flex: 1 0 50%;
				justify-self: stretch;
			}
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: start;
		}
	`,
};

export const BannerCtas = (): JSX.Element | null => {
	const {
		content,
		settings,
		actions,
		isTabletOrAbove,
		selectedChoiceCard,
		isCollapsed,
	} = useBanner();

	if (selectedChoiceCard) {
		return null;
	}

	const mainOrMobileContent = isTabletOrAbove
		? content.mainContent
		: content.mobileContent;

	const { primaryCta, secondaryCta } = mainOrMobileContent;

	if (!primaryCta && !secondaryCta && !isCollapsed) {
		return null;
	}

	return (
		<div css={styles.outerImageCtaContainer}>
			<div css={styles.innerImageCtaContainer}>
				{primaryCta && (
					<LinkButton
						href={primaryCta.ctaUrl}
						onClick={actions.onCtaClick}
						size="small"
						priority="primary"
						cssOverrides={buttonStyles(settings.primaryCtaSettings)}
						theme={buttonThemes(
							settings.primaryCtaSettings,
							'primary',
						)}
					>
						{primaryCta.ctaText}
					</LinkButton>
				)}
				{secondaryCta?.type === SecondaryCtaType.Custom && (
					<LinkButton
						href={secondaryCta.cta.ctaUrl}
						onClick={actions.onSecondaryCtaClick}
						size="small"
						priority="secondary"
						cssOverrides={buttonStyles(
							settings.secondaryCtaSettings,
						)}
						theme={buttonThemes(
							settings.secondaryCtaSettings,
							'secondary',
						)}
					>
						{secondaryCta.cta.ctaText}
					</LinkButton>
				)}
				{isCollapsed && (
					<LinkButton
						onClick={actions.onClose}
						size="small"
						priority="tertiary"
						cssOverrides={[
							buttonStyles(settings.secondaryCtaSettings),
						]}
						theme={buttonThemes(
							settings.secondaryCtaSettings,
							'tertiary',
						)}
					>
						Maybe later
					</LinkButton>
				)}
			</div>
		</div>
	);
};
