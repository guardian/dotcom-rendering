import { css } from '@emotion/react';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import {
	between,
	breakpoints,
	from,
	textSans12,
} from '@guardian/source/foundations';
import { getOphanComponents } from '../lib/labs';
import { palette } from '../palette';
import type { Branding as BrandingType } from '../types/branding';
import { useConfig } from './ConfigContext';

const brandingStyle = css`
	padding-bottom: 10px;
`;

const brandingAdvertisingPartnerStyle = css`
	margin: 4px 0 20px;
	padding: 4px;
	border: 1px solid ${palette('--branding-border')};
	width: fit-content;

	${from.desktop} {
		padding: 8px;
		width: 220px;
	}
	${from.leftCol} {
		padding: 4px;
		width: 140px;
	}
	${from.wide} {
		padding: 8px;
		width: 220px;
	}
`;

const brandingInteractiveStyle = css`
	${from.desktop} {
		padding: 8px;
		width: 220px;
	}
`;

const labelAdvertisingPartnerStyle = css`
	padding-bottom: 1px;
`;

const labelStyle = css`
	${textSans12}
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

const brandingLogoAdvertisingPartnerStyle = css`
	padding: 0;
	& img {
		display: block;
		max-width: 140px;
		${between.leftCol.and.wide} {
			max-width: 130px;
		}
	}
`;

const brandingLogoStyle = css`
	padding: 10px 0;
	display: block;

	& img {
		display: block;
	}
`;

const aboutLinkAdvertisingPartnerStyle = css`
	padding-top: 1px;
`;

const aboutLinkStyle = css`
	${textSans12}
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

const imgStyles = (lightLogoWidth: number) => css`
	max-width: ${lightLogoWidth}px;
	height: fit-content;
`;

function decideLogo(
	branding: BrandingType,
	format: ArticleFormat,
	darkModeAvailable: boolean,
) {
	/** logoForDarkBackground is not required on branding,
	 *  so fallback to standard logo if not present */
	const maybeDarkLogo = branding.logoForDarkBackground ?? branding.logo;

	const useDarkColourScheme =
		(format.design === ArticleDesign.Video ||
			format.design === ArticleDesign.Audio ||
			format.design === ArticleDesign.Gallery ||
			format.design === ArticleDesign.Picture) &&
		format.theme !== ArticleSpecial.Labs;

	return (
		<picture>
			{/**
			 * For LiveBlogs, the background colour of the 'meta' section is light
			 * from desktop but dark below desktop. If the logo has a version designed for
			 * dark backgrounds, it should be shown on breakpoints below desktop.
			 */}
			{format.design === ArticleDesign.LiveBlog && (
				<source
					width={maybeDarkLogo.dimensions.width}
					height={maybeDarkLogo.dimensions.height}
					srcSet={encodeURI(maybeDarkLogo.src)}
					media={`(max-width: ${breakpoints.desktop - 1}px)`}
				/>
			)}
			{/** High contrast logo if dark mode available & dark mode logo exists for branding */}
			{darkModeAvailable && branding.logoForDarkBackground && (
				<source
					width={branding.logoForDarkBackground.dimensions.width}
					height={branding.logoForDarkBackground.dimensions.height}
					srcSet={encodeURI(branding.logoForDarkBackground.src)}
					media={'(prefers-color-scheme: dark)'}
				/>
			)}
			{/**
			 * Audio/Video articles have a dark background and need a logo designed for dark backgrounds,
			 * for everything else default to standard logo for light backgrounds
			 **/}
			{useDarkColourScheme && branding.logoForDarkBackground ? (
				<img
					width={branding.logoForDarkBackground.dimensions.width}
					height={branding.logoForDarkBackground.dimensions.height}
					src={encodeURI(branding.logoForDarkBackground.src)}
					alt={branding.sponsorName}
					css={imgStyles(branding.logo.dimensions.width)}
				/>
			) : (
				<img
					width={branding.logo.dimensions.width}
					height={branding.logo.dimensions.height}
					src={encodeURI(branding.logo.src)}
					alt={branding.sponsorName}
					css={imgStyles(branding.logo.dimensions.width)}
				/>
			)}
		</picture>
	);
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
	const isLiveBlog = format.design === ArticleDesign.LiveBlog;
	const isInteractive = format.design === ArticleDesign.Interactive;

	const { ophanComponentName, ophanComponentLink } = getOphanComponents({
		branding,
		locationPrefix: 'article-meta',
	});

	const { darkModeAvailable, updateLogoAdPartnerSwitch } = useConfig();

	const isAdvertisingPartnerOrExclusive =
		branding.logo.label.toLowerCase() === 'advertising partner' ||
		branding.logo.label.toLowerCase() === 'exclusive advertising partner';

	const isAdvertisingPartnerAndInteractive =
		isAdvertisingPartnerOrExclusive && isInteractive;

	return (
		<div
			css={[
				brandingStyle,
				isAdvertisingPartnerOrExclusive &&
					updateLogoAdPartnerSwitch &&
					brandingAdvertisingPartnerStyle,
				isAdvertisingPartnerAndInteractive &&
					updateLogoAdPartnerSwitch &&
					brandingInteractiveStyle,
			]}
		>
			<div
				css={[
					labelStyle,
					isAdvertisingPartnerOrExclusive &&
						updateLogoAdPartnerSwitch &&
						labelAdvertisingPartnerStyle,
					isLiveBlog && liveBlogLabelStyle,
				]}
			>
				{branding.logo.label}
			</div>
			<div
				css={[
					brandingLogoStyle,
					isAdvertisingPartnerOrExclusive &&
						updateLogoAdPartnerSwitch &&
						!isInteractive &&
						brandingLogoAdvertisingPartnerStyle,
				]}
			>
				<a
					href={branding.logo.link}
					data-sponsor={branding.sponsorName.toLowerCase()}
					rel="nofollow"
					aria-label={`Visit the ${branding.sponsorName} website`}
					data-testid="branding-logo"
					data-component={ophanComponentName}
					data-link-name={ophanComponentLink}
				>
					{decideLogo(branding, format, darkModeAvailable)}
				</a>
			</div>

			<a
				href={branding.aboutThisLink}
				css={[
					aboutLinkStyle,
					isAdvertisingPartnerOrExclusive &&
						updateLogoAdPartnerSwitch &&
						aboutLinkAdvertisingPartnerStyle,
					isLiveBlog && liveBlogAboutLinkStyle,
				]}
			>
				About this content
			</a>
		</div>
	);
};
