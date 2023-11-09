import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { textSans, until } from '@guardian/source-foundations';
import { trackSponsorLogoLinkClick } from '../client/ga/ga';
import { palette } from '../palette';
import type { Branding as BrandingType } from '../types/branding';
import { Hide } from './Hide';

const brandingStyle = css`
	padding-bottom: 10px;
`;

/**
 * for liveblog smaller breakpoints article meta is located in the same
 * container as standfirst and needs the same styling as standfirst
 **/
function brandingLabelStyle(format: ArticleFormat) {
	const invariantStyles = css`
		${textSans.xxsmall()}
	`;

	switch (format.design) {
		case ArticleDesign.LiveBlog: {
			return [
				invariantStyles,
				css`
					color: ${palette('--branding-label-text')};

					${until.desktop} {
						color: ${palette('--standfirst-text')};
					}

					a {
						color: ${palette('--branding-label-text')};

						${until.desktop} {
							color: ${palette('--standfirst-text')};
						}
					}
				`,
			];
		}
		default: {
			return [
				invariantStyles,
				css`
					color: ${palette('--branding-label-text')};

					a {
						color: ${palette('--branding-label-text')};
					}
				`,
			];
		}
	}
}

// TODO - handle dark mode images
const brandingLogoStyle = () => css`
	padding: 10px 0;

	display: block;

	& img {
		display: block;
	}
`;

/**
 * for liveblog smaller breakpoints article meta is located in the same
 * container as standfirst and needs the same styling as standfirst
 **/
const brandingAboutLink = (format: ArticleFormat) => {
	const invariantStyles = css`
		${textSans.xxsmall()}
		display: block;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	`;

	switch (format.design) {
		case ArticleDesign.LiveBlog: {
			return [
				invariantStyles,
				css`
					color: ${palette('--branding-link-text')};
					${until.desktop} {
						color: ${palette('--standfirst-text')};
					}
					a {
						color: ${palette('--branding-link-text')};
						${until.desktop} {
							color: ${palette('--standfirst-text')};
						}
					}
				`,
			];
		}
		default: {
			return [
				invariantStyles,
				css`
					color: ${palette('--branding-link-text')};
					a {
						color: ${palette('--branding-link-text')};
					}
				`,
			];
		}
	}
};

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

	return (
		<div css={brandingStyle}>
			<div css={brandingLabelStyle(format)}>{branding.logo.label}</div>
			<div css={brandingLogoStyle()}>
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

			<a href={branding.aboutThisLink} css={brandingAboutLink(format)}>
				About this content
			</a>
		</div>
	);
};
