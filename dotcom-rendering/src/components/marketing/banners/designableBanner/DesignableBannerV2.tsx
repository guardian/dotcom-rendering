import { css } from '@emotion/react';
import {
	between,
	brand,
	from,
	neutral,
	palette,
	space,
	specialReport,
	textSans15,
	until,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
	SvgGuardianLogo,
} from '@guardian/source/react-components';
import { Ticker } from '@guardian/source-development-kitchen/react-components';
import { hexColourToString } from '@guardian/support-dotcom-components';
import type {
	BannerDesignHeaderImage,
	BannerDesignImage,
	ConfigurableDesign,
	Image,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect, useState } from 'react';
import {
	removeMediaRulePrefix,
	useMatchMedia,
} from '../../../../lib/useMatchMedia';
import { ThreeTierChoiceCards } from '../../epics/ThreeTierChoiceCards';
import type { SupportTier } from '../../epics/utils/threeTierChoiceCardAmounts';
import { getChoiceCardData } from '../../lib/choiceCards';
import type { ReactComponent } from '../../lib/ReactComponent';
import {
	addChoiceCardsProductParams,
	addRegionIdAndTrackingParamsToSupportUrl,
} from '../../lib/tracking';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';
import type { ChoiceCardSettings } from './components/choiceCards/ChoiceCards';
import { DesignableBannerArticleCount } from './components/DesignableBannerArticleCount';
import { DesignableBannerBody } from './components/DesignableBannerBody';
import { DesignableBannerCloseButton } from './components/DesignableBannerCloseButton';
import { DesignableBannerCtas } from './components/DesignableBannerCtasV2';
import { DesignableBannerHeader } from './components/DesignableBannerHeader';
import { DesignableBannerVisual } from './components/DesignableBannerVisual';
import type { BannerTemplateSettings } from './settings';
import { templateSpacing } from './styles/templateStyles';

const buildImageSettings = (
	design: BannerDesignImage | BannerDesignHeaderImage,
): Image | undefined => {
	return {
		mainUrl: design.mobileUrl,
		mobileUrl: design.mobileUrl,
		tabletUrl: design.tabletUrl,
		desktopUrl: design.desktopUrl,
		wideUrl: design.desktopUrl,
		altText: design.altText,
	};
};
const buildMainImageSettings = (
	design: ConfigurableDesign,
): Image | undefined => {
	if (design.visual?.kind === 'Image') {
		return buildImageSettings(design.visual);
	}
	return undefined;
};
const buildHeaderImageSettings = (
	design: ConfigurableDesign,
): Image | undefined => {
	if (design.headerImage) {
		return buildImageSettings(design.headerImage);
	}
	return undefined;
};

const buildChoiceCardSettings = (
	design: ConfigurableDesign,
): ChoiceCardSettings | undefined => {
	if (design.visual?.kind === 'ChoiceCards') {
		const {
			buttonColour,
			buttonTextColour,
			buttonBorderColour,
			buttonSelectColour,
			buttonSelectTextColour,
			buttonSelectBorderColour,
		} = design.visual;
		return {
			buttonColour: buttonColour
				? hexColourToString(buttonColour)
				: undefined,
			buttonTextColour: buttonTextColour
				? hexColourToString(buttonTextColour)
				: undefined,
			buttonBorderColour: buttonBorderColour
				? hexColourToString(buttonBorderColour)
				: undefined,
			buttonSelectColour: buttonSelectColour
				? hexColourToString(buttonSelectColour)
				: undefined,
			buttonSelectTextColour: buttonSelectTextColour
				? hexColourToString(buttonSelectTextColour)
				: undefined,
			buttonSelectBorderColour: buttonSelectBorderColour
				? hexColourToString(buttonSelectBorderColour)
				: undefined,
		};
	}
	return undefined;
};

