import { css } from '@emotion/react';
import {
	between,
	from,
	neutral,
	space,
	until,
} from '@guardian/source/foundations';
import { hexColourToString } from '@guardian/support-dotcom-components';
import type {
	BannerDesignHeaderImage,
	BannerDesignImage,
	ConfigurableDesign,
	Image,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	removeMediaRulePrefix,
	useMatchMedia,
} from '../../../../../lib/useMatchMedia';
import { getChoiceCards } from '../../../lib/choiceCards';
import { createClickEventFromTracking } from '../../../lib/tracking';
import {
	bannerWrapper,
	validatedBannerWrapper,
} from '../../common/BannerWrapper';
import type { BannerRenderProps } from '../../common/types';
import { setChannelClosedTimestamp } from '../../utils/localStorage';
import type { BannerTemplateSettings, ChoiceCardSettings } from '../settings';
import { BannerContext, type BannerContextType } from './BannerContext';
import { getComponentIds } from './componentIds';
import { BannerArticleCount } from './components/BannerArticleCount';
import { BannerBody } from './components/BannerBody';
import { BannerChoiceCards } from './components/BannerChoiceCards';
import { BannerCloseButton } from './components/BannerCloseButton';
import { BannerContent } from './components/BannerContent';
import { BannerCtas } from './components/BannerCtas';
import { BannerHeader } from './components/BannerHeader';
import { BannerLogo } from './components/BannerLogo';
import { BannerTicker } from './components/BannerTicker';
import { BannerVisual } from './components/BannerVisual';

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
	if (design.visual?.kind !== 'Image') {
		return undefined;
	}
	return buildImageSettings(design.visual);
};

const buildHeaderImageSettings = (
	design: ConfigurableDesign,
): Image | undefined => {
	if (!design.headerImage) {
		return undefined;
	}
	return buildImageSettings(design.headerImage);
};

const buildChoiceCardSettings = (
	design: ConfigurableDesign,
): ChoiceCardSettings | undefined => {
	if (design.visual?.kind !== 'ChoiceCards') {
		return undefined;
	}
	const {
		buttonColour,
		buttonTextColour,
		buttonBorderColour,
		buttonSelectColour,
		buttonSelectTextColour,
		buttonSelectBorderColour,
		buttonSelectMarkerColour,
		pillTextColour,
		pillBackgroundColour,
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
		buttonSelectMarkerColour: buttonSelectMarkerColour
			? hexColourToString(buttonSelectMarkerColour)
			: undefined,
		pillTextColour: pillTextColour
			? hexColourToString(pillTextColour)
			: undefined,
		pillBackgroundColour: pillBackgroundColour
			? hexColourToString(pillBackgroundColour)
			: undefined,
	};
};

interface BannerComponentProps extends BannerRenderProps {
	children?: React.ReactNode;
}

const phabletContentMaxWidth = '492px';

