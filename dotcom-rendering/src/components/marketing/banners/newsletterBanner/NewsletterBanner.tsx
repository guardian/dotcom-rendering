import { css } from '@emotion/react';
import { from, neutral, space, until } from '@guardian/source/foundations';
import { hexColourToString } from '@guardian/support-dotcom-components';
import type { Image } from '@guardian/support-dotcom-components/dist/shared/types';
import { useEffect, useRef, useState } from 'react';
import { NewsletterSignupForm } from '../../../NewsletterSignupForm.island';
import { validatedBannerWrapper } from '../common/BannerWrapper';
import type { BannerRenderProps } from '../common/types';
import { BannerCloseButton } from '../designableBanner/components/BannerCloseButton';
import { BannerLogo } from '../designableBanner/components/BannerLogo';
import { BannerVisual } from '../designableBanner/components/BannerVisual';

const prototypeNewsletter = {
	newsletterId: 'saturday-edition',
	newsletterName: 'Saturday Edition',
	frequency: 'every Saturday',
};

const prototypeNewsletterImage: Image = {
	mainUrl:
		'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
	mobileUrl:
		'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
	tabletUrl:
		'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
	desktopUrl:
		'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
	wideUrl:
		'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
	altText: '',
};

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
	form: css`
		grid-area: copy-container;
		min-width: 0;
		align-self: start;

		${from.desktop} {
			padding-right: ${space[5]}px;
		}
		${from.leftCol} {
			padding-left: ${space[3]}px;
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

const NewsletterBannerComponent = (
	props: BannerRenderProps,
): JSX.Element | null => {
	const bannerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		bannerRef.current?.focus();
	}, []);

	if (!isOpen || !props.design) {
		return null;
	}

	const { basic, closeButton } = props.design.colours;
	const bannerData = {
		design: props.design,
		isCollapsed: false,
		isCollapsible: false,
		settings: {
			imageSettings: prototypeNewsletterImage,
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
		},
		selectors: { showBodyVisual: true },
		actions: {
			onClose: () => {
				props.onCloseClick();
				setIsOpen(false);
				document.body.focus();
			},
			onToggleCollapse: props.onCollapseClick,
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
				<div css={styles.form}>
					<NewsletterSignupForm
						{...prototypeNewsletter}
						componentId="newsletter_banner"
						abTest={{
							name: props.tracking.abTestName,
							variant: props.tracking.abTestVariant,
						}}
					/>
				</div>
				<BannerVisual bannerData={bannerData} />
				<BannerCloseButton bannerData={bannerData} />
			</div>
		</div>
	);
};

export const NewsletterBanner = validatedBannerWrapper(
	NewsletterBannerComponent,
	'newsletter-banner',
);
