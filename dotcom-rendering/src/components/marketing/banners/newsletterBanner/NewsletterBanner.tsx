import { css } from '@emotion/react';
import { from, neutral, space, until } from '@guardian/source/foundations';
import { hexColourToString } from '@guardian/support-dotcom-components';
import type { Image as SupportImage } from '@guardian/support-dotcom-components/dist/shared/types';
import type { BannerProps } from '@guardian/support-dotcom-components/dist/shared/types';
import type { ComponentType } from 'react';
import { useEffect, useRef } from 'react';
import type { Newsletter } from '../../../../types/content';
import { NewsletterSignupForm } from '../../../NewsletterSignupForm.island';
import { DEFAULT_PROMOTED_NEWSLETTER } from '../../../StickyBottomBanner/newsletterBannerDetails';
import { validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';
import type { BannerData } from '../designableBanner/BannerProps';
import { BannerBody } from '../designableBanner/components/BannerBody';
import { BannerCloseButton } from '../designableBanner/components/BannerCloseButton';
import { BannerContent } from '../designableBanner/components/BannerContent';
import { BannerHeader } from '../designableBanner/components/BannerHeader';
import { BannerLogo } from '../designableBanner/components/BannerLogo';
import { BannerVisual } from '../designableBanner/components/BannerVisual';
import { useDesignableBannerModel } from '../designableBanner/useDesignableBannerModel';

const styles = {
	container: (background: string, textColor: string) => css`
		background: ${background};
		color: ${textColor};
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
		padding: ${space[3]}px;
		max-width: 660px;
		gap: ${space[3]}px;
		grid-template-columns: minmax(0, 1fr) auto;
		grid-template-areas:
			'copy-container close-button'
			'main-image main-image';

		${from.phablet} {
			max-width: 740px;
		}
		${from.desktop} {
			max-width: 980px;
			grid-template-columns: minmax(0, 1fr) 380px auto;
			grid-template-areas: 'copy-container main-image close-button';
		}
		${from.leftCol} {
			max-width: 1140px;
			grid-template-columns: 140px 1px minmax(0, 460px) 380px auto;
			gap: 10px;
			grid-template-areas: 'logo vert-line copy-container main-image close-button';
		}
		${from.wide} {
			max-width: 1300px;
			grid-template-columns: 219px 1px minmax(0, 460px) 400px auto;
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

const NewsletterBannerComponent = (
	props: BannerRenderProps,
): JSX.Element | null => {
	const newsletter = props.promotedNewsletter ?? DEFAULT_PROMOTED_NEWSLETTER;
	const bannerRef = useRef<HTMLDivElement>(null);
	const { isOpen, bannerData: baseBannerData } = useDesignableBannerModel({
		...props,
		isCollapsible: false,
	});

	useEffect(() => {
		bannerRef.current?.focus();
	}, []);

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
		content: {
			mainContent: newsletterCopy,
			mobileContent: newsletterCopy,
		},
		settings: {
			...baseBannerData.settings,
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
			css={styles.container(
				hexColourToString(basic.background),
				hexColourToString(basic.bodyText),
			)}
		>
			<div css={styles.layout}>
				<BannerLogo bannerData={bannerData} />
				<div css={styles.verticalLine} />
				<BannerContent bannerData={bannerData}>
					<BannerHeader bannerData={bannerData} />
					<BannerBody bannerData={bannerData} />
					<NewsletterSignupForm
						newsletterId={newsletter.identityName}
						newsletterName={newsletter.name}
						frequency={newsletter.frequency}
						componentId="newsletter_banner"
						abTest={{
							name: props.tracking.abTestName,
							variant: props.tracking.abTestVariant,
						}}
					/>
				</BannerContent>
				<BannerVisual bannerData={bannerData} />
				<BannerCloseButton bannerData={bannerData} />
			</div>
		</div>
	);
};

const ValidatedNewsletterBanner = validatedBannerWrapper(
	NewsletterBannerComponent,
	'newsletter-banner',
) as ComponentType<BannerProps & { promotedNewsletter?: Newsletter }>;

export const NewsletterBanner = ({
	promotedNewsletter = DEFAULT_PROMOTED_NEWSLETTER,
	...props
}: BannerProps & {
	promotedNewsletter?: Newsletter;
}): JSX.Element => (
	<ValidatedNewsletterBanner
		{...props}
		promotedNewsletter={promotedNewsletter}
	/>
);
