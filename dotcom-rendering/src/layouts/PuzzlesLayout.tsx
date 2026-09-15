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
import { Masthead } from '../components/Masthead/Masthead';
import { PuzzlesDirectory } from '../components/PuzzlesDirectory';
import { Section } from '../components/Section';
import type { NavType } from '../model/extract-nav';
import type { FEPuzzlesPageType } from '../types/puzzlesPage';
import { Stuck } from './lib/stickiness';

const mainStyles = css`
	overflow-x: clip;
	padding-bottom: ${space[12]}px;
	background: ${palette.neutral[100]};
	color: ${palette.neutral[7]};
	color-scheme: light;
`;

const brandStyles = css`
	box-sizing: border-box;
	height: 230px;
	margin: 0 auto;
	overflow: hidden;
	/* The artwork is transparent and uses this illustrated-header background. */
	background: ${palette.opinion[800]};
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

const headerArtwork = (filename: string) => {
	// Request the artwork's design width, rather than stretching a card-sized image.
	const width = filename.match(/-(\d+)px$/)?.[1] ?? '360';
	return `https://i.guim.co.uk/img/uploads/2026/09/15/${filename}.png?width=${width}&dpr=2&s=none`;
};
// Descending media queries ensure that the browser chooses the largest match.
const headerSources = [
	{ breakpoint: 1728, filename: 'header-desktop-1728px' },
	{ breakpoint: breakpoints.wide, filename: 'header-wide-1440px' },
	{ breakpoint: breakpoints.leftCol, filename: 'header-leftcol-1280px' },
	{ breakpoint: breakpoints.desktop, filename: 'header-desktop-1024px' },
	{ breakpoint: 768, filename: 'header-tablet-979px' },
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
];

export const PuzzlesLayout = ({
	puzzlesPage,
	NAV,
}: {
	puzzlesPage: FEPuzzlesPageType;
	NAV: NavType;
}) => {
	const renderAds = !puzzlesPage.isAdFreeUser;
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
					nav={NAV}
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
				css={mainStyles}
				data-layout="PuzzlesPageLayout"
				id="maincontent"
			>
				<header css={brandStyles}>
					<h1 css={visuallyHidden}>Puzzles and Games</h1>
					<picture css={brandPictureStyles}>
						{headerSources.map(({ breakpoint, filename }) => (
							<source
								key={filename}
								media={`(min-width: ${breakpoint}px)`}
								srcSet={headerArtwork(filename)}
							/>
						))}
						<img
							alt=""
							css={brandImageStyles}
							src={headerArtwork('header-mobile-360px')}
						/>
					</picture>
				</header>
				<PuzzlesDirectory
					layout={puzzlesPage.layout}
					renderAds={renderAds}
				/>
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
