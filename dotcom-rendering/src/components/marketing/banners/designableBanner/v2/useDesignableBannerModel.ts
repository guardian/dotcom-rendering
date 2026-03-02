import { from } from '@guardian/source/foundations';
import { hexColourToString } from '@guardian/support-dotcom-components';
import type {
	BannerDesignHeaderImage,
	BannerDesignImage,
	ConfigurableDesign,
	Image,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	removeMediaRulePrefix,
	useMatchMedia,
} from '../../../../../lib/useMatchMedia';
import { getChoiceCards } from '../../../lib/choiceCards';
import { createClickEventFromTracking } from '../../../lib/tracking';
import type { BannerRenderProps } from '../../common/types';
import { setChannelClosedTimestamp } from '../../utils/localStorage';
import type {
	BannerTemplateSettings,
	ChoiceCardDesignSettings,
} from '../settings';
import type { BannerData } from './BannerProps';
import { buildBannerSelectors } from './bannerSelectors';
import { getComponentIds } from './componentIds';

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
): ChoiceCardDesignSettings | undefined => {
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

export const useDesignableBannerModel = ({
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
}: BannerRenderProps): {
	isOpen: boolean;
	bannerData: BannerData | null;
} => {
	const isTabletOrAbove = useMatchMedia(removeMediaRulePrefix(from.tablet));
	const [isOpen, setIsOpen] = useState(true);

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
							: '#DCDCDC'
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
		const clickHandlerFor = (componentId: string, close: boolean) => {
			return (): void => {
				const componentClickEvent = createClickEventFromTracking(
					tracking,
					componentId,
				);
				void submitComponentEvent?.(componentClickEvent);
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

	const bannerData: BannerData | null = useMemo(() => {
		if (!design || !settings) {
			return null;
		}

		const selectors = buildBannerSelectors({
			content,
			isTabletOrAbove,
			isCollapsed,
			choiceCards,
			selectedChoiceCard,
			settings,
			tickerSettings,
			separateArticleCount,
			separateArticleCountSettings,
		});

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
			selectors,
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

	return { isOpen, bannerData };
};
