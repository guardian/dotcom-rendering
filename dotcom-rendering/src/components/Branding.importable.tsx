import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { from, textSans } from '@guardian/source-foundations';
import { trackSponsorLogoLinkClick } from '../client/ga/ga';
import { palette } from '../palette';
import type { Branding as BrandingType } from '../types/branding';
import { Hide } from './Hide';

const brandingStyle = css`
	padding-bottom: 10px;
`;

const labelStyle = css`
	${textSans.xxsmall()}
	color: ${palette('--branding-label-text')};

	a {
		color: inherit;
	}
`;

const liveBlogLabelStyle = css`
	color: ${palette('--standfirst-text')};

	${from.desktop} {
		color: ${palette('--branding-label-text')};
	}
`;

const brandingLogoStyle = css`
	padding: 10px 0;
	display: block;

	& img {
		display: block;
	}
`;

const aboutLinkStyle = css`
	${textSans.xxsmall()}
	display: block;
	text-decoration: none;

	color: ${palette('--branding-link-text')};
	a {
		color: inherit;
	}

	&:hover {
		text-decoration: underline;
	}
`;

/**
 * for liveblog smaller breakpoints article meta is located in the same
 * container as standfirst and needs the same styling as standfirst
 **/
const liveBlogAboutLinkStyle = css`
	color: ${palette('--standfirst-text')};

	${from.desktop} {
		color: ${palette('--branding-link-text')};
	}
`;

function decideLogo(branding: BrandingType, format: ArticleFormat) {
	switch (format.design) {
		case ArticleDesign.LiveBlog: {
			/**
			 * For LiveBlogs, the background colour of the 'meta' section is light
			 * on desktop but dark on mobile. If the logo has a version designed for
			 * dark backgrounds, it should be shown on breakpoints below desktop.
			 */
			return (
				<>
					<Hide when="above" breakpoint="desktop" el="span">
						<img
							width={branding.logo.dimensions.width}
							height={branding.logo.dimensions.height}
							src={
								branding.logoForDarkBackground?.src ??
								branding.logo.src
							}
							alt={branding.sponsorName}
						/>
					</Hide>
					<Hide when="below" breakpoint="desktop" el="span">
						<img
							width={branding.logo.dimensions.width}
							height={branding.logo.dimensions.height}
							src={branding.logo.src}
							alt={branding.sponsorName}
						/>
					</Hide>
				</>
			);
		}
		default: {
			return (
				<img
					width={branding.logo.dimensions.width}
					height={branding.logo.dimensions.height}
					src={branding.logo.src}
					alt={branding.sponsorName}
				/>
			);
		}
	}
}

type Props = {
	branding: BrandingType;
	format: ArticleFormat;
};

/**
 * Wrapper around the logo and link for sponsored or paid for content.
 *
 * ## Why does this need to be an Island?
 *
 * So we can track sponsor logo clicks.
 *
 * ---
 *
 * (No visual story exists)
 */
export const Branding = ({ branding, format }: Props) => {
	const sponsorId = branding.sponsorName.toLowerCase();
	const isLiveBlog = format.design === ArticleDesign.LiveBlog;

	return (
		<div css={brandingStyle}>
			<div css={[labelStyle, isLiveBlog && liveBlogLabelStyle]}>
				{branding.logo.label}
			</div>
			<div css={brandingLogoStyle}>
				<a
					href={branding.logo.link}
					data-sponsor={branding.sponsorName.toLowerCase()}
					rel="nofollow"
					aria-label={`Visit the ${branding.sponsorName} website`}
					onClick={() => trackSponsorLogoLinkClick(sponsorId)}
					data-cy="branding-logo"
				>
					{decideLogo(branding, format)}
				</a>
			</div>

			<a
				href={branding.aboutThisLink}
				css={[aboutLinkStyle, isLiveBlog && liveBlogAboutLinkStyle]}
			>
				About this content
			</a>
		</div>
	);
};
