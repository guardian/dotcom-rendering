import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	palette,
	space,
	visuallyHidden,
} from '@guardian/source/foundations';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import {
	PuzzlesBranding,
	PuzzlesBrandingAboutLink,
} from '../components/PuzzlesBranding';
import { PuzzlesDirectoryProgress } from '../components/PuzzlesDirectoryProgress.island';
import { Section } from '../components/Section';
import { has } from '../lib/has-string';
import { puzzlesPageTheme } from '../lib/puzzlesTheme';
import type { NavType } from '../model/extract-nav';
import type { Branding } from '../types/branding';
import type { FEPuzzlesPageType } from '../types/puzzlesPage';
import { Stuck } from './lib/stickiness';

const mainStyles = (darkModeAvailable: boolean) => css`
	${puzzlesPageTheme(darkModeAvailable)};
	overflow-x: clip;
	padding-bottom: ${space[12]}px;
`;

const brandStyles = css`
	box-sizing: border-box;
	height: 230px;
	margin: 0 auto;
	overflow: hidden;
	/* The artwork is transparent and uses this illustrated-header background. */
	background: var(--puzzles-header-background, ${palette.opinion[800]});
`;

// Sponsored artwork heights vary by breakpoint and leave room for the sponsor lockup.
const sponsoredBrandStyles = css`
	position: relative;
	/* Matches the opaque background in the sponsored artwork, in light and dark mode */
	/* stylelint-disable-next-line color-no-hex */
	background: #fef7f1;
	${from.phablet} {
		height: 286px;
	}
	${from.tablet} {
		height: 283px;
	}
	${from.desktop} {
		height: 288px;
	}
	${from.wide} {
		height: 300px;
	}
`;

const brandImageStyles = css`
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
	${from.leftCol} {
		object-position: left center;
	}
`;

// Keep the artwork at its design size; the cream header fills any spare width.
const sponsoredImageStyles = css`
	object-fit: contain;
	${from.leftCol} {
		object-position: center;
	}
`;

const brandPictureStyles = css`
	display: block;
	height: 100%;
	width: 100%;
	margin: 0 auto;
	${from.leftCol} {
		/* This asset already includes the 254px trailing artwork margin. */
		width: 1280px;
		margin-left: max(0px, calc((100% - 1140px) / 2));
	}
	${from.wide} {
		/* The asset's 70px inset aligns the artwork with the 1300px subnav. */
		width: 1440px;
		margin-left: calc((100% - 1440px) / 2);
	}
	@media (min-width: 1728px) {
		width: 1728px;
		margin-left: calc((100% - 1728px) / 2);
	}
`;

const headerArtwork = (folder: string, filename: string) => {
	// Request the artwork's design width, rather than stretching a card-sized image.
	const width = filename.match(/-(\d+)px$/)?.[1] ?? '360';
	return `https://i.guim.co.uk/img/uploads/${folder}/${filename}.png?width=${width}&dpr=2&s=none`;
};
// Descending media queries ensure that the browser chooses the largest match.
const defaultHeader = {
	folder: '2026/09/15',
	fallback: 'header-mobile-360px',
	sources: [
		{ breakpoint: 1728, filename: 'header-desktop-1728px' },
		{ breakpoint: breakpoints.wide, filename: 'header-wide-1440px' },
		{ breakpoint: breakpoints.leftCol, filename: 'header-leftcol-1280px' },
		{ breakpoint: breakpoints.desktop, filename: 'header-desktop-1024px' },
		{ breakpoint: breakpoints.tablet, filename: 'header-tablet-768px' },
		{
			breakpoint: breakpoints.phablet,
			filename: 'header-mobile-phablet-669px',
		},
		{
			breakpoint: breakpoints.mobileLandscape,
			filename: 'header-mobile-landscape-480px',
		},
		{
			breakpoint: breakpoints.mobileMedium,
			filename: 'header-mobile-medium-393px',
		},
	],
};
const sponsoredHeader = {
	folder: '2026/10/12',
	fallback: 'header-sponsored-mobile-360px',
	sources: [
		{
			breakpoint: breakpoints.wide,
			filename: 'header-sponsored-wide-1440px',
		},
		{
			breakpoint: breakpoints.leftCol,
			filename: 'header-sponsored-leftcol-1280px',
		},
		{
			breakpoint: breakpoints.desktop,
			filename: 'header-sponsored-desktop-1024px',
		},
		{
			breakpoint: breakpoints.tablet,
			filename: 'header-sponsored-tablet-768px',
		},
		{
			breakpoint: breakpoints.phablet,
			filename: 'header-sponsored-mobile-phablet-667px',
		},
		{
			breakpoint: breakpoints.mobileLandscape,
			filename: 'header-sponsored-mobile-landscape-480px',
		},
		{
			breakpoint: breakpoints.mobileMedium,
			filename: 'header-sponsored-mobile-medium-393px',
		},
	],
};

