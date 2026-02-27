import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { buttonStyles, buttonThemes } from '../../styles/buttonStyles';
import type { BannerData } from '../BannerProps';

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

export const BannerCtas = ({
	bannerData,
}: {
	bannerData: BannerData;
}): JSX.Element | null => {
	if (!bannerData.selectors.showStandardCtas) {
		return null;
	}

	const { copyForViewport, customSecondaryCta } = bannerData.selectors;
	const { primaryCta } = copyForViewport;

	return (
		<div css={styles.outerImageCtaContainer}>
			<div css={styles.innerImageCtaContainer}>
				{primaryCta && (
					<LinkButton
						href={primaryCta.ctaUrl}
						onClick={bannerData.actions.onCtaClick}
						size="small"
						priority="primary"
						cssOverrides={buttonStyles(
							bannerData.settings.primaryCtaSettings,
						)}
						theme={buttonThemes(
							bannerData.settings.primaryCtaSettings,
							'primary',
						)}
					>
						{primaryCta.ctaText}
					</LinkButton>
				)}
				{customSecondaryCta && (
					<LinkButton
						href={customSecondaryCta.cta.ctaUrl}
						onClick={bannerData.actions.onSecondaryCtaClick}
						size="small"
						priority="secondary"
						cssOverrides={buttonStyles(
							bannerData.settings.secondaryCtaSettings,
						)}
						theme={buttonThemes(
							bannerData.settings.secondaryCtaSettings,
							'secondary',
						)}
					>
						{customSecondaryCta.cta.ctaText}
					</LinkButton>
				)}
				{bannerData.isCollapsed && (
					<LinkButton
						onClick={bannerData.actions.onClose}
						size="small"
						priority="tertiary"
						cssOverrides={[
							buttonStyles(
								bannerData.settings.secondaryCtaSettings,
							),
						]}
						theme={buttonThemes(
							bannerData.settings.secondaryCtaSettings,
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
