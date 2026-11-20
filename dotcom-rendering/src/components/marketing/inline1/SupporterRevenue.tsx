import { css } from '@emotion/react';
import {
	from,
	headlineMedium24,
	palette,
	space,
	textSans15,
	until,
} from '@guardian/source/foundations';
import { SvgGuardianLogo } from '@guardian/source/react-components';
import { LinkButton } from '@guardian/source/react-components';
import type { Inline1Props } from '@guardian/support-dotcom-components/dist/shared/types/props/inline1';
import sanitize from 'sanitize-html';
import type { ReactComponent } from '../lib/ReactComponent';
import { enrichSupportUrl } from '../lib/tracking';
import type { ImageAttrs } from '../shared/ResponsiveImage';
import { ResponsiveImage } from '../shared/ResponsiveImage';
import { useInline1Tracking } from './utils/useInline1Tracking';

const outerContainerStyles = css`
	border-top: 1px solid ${palette.neutral[73]};
	padding-top: ${space[2]}px;
`;

const innerContainerStyles = css`
	background-color: ${palette.neutral[97]};
	padding-top: ${space[2]}px;
	padding-left: 10px;
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;

	${until.tablet} {
		padding-right: ${space[3]}px;
	}
	${from.tablet} {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-areas:
			'heading logo'
			'body    image'
			'cta	 image';
		gap: 0px ${space[3]}px;
	}
`;

const headingStyles = css`
	${headlineMedium24};
	${from.tablet} {
		grid-area: heading;
		margin-bottom: 8px;
		max-width: 428px;
	}
`;

const guardianLogoContainerStyles = css`
	${until.tablet} {
		padding-bottom: ${space[2]}px;
		display: flex;
		justify-content: flex-end;
		border-bottom: 1px solid ${palette.neutral[73]};
	}
	${from.tablet} {
		padding-right: ${space[3]}px;
		grid-area: logo;
		justify-self: end;
	}
`;

const bodyStyles = css`
	${textSans15};
	${until.tablet} {
		margin-bottom: 12px;
	}
	${from.tablet} {
		grid-area: body;
		margin-bottom: 40px;
		max-width: 428px;
	}
`;

const ctaContainerStyles = css`
	padding-bottom: ${space[4]}px;

	${from.tablet} {
		grid-area: cta;
		align-self: end;
	}
`;

const ctaButtonTheme = {
	textPrimary: palette.neutral[7],
	backgroundPrimary: palette.brandAlt[400],
	backgroundPrimaryHover: palette.brandAlt[300],
};

const ctaButtonStyles = css`
	${until.tablet} {
		width: 100%;
	}
`;

const imageWrapperStyles = css`
	display: flex;
	align-items: flex-end;
	${from.tablet} {
		grid-area: image;
	}
`;

const imageStyles = css`
	img {
		object-fit: cover;
		height: 126px;
		width: 158px;
	}

	${until.tablet} {
		img {
			min-width: 210px;
		}
	}
`;

// This is used to sanitize the HTML for the title
// and description to allow for custom styling in RRCP
const allowedHTMLTags = ['s', 'em', 'strong', 'a'];

export const SupporterRevenue: ReactComponent<Inline1Props> = ({
	submitComponentEvent,
	tracking,
	variant,
	countryCode,
}) => {
	const { setNode, sendEvent } = useInline1Tracking({
		tracking,
		submitComponentEvent,
	});

	if (variant.message.type != 'Inline1SupportMessage') {
		return;
	}
	const heading = variant.message.heading;
	const body = variant.message.body;
	const image = variant.message.image;
	const cta = variant.message.primaryCta;
	const ctaUrl = enrichSupportUrl({
		baseUrl: cta.baseUrl,
		tracking,
		promoCodes: [],
		countryCode,
	});

	const images: ImageAttrs[] = [];
	const baseImage = {
		url: image?.desktopUrl ?? '',
		media: '',
		alt: image?.altText ?? '',
	};

	if (image) {
		if (image.mobileUrl !== undefined && image.mobileUrl.length > 0) {
			images.push({
				url: image.mobileUrl,
				media: '(max-width: 739px)',
			});
		}
		if (image.tabletUrl !== undefined && image.tabletUrl.length > 0) {
			images.push({
				url: image.tabletUrl,
				media: '(max-width: 979px)',
			});
		}
		if (image.desktopUrl !== undefined && image.desktopUrl.length > 0) {
			images.push({
				url: image.desktopUrl,
				media: '',
			});
		}
	}

	return (
		<section
			css={outerContainerStyles}
			aria-labelledby="supporter-revenue-heading"
			ref={setNode}
		>
			<div css={innerContainerStyles}>
				<div css={guardianLogoContainerStyles}>
					<SvgGuardianLogo width={75} />
				</div>
				{image && (
					<div css={imageWrapperStyles}>
						<ResponsiveImage
							cssOverrides={imageStyles}
							images={images}
							baseImage={baseImage}
						></ResponsiveImage>
					</div>
				)}
				<h2
					id="supporter-revenue-heading"
					css={headingStyles}
					dangerouslySetInnerHTML={{
						__html: sanitize(heading, {
							allowedTags: allowedHTMLTags,
						}),
					}}
				></h2>
				<p
					css={bodyStyles}
					dangerouslySetInnerHTML={{
						__html: sanitize(body, {
							allowedTags: allowedHTMLTags,
						}),
					}}
				></p>
				<div css={ctaContainerStyles}>
					<LinkButton
						cssOverrides={ctaButtonStyles}
						theme={ctaButtonTheme}
						href={ctaUrl}
						onClick={() => sendEvent('CLICK', 'cta')}
					>
						{cta.text}
					</LinkButton>
				</div>
			</div>
		</section>
	);
};