export const PuzzlesLayout = ({
	darkModeAvailable = false,
	puzzlesPage,
	NAV,
	branding,
}: {
	darkModeAvailable?: boolean;
	puzzlesPage: FEPuzzlesPageType;
	NAV: NavType;
	branding?: Branding;
}) => {
	const renderAds = !puzzlesPage.isAdFreeUser;
	const header = branding ? sponsoredHeader : defaultHeader;
	const puzzlesNav = {
		...NAV,
		currentNavLink: 'Puzzles & games',
		subNavSections: NAV.subNavSections
			? {
					links: [
						...(NAV.subNavSections.parent
							? [NAV.subNavSections.parent]
							: []),
						...NAV.subNavSections.links,
					],
				}
			: undefined,
	};
	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				{renderAds && (
					<Stuck>
						<Section
							fullWidth={true}
							showTopBorder={false}
							showSideBorders={false}
							padSides={false}
							shouldCenter={false}
						>
							<HeaderAdSlot />
						</Section>
					</Stuck>
				)}
				<Masthead
					nav={puzzlesNav}
					editionId={puzzlesPage.editionId}
					idUrl={puzzlesPage.config.idUrl}
					mmaUrl={puzzlesPage.config.mmaUrl}
					discussionApiUrl={puzzlesPage.config.discussionApiUrl}
					idApiUrl={puzzlesPage.config.idApiUrl}
					contributionsServiceUrl={
						puzzlesPage.contributionsServiceUrl
					}
					showSubNav={true}
					showSlimNav={false}
					hasPageSkin={false}
					hasPageSkinContentSelfConstrain={false}
				/>
			</div>
			<main
				css={mainStyles(darkModeAvailable)}
				data-layout="PuzzlesPageLayout"
				id="maincontent"
			>
				<header css={[brandStyles, branding && sponsoredBrandStyles]}>
					<h1
						css={css`
							${visuallyHidden}
						`}
					>
						Puzzles &amp; games
					</h1>
					<picture css={brandPictureStyles}>
						{header.sources.map(({ breakpoint, filename }) => (
							<source
								key={filename}
								media={`(min-width: ${breakpoint}px)`}
								srcSet={headerArtwork(header.folder, filename)}
							/>
						))}
						<img
							alt="An owl carrying a crossword grid beside an octopus reading a puzzle"
							css={[
								brandImageStyles,
								branding && sponsoredImageStyles,
							]}
							src={headerArtwork(header.folder, header.fallback)}
						/>
					</picture>
					{branding && <PuzzlesBranding branding={branding} />}
				</header>
				{branding && has(branding.aboutThisLink) && (
					<PuzzlesBrandingAboutLink branding={branding} />
				)}
				<Island priority="critical">
					<PuzzlesDirectoryProgress
						layout={puzzlesPage.layout}
						renderAds={renderAds}
						hideTopRule={!!branding}
					/>
				</Island>
			</main>
			<Section
				fullWidth={true}
				padSides={false}
				backgroundColour={palette.brand[400]}
				borderColour={palette.brand[600]}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={puzzlesPage.pageFooter}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.footer}
					editionId={puzzlesPage.editionId}
				/>
			</Section>
		</>
	);
};
