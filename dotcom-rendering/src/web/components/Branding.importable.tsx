import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { neutral, textSans, until } from '@guardian/source-foundations';
import { trackSponsorLogoLinkClick } from '../browser/ga/ga';

const brandingStyle = css`
	padding-bottom: 10px;
`;

// for liveblog smaller breakpoints article meta is located in the same
// container as standfirst and needs the same styling as standfirst
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
`;

// for liveblog smaller breakpoints article meta is located in the same
// container as standfirst and needs the same styling as standfirst
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

const hiddenUntilDesktop = css`
	${until.desktop} {
		display: none;
	}
`;

const hiddenFromDesktop = css`
	display: none;
	${until.desktop} {
		display: block;
	}
`;

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
					<img
						css={hiddenFromDesktop}
						width={branding.logo.dimensions.width}
						height={branding.logo.dimensions.height}
						src={
							branding.logoForDarkBackground?.src ??
							branding.logo.src
						}
						alt={branding.sponsorName}
					/>
					<img
						css={hiddenUntilDesktop}
						width={branding.logo.dimensions.width}
						height={branding.logo.dimensions.height}
						src={branding.logo.src}
						alt={branding.sponsorName}
					/>
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
