import { hexColourToString } from '@guardian/support-dotcom-components';
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
import { NewsletterBannerLogo } from './NewsletterBannerLogo';
import { NewsletterFrequencyTag } from './NewsletterFrequencyTag';
import { NewsletterSignupForm } from './NewsletterSignupForm';
import { SuccessMessage } from './SuccessMessage';
import { useSuccessDismissal } from './useSuccessDismissal';

const buildNewsletterBannerData = (
	baseBannerData: BannerData,
	newsletter: PromotedNewsletter,
	onClose: () => void,
): BannerData => {
	const baseImageSettings =
		baseBannerData.settings.headerSettings?.headerImage ??
		baseBannerData.settings.imageSettings;
	const illustrationSquare: unknown = newsletter.illustrationSquare;
	const hasIllustrationSquare =
		typeof illustrationSquare === 'string' && illustrationSquare.length > 0;
	const imageSettings =
		baseImageSettings !== undefined && hasIllustrationSquare
			? {
					...baseImageSettings,
					mobileUrl: illustrationSquare,
					tabletUrl: illustrationSquare,
				}
			: baseImageSettings;

	return {
		...baseBannerData,
		actions: {
			...baseBannerData.actions,
			onClose,
		},
		selectors: {
			...baseBannerData.selectors,
			copyForViewport: {
				...baseBannerData.selectors.copyForViewport,
				paragraphs:
					newsletter.signUpDescription !== undefined
						? [<>{newsletter.signUpDescription}</>]
						: baseBannerData.selectors.copyForViewport.paragraphs,
			},
			headingCopy: {
				...baseBannerData.selectors.headingCopy,
				heading: <>Sign up to {newsletter.name}</>,
			},
			showHeaderImage: false,
			showBody: true,
			showBodyVisual: true,
		},
		settings: {
			...baseBannerData.settings,
			imageSettings,
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

	const { basic } = props.design.colours;
	const bannerData = buildNewsletterBannerData(
		baseBannerData,
		newsletter,
		isSuccess ? dismiss : baseBannerData.actions.onClose,
	);

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
								<SuccessMessage
									newsletterName={newsletter.name}
									frequency={newsletter.frequency}
								/>
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