const buildUrlForThreeTierChoiceCards = (
	tracking: Tracking,
	selectedProduct: SupportTier,
	countryCode?: string,
) => {
	const baseUrl = 'https://support.theguardian.com/contribute';
	const urlWithProduct =
		selectedProduct === 'OneOff'
			? baseUrl
			: addChoiceCardsProductParams(baseUrl, selectedProduct, 'Monthly');

	return addRegionIdAndTrackingParamsToSupportUrl(
		urlWithProduct,
		tracking,
		undefined,
		countryCode,
		tracking.abTestName,
		tracking.abTestVariant,
	);
};

const DesignableBannerV2: ReactComponent<BannerRenderProps> = ({
	content,
	onCloseClick,
	articleCounts,
	onCtaClick,
	onSecondaryCtaClick,
	separateArticleCount, // legacy field
	separateArticleCountSettings,
	tickerSettings,
	choiceCardAmounts,
	countryCode,
	submitComponentEvent,
	design,
	tracking,
}: BannerRenderProps): JSX.Element => {
	const isTabletOrAbove = useMatchMedia(removeMediaRulePrefix(from.tablet));

	// We can use this to shorten the banner if the "open in app" banner is present
	const [iosAppBannerPresent, setIosAppBannerPresent] = useState(false);
	useEffect(() => {
		setIosAppBannerPresent(
			window.innerHeight != window.document.documentElement.clientHeight,
		);
	}, []);

	useEffect(() => {
		if (iosAppBannerPresent) {
			// send ophan event
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

	/**
	 * V2 choice cards state
	 */
	const [
		threeTierChoiceCardSelectedProduct,
		setThreeTierChoiceCardSelectedProduct,
	] = useState<SupportTier>('SupporterPlus');

	// We can't render anything without a design
	if (!design) {
		return <></>;
	}

	const {
		basic,
		primaryCta,
		secondaryCta,
		highlightedText,
		closeButton,
		ticker,
	} = design.colours;

	const imageSettings = buildMainImageSettings(design);
	const choiceCardSettings = buildChoiceCardSettings(design);
	const cardsImageOrSpaceTemplateString = choiceCardSettings
		? 'choice-cards-container'
		: imageSettings
		? 'main-image'
		: '.';

	const templateSettings: BannerTemplateSettings = {
		containerSettings: {
			backgroundColour: hexColourToString(basic.background),
			textColor: hexColourToString(basic.bodyText),
		},
		headerSettings: {
			textColour: hexColourToString(basic.headerText),
			headerImage: buildHeaderImageSettings(design),
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
		choiceCardSettings,
		imageSettings,
		bannerId: 'designable-banner',
		tickerStylingSettings: {
			filledProgressColour: hexColourToString(ticker.filledProgress),
			progressBarBackgroundColour: hexColourToString(
				ticker.progressBarBackground,
			),
			headlineColour: hexColourToString(ticker.headlineColour),
			totalColour: hexColourToString(ticker.totalColour),
			goalColour: hexColourToString(ticker.goalColour),
		},
	};

	const mainOrMobileContent = isTabletOrAbove
		? content.mainContent
		: content.mobileContent;

	const isVatCompliantCountry =
		choiceCardAmounts?.testName !== 'VAT_COMPLIANCE';

	const showChoiceCards = !!(
		templateSettings.choiceCardSettings &&
		choiceCardAmounts?.amountsCardData &&
		isVatCompliantCountry
	);

	const getHeaderContainerCss = () => {
		if (templateSettings.headerSettings?.headerImage) {
			return styles.headerWithImageContainer(
				templateSettings.containerSettings.backgroundColour,
			);
		}
		return styles.headerContainer(
			templateSettings.containerSettings.backgroundColour,
			!!templateSettings.imageSettings,
		);
	};

	const getCopyContainerCss = () => {
		if (templateSettings.imageSettings?.mobileUrl) {
			return styles.contentContainer(true);
		}
		return styles.contentContainer(false);
	};

	const showAboveArticleCount =
		(separateArticleCountSettings?.type === 'above' ||
			separateArticleCount) &&
		articleCounts.forTargetedWeeks >= 5;
	return (
		<div
			id="rr_designable-banner-outer-container"
			css={styles.outerContainer(
				templateSettings.containerSettings.backgroundColour,
				iosAppBannerPresent,
				templateSettings.containerSettings.textColor,
			)}
		>
			<div
				id="rr_designable-banner-inner-container"
				css={styles.layoutOverrides(cardsImageOrSpaceTemplateString)}
			>
				<div
					id="rr_designable-banner-logo"
					css={styles.guardianLogoContainer}
				>
					<SvgGuardianLogo
						textColor={hexColourToString(basic.logo)}
					/>
				</div>

				<div
					id="rr_designable-banner-vert-line"
					css={styles.verticalLine}
				/>

				<div
					id="rr_designable-banner-copy-container"
					css={getCopyContainerCss()}
				>
					<div css={getHeaderContainerCss()}>
						<div css={styles.headerOverrides}>
							<DesignableBannerHeader
								heading={content.mainContent.heading}
								mobileHeading={content.mobileContent.heading}
								headerSettings={templateSettings.headerSettings}
								headlineSize={
									design.fonts?.heading.size ?? 'medium'
								}
							/>
						</div>
					</div>

					{showAboveArticleCount && (
						<DesignableBannerArticleCount
							numArticles={articleCounts.forTargetedWeeks}
							settings={templateSettings}
							copy={separateArticleCountSettings?.copy}
						/>
					)}

					{tickerSettings?.tickerData &&
						templateSettings.tickerStylingSettings && (
							<div css={templateSpacing.bannerTicker}>
								<Ticker
									currencySymbol={
										tickerSettings.currencySymbol
									}
									copy={{
										headline:
											tickerSettings.copy.countLabel,
										goalCopy: tickerSettings.copy.goalCopy,
									}}
									tickerData={tickerSettings.tickerData}
									tickerStylingSettings={
										templateSettings.tickerStylingSettings
									}
									size={'medium'}
								/>
							</div>
						)}

					<div css={templateSpacing.bannerBodyCopy}>
						<div css={styles.bodyCopyOverrides}>
							<DesignableBannerBody
								mainContent={content.mainContent}
								mobileContent={content.mobileContent}
								highlightedTextSettings={
									templateSettings.highlightedTextSettings
								}
							/>
						</div>
					</div>
				</div>

				{templateSettings.imageSettings && (
					<div
						id="rr_designable-banner-main-image"
						css={styles.bannerVisualContainer}
					>
						<DesignableBannerVisual
							settings={templateSettings.imageSettings}
							bannerId={templateSettings.bannerId}
						/>
						{templateSettings.alternativeVisual}
					</div>
				)}

				{!showChoiceCards && (
					<div
						id="rr_designable-banner-cta-container"
						css={styles.ctaContentContainer}
					>
						<DesignableBannerCtas
							mainOrMobileContent={mainOrMobileContent}
							onPrimaryCtaClick={onCtaClick}
							onSecondaryCtaClick={onSecondaryCtaClick}
							primaryCtaSettings={
								templateSettings.primaryCtaSettings
							}
							secondaryCtaSettings={
								templateSettings.secondaryCtaSettings
							}
						/>
					</div>
				)}

				<div id="rr_designable-banner-close-button">
					<DesignableBannerCloseButton
						onCloseClick={onCloseClick}
						settings={templateSettings.closeButtonSettings}
						styleOverides={styles.closeButtonOverrides}
					/>
				</div>

				{showChoiceCards && (
					<div
						id="rr_designable-banner-3-tier-choice-cards-container"
						css={styles.threeTierChoiceCardsContainer}
					>
						<ThreeTierChoiceCards
							countryCode={countryCode}
							selectedProduct={threeTierChoiceCardSelectedProduct}
							setSelectedProduct={
								setThreeTierChoiceCardSelectedProduct
							}
							choices={getChoiceCardData(
								false,
								false,
								countryCode,
							)}
							id={'banner'}
							isDiscountActive={false}
						/>

						<div css={styles.ctaContainer}>
							<LinkButton
								href={buildUrlForThreeTierChoiceCards(
									tracking,
									threeTierChoiceCardSelectedProduct,
									countryCode,
								)}
								onClick={onCtaClick}
								priority="tertiary"
								cssOverrides={styles.linkButtonStyles}
								icon={<SvgArrowRightStraight />}
								iconSide="right"
								target="_blank"
								rel="noopener noreferrer"
							>
								Continue
							</LinkButton>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const styles = {
	outerContainer: (
		background: string,
		limitHeight: boolean,
		textColor: string = 'inherit',
	) => css`
		background: ${background};
		color: ${textColor};
		bottom: 0px;
		${limitHeight ? 'max-height: 60vh;' : ''}

		* {
			box-sizing: border-box;
			/* outline: 1px solid limegreen; */
		}
		${from.phablet} {
			border-top: 1px solid ${neutral[0]};
		}
		b,
		strong {
			font-weight: bold;
		}
		padding: 0 auto;
	`,
	layoutOverrides: (cardsImageOrSpaceTemplateString: string) => css`
		margin: 0 119px;
		padding: 0 20px;
		max-width: 1300px;
		display: grid;
		column-gap: 8px;
		background: inherit;
		position: relative;
		/* padding: ${space[3]}px ${space[3]}px 0 ${space[3]}px; */
		padding: 0;
		bottom: 0px;

		/* Define the grid areas */
		#rr_designable-banner-logo {
			grid-area: logo;
		}
		#rr_designable-banner-vert-line {
			grid-area: vert-line;
		}
		#rr_designable-banner-copy-container {
			grid-area: copy-container;
		}
		#rr_designable-banner-cta-container {
			grid-area: cta-container;
		}
		#rr_designable-banner-close-button {
			grid-area: close-button;
		}
		#rr_designable-banner-main-image {
			grid-area: main-image;
		}
		#rr_designable-banner-3-tier-choice-cards-container {
			grid-area: choice-cards-container;
		}

		/* mobile */
		grid-template-columns: auto;
		grid-template-areas:
			'close-button'
			'copy-container'
			'${cardsImageOrSpaceTemplateString}'
			'cta-container';

		${from.phablet} {
			padding: ${space[3]}px ${space[3]}px ${space[6]}px ${space[3]}px;
			/* max-width: 660px; */
			margin: 0 auto;
			grid-template-columns: 1fr auto 1fr;
			grid-template-areas:
				'. close-button .'
				'. copy-container .'
				'. ${cardsImageOrSpaceTemplateString} .'
				'. cta-container' .;
		}

		${from.tablet} {
			/* max-width: 740px; */
			padding: ${space[3]}px ${space[3]}px ${space[6]}px ${space[3]}px;
			margin: 0 auto;
			grid-template-columns: 1fr auto auto auto;
			grid-template-areas:
				'. copy-container . close-button'
				'. ${cardsImageOrSpaceTemplateString} . .'
				'. cta-container' . .;
		}

		${from.desktop} {
			/* min-width: 980px;	
			max-width: 1139.9px; */
			padding: ${space[3]}px ${space[8]}px ${space[6]}px ${space[3]}px;
			grid-template-columns: 460px 380px auto;
			grid-template-rows: auto auto;

			grid-template-areas:
				'copy-container ${cardsImageOrSpaceTemplateString} close-button'
				'cta-container ${cardsImageOrSpaceTemplateString} .'; /* should check if image exists *
			grid-gap: 10px;
		}
		${from.leftCol} {
			/* min-width: 1140px;
			 max-width: 1300px; */
			grid-template-columns: auto 1px max(460px) 380px auto;
			/* grid-template-columns: auto 1px 460px 380px auto; */
			grid-gap: 10px;
			grid-template-areas:
				'logo vert-line copy-container ${cardsImageOrSpaceTemplateString} close-button'
				'.    vert-line cta-container   .                                 .';
			/* should check if image exists 
				investigate why logo dropping below just before 1300 */
		}
		${from.wide} {
			max-width: 1300px;
			grid-template-columns: auto 1px max(420px) 400px auto;
			grid-template-areas:
				'logo vert-line copy-container ${cardsImageOrSpaceTemplateString} close-button'
				'. vert-line cta-container . .';
		}
	`,
	verticalLine: css`
		${from.leftCol} {
			background-color: ${neutral[0]};
			width: 1px;
			/* grid-column: 2; */
			/* grid-row: 1 / -1; */
			opacity: 0.2;
			margin-bottom: -${space[6]}px;
			margin-top: ${space[6]}px;
			/* margin-right: ${space[2]}px; */
		}
	`,
	closeButtonOverrides: css`
		${until.phablet} {
			/* grid-column: 1 / -1; */
			/* grid-row: 1; */
			justify-self: end;
			position: sticky;
			top: 10px;
		}

		${from.phablet} {
			/* grid-column: 4; */
			/* grid-row: 1; */
			/* justify-self: start; */
			position: sticky;
			top: 10px;
			padding-left: ${space[8]}px;
		}

		${from.desktop} {
			padding-right: 0;
			justify-self: end;
		}
	`,
	/* hacky change until we can rework the designable banner header with the correct styles */
	headerOverrides: css`
		/* stylelint-disable declaration-no-important */
		h2 {
			color: ${brand[400]} !important;
			margin-top: ${space[1]}px !important;
			margin-bottom: ${space[2]}px !important;
			${until.phablet} {
				font-size: 28px !important;
				font-style: normal !important;
				font-weight: 500 !important;
			}

			${until.leftCol} {
				font-size: 34px !important;
				font-style: normal !important;
				font-weight: 500 !important;
			}

			${from.leftCol} {
				font-size: 42px !important;
				font-style: normal !important;
				font-weight: 500 !important;
			}
		}
	`,
	headerContainer: (background: string, bannerHasImage: boolean) => css`
		/* grid-column: 1; */
		/* grid-row: ${bannerHasImage ? '1' : '2'}; */
		align-self: stretch;
		justify-self: stretch;

		${until.phablet} {
			${bannerHasImage
				? ''
				: `max-width: calc(100% - 40px - ${space[3]}px);`}
		}

		${from.phablet} {
			/* grid-column: 2; */
			/* grid-row: 1; */
			background: ${background};
			max-width: 492px;
		}

		${from.desktop} {
			padding-left: ${space[2]}px;
			padding-top: ${space[3]}px;
			padding-right: ${space[5]}px;
		}
	`,
	headerWithImageContainer: (background: string) => css`
		/* order: 1; */
		max-width: 100%;
		text-wrap: balance;

		${between.mobile.and.desktop} {
			/* order: 2; */
		}

		${from.tablet} {
			max-width: 492px;
		}

		${from.desktop} {
			/* grid-column: 2; */
			/* grid-row: 1; */
			background: ${background};
			max-width: 492px;
			padding-left: ${space[2]}px;
			padding-top: ${space[3]}px;
		}
	`,
	contentContainer: (bannerHasImage: boolean) => css`
		/* grid-row: ${bannerHasImage ? '2' : '4'}; */
		align-self: start;

		${from.phablet} {
			/* grid-column: 2; */
			max-width: 492px;
			/* grid-row: 2; */
		}
		${from.desktop} {
			max-width: 492px;
			margin-top: ${space[3]}px;
			padding-left: ${space[2]}px;
			padding-right: ${space[5]}px;
			margin-bottom: ${space[2]}px;
		}
	`,
	/* ctas for use with main images */
	ctaContentContainer: css`
		/* order: 4; */

		${until.phablet} {
			width: 100vw;
			position: sticky;
			bottom: 0;
			padding-top: ${space[3]}px;
			padding-bottom: ${space[3]}px;
			background-color: ${neutral[100]};
			box-shadow: 0 -${space[1]}px ${space[3]}px 0 rgba(0, 0, 0, 0.25);
			margin-right: -${space[3]}px;
			margin-left: -${space[3]}px;

			a {
				width: calc(100% - 24px);
			}
		}
		${from.phablet} {
			/* grid-column: 2; */
			/* grid-row: 5; */
			max-width: 492px;
		}
		${from.desktop} {
			width: 100%;
			flex-wrap: nowrap;
			/* padding-left: ${space[2]}px; */
			/* padding-right: ${space[5]}px; */
			margin-bottom: ${space[2]}px;
		}
	`,
	bodyCopyOverrides: css`
		p {
			${textSans15}
		}
		span {
			${textSans15}
		}
		.rr_banner_highlight > span {
			font-weight: 700;
		}
	`,
	bannerVisualContainer: css`
		/* grid-row: 3; */
		margin-left: ${space[2]}px;
		margin-right: ${space[2]}px;

		${from.phablet} {
			/* grid-column: 2; */
			/* grid-row: 3; */
		}

		${from.desktop} {
			padding-left: ${space[2]}px;
			/* grid-column: 3; */
			/* grid-row: 1 / span 2; */
		}
	`,
	threeTierChoiceCardsContainer: css`
		/* order: 3; */
		${until.desktop} {
			margin-top: -${space[6]}px;
		}
		${from.phablet} {
			/* grid-column: 2; */
			max-width: 492px;
		}
		${from.desktop} {
			/* grid-column: 3; */
			/* grid-row: 1; */
			/* grid-row-end: 3; */
			margin: 0 ${space[3]}px;
		}

		${between.desktop.and.wide} {
			max-width: 380px;
		}

		${from.wide} {
			max-width: 485px;
			align-self: start;
		}
	`,
	guardianLogoContainer: css`
		display: none;
		${from.leftCol} {
			justify-self: end;
			display: flex;
			width: 128px;
			height: 41px;
			justify-content: end;
			align-items: center;
			margin-top: ${space[5]}px;
			margin-right: ${space[2]}px;
			/* margin-left: 22px; */
		}
	`,
	/* choice card CTA container */
	ctaContainer: css`
		/ order: 4; /
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: ${space[4]}px;
		margin-top: ${space[3]}px;

		${until.phablet} {
			position: sticky;
			bottom: 0;
			padding-top: ${space[3]}px;
			padding-bottom: ${space[3]}px;
			background-color: ${neutral[100]};
			box-shadow: 0 -${space[1]}px ${space[3]}px 0 rgba(0, 0, 0, 0.25);
			margin-right: -${space[3]}px;
			margin-left: -${space[3]}px;

			a {
				width: calc(100% - 24px);
			}
		}

		${between.phablet.and.desktop} {
			bottom: 0;
			margin-top: ${space[3]}px;
			margin-bottom: 0;
			border-radius: 50px;
			a {
				width: 100%;
			}
			> span {
				width: auto;
			}
		}

		${from.desktop} {
			grid-column: 3;
			flex-direction: row;
			gap: 0;
			margin-bottom: 0;
			margin-top: ${space[3]}px;

			a {
				width: 100%;
			}

			> span {
				width: auto;
			}
		}
	`,
	linkButtonStyles: css`
		background-color: ${palette.brandAlt[400]};
		border-color: ${palette.brandAlt[400]};
		width: 100%;
	`,
};

const unvalidated = bannerWrapper(DesignableBannerV2, 'designable-banner');
const validated = validatedBannerWrapper(
	DesignableBannerV2,
	'designable-banner',
);

export {
	validated as DesignableBannerV2,
	unvalidated as DesignableBannerUnvalidatedV2,
};
