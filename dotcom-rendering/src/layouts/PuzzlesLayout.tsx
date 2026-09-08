import { css } from '@emotion/react';
import {
	from,
	headlineBold50,
	palette,
	space,
	textSansBold14,
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
	padding-bottom: ${space[12]}px;
	background: #ffffff;
	color: #121212;
	color-scheme: light;
`;

const brandStyles = css`
	max-width: 1300px;
	margin: 0 auto;
	padding: ${space[6]}px ${space[3]}px ${space[8]}px;
	border-right: 1px solid #dcdcdc;
	border-left: 1px solid #dcdcdc;
	background: #f1f1f1;
`;

const titleStyles = css`
	max-width: 10ch;
	margin: 0;
	${headlineBold50};
	font-size: 48px;
	line-height: 0.9;

	${from.tablet} {
		font-size: 64px;
	}
`;

const navStyles = css`
	max-width: 1300px;
	margin: 0 auto ${space[8]}px;
	padding: 0 ${space[3]}px;
	border-right: 1px solid #dcdcdc;
	border-left: 1px solid #dcdcdc;
	background: ${palette.brand[400]};
	overflow-x: auto;
`;

const navListStyles = css`
	display: flex;
	min-width: max-content;
	gap: ${space[5]}px;
	margin: 0;
	padding: 0;
	list-style: none;
`;

const navLinkStyles = css`
	display: flex;
	min-height: 44px;
	align-items: center;
	border-bottom: 4px solid transparent;
	color: #ffffff;
	text-decoration: none;
	${textSansBold14};

	:hover,
	&[aria-current='location'] {
		border-bottom-color: #ffffff;
	}

	:focus-visible {
		outline: 3px solid #ffeb3b;
		outline-offset: -3px;
	}
`;

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
					<h1 css={titleStyles}>
						Puzzles
						<br />
						&amp; Games
					</h1>
				</header>
				{puzzlesPage.layout.filters &&
					puzzlesPage.layout.filters.length > 0 && (
						<nav aria-label="Puzzles categories" css={navStyles}>
							<ul css={navListStyles}>
								{puzzlesPage.layout.filters.map(
									(filter, index) => (
										<li key={filter.id}>
											<a
												aria-current={
													index === 0
														? 'location'
														: undefined
												}
												css={navLinkStyles}
												href={filter.target}
											>
												{filter.title}
											</a>
										</li>
									),
								)}
							</ul>
						</nav>
					)}
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
