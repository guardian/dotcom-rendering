import type { BannerProps } from '@guardian/support-dotcom-components/dist/shared/types';
import type { PromotedNewsletter } from '@guardian/support-dotcom-components/dist/shared/types/props/banner';
import type { ComponentType } from 'react';
import { useEffect, useRef, useState } from 'react';
import { validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';
import type { BannerData } from '../designableBanner/BannerProps';
import { BannerBody } from '../designableBanner/components/BannerBody';
import { BannerCloseButton } from '../designableBanner/components/BannerCloseButton';
import { BannerHeader } from '../designableBanner/components/BannerHeader';
import { BannerVisual } from '../designableBanner/components/BannerVisual';
import { useDesignableBannerModel } from '../designableBanner/useDesignableBannerModel';
import { styles, transitionDurationMs } from './NewsletterBanner.styles';
import type { NewsletterBannerData } from './NewsletterBannerData';
import { buildNewsletterBannerSettings } from './NewsletterBannerData';
import { NewsletterBannerLogo } from './NewsletterBannerLogo';
import { NewsletterFrequencyTag } from './NewsletterFrequencyTag';
import { NewsletterSignupForm } from './NewsletterSignupForm';
import { SuccessMessage } from './SuccessMessage';
import { useSuccessDismissal } from './useSuccessDismissal';

const buildNewsletterBannerData = (
	baseBannerData: BannerData,
	newsletter: PromotedNewsletter,
	onClose: () => void,
): NewsletterBannerData => {
	const imageSettings =
		baseBannerData.settings.headerSettings?.headerImage ??
		baseBannerData.settings.imageSettings;

	return {
		...baseBannerData,
		newsletter,
		actions: {
			...baseBannerData.actions,
			onClose,
		},
		selectors: {
			...baseBannerData.selectors,
			copyForViewport: {
				...baseBannerData.selectors.copyForViewport,
				highlightedText: undefined,
				paragraphs:
					newsletter.signUpDescription !== undefined
						? [<>{newsletter.signUpDescription}</>]
						: baseBannerData.selectors.copyForViewport.paragraphs,
			},
			headingCopy: {
				...baseBannerData.selectors.headingCopy,
				heading: <>{newsletter.name}</>,
			},
			showHeaderImage: false,
			showBody: true,
			showBodyVisual: true,
		},
		settings: {
			...baseBannerData.settings,
			imageSettings,
			newsletterBanner: buildNewsletterBannerSettings(
				baseBannerData.design,
			),
		},
	};
};

export const NewsletterBannerComponent = (
	props: BannerRenderProps,
): JSX.Element | null => {
	const newsletter = props.promotedNewsletter;
	const bannerRef = useRef<HTMLDivElement>(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const { isOpen, bannerData: baseBannerData } = useDesignableBannerModel({
		...props,
		isCollapsible: false,
	});
	const { isDismissing, dismiss, ...dismissalHandlers } = useSuccessDismissal(
		{
			isSuccess,
			bannerRef,
			onClose: baseBannerData?.actions.onClose,
			durationMs: transitionDurationMs,
		},
	);

	useEffect(() => {
		bannerRef.current?.focus();
	}, [isSuccess]);

	if (!newsletter || !isOpen || !baseBannerData || !props.design) {
		return null;
	}

	const tabletBackgroundUrl =
		props.design.tabletImageAsBackground === true
			? (
					baseBannerData.settings.headerSettings?.headerImage ??
					baseBannerData.settings.imageSettings
				)?.tabletUrl
			: undefined;
	const hasTabletBackground =
		tabletBackgroundUrl !== undefined && tabletBackgroundUrl.length > 0;
	const bannerData = buildNewsletterBannerData(
		baseBannerData,
		newsletter,
		isSuccess ? dismiss : baseBannerData.actions.onClose,
	);
	const dividerColor = bannerData.settings.newsletterBanner.divider;

	return (
		<div
			ref={bannerRef}
			role="alert"
			tabIndex={-1}
			{...dismissalHandlers}
			{...(isDismissing ? { inert: '' } : {})}
			css={[
				styles.container(
					bannerData.settings.containerSettings.backgroundColour,
					bannerData.settings.containerSettings.textColor ??
						'inherit',
				),
				hasTabletBackground &&
					!isSuccess &&
					styles.tabletBackgroundImage(tabletBackgroundUrl),
				styles.dismissal(isDismissing),
			]}
		>
			<div css={styles.layout}>
				<NewsletterBannerLogo bannerData={bannerData} />
				<div css={styles.verticalLine(dividerColor)} />
				<div css={styles.panels}>
					<div
						css={styles.panel(!isSuccess)}
						aria-hidden={isSuccess}
						{...(isSuccess ? { inert: '' } : {})}
					>
						<div>
							<div css={styles.signupLayout}>
								<div css={styles.contentContainer}>
									<div css={styles.content}>
										<div css={styles.frequencyRow}>
											<NewsletterFrequencyTag
												bannerData={bannerData}
											/>
										</div>
										<div
											css={styles.horizontalLine(
												dividerColor,
											)}
										/>
										<div
											css={[
												styles.textImageRow,
												hasTabletBackground &&
													styles.tabletBackgroundRow,
											]}
										>
											<div css={styles.textCopy}>
												<div
													css={[
														styles.headingAfterDivider,
														hasTabletBackground &&
															styles.tabletBackgroundHeading,
													]}
												>
													<BannerHeader
														bannerData={bannerData}
													/>
												</div>
												<div css={styles.subheading}>
													<BannerBody
														bannerData={bannerData}
													/>
												</div>
											</div>
											<div
												css={[
													styles.mobileImage,
													hasTabletBackground &&
														styles.hideTabletImage,
												]}
											>
												<BannerVisual
													bannerData={bannerData}
												/>
											</div>
										</div>
										<NewsletterSignupForm
											bannerData={bannerData}
											componentId="newsletter_banner"
											onSuccess={() => setIsSuccess(true)}
										/>
									</div>
								</div>
								<div css={styles.desktopImage}>
									<BannerVisual bannerData={bannerData} />
								</div>
							</div>
						</div>
					</div>
					<div
						css={styles.panel(isSuccess)}
						aria-hidden={!isSuccess}
						{...(!isSuccess ? { inert: '' } : {})}
					>
						<div>
							<div css={styles.successContent}>
								<SuccessMessage bannerData={bannerData} />
							</div>
						</div>
					</div>
				</div>
				<div css={styles.closeButton}>
					<BannerCloseButton bannerData={bannerData} />
				</div>
			</div>
		</div>
	);
};

const ValidatedNewsletterBanner = validatedBannerWrapper(
	NewsletterBannerComponent,
	'newsletter-banner',
) as ComponentType<BannerProps & { idApiUrl: string }>;

export const NewsletterBanner = ({
	idApiUrl,
	...props
}: BannerProps & { idApiUrl: string }): JSX.Element => (
	<ValidatedNewsletterBanner {...props} idApiUrl={idApiUrl} />
);
