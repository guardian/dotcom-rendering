import { hexColourToString } from '@guardian/support-dotcom-components';
import type { BannerProps } from '@guardian/support-dotcom-components/dist/shared/types';
import type { ComponentType } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNewsletterSubscription } from '../../../../lib/useNewsletterSubscription';
import { NEWSLETTER_BANNER_CONFIG } from '../../../StickyBottomBanner/newsletterBannerDetails';
import { validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';
import type { BannerData } from '../designableBanner/BannerProps';
import { BannerBody } from '../designableBanner/components/BannerBody';
import { BannerCloseButton } from '../designableBanner/components/BannerCloseButton';
import { BannerHeader } from '../designableBanner/components/BannerHeader';
import { BannerVisual } from '../designableBanner/components/BannerVisual';
import { useDesignableBannerModel } from '../designableBanner/useDesignableBannerModel';
import { styles, transitionDurationMs } from './NewsletterBanner.styles';
import { NewsletterBannerLogo } from './NewsletterBannerLogo';
import { NewsletterFrequencyTag } from './NewsletterFrequencyTag';
import { NewsletterSignupForm } from './NewsletterSignupForm';
import { SuccessMessage } from './SuccessMessage';
import { useSuccessDismissal } from './useSuccessDismissal';

export const NewsletterBannerComponent = (
	props: BannerRenderProps,
): JSX.Element | null => {
	const newsletter = NEWSLETTER_BANNER_CONFIG.promotedNewsletter;
	useNewsletterSubscription(newsletter.listId, props.idApiUrl);
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

	if (!isOpen || !baseBannerData || !props.design) {
		return null;
	}

	const { basic } = props.design.colours;
	const newsletterCopy = props.content.mainContent;
	const bannerData: BannerData = {
		...baseBannerData,
		actions: {
			...baseBannerData.actions,
			onClose: isSuccess ? dismiss : baseBannerData.actions.onClose,
		},
		content: {
			mainContent: newsletterCopy,
			mobileContent: newsletterCopy,
		},
		settings: {
			...baseBannerData.settings,
			imageSettings: NEWSLETTER_BANNER_CONFIG.imageSettings,
		},
		selectors: {
			...baseBannerData.selectors,
			headingCopy: newsletterCopy,
			copyForViewport: newsletterCopy,
			showHeaderImage: false,
			showBody: true,
			showBodyVisual: true,
		},
	};

	return (
		<div
			ref={bannerRef}
			role="alert"
			tabIndex={-1}
			{...dismissalHandlers}
			{...(isDismissing ? { inert: '' } : {})}
			css={[
				styles.container(
					hexColourToString(basic.background),
					hexColourToString(basic.bodyText),
				),
				styles.dismissal(isDismissing),
			]}
		>
			<div css={styles.layout}>
				<NewsletterBannerLogo />
				<div css={styles.verticalLine} />
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
												frequency={newsletter.frequency}
											/>
											<div css={styles.inlineCloseButton}>
												<BannerCloseButton
													bannerData={bannerData}
												/>
											</div>
										</div>
										<div css={styles.horizontalLine} />
										<div css={styles.textImageRow}>
											<div css={styles.textCopy}>
												<div
													css={
														styles.headingAfterDivider
													}
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
											<div css={styles.mobileImage}>
												<BannerVisual
													bannerData={bannerData}
												/>
											</div>
										</div>
										<NewsletterSignupForm
											newsletterId={
												newsletter.identityName
											}
											newsletterName={newsletter.name}
											frequency={newsletter.frequency}
											componentId="newsletter_banner"
											onSuccess={() => setIsSuccess(true)}
										/>
									</div>
								</div>
								<div css={styles.desktopImage}>
									<BannerVisual bannerData={bannerData} />
								</div>
								<div css={styles.outerCloseButton}>
									<BannerCloseButton
										bannerData={bannerData}
									/>
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
								<SuccessMessage
									newsletterName={newsletter.name}
									frequency={newsletter.frequency}
								/>
								<div css={styles.successCloseButton}>
									<BannerCloseButton
										bannerData={bannerData}
									/>
								</div>
							</div>
						</div>
					</div>
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
	tracking,
	articleCounts,
	countryCode,
	fetchEmail,
	submitComponentEvent,
	contributionsServiceUrl,
	idApiUrl,
}: BannerProps & { idApiUrl: string }): JSX.Element => (
	<ValidatedNewsletterBanner
		{...NEWSLETTER_BANNER_CONFIG}
		tracking={tracking}
		articleCounts={articleCounts}
		countryCode={countryCode}
		fetchEmail={fetchEmail}
		submitComponentEvent={submitComponentEvent}
		contributionsServiceUrl={contributionsServiceUrl}
		idApiUrl={idApiUrl}
	/>
);
