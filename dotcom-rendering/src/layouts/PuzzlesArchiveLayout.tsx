import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold34,
	palette,
	space,
	textEgyptian17,
} from '@guardian/source/foundations';
import { AdSlot } from '../components/AdSlot.web';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { MorePuzzlesRows } from '../components/MorePuzzlesCard';
import { PuzzlesArchiveCalendar } from '../components/PuzzlesArchiveCalendar.island';
import { PuzzlesArchiveDescription } from '../components/PuzzlesArchiveDescription.island';
import { Section } from '../components/Section';
import { ArticleDisplay } from '../lib/articleFormat';
import { center } from '../lib/center';
import type { NavType } from '../model/extract-nav';
import type { FEPuzzlesPageType } from '../types/puzzlesPage';
import { Stuck } from './lib/stickiness';

const mainStyles = css`
	background: ${palette.neutral[100]};
	color: ${palette.neutral[7]};
	padding-bottom: ${space[12]}px;
`;

const pageStyles = css`
	${center};
	box-sizing: border-box;
	padding: 0 ${space[3]}px;
	border-left: 1px solid ${palette.neutral[86]};
	border-right: 1px solid ${palette.neutral[86]};
	${from.tablet} {
		padding: 0 ${space[5]}px;
	}
	${from.leftCol} {
		::before {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 160px;
			width: 1px;
			background: ${palette.neutral[86]};
			content: '';
			pointer-events: none;
		}
	}
	${from.wide} {
		::before {
			left: 240px;
		}
	}
`;

const archiveGridStyles = css`
	display: grid;
	grid-template-columns: minmax(0, 760px);
	column-gap: ${space[5]}px;
	${from.leftCol} {
		grid-template-columns: 140px minmax(0, 760px) minmax(0, 1fr);
	}
	${from.wide} {
		grid-template-columns: 220px minmax(0, 1fr) 300px;
	}
`;

const headingStyles = css`
	${archiveGridStyles};
	h1 {
		${headlineBold34};
		margin: 0;
		padding-top: ${space[2]}px;
		overflow-wrap: anywhere;
	}
	p {
		${textEgyptian17};
		max-width: 620px;
		margin: 0 0 ${space[6]}px;
		color: ${palette.neutral[46]};
	}
	${from.leftCol} {
		h1 {
			grid-column: 1;
		}
		p {
			grid-column: 2;
			padding-top: ${space[2]}px;
		}
	}
`;

const contentStyles = css`
	${archiveGridStyles};
	${from.desktop} {
		grid-template-columns: minmax(0, 1fr) 300px;
	}
	${from.leftCol} {
		grid-template-columns: 140px minmax(0, 1fr) 300px;
	}
	${from.wide} {
		grid-template-columns: 220px minmax(0, 1fr) 300px;
	}
`;

const calendarColumnStyles = css`
	min-width: 0;
	${from.leftCol} {
		grid-column: 2;
	}
`;

const sideAdStyles = css`
	display: none;
	${from.desktop} {
		display: block;
		grid-column: 2;
		padding-top: 122px;
	}
	${from.leftCol} {
		grid-column: 3;
	}
`;

const moreStyles = css`
	${archiveGridStyles};
	margin-top: ${space[5]}px;
	padding-top: ${space[2]}px;
	border-top: 1px solid ${palette.neutral[20]};
	h2 {
		${headlineBold24};
		margin: 0 0 ${space[2]}px;
		line-height: 1;
		span {
			color: ${palette.news[400]};
		}
	}
	${from.leftCol} {
		h2 {
			grid-column: 1;
			span {
				display: block;
			}
		}
		> div {
			grid-column: 2;
		}
	}
`;

const mobileAdStyles = css`
	margin-top: ${space[8]}px;
	background: ${palette.neutral[97]};
	${from.tablet} {
		display: none;
	}
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
	const archiveNav = { ...NAV, currentNavLink: archive.title };

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
					nav={archiveNav}
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
					<header css={headingStyles}>
						<h1>{archive.title}</h1>
						<p>
							<Island priority="critical">
								<PuzzlesArchiveDescription
									idUrl={
										puzzlesPage.config.idUrl ??
										'https://profile.theguardian.com'
									}
								/>
							</Island>
						</p>
					</header>
					<div css={contentStyles}>
						<div css={calendarColumnStyles}>
							<Island priority="critical">
								<PuzzlesArchiveCalendar
									initialArchive={archive}
								/>
							</Island>
						</div>
						{renderAds && (
							<aside css={sideAdStyles}>
								<AdSlot
									display={ArticleDisplay.Standard}
									position="right"
									shouldHideReaderRevenue={false}
								/>
							</aside>
						)}
					</div>
					{archive.moreFrom.length > 0 && (
						<section css={moreStyles}>
							<h2>
								More from <span>Puzzles &amp; games</span>
							</h2>
							<MorePuzzlesRows
								items={archive.moreFrom}
								mobileScrollable={true}
							/>
						</section>
					)}
					{renderAds && (
						<div css={mobileAdStyles}>
							<AdSlot position="mobile-front" index={1} />
						</div>
					)}
				</div>
			</main>
			{renderAds && (
				<AdSlot
					display={ArticleDisplay.Standard}
					index={1}
					position="fronts-banner"
				/>
			)}
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
