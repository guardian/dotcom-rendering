import { css } from '@emotion/react';
import {
	brandAlt,
	from,
	neutral,
	space,
	specialReport,
} from '@guardian/source/foundations';
import { LinkButton, SvgGuardianLogo } from '@guardian/source/react-components';
import { hexColourToString } from '@guardian/support-dotcom-components';
import { useEffect, useState } from 'react';
import {
	removeMediaRulePrefix,
	useMatchMedia,
} from '../../../../lib/useMatchMedia';
import { ThreeTierChoiceCards } from '../../epics/ThreeTierChoiceCards';
import type { SupportTier } from '../../epics/utils/threeTierChoiceCardAmounts';
import type { ReactComponent } from '../../lib/ReactComponent';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';
import { ThreeTierChoiceCardsV2 } from '../ThreeTierChoiceCardsV2';
import { DesignableBannerArticleCount } from './components/DesignableBannerArticleCount';
import { DesignableBannerBody } from './components/DesignableBannerBody';
import { DesignableBannerCloseButton } from './components/DesignableBannerCloseButton';
import { DesignableBannerHeader } from './components/DesignableBannerHeader';
import type { BannerTemplateSettings } from './settings';

const DesignableBannerV2: ReactComponent<BannerRenderProps> = ({
	content,
	countryCode,
	onCloseClick,
	articleCounts,
	separateArticleCount, // legacy field
	separateArticleCountSettings,
	submitComponentEvent,
	design,
	onCtaClick,
}: BannerRenderProps): JSX.Element => {
	const isTabletOrAbove = useMatchMedia(removeMediaRulePrefix(from.tablet));
	const isDesktopOrAbove = useMatchMedia(removeMediaRulePrefix(from.desktop));

	const [iosAppBannerPresent, setIosAppBannerPresent] = useState(false);

	const [
		threeTierChoiceCardSelectedProduct,
		setThreeTierChoiceCardSelectedProduct,
	] = useState<SupportTier>('SupporterPlus');

	const variantOfChoiceCard = 'TWO_TIER_CHOICE_CARDS'; //this may need changed when US involved

	useEffect(() => {
		setIosAppBannerPresent(
			window.innerHeight !== window.document.documentElement.clientHeight,
		);
	}, []);

	useEffect(() => {
		if (iosAppBannerPresent) {
			if (submitComponentEvent) {
				submitComponentEvent({
					component: {
						componentType: 'ACQUISITIONS_OTHER',
						id: 'safari-ios-banner-present',
					},
					action: 'VIEW',
				});
			}
		}
	}, [iosAppBannerPresent, submitComponentEvent]);

	if (!design) {
		return <></>;
	}

	const { basic, primaryCta, secondaryCta, highlightedText, closeButton } =
		design.colours;

	const landingPageUrl = 'https://support.theguardian.com/contribute'; //this URL will need to be confirmed and then updated before the test is launched

	const templateSettings: BannerTemplateSettings = {
		containerSettings: {
			backgroundColour: hexColourToString(basic.background),
			textColor: hexColourToString(basic.bodyText),
		},
		headerSettings: {
			textColour: hexColourToString(basic.headerText),
		},
		primaryCtaSettings: {
			default: {
				backgroundColour: hexColourToString(
					primaryCta.default.background,
				),
				textColour: hexColourToString(primaryCta.default.text),
			},
			hover: {
				backgroundColour: hexColourToString(
					primaryCta.hover.background,
				),
				textColour: hexColourToString(primaryCta.hover.text),
			},
		},
		//not used in this design but is required to be passed in
		secondaryCtaSettings: {
			default: {
				backgroundColour: hexColourToString(
					secondaryCta.default.background,
				),
				textColour: hexColourToString(secondaryCta.default.text),
				border: `1px solid ${
					secondaryCta.default.border
						? hexColourToString(secondaryCta.default.border)
						: undefined
				}`,
			},
			hover: {
				backgroundColour: hexColourToString(
					secondaryCta.hover.background,
				),
				textColour: hexColourToString(secondaryCta.hover.text),
				border: `1px solid ${
					secondaryCta.hover.border
						? hexColourToString(secondaryCta.hover.border)
						: undefined
				}`,
			},
		},
		closeButtonSettings: {
			default: {
				backgroundColour: hexColourToString(
					closeButton.default.background,
				),
				textColour: hexColourToString(closeButton.default.text),
				border: `1px solid ${
					closeButton.default.border
						? hexColourToString(closeButton.default.border)
						: specialReport[100]
				}`,
			},
			hover: {
				backgroundColour: hexColourToString(
					closeButton.hover.background,
				),
				textColour: hexColourToString(closeButton.hover.text),
				border: `1px solid ${
					closeButton.hover.border
						? hexColourToString(closeButton.hover.border)
						: neutral[100]
				}`,
			},
		},
		highlightedTextSettings: {
			textColour: hexColourToString(highlightedText.text),
			highlightColour: hexColourToString(highlightedText.highlight),
		},
		articleCountTextColour: hexColourToString(basic.articleCountText),
		bannerId: 'designable-banner',
	};

	const showAboveArticleCount =
		(separateArticleCountSettings?.type === 'above' ||
			separateArticleCount) &&
		articleCounts.forTargetedWeeks >= 5;

	return (
		<div
			css={styles.outerContainer(
				templateSettings.containerSettings.backgroundColour,
				templateSettings.containerSettings.textColor,
				iosAppBannerPresent,
			)}
		>
			<div css={styles.containerOverrides}>
				<DesignableBannerCloseButton
					onCloseClick={onCloseClick}
					settings={templateSettings.closeButtonSettings}
					styleOverides={styles.closeButtonOverrides}
				/>

				<div css={styles.middleColumnContainer}>
					<DesignableBannerHeader
						heading={content.mainContent.heading}
						mobileHeading={content.mobileContent.heading}
						headerSettings={templateSettings.headerSettings}
						headlineSize={design.fonts?.heading.size ?? 'medium'}
					/>
					<div>
						{showAboveArticleCount && (
							<DesignableBannerArticleCount
								numArticles={articleCounts.forTargetedWeeks}
								settings={templateSettings}
								copy={separateArticleCountSettings?.copy}
							/>
						)}
						<DesignableBannerBody
							mainContent={content.mainContent}
							mobileContent={content.mobileContent}
							highlightedTextSettings={
								templateSettings.highlightedTextSettings
							}
						/>
					</div>
				</div>

				{isTabletOrAbove && (
					<>
						{isDesktopOrAbove && (
							<div css={styles.guardianLogoContainer}>
								<SvgGuardianLogo />
							</div>
						)}
						<div css={styles.thirdColumnContainer}>
							<ThreeTierChoiceCardsV2 />
						</div>
					</>
				)}

				{!isTabletOrAbove && (
					<>
						<div>
							<ThreeTierChoiceCards
								countryCode={countryCode}
								selectedProduct={
									threeTierChoiceCardSelectedProduct
								}
								setSelectedProduct={
									setThreeTierChoiceCardSelectedProduct
								}
								variantOfChoiceCard={variantOfChoiceCard}
							/>
						</div>
						<div css={styles.linkButtonContainer}>
							<LinkButton
								href={landingPageUrl}
								onClick={onCtaClick}
								size="small"
								priority="primary"
								cssOverrides={styles.linkButtonOverrides}
							>
								Continue
							</LinkButton>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const styles = {
	outerContainer: (
		background: string,
		textColor: string | undefined,
		limitHeight: boolean,
	) => css`
		background: ${background};
		color: ${textColor};
		${limitHeight ? 'max-height: 70vh;' : ''}
		overflow: auto;
	`,
	containerOverrides: css`
		display: flex;
		flex-direction: column;
		position: relative;
		${from.desktop} {
			padding: 0;
		}
		overflow: auto;

		${from.mobile} {
			padding: 10px 10px 0 16px;
		}

		${from.tablet} {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: auto 1fr auto;
			align-items: center;
			padding-bottom: ${space[8]}px;
		}

		${from.desktop} {
			display: grid;
			grid-template-columns: auto 1fr 1fr;
			grid-template-rows: auto 1fr auto;
			max-width: 1300px;
			align-items: start;
			column-gap: 10px;
			padding-bottom: ${space[10]}px;
		}
	`,
	closeButtonOverrides: css`
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
		grid-column: 3;
		grid-row: 1;
		justify-content: end;
	`,
	linkButtonOverrides: css`
		background-color: ${brandAlt[400]};
		color: ${neutral[0]};
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	`,
	linkButtonContainer: css`
		padding-top: ${space[3]}px;
	`,
	guardianLogoContainer: css`
		width: 100px;
		grid-column: 1;
		grid-row: 1;
		justify-self: start;
		align-self: start;
	`,
	middleColumnContainer: css`
		display: flex;
		flex-direction: column;
		${from.tablet} {
			grid-row: 2;
			grid-column: 2;
			width: 100%;
			padding-bottom: ${space[5]}px;
		}
	`,
	thirdColumnContainer: css`
		display: flex;
		flex-direction: column;
		${from.tablet} {
			grid-row: 3;
			grid-column: 2;
		}
		${from.desktop} {
			grid-row: 2;
			grid-column: 3;
		}
	`,
};

const unvalidated = bannerWrapper(DesignableBannerV2, 'designable-banner');
const validated = validatedBannerWrapper(
	DesignableBannerV2,
	'designable-banner',
);

export {
	validated as DesignableBannerV2,
	unvalidated as DesignableBannerV2Unvalidated,
};