const styles = {
	outerContainer: (background: string, textColor: string = 'inherit') => css`
		background: ${background};
		color: ${textColor};
		bottom: 0px;
		max-height: 65vh;
		max-height: 65svh;

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
				'.	.									.'
				'.	copy-container						close-button'
				'.	${cardsImageOrSpaceTemplateString}	${cardsImageOrSpaceTemplateString}'
				'.	cta-container						cta-container';
		}
		${from.phablet} {
			max-width: 740px;
			margin: 0 auto;
			padding: ${space[3]}px ${space[3]}px 0 ${space[3]}px;
			grid-template-columns: minmax(0, 0.5fr) ${phabletContentMaxWidth} max-content minmax(
					0,
					0.5fr
				);
			grid-template-rows: auto auto auto;
			grid-template-areas:
				'.	copy-container						close-button			close-button'
				'.	${cardsImageOrSpaceTemplateString}	${cardsImageOrSpaceTemplateString}	.'
				'.	cta-container						cta-container						.';
		}
		${from.desktop} {
			max-width: 980px;
			align-self: stretch;
			padding: ${space[3]}px ${space[1]}px 0 ${space[3]}px;
			grid-template-columns: auto 380px auto;
			grid-template-rows: auto auto;

			grid-template-areas:
				'copy-container		${cardsImageOrSpaceTemplateString}	close-button'
				'cta-container		${cardsImageOrSpaceTemplateString}	.';
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
	collapsedLayoutOverrides: (cardsImageOrSpaceTemplateString: string) => css`
		display: grid;
		background: inherit;
		position: relative;
		bottom: 0px;

		/* mobile first */
		${until.phablet} {
			max-width: 660px;
			margin: 0 auto;
			padding: ${space[2]}px ${space[3]}px 0 ${space[3]}px;
			grid-template-columns: auto max(${phabletContentMaxWidth} auto);
			grid-template-areas: ${`
				'.	.									.'
				'.	copy-container						close-button'
				'.	${cardsImageOrSpaceTemplateString}	${cardsImageOrSpaceTemplateString}'
				'.	cta-container						cta-container'
				`};
		}
		${from.phablet} {
			max-width: 740px;
			margin: 0 auto;
			padding: ${space[2]}px ${space[3]}px 0 ${space[3]}px;
			grid-template-columns:
				minmax(0, 0.5fr)
				${phabletContentMaxWidth}
				1fr
				0;
			grid-template-rows: auto auto;
			grid-template-areas:
				'.	copy-container						close-button						.'
				'.	${cardsImageOrSpaceTemplateString}	${cardsImageOrSpaceTemplateString}	.'
				'.	cta-container						cta-container						.';
		}
		${from.desktop} {
			max-width: 980px;
			padding: ${space[1]}px ${space[1]}px 0 ${space[3]}px;
			grid-template-columns: auto 380px minmax(100px, auto);
			grid-template-rows: auto auto;

			grid-template-areas:
				'copy-container		${cardsImageOrSpaceTemplateString}	close-button'
				'cta-container		${cardsImageOrSpaceTemplateString}	.';
		}
		${from.leftCol} {
			max-width: 1140px;
			bottom: 0px;
			/* the vertical line aligns with that of standard article */
			grid-column-gap: 10px;
			grid-template-columns: 140px 1px min(460px) min(380px) auto;
			grid-template-rows: auto auto;
			grid-template-areas:
				'logo	vert-line	copy-container	${cardsImageOrSpaceTemplateString}	close-button '
				'.		vert-line	cta-container	${cardsImageOrSpaceTemplateString}	.';
		}
		${from.wide} {
			max-width: 1300px;
			/* the vertical line aligns with that of standard article */
			grid-template-columns: 219px 1px min(460px) min(380px) auto;
			grid-template-rows: auto auto;
			grid-template-areas:
				'logo	vert-line	copy-container	${cardsImageOrSpaceTemplateString}	close-button '
				'.		vert-line	cta-container	${cardsImageOrSpaceTemplateString}	.';
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
	verticalLine: css`
		grid-area: vert-line;
		pointer-events: none;

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
};

const Banner = ({
	content,
	onCloseClick,
	onCollapseClick,
	onExpandClick,
	articleCounts,
	onCtaClick,
	onSecondaryCtaClick,
	bannerChannel,
	reminderTracking,
	separateArticleCountSettings,
	tickerSettings,
	choiceCardsSettings,
	submitComponentEvent,
	tracking,
	design,
	countryCode,
	promoCodes,
	separateArticleCount,
	isCollapsible,
	children,
}: BannerComponentProps): JSX.Element | null => {
	const isTabletOrAbove = useMatchMedia(removeMediaRulePrefix(from.tablet));
	const bannerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		if (bannerRef.current) {
			bannerRef.current.focus();
		}
	}, []);

	const choiceCards = useMemo(
		() => getChoiceCards(isTabletOrAbove, choiceCardsSettings),
		[isTabletOrAbove, choiceCardsSettings],
	);

	const defaultChoiceCard = choiceCards?.find((cc) => cc.isDefault);

	const [selectedChoiceCard, setSelectedChoiceCard] = useState<
		ChoiceCard | undefined
	>(defaultChoiceCard);

	// Reset selectedChoiceCard when choiceCards change
	useEffect(() => {
		if (!choiceCards || choiceCards.length === 0) {
			setSelectedChoiceCard(undefined);
		}
	}, [choiceCards]);

	const isCollapsableBanner: boolean =
		isCollapsible ??
		(tracking.abTestVariant.includes('COLLAPSABLE_V1') ||
			tracking.abTestVariant.includes('COLLAPSABLE_V2_MAYBE_LATER'));

	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	const handleClose = useCallback((): void => {
		setChannelClosedTimestamp(bannerChannel);
		setIsOpen(false);
		document.body.focus();
		document.dispatchEvent(
			new CustomEvent('banner:close', {
				detail: { bannerId: 'designable-banner' },
			}),
		);
	}, [bannerChannel]);

	const handleToggleCollapse = useCallback(() => {
		const nextCollapsed = !isCollapsed;
		setIsCollapsed(nextCollapsed);
		if (nextCollapsed) {
			onCollapseClick();
		} else {
			onExpandClick();
		}
	}, [isCollapsed, onCollapseClick, onExpandClick]);

	const settings = useMemo((): BannerTemplateSettings | undefined => {
		if (!design) {
			return undefined;
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

		return {
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
							: '#DCDCDC' // Fallback to specialReport[100] equivalent if needed, but let's use a safe hex for now
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
	}, [design]);

	// Create tracking handlers that always run
	const componentIds = getComponentIds('designable-banner');
	const trackingHandlers = useMemo(() => {
		if (!tracking || !submitComponentEvent) {
			return {
				onCloseClick: () => {},
				onCollapseClick: () => {},
				onExpandClick: () => {},
				onCtaClick: () => {},
				onSecondaryCtaClick: () => {},
			};
		}

		const clickHandlerFor = (componentId: string, close: boolean) => {
			return (): void => {
				const componentClickEvent = createClickEventFromTracking(
					tracking,
					componentId,
				);
				void submitComponentEvent(componentClickEvent);
				if (close) {
					// This would need the onClose function from withCloseable HOC
					// For now, just handle tracking
				}
			};
		};

		return {
			onCloseClick: clickHandlerFor(componentIds.close, true),
			onCollapseClick: clickHandlerFor(componentIds.collapse, false),
			onExpandClick: clickHandlerFor(componentIds.expand, false),
			onCtaClick: clickHandlerFor(componentIds.cta, true),
			onSecondaryCtaClick: clickHandlerFor(
				componentIds.secondaryCta,
				true,
			),
		};
	}, [
		tracking,
		submitComponentEvent,
		componentIds.close,
		componentIds.collapse,
		componentIds.expand,
		componentIds.cta,
		componentIds.secondaryCta,
	]);

	// Create combined handlers that run both tracking and prop handlers
	const combinedHandlers = useMemo(() => {
		return {
			onClose: () => {
				// Always run tracking
				trackingHandlers.onCloseClick();
				// Also run prop handler if it exists
				onCloseClick();
				// Run the close handler
				handleClose();
			},
			onCtaClick: () => {
				trackingHandlers.onCtaClick();
				onCtaClick();
			},
			onSecondaryCtaClick: () => {
				trackingHandlers.onSecondaryCtaClick();
				onSecondaryCtaClick();
			},
			onCollapseClick: () => {
				trackingHandlers.onCollapseClick();
				onCollapseClick();
			},
			onExpandClick: () => {
				trackingHandlers.onExpandClick();
				onExpandClick();
			},
		};
	}, [
		trackingHandlers,
		onCloseClick,
		onCtaClick,
		onSecondaryCtaClick,
		onCollapseClick,
		onExpandClick,
		handleClose,
	]);

	const contextValue: BannerContextType | null = useMemo(() => {
		if (!design || !settings) {
			return null;
		}
		return {
			bannerChannel,
			content,
			design,
			tracking,
			articleCounts,
			tickerSettings,
			separateArticleCount,
			separateArticleCountSettings,
			promoCodes,
			countryCode,
			reminderTracking,
			settings,
			isCollapsed,
			isCollapsible: isCollapsableBanner,
			isTabletOrAbove,
			choices: choiceCards,
			selectedChoiceCard,
			actions: {
				onClose: combinedHandlers.onClose,
				onToggleCollapse: handleToggleCollapse,
				onCtaClick: combinedHandlers.onCtaClick,
				onSecondaryCtaClick: combinedHandlers.onSecondaryCtaClick,
				onChoiceCardChange: setSelectedChoiceCard,
				submitComponentEvent,
			},
		};
	}, [
		content,
		design,
		tracking,
		articleCounts,
		tickerSettings,
		separateArticleCountSettings,
		promoCodes,
		countryCode,
		settings,
		isCollapsed,
		isCollapsableBanner,
		isTabletOrAbove,
		choiceCards,
		selectedChoiceCard,
		combinedHandlers,
		handleToggleCollapse,
		submitComponentEvent,
		separateArticleCount,
		reminderTracking,
		bannerChannel,
	]);

	if (!isOpen) {
		return null;
	}

	const contextClassName =
		isCollapsableBanner ||
		tracking.abTestVariant.includes('COLLAPSABLE_V2_MAYBE_LATER')
			? 'maybe-later'
			: '';

	const cardsImageOrSpaceTemplateString = settings
		? settings.choiceCardSettings
			? 'choice-cards-container'
			: settings.imageSettings
			? 'main-image'
			: '.'
		: '.';

	return (
		<BannerContext.Provider value={contextValue ?? undefined}>
			<div
				ref={bannerRef}
				role="alert"
				tabIndex={-1}
				css={styles.outerContainer(
					settings?.containerSettings?.backgroundColour ?? '',
					settings?.containerSettings?.textColor ?? 'inherit',
				)}
				className={contextClassName}
			>
				<div
					css={
						isCollapsableBanner && isCollapsed
							? styles.collapsedLayoutOverrides(
									cardsImageOrSpaceTemplateString,
							  )
							: styles.layoutOverrides(
									cardsImageOrSpaceTemplateString,
							  )
					}
				>
					<div css={styles.verticalLine} />
					{children ?? (
						<>
							<BannerLogo />
							<BannerContent>
								<BannerHeader />
								<BannerTicker />
								<BannerArticleCount />
								<BannerBody />
							</BannerContent>
							<BannerChoiceCards />
							<BannerCtas />
							<BannerVisual />
							<BannerCloseButton />
						</>
					)}
				</div>
			</div>
		</BannerContext.Provider>
	);
};

const unvalidated = bannerWrapper(Banner, 'designable-banner');
const validated = validatedBannerWrapper(Banner, 'designable-banner');

export {
	Banner as BannerComponent,
	unvalidated as DesignableBannerUnvalidated,
	validated as DesignableBanner,
};
