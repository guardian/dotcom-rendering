/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/common/BannerWrapper.tsx
 */
import {
	bannerSchema,
	containsNonArticleCountPlaceholder,
	getReminderFields,
	replaceNonArticleCountPlaceholders,
	SecondaryCtaType,
} from '@guardian/support-dotcom-components';
import type {
	BannerContent,
	BannerProps,
	Cta,
	SecondaryCta,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import { useEffect } from 'react';
import { useIsInView } from '../../../../lib/useIsInView';
import type { ReactComponent } from '../../lib/ReactComponent';
import { replaceArticleCount } from '../../lib/replaceArticleCount';
import {
	addAbandonedBasketAndTrackingParamsToUrl,
	addRegionIdAndTrackingParamsToSupportUrl,
	addTrackingParamsToProfileUrl,
	createClickEventFromTracking,
	createInsertEventFromTracking,
	createViewEventFromTracking,
	isProfileUrl,
} from '../../lib/tracking';
import { withParsedProps } from '../../shared/ModuleWrapper';
import type { CloseableBannerProps } from '../utils/withCloseable';
import { withCloseable } from '../utils/withCloseable';
import type {
	BannerEnrichedCta,
	BannerEnrichedSecondaryCta,
	BannerId,
	BannerRenderedContent,
	BannerRenderProps,
} from './types';

function getComponentIds(bannerId: BannerId) {
	return {
		close: `${bannerId} : close`,
		cta: `${bannerId} : cta`,
		secondaryCta: `${bannerId} : secondary-cta`,
		notNow: `${bannerId} : not now`,
		signIn: `${bannerId} : sign in`,
		reminderCta: `${bannerId} : reminder-cta`,
		reminderSet: `${bannerId} : reminder-set`,
		reminderClose: `${bannerId} : reminder-close`,
	};
}

export const getParagraphsOrMessageText = (
	paras: string[] | undefined,
	text: string | undefined,
): string[] => {
	const bodyCopy = [];

	if (paras != null) {
		bodyCopy.push(...paras);
	} else if (text != null) {
		bodyCopy.push(text);
	}
	return bodyCopy;
};

const withBannerData =
	(
		Banner: ReactComponent<BannerRenderProps>,
		bannerId: BannerId,
	): ReactComponent<CloseableBannerProps> =>
	(bannerProps) => {
		const {
			tracking,
			submitComponentEvent,
			onClose,
			content,
			mobileContent,
			countryCode,
			prices,
			fetchEmail,
			articleCounts,
			tickerSettings,
			isSupporter,
			separateArticleCount,
			separateArticleCountSettings,
			choiceCardAmounts,
			design,
			bannerChannel,
			abandonedBasket,
		} = bannerProps;

		const [hasBeenSeen, setNode] = useIsInView({
			debounce: true,
			threshold: 0,
		});

		useEffect(() => {
			if (hasBeenSeen && submitComponentEvent) {
				submitComponentEvent(
					createViewEventFromTracking(
						tracking,
						tracking.campaignCode,
					),
				);
			}
		}, [hasBeenSeen, submitComponentEvent, tracking]);

		useEffect(() => {
			if (submitComponentEvent) {
				submitComponentEvent(
					createInsertEventFromTracking(
						tracking,
						tracking.campaignCode,
					),
				);
			}
		}, [submitComponentEvent, tracking]);

		const numArticles = articleCounts.forTargetedWeeks;

		const cleanParagraphsOrMessageText = (
			paras: string[] | undefined,
			text: string | undefined,
		): string[] => {
			const originalCopy = getParagraphsOrMessageText(paras, text);

			return originalCopy.map((p) =>
				replaceNonArticleCountPlaceholders(
					p,
					countryCode,
					prices,
				).trim(),
			);
		};

		const finaliseParagraphs = (
			paras: string[],
		): (Array<JSX.Element> | JSX.Element)[] => {
			return paras.map((p) =>
				replaceArticleCount(p, numArticles, 'banner'),
			);
		};

		const paragraphsContainNonArticleCountPlaceholder = (
			paras: string[],
		): boolean => paras.some((p) => containsNonArticleCountPlaceholder(p));

		const componentIds = getComponentIds(bannerId);

		// For safety, this function throws if not all placeholders are replaced
		const buildRenderedContent = (
			bannerContent: BannerContent,
		): BannerRenderedContent => {
			const buildEnrichedCta = (cta: Cta): BannerEnrichedCta => {
				if (isProfileUrl(cta.baseUrl)) {
					return {
						ctaUrl: addTrackingParamsToProfileUrl(
							cta.baseUrl,
							tracking,
						),
						ctaText: cta.text,
					};
				}

				if (bannerChannel === 'abandonedBasket' && abandonedBasket) {
					return {
						ctaUrl: addAbandonedBasketAndTrackingParamsToUrl(
							cta.baseUrl,
							abandonedBasket,
							tracking,
						),
						ctaText: cta.text,
					};
				}

				return {
					ctaUrl: addRegionIdAndTrackingParamsToSupportUrl(
						cta.baseUrl,
						tracking,
						numArticles,
						countryCode,
					),
					ctaText: cta.text,
				};
			};

			const buildEnrichedSecondaryCta = (
				secondaryCta: SecondaryCta,
			): BannerEnrichedSecondaryCta => {
				if (secondaryCta.type === SecondaryCtaType.Custom) {
					return {
						type: SecondaryCtaType.Custom,
						cta: buildEnrichedCta(secondaryCta.cta),
					};
				}

				return {
					type: SecondaryCtaType.ContributionsReminder,
					reminderFields: getReminderFields(countryCode),
				};
			};

			const primaryCta = bannerContent.cta
				? buildEnrichedCta(bannerContent.cta)
				: null;
			const secondaryCta = bannerContent.secondaryCta
				? buildEnrichedSecondaryCta(bannerContent.secondaryCta)
				: null;

			const cleanHighlightedText =
				bannerContent.highlightedText &&
				replaceNonArticleCountPlaceholders(
					bannerContent.highlightedText,
					countryCode,
					prices,
				).trim();

			const cleanHeading = replaceNonArticleCountPlaceholders(
				bannerContent.heading,
				countryCode,
				prices,
			).trim();

			const cleanParagraphs = cleanParagraphsOrMessageText(
				bannerContent.paragraphs,
				bannerContent.messageText,
			);

			const copyHasPlaceholder =
				paragraphsContainNonArticleCountPlaceholder(cleanParagraphs) ||
				(!!cleanHighlightedText &&
					containsNonArticleCountPlaceholder(cleanHighlightedText)) ||
				(!!cleanHeading &&
					containsNonArticleCountPlaceholder(cleanHeading));

			const headingWithArticleCount = cleanHeading
				? replaceArticleCount(cleanHeading, numArticles, 'banner')
				: null;

			const highlightedTextWithArticleCount = cleanHighlightedText
				? replaceArticleCount(
						cleanHighlightedText,
						numArticles,
						'banner',
				  )
				: null;

			if (copyHasPlaceholder) {
				throw Error('Banner copy contains placeholders, abandoning.');
			}

			return {
				highlightedText: highlightedTextWithArticleCount,
				paragraphs: finaliseParagraphs(cleanParagraphs),
				heading: headingWithArticleCount,
				primaryCta,
				secondaryCta,
			};
		};

		const clickHandlerFor = (componentId: string, close: boolean) => {
			return (): void => {
				const componentClickEvent = createClickEventFromTracking(
					tracking,
					componentId,
				);
				if (submitComponentEvent) {
					submitComponentEvent(componentClickEvent);
				}
				if (close) {
					onClose();
				}
			};
		};

		const onCtaClick = clickHandlerFor(componentIds.cta, true);
		const onSecondaryCtaClick = clickHandlerFor(
			componentIds.secondaryCta,
			true,
		);
		const onReminderCtaClick = clickHandlerFor(
			componentIds.reminderCta,
			false,
		);
		const onReminderSetClick = clickHandlerFor(
			componentIds.reminderSet,
			false,
		);
		const onReminderCloseClick = clickHandlerFor(
			componentIds.reminderClose,
			false,
		);
		const onCloseClick = clickHandlerFor(componentIds.close, true);
		const onNotNowClick = clickHandlerFor(componentIds.notNow, true);
		const onSignInClick = clickHandlerFor(componentIds.signIn, false);

		try {
			const renderedContent = content && buildRenderedContent(content);
			const renderedMobileContent =
				mobileContent && buildRenderedContent(mobileContent);

			if (renderedContent) {
				const props: BannerRenderProps = {
					onCtaClick,
					onSecondaryCtaClick,
					reminderTracking: {
						onReminderCtaClick,
						onReminderSetClick,
						onReminderCloseClick,
					},
					onCloseClick,
					onSignInClick,
					onNotNowClick,
					content: {
						mainContent: renderedContent,
						mobileContent: renderedMobileContent ?? renderedContent,
					},
					countryCode,
					fetchEmail,
					tickerSettings,
					isSupporter,
					articleCounts,
					separateArticleCount,
					separateArticleCountSettings,
					choiceCardAmounts,
					tracking,
					submitComponentEvent,
					design,
				};

				return (
					<div ref={setNode}>
						<Banner {...props} />
					</div>
				);
			}
		} catch (err) {
			console.log(err);
		}

		return <></>;
	};

export const bannerWrapper = (
	Banner: ReactComponent<BannerRenderProps>,
	bannerId: BannerId,
): ReactComponent<BannerProps> =>
	withCloseable(withBannerData(Banner, bannerId));

const validate = (props: unknown): props is BannerProps => {
	const result = bannerSchema.safeParse(props);
	return result.success;
};

export const validatedBannerWrapper = (
	Banner: ReactComponent<BannerRenderProps>,
	bannerId: BannerId,
): ReactComponent<BannerProps> => {
	const withoutValidation = bannerWrapper(Banner, bannerId);
	return withParsedProps(withoutValidation, validate);
};
