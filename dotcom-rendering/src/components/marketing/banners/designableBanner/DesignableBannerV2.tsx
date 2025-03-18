import { css } from '@emotion/react';
import {
	between,
	from,
	neutral,
	palette,
	space,
	specialReport,
	textEgyptian15,
	textSans15,
	textSans17,
	textSansBold17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgArrowRightStraight,
	SvgGuardianLogo,
} from '@guardian/source/react-components';
import { Ticker } from '@guardian/source-development-kitchen/react-components';
import {
	hexColourToString,
	SecondaryCtaType,
} from '@guardian/support-dotcom-components';
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
import { useReminder } from '../../hooks/useReminder';
import type { ReactComponent } from '../../lib/ReactComponent';
import {
	addChoiceCardsProductParams,
	addRegionIdAndTrackingParamsToSupportUrl,
} from '../../lib/tracking';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import type {
	BannerEnrichedReminderCta,
	BannerRenderProps,
} from '../common/types';
import type { ChoiceCardSettings } from './components/choiceCards/ChoiceCards';
import { DesignableBannerArticleCount } from './components/DesignableBannerArticleCount';
import { DesignableBannerBody } from './components/DesignableBannerBody';
import { DesignableBannerCloseButton } from './components/DesignableBannerCloseButton';
import { DesignableBannerCtas } from './components/DesignableBannerCtas';
import { DesignableBannerHeader } from './components/DesignableBannerHeader';
import { DesignableBannerReminder } from './components/DesignableBannerReminder';
import { DesignableBannerVisual } from './components/DesignableBannerVisual';
import type { BannerTemplateSettings, CtaSettings } from './settings';
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
	reminderTracking,
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
	const { isReminderActive, onReminderCtaClick, mobileReminderRef } =
		useReminder(reminderTracking);

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

	const threeTierChoiceCards = tracking.abTestVariant.includes(
		'THREE_TIER_CHOICE_CARDS',
	);

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

	const showChoiceCards = !!(
		templateSettings.choiceCardSettings &&
		choiceCardAmounts?.amountsCardData
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

	const showReminder =
		mainOrMobileContent.secondaryCta?.type ===
		SecondaryCtaType.ContributionsReminder;

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
			<div css={styles.containerOverrides}>
				<div css={styles.verticalLine} />
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
				<div css={styles.contentContainer(showReminder)}>
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

					{!showChoiceCards && (
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
					)}
				</div>
				{templateSettings.imageSettings ? (
					<div
						css={styles.bannerVisualContainer(
							templateSettings.containerSettings.backgroundColour,
						)}
					>
						<DesignableBannerCloseButton
							onCloseClick={onCloseClick}
							settings={templateSettings.closeButtonSettings}
							styleOverides={styles.closeButtonOverrides}
						/>
						<DesignableBannerVisual
							settings={templateSettings.imageSettings}
							bannerId={templateSettings.bannerId}
						/>

						{/*
                        I think `alternativeVisual` was for using SVG as the image, which is currently beyond the scope of the design tool. Suggest we remove?
                    */}
						{templateSettings.alternativeVisual}
					</div>
				) : (
					<DesignableBannerCloseButton
						onCloseClick={onCloseClick}
						settings={templateSettings.closeButtonSettings}
						styleOverides={styles.closeButtonOverrides}
					/>
				)}

				{showChoiceCards && threeTierChoiceCards && (
					<div css={styles.threeTierChoiceCardsContainer}>
						<ThreeTierChoiceCards
							countryCode={countryCode}
							selectedProduct={threeTierChoiceCardSelectedProduct}
							setSelectedProduct={
								setThreeTierChoiceCardSelectedProduct
							}
							variantOfChoiceCard={'THREE_TIER_CHOICE_CARDS'}
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

				<div css={styles.guardianLogoContainer}>
					<SvgGuardianLogo
						textColor={hexColourToString(basic.logo)}
					/>
				</div>
				{showReminder && (
					<div css={styles.reminderContainer}>
						<span css={styles.reminderText}>
							Not ready to support today?{' '}
						</span>
						<Button
							priority="subdued"
							onClick={onReminderCtaClick}
							cssOverrides={styles.reminderCta(
								templateSettings.secondaryCtaSettings,
							)}
						>
							Remind me later
						</Button>
					</div>
				)}
			</div>

			{isReminderActive && (
				<div css={styles.reminderFormContainer}>
					<div css={styles.containerOverrides}>
						<DesignableBannerReminder
							reminderCta={
								mainOrMobileContent.secondaryCta as BannerEnrichedReminderCta
							}
							trackReminderSetClick={
								reminderTracking.onReminderSetClick
							}
							setReminderCtaSettings={
								templateSettings.secondaryCtaSettings
							}
							mobileReminderRef={
								isTabletOrAbove ? null : mobileReminderRef
							}
						/>
					</div>
				</div>
			)}
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
		${limitHeight ? 'max-height: 70vh;' : ''}
		overflow: hidden;
		* {
			box-sizing: border-box;
		}
		${from.tablet} {
			border-top: 1px solid ${neutral[0]};
		}
		b,
		strong {
			font-weight: bold;
		}
	`,
	containerOverrides: css`
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 0 10px 10px 10px;

		${from.desktop} {
			display: grid;
			grid-template-columns: auto auto auto auto;
			grid-template-rows: auto 1fr auto;
			width: 100%;
			max-width: 1300px;
			column-gap: ${space[8]}px;
		}
	`,
	verticalLine: css`
		${from.desktop} {
			background-color: ${neutral[0]};
			width: 1px;
			grid-column: 2;
			grid-row: 1 / -1;
			opacity: 0.2;
			margin-bottom: -${space[4]}px;
			margin-top: ${space[6]}px;
			margin-right: ${space[2]}px;
		}
	`,
	closeButtonOverrides: css`
		${until.desktop} {
			position: fixed;
			margin-top: ${space[3]}px;
			padding-right: 10px;
			right: 0;
		}

		${from.tablet} {
			margin-top: ${space[3]}px;
			grid-column: 4;
			grid-row: 1;
		}
	`,
	// hacky change until we can rework the designable banner header with the correct styles
	headerOverrides: css`
		/* stylelint-disable declaration-no-important */
		h2 {
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
		order: ${bannerHasImage ? '2' : '1'};
		${until.tablet} {
			${bannerHasImage
				? ''
				: `max-width: calc(100% - 40px - ${space[3]}px);`}
		}

		${from.desktop} {
			padding-left: ${space[2]}px;
			padding-top: ${space[6]}px;
		}

		${from.tablet} {
			grid-column: 2;
			grid-row: 1;
			background: ${background};
		}
	`,
	headerWithImageContainer: (background: string) => css`
		order: 1;
		max-width: '100%';
		${between.mobileMedium.and.tablet} {
			order: '2';
		}
		${from.tablet} {
			grid-column: 2;
			grid-row: 1;
			background: ${background};
		}
		${from.desktop} {
			padding-left: ${space[2]}px;
			padding-top: ${space[6]}px;
		}
	`,
	contentContainer: (showRemindMeLater: boolean) => css`
		order: 2;
		${from.tablet} {
			grid-column: 2;
			grid-row: ${showRemindMeLater ? '2' : '2 / span 2'};
		}
		${from.desktop} {
			padding-left: ${space[2]}px;
		}
	`,
	bodyCopyOverrides: css`
		p {
			${textSans15}
		}
	`,
	bannerVisualContainer: (background: string) => css`
		order: 1;
		background: ${background};
		${from.tablet} {
			grid-column: 2;
			grid-row: 1 / span 2;
			align-self: flex-start;
		}
		${from.desktop} {
			padding-left: ${space[2]}px;
		}
	`,
	threeTierChoiceCardsContainer: css`
		order: 3;
		${until.tablet} {
			padding-bottom: 100px;
		}
		${until.desktop} {
			padding-bottom: 90px;
		}
		${from.desktop} {
			grid-column: 3;
			grid-row: 1;
			grid-row-end: 3;
		}
	`,
	guardianLogoContainer: css`
		display: none;
		${from.desktop} {
			display: flex;
			width: 128px;
			height: 41px;
			justify-content: center;
			align-items: center;
			margin-top: ${space[9]}px;
			margin-right: -${space[6]}px;
		}
	`,

	reminderContainer: css`
		${textEgyptian15};
		grid-column: 1;
		grid-row: 3;
		order: 4;
		align-self: center;
		margin-top: ${space[2]}px;

		${from.tablet} {
			align-self: end;
		}
	`,
	reminderText: css`
		${textSans17};
		display: none;

		${from.tablet} {
			display: inline;
		}
	`,
	reminderCta: ({ default: defaultSettings }: CtaSettings) => css`
		${textSansBold17};
		color: ${defaultSettings.backgroundColour};
		display: inline;
		height: auto;
		min-height: auto;
	`,

	reminderFormContainer: css`
		border-top: 2px solid ${neutral[0]};
		margin-top: ${space[3]}px;
	`,
	ctaContainer: css`
		order: 4;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: ${space[4]}px;
		margin-bottom: ${space[2]}px;

		${until.desktop} {
			a {
				width: calc(100% - 24px);
			}
		}

		${until.phablet} {
			position: fixed;
			bottom: 0;
			left: 0;
			padding-top: ${space[3]}px;
			padding-bottom: ${space[3]}px;
			margin-bottom: 0;
			background-color: ${neutral[100]};
			box-shadow: 0 -4px 12px 0 rgba(0, 0, 0, 0.25);
		}

		${until.desktop} {
			position: fixed;
			padding-top: ${space[3]}px;
			left: 0;
			right: 0;
		}

		${from.desktop} {
			grid-column: 3;
			flex-direction: row;
			gap: 0;
			margin-bottom: 0;
			margin-top: ${space[3]}px;

			> span {
				width: auto;
			}
		}
	`,
	linkButtonStyles: css`
		background-color: ${palette.brandAlt[400]};
		border-color: ${palette.brandAlt[400]};
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
