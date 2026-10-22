import { css } from '@emotion/react';
import {
	between,
	from,
	neutral,
	space,
	until,
} from '@guardian/source/foundations';
import { hexColourToString } from '@guardian/support-dotcom-components';
import type { Image as SupportImage } from '@guardian/support-dotcom-components/dist/shared/types';
import type { BannerProps } from '@guardian/support-dotcom-components/dist/shared/types';
import type { ComponentType } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNewsletterSubscription } from '../../../../lib/useNewsletterSubscription';
import type { Newsletter } from '../../../../types/content';
import { DEFAULT_PROMOTED_NEWSLETTER } from '../../../StickyBottomBanner/newsletterBannerDetails';
import { contentTransitionEasing } from '../../shared/transitions';
import { validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';
import type { BannerData } from '../designableBanner/BannerProps';
import { BannerBody } from '../designableBanner/components/BannerBody';
import { BannerCloseButton } from '../designableBanner/components/BannerCloseButton';
import { BannerHeader } from '../designableBanner/components/BannerHeader';
import { BannerVisual } from '../designableBanner/components/BannerVisual';
import { useDesignableBannerModel } from '../designableBanner/useDesignableBannerModel';
import { NewsletterBannerLogo } from './NewsletterBannerLogo';
import { NewsletterFrequencyTag } from './NewsletterFrequencyTag';
import { NewsletterSignupForm } from './NewsletterSignupForm';
import { SuccessMessage } from './SuccessMessage';
import { useSuccessDismissal } from './useSuccessDismissal';

const phabletContentMaxWidth = '492px';
const transitionDurationMs = 350;
const successTransition = `${transitionDurationMs}ms ${contentTransitionEasing}`;

const styles = {
	dismissal: (isDismissing: boolean) => css`
		transform: translateY(${isDismissing ? '100%' : '0'});
		transition: transform ${successTransition};
		pointer-events: ${isDismissing ? 'none' : 'auto'};

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	`,
	panel: (isVisible: boolean) => css`
		display: grid;
		grid-template-rows: ${isVisible ? '1fr' : '0fr'};
		opacity: ${isVisible ? 1 : 0};
		transition:
			grid-template-rows ${successTransition},
			opacity ${successTransition};

		> div {
			min-height: 0;
			overflow: hidden;
		}

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	`,
	successContent: css`
		position: relative;
		max-width: 1300px;
		margin: 0 auto;
		padding: ${space[6]}px 64px ${space[6]}px 0;

		${from.leftCol} {
			padding-top: 36px;
			padding-left: 10px;
		}
	`,
	successCloseButton: css`
		position: absolute;
		top: ${space[9]}px;
		right: ${space[3]}px;

		> div {
			position: static;
			margin: 0;
			padding: 0;
		}
	`,
	container: (background: string, textColor: string) => css`
		background: ${background};
		color: ${textColor};
		position: relative;
		max-height: 65vh;
		max-height: 65svh;
		overflow-y: auto;

		* {
			box-sizing: border-box;
		}

		${from.phablet} {
			border-top: 1px solid ${neutral[0]};
		}
	`,
	layout: css`
		display: grid;
		position: relative;
		margin: 0 auto;
		padding: 0 ${space[3]}px;
		max-width: 660px;
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas: 'copy-container';

		${from.phablet} {
			max-width: 740px;
			padding: ${space[1]}px ${space[3]}px;
		}
		${between.phablet.and.desktop} {
			position: static;
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas: 'copy-container';
		}
		${from.desktop} {
			max-width: 980px;
			grid-template-columns: minmax(0, 1fr) 380px auto;
			grid-template-areas: 'copy-container main-image close-button';
			gap: 20px;
			padding: 0 ${space[3]}px;
		}
		${from.leftCol} {
			max-width: 1140px;
			grid-template-columns: 140px 1px minmax(0, 460px) 380px auto;
			gap: 10px;
			grid-template-areas: 'logo vert-line copy-container main-image close-button';
		}
		${from.wide} {
			max-width: 1300px;
			grid-template-columns: 219px 1px minmax(0, 491px) 400px auto;
		}
	`,
	panels: css`
		grid-column: copy-container-start / -1;
		min-width: 0;
	`,
	signupLayout: css`
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas: 'copy-container';

		${from.desktop} {
			grid-template-columns: minmax(0, 1fr) 380px auto;
			grid-template-areas: 'copy-container main-image close-button';
			gap: 20px;
		}

		${from.leftCol} {
			gap: 10px;
		}

		${from.wide} {
			grid-template-columns: minmax(0, 1fr) 400px auto;
		}
	`,
	contentContainer: css`
		grid-area: copy-container;
		width: 100%;
		max-width: 100%;
		align-self: start;

		${between.phablet.and.desktop} {
			max-width: ${phabletContentMaxWidth};
			justify-self: center;
		}

		${from.leftCol} {
			padding-left: 10px;
		}
	`,
	content: css`
		display: flex;
		flex-direction: column;
		margin: 28px 0;
		${until.desktop} {
			margin: ${space[3]}px 10px;
		}
		${until.phablet} {
			margin-inline: 0;
		}
	`,
	frequencyRow: css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: ${space[2]}px;
	`,
	inlineCloseButton: css`
		display: none;

		${until.desktop} {
			display: block;
			flex-shrink: 0;

			> div {
				margin: 0;
				padding: 0;
				position: static;
			}
		}
	`,
	outerCloseButton: css`
		${until.desktop} {
			display: none;
		}
	`,
	textImageRow: css`
		display: grid;
		grid-template-columns: minmax(0, 1fr) 90px;
		column-gap: ${space[3]}px;
		align-items: start;

		${from.desktop} {
			display: block;
		}
	`,
	textCopy: css`
		min-width: 0;
	`,
	mobileImage: css`
		width: 90px;
		height: 90px;
		justify-self: end;
		align-self: start;
		overflow: hidden;

		> div {
			grid-area: auto;
			width: 90px;
			max-width: 90px;
			height: 90px;
			margin: 0;
			padding: 0;
		}

		> div > picture {
			display: block;
			width: 90px;
			height: 90px;
		}

		> div > picture img {
			width: 90px;
			height: 90px;
			max-height: 90px;
			padding: 0;
			object-fit: cover;
		}

		${from.desktop} {
			display: none;
		}
	`,
	desktopImage: css`
		grid-area: main-image;

		${until.desktop} {
			display: none;
		}

		> div {
			grid-area: auto;
		}
	`,
	verticalLine: css`
		grid-area: vert-line;
		background-color: ${neutral[0]};
		opacity: 0.2;
		pointer-events: none;

		${until.leftCol} {
			display: none;
		}

		${from.leftCol} {
			margin-top: 36px;
			margin-bottom: 0;
		}
	`,
	horizontalLine: css`
		width: 100%;
		height: 1px;
		background-color: ${neutral[0]};
		opacity: 0.2;
		pointer-events: none;

		${until.tablet} {
			background-color: transparent;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				height: 1px;
				background-color: ${neutral[0]};
			}
		}
	`,
	headingAfterDivider: css`
		> div {
			padding-top: 0;
		}

		&& h2 {
			margin: ${space[2]}px 0 0;
		}
	`,
	subheading: css`
		> div {
			margin-bottom: ${space[2]}px;
		}

		p {
			margin-bottom: 0;
		}
	`,
};

const buildNewsletterBannerImage = (newsletter: Newsletter): SupportImage => {
	const cardImage = newsletter.illustrationCard!;
	const squareImage = newsletter.illustrationSquare;

	return {
		mainUrl: cardImage,
		mobileUrl: squareImage,
		tabletUrl: cardImage,
		desktopUrl: cardImage,
		wideUrl: cardImage,
		altText: newsletter.name,
	};
};

export const NewsletterBannerComponent = (
	props: BannerRenderProps,
): JSX.Element | null => {
	const newsletter = props.promotedNewsletter ?? DEFAULT_PROMOTED_NEWSLETTER;
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
	const newsletterCopy = {
		...props.content.mainContent,
		heading: <span>Sign up to The Stakes 2026</span>,
		paragraphs: [
			<span key="subheading">
				From the races and candidates to watch to the issues shaping
				American politics, The Stakes 2026 brings you expert analysis of
				what really matters in the US midterms.
			</span>,
		],
		highlightedText: null,
	};
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
			headerSettings: {
				...baseBannerData.settings.headerSettings,
				textColour: neutral[7],
			},
			highlightedTextSettings: {
				...baseBannerData.settings.highlightedTextSettings,
				textColour: neutral[7],
			},
			imageSettings: buildNewsletterBannerImage(newsletter),
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
) as ComponentType<
	BannerProps & { promotedNewsletter?: Newsletter; idApiUrl: string }
>;

export const NewsletterBanner = ({
	promotedNewsletter = DEFAULT_PROMOTED_NEWSLETTER,
	...props
}: BannerProps & {
	promotedNewsletter?: Newsletter;
	idApiUrl: string;
}): JSX.Element => (
	<ValidatedNewsletterBanner
		{...props}
		promotedNewsletter={promotedNewsletter}
	/>
);
