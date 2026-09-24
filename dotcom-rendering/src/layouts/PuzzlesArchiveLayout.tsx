import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold34,
	palette,
	space,
	textSans17,
} from '@guardian/source/foundations';
import { AdSlot } from '../components/AdSlot.web';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { Rows } from '../components/PuzzleCard';
import { PuzzlesArchiveCalendar } from '../components/PuzzlesArchiveCalendar.island';
import { Section } from '../components/Section';
import { ArticleDisplay } from '../lib/articleFormat';
import type { NavType } from '../model/extract-nav';
import type { FEPuzzlesPageType } from '../types/puzzlesPage';
import { Stuck } from './lib/stickiness';

const mainStyles = css`
	background: ${palette.neutral[100]};
	color: ${palette.neutral[7]};
	padding-bottom: ${space[12]}px;
`;

const pageStyles = css`
	box-sizing: border-box;
	max-width: 1300px;
	margin: 0 auto;
	padding: 0 ${space[3]}px;
	border-left: 1px solid ${palette.neutral[86]};
	border-right: 1px solid ${palette.neutral[86]};
	${from.tablet} {
		padding: 0 ${space[5]}px;
	}
	h1 {
		${headlineBold34};
		margin: 0;
		padding-top: ${space[2]}px;
	}
	> p {
		${textSans17};
		max-width: 620px;
		margin: 0 0 ${space[6]}px;
	}
`;

const contentStyles = css`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: ${space[6]}px;
	${from.desktop} {
		grid-template-columns: minmax(0, 760px) 300px;
	}
`;

const sideAdStyles = css`
	display: none;
	${from.desktop} {
		display: block;
		padding-top: 110px;
	}
`;

const moreStyles = css`
	margin-top: ${space[8]}px;
	padding-top: ${space[2]}px;
	border-top: 1px solid ${palette.neutral[20]};
	h2 {
		${headlineBold24};
		margin: 0 0 ${space[3]}px;
	}
`;

const bottomAdStyles = css`
	margin-top: ${space[8]}px;
	padding: ${space[4]}px 0;
	border-top: 1px solid ${palette.neutral[86]};
`;

export const PuzzlesArchiveLayout = ({
	puzzlesPage,
	NAV,
}: {
	puzzlesPage: FEPuzzlesPageType;
	NAV: NavType;
}) => {
	const archive = puzzlesPage.archive;
	if (!archive) return null;
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
							<HeaderAdSlot includeMobile={true} />
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
			<main css={mainStyles} id="maincontent">
				<div css={pageStyles}>
					<h1>{archive.title}</h1>
					<p>{archive.description}</p>
					<div css={contentStyles}>
						<Island priority="critical">
							<PuzzlesArchiveCalendar initialArchive={archive} />
						</Island>
						{renderAds && (
							<aside css={sideAdStyles}>
								<AdSlot
									position="right"
									shouldHideReaderRevenue={false}
								/>
							</aside>
						)}
					</div>
					{archive.moreFrom.length > 0 && (
						<section css={moreStyles}>
							<h2>More from Puzzles &amp; games</h2>
							<Rows rows={[archive.moreFrom]} />
						</section>
					)}
					{renderAds && (
						<div css={bottomAdStyles}>
							<AdSlot
								display={ArticleDisplay.Standard}
								index={1}
								position="fronts-banner"
							/>
						</div>
					)}
				</div>
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
