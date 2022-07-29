import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { neutral, textSans, until } from '@guardian/source-foundations';

import { trackSponsorLogoLinkClick } from '../browser/ga/ga';
import { Hide } from './Hide';

const brandingStyle = css`
	padding-bottom: 10px;
`;

/**
 * for liveblog smaller breakpoints article meta is located in the same
 * container as standfirst and needs the same styling as standfirst
 **/
function brandingLabelStyle(palette: Palette, format: ArticleFormat) {
	const invariantStyles = css`
		${textSans.xxsmall()}
	`;

	switch (format.design) {
		case ArticleDesign.LiveBlog: {
			return [
				invariantStyles,
				css`
					color: ${neutral[20]};

					${until.desktop} {
						color: ${palette.text.standfirst};
					}

					a {
						color: ${neutral[20]};

						${until.desktop} {
							color: ${palette.text.standfirst};
						}
					}
				`,
			];
		}
		default: {
			return [
				invariantStyles,
				css`
					color: ${neutral[20]};

					a {
						color: ${neutral[20]};
					}
				`,
			];
		}
	}
}

const brandingLogoStyle = css`
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
const brandingAboutLink = (palette: Palette, format: ArticleFormat) => {
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
					color: ${palette.text.branding};
					${until.desktop} {
						color: ${palette.text.standfirst};
					}
					a {
						color: ${palette.text.branding};
						${until.desktop} {
							color: ${palette.text.standfirst};
						}
					}
				`,
			];
		}
		default: {
			return [
				invariantStyles,
				css`
					color: ${palette.text.branding};
					a {
						color: ${palette.text.branding};
					}
				`,
			];
		}
	}
};

function decideLogo(branding: Branding, format: ArticleFormat) {
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
	branding: Branding;
	palette: Palette;
	format: ArticleFormat;
};

export const Branding = ({ branding, palette, format }: Props) => {
	const sponsorId = branding.sponsorName.toLowerCase();

	return (
		<div css={brandingStyle}>
			<div css={brandingLabelStyle(palette, format)}>
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
				css={brandingAboutLink(palette, format)}
			>
				About this content
			</a>
		</div>
	);
};
