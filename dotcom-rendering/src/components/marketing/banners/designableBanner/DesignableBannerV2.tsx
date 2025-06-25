import { css } from '@emotion/react';
import {
	between,
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
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import { useEffect, useState } from 'react';
import {
	removeMediaRulePrefix,
	useMatchMedia,
} from '../../../../lib/useMatchMedia';
import { ThreeTierChoiceCards } from '../../epics/ThreeTierChoiceCards';
import { getChoiceCards } from '../../lib/choiceCards';
import type { ReactComponent } from '../../lib/ReactComponent';
import { addChoiceCardsProductParams } from '../../lib/tracking';
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
	baseUrl: string,
	selectedProduct: ChoiceCard['product'],
) => {
	return selectedProduct.supportTier === 'OneOff'
		? baseUrl
		: addChoiceCardsProductParams(
				baseUrl,
				selectedProduct.supportTier,
				selectedProduct.ratePlan,
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
	choiceCardsSettings,
	submitComponentEvent,
	design,
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

	const choiceCards = getChoiceCards(isTabletOrAbove, choiceCardsSettings);
	const defaultProduct = choiceCards?.find((cc) => cc.isDefault)?.product;
	const [
		threeTierChoiceCardSelectedProduct,
		setThreeTierChoiceCardSelectedProduct,
	] = useState<ChoiceCard['product'] | undefined>(defaultProduct);

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

	const showAboveArticleCount =
		(separateArticleCountSettings?.type === 'above' ||
			separateArticleCount) &&
		articleCounts.forTargetedWeeks >= 5;

	return (
		<div
			css={styles.outerContainer(
				templateSettings.containerSettings.backgroundColour,
				iosAppBannerPresent,
				templateSettings.containerSettings.textColor,
			)}
		>
			<div css={styles.layoutOverrides(cardsImageOrSpaceTemplateString)}>
				<div css={styles.guardianLogoContainer}>
					<SvgGuardianLogo
						textColor={hexColourToString(basic.logo)}
					/>
				</div>

				<div css={styles.verticalLine} />

				<div css={styles.contentContainer}>
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
						<div css={styles.articleCountContainer}>
							<DesignableBannerArticleCount
								numArticles={articleCounts.forTargetedWeeks}
								settings={templateSettings}
								copy={separateArticleCountSettings?.copy}
							/>
						</div>
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
					<div css={styles.bannerVisualContainer}>
						<DesignableBannerVisual
							settings={templateSettings.imageSettings}
							bannerId={templateSettings.bannerId}
						/>
						{templateSettings.alternativeVisual}
					</div>
				)}

				{!threeTierChoiceCardSelectedProduct && (
					<div css={styles.outerImageCtaContainer}>
						<div css={styles.innerImageCtaContainer}>
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
					</div>
				)}

				<div css={styles.closeButtonContainer}>
					<DesignableBannerCloseButton
						onCloseClick={onCloseClick}
						settings={templateSettings.closeButtonSettings}
						styleOverides={styles.closeButtonOverrides}
					/>
				</div>

				{choiceCards &&
					threeTierChoiceCardSelectedProduct &&
					mainOrMobileContent.primaryCta && (
						<div css={styles.threeTierChoiceCardsContainer}>
							<ThreeTierChoiceCards
								selectedProduct={
									threeTierChoiceCardSelectedProduct
								}
								setSelectedProduct={
									setThreeTierChoiceCardSelectedProduct
								}
								choices={choiceCards}
								id={'banner'}
							/>

							<div css={styles.ctaContainer}>
								<LinkButton
									href={buildUrlForThreeTierChoiceCards(
										mainOrMobileContent.primaryCta.ctaUrl,
										threeTierChoiceCardSelectedProduct,
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

const phabletContentMaxWidth = '492px';

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
		display: grid;
		background: inherit;
		position: relative;
		bottom: 0px;

		/* mobile first */
		${until.phablet} {
			max-width: 660px;
			margin: 0 auto;
			padding: ${space[3]}px ${space[3]}px 0 ${space[3]}px;
			grid-template-columns: auto max(${phabletContentMaxWidth} auto);
			grid-template-areas:
				'. close-button .'
				'. copy-container .'
				'. ${cardsImageOrSpaceTemplateString} .'
				'. cta-container .';
		}
		${from.phablet} {
			max-width: 740px;
			margin: 0 auto;
			padding: ${space[3]}px ${space[3]}px 0 ${space[3]}px;
			grid-template-columns: minmax(0, 0.5fr) ${phabletContentMaxWidth} minmax(
					0,
					0.5fr
				);
			grid-template-rows: auto auto auto;
			grid-template-areas:
				'. 	copy-container 						close-button'
				'. 	${cardsImageOrSpaceTemplateString} 	.'
				'. 	cta-container 						.';
		}
		${from.desktop} {
			max-width: 980px;
			align-self: stretch;
			padding: ${space[3]}px ${space[1]}px 0 ${space[3]}px;
			grid-template-columns: auto 380px auto;
			grid-template-rows: auto auto;

			grid-template-areas:
				'copy-container 	${cardsImageOrSpaceTemplateString} 	close-button'
				'cta-container 		${cardsImageOrSpaceTemplateString} 	.			';
		}
		${from.leftCol} {
			max-width: 1140px;
			bottom: 0px;
			/* the vertical line aligns with that of standard article */
			grid-column-gap: 10px;
			grid-template-columns: 140px 1px min(460px) min(380px) auto;
			grid-template-rows: auto auto;
			grid-template-areas:
				'logo	vert-line	copy-container	${cardsImageOrSpaceTemplateString}	close-button'
				'.		vert-line	cta-container	${cardsImageOrSpaceTemplateString}	.';
		}
		${from.wide} {
			max-width: 1300px;
			/* the vertical line aligns with that of standard article */
			grid-template-columns: 219px 1px min(460px) min(380px) auto;
			grid-template-rows: auto auto;
			grid-template-areas:
				'logo	vert-line	copy-container	${cardsImageOrSpaceTemplateString}	close-button'
				'.		vert-line	cta-container	${cardsImageOrSpaceTemplateString}	.';
		}
	`,
	verticalLine: css`
		grid-area: vert-line;

		${until.leftCol} {
			display: none;
		}
		${from.leftCol} {
			background-color: ${neutral[0]};
			width: 1px;
			opacity: 0.2;
			margin: ${space[6]}px ${space[2]}px 0 ${space[2]}px;
		}
	`,
	closeButtonOverrides: css`
		/* Layout changes go in closeButtonContainer below. 
		changes for styles go in here. */
	`,
	closeButtonContainer: css`
		/* Layout changes only here */
		grid-area: close-button;
		${until.phablet} {
			padding-right: ${space[2]}px;
			justify-self: end;
			position: sticky;
			top: 10px;
		}
		${from.phablet} {
			margin-top: ${space[2]}px;
			padding-right: ${space[2]}px;
			position: sticky;
		}
		${from.desktop} {
			margin-top: ${space[6]}px;
			justify-self: end;
		}
		${from.leftCol} {
			justify-self: start;
			padding-left: ${space[8]}px;
		}
	`,
	headerContainer: (background: string, bannerHasImage: boolean) => css`
		align-self: stretch;
		justify-self: stretch;

		${until.phablet} {
			${bannerHasImage
				? ''
				: `max-width: calc(100% - 40px - ${space[3]}px);`}
		}

		${from.phablet} {
			background: ${background};
			max-width: ${phabletContentMaxWidth};
		}

		${from.desktop} {
			padding-top: ${space[3]}px;
			padding-right: ${space[5]}px;
		}
	`,
	headerWithImageContainer: (background: string) => css`
		max-width: 100%;
		text-wrap: balance;

		${from.tablet} {
			max-width: ${phabletContentMaxWidth};
		}

		${from.desktop} {
			background: ${background};
			padding-top: ${space[3]}px;
		}
	`,
	contentContainer: css`
		grid-area: copy-container;

		max-width: 100%;
		align-self: start;

		${from.phablet} {
			max-width: ${phabletContentMaxWidth};
		}
		${from.desktop} {
			padding-right: ${space[5]}px;
			margin-bottom: ${space[2]}px;
		}
		${from.leftCol} {
			padding-left: ${space[3]}px;
		}
	`,
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
		margin-left: ${space[2]}px;
		margin-right: ${space[2]}px;

		> a {
			flex: 1 0 100%;
			justify-content: center;
		}

		${from.tablet} {
			justify-content: center;
			margin-left: 0px;
			margin-right: 0px;
			max-width: 100%;
		}

		${from.desktop} {
			> a {
				flex-direction: column;
				flex: 1 0 50%;
				justify-self: stretch;
			}
			margin-left: 0px;
			flex-direction: row;
			flex-wrap: nowrap;
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
		grid-area: main-image;

		margin-left: ${space[2]}px;
		margin-right: ${space[2]}px;

		${from.phablet} {
			max-width: ${phabletContentMaxWidth};
			justify-self: center;
		}
		${from.desktop} {
			margin-top: ${space[6]}px;
			padding-left: ${space[2]}px;
			justify-self: end;
		}
		${between.desktop.and.wide} {
			max-width: 380px;
		}
		${from.wide} {
			max-width: 485px;
			align-self: start;
		}
	`,
	threeTierChoiceCardsContainer: css`
		grid-area: choice-cards-container;
		max-width: 100%;

		${until.desktop} {
			margin-top: -${space[6]}px;
		}
		${from.phablet} {
			max-width: ${phabletContentMaxWidth};
		}
		${from.desktop} {
			justify-self: end;
			width: minmax(299px, 380px);
		}
		${between.desktop.and.wide} {
			width: minmax(380px, 495px);
		}
		${from.wide} {
			max-width: 485px;
			align-self: start;
		}
	`,
	guardianLogoContainer: css`
		grid-area: logo;

		${until.leftCol} {
			display: none;
		}
		${from.leftCol} {
			justify-self: end;
			width: 128px;
			height: 41px;
			justify-content: end;
			margin-top: ${space[5]}px;
		}
	`,
	/* choice card CTA container */
	ctaContainer: css`
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: ${space[4]}px;
		margin-top: ${space[3]}px;

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

		${between.phablet.and.desktop} {
			bottom: 0;
			margin-top: ${space[3]}px;
			margin-bottom: ${space[6]}px;
			border-radius: 50px;
			a {
				width: 100%;
			}
			> span {
				width: auto;
			}
		}

		${from.desktop} {
			flex-direction: row;
			margin-bottom: ${space[6]}px;
			gap: 0;
			margin-top: ${space[3]}px;
			margin-right: 0;
			margin-left: 0;

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
	articleCountContainer: css`
		margin-bottom: ${space[3]}px;
	`,
	/* hacky change until we can rework the designable banner header with the correct styles */
	headerOverrides: css`
		/* stylelint-disable declaration-no-important */
		h2 {
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
