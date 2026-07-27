import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	palette,
	space,
	textSans14,
	textSansBold12,
} from '@guardian/source/foundations';
import { Footer } from '../components/Footer';
import { Masthead } from '../components/Masthead/Masthead';
import { PuzzleArchiveCalendar } from '../components/PuzzleArchiveCalendar';
import { Section } from '../components/Section';
import type { NavType } from '../model/extract-nav';
import type { FEPuzzleIframePageType } from '../types/puzzleIframePage';

type Props = {
	puzzlePage: FEPuzzleIframePageType;
	NAV: NavType;
};

const mainStyles = css`
	padding: ${space[5]}px 0 ${space[12]}px;
`;

const mobileNavigationStyles = css`
	display: flex;
	gap: ${space[2]}px;
	padding-bottom: ${space[4]}px;
	overflow-x: auto;
	scrollbar-width: none;

	::-webkit-scrollbar {
		display: none;
	}

	${from.desktop} {
		display: none;
	}
`;

const navigationLinkStyles = (isCurrent: boolean) => css`
	display: inline-flex;
	min-height: 34px;
	flex: 0 0 auto;
	align-items: center;
	padding: 0 ${space[3]}px;
	border-radius: 999px;
	background: ${isCurrent ? palette.neutral[60] : palette.neutral[86]};
	color: ${palette.neutral[0]};
	text-decoration: none;
	${textSansBold12};

	:hover {
		text-decoration: underline;
	}
`;

const titleStyles = css`
	margin: 0 0 ${space[2]}px;
	${headlineBold24};
`;

const introStyles = css`
	margin: 0;
	color: ${palette.neutral[20]};
	${textSans14};
`;

const archiveGridStyles = css`
	margin-top: ${space[5]}px;
	border-top: 1px solid ${palette.neutral[86]};

	${from.desktop} {
		display: grid;
		grid-template-columns: 140px minmax(0, 1fr);
		min-height: 540px;
		border-right: 1px solid ${palette.neutral[86]};
		border-left: 1px solid ${palette.neutral[86]};
	}
`;

const desktopNavigationStyles = css`
	display: none;

	${from.desktop} {
		display: flex;
		flex-direction: column;
		gap: ${space[2]}px;
		padding: ${space[3]}px;
		border-right: 1px solid ${palette.neutral[86]};
	}
`;

const calendarColumnStyles = css`
	padding: 0 0 ${space[12]}px;

	${from.desktop} {
		max-width: 620px;
		padding: 0 ${space[4]}px ${space[12]}px;
	}
`;

const utilityGridStyles = css`
	display: grid;
	gap: ${space[8]}px;
	padding: ${space[5]}px 0;
	border-top: 1px solid ${palette.neutral[86]};
	${textSans14};

	${from.desktop} {
		grid-template-columns: 140px minmax(0, 1fr);
	}
`;

const utilityTitleStyles = css`
	display: block;
	margin-bottom: ${space[3]}px;
	${textSansBold12};
`;

const assistanceStyles = css`
	display: none;

	${from.desktop} {
		display: block;
	}
`;

const utilityLinksStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: ${space[3]}px;
`;

const utilityLinkStyles = css`
	display: inline-flex;
	min-height: 28px;
	align-items: center;
	padding: 0 ${space[3]}px;
	border-radius: 999px;
	background: ${palette.neutral[60]};
	color: ${palette.neutral[100]};
	text-decoration: none;
	${textSansBold12};

	:hover {
		text-decoration: underline;
	}
`;

export const PuzzleArchiveLayout = ({ puzzlePage, NAV }: Props) => {
	const currentSlug = puzzlePage.puzzle.slug ?? '';
	const today = new Date().toISOString().slice(0, 10);
	const archiveNavigation = puzzlePage.archiveNavigation ?? [];
	const initialMonth = puzzlePage.archiveMonth ?? today.slice(0, 7);

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<Masthead
					nav={NAV}
					editionId={puzzlePage.editionId}
					idUrl={puzzlePage.config.idUrl}
					mmaUrl={puzzlePage.config.mmaUrl}
					discussionApiUrl={puzzlePage.config.discussionApiUrl}
					idApiUrl={puzzlePage.config.idApiUrl}
					contributionsServiceUrl={puzzlePage.contributionsServiceUrl}
					showSubNav={true}
					showSlimNav={false}
					hasPageSkin={false}
					hasPageSkinContentSelfConstrain={false}
				/>
			</div>

			<main css={mainStyles} id="maincontent">
				<Section fullWidth={true} showTopBorder={false}>
					<nav
						aria-label="Puzzle archives"
						css={mobileNavigationStyles}
					>
						<a css={navigationLinkStyles(false)} href="/puzzles">
							Puzzles &amp; games
						</a>
						{archiveNavigation.map((item) => (
							<a
								aria-current={
									item.url ===
									`/puzzles/${currentSlug}/archive`
										? 'page'
										: undefined
								}
								css={navigationLinkStyles(
									item.url ===
										`/puzzles/${currentSlug}/archive`,
								)}
								href={item.url}
								key={item.url}
							>
								{item.title}
							</a>
						))}
					</nav>

					<h1 css={titleStyles}>{puzzlePage.webTitle}</h1>
					{puzzlePage.description !== undefined && (
						<p css={introStyles}>{puzzlePage.description}</p>
					)}

					<div css={archiveGridStyles}>
						<nav
							aria-label="Puzzle archives"
							css={desktopNavigationStyles}
						>
							<a
								css={navigationLinkStyles(false)}
								href="/puzzles"
							>
								Puzzles &amp; games
							</a>
							{archiveNavigation.map((item) => (
								<a
									aria-current={
										item.url ===
										`/puzzles/${currentSlug}/archive`
											? 'page'
											: undefined
									}
									css={navigationLinkStyles(
										item.url ===
											`/puzzles/${currentSlug}/archive`,
									)}
									href={item.url}
									key={item.url}
								>
									{item.title}
								</a>
							))}
						</nav>

						<div css={calendarColumnStyles}>
							<PuzzleArchiveCalendar
								initialMonth={initialMonth}
								puzzleSlug={currentSlug}
								today={today}
							/>
						</div>
					</div>

					<div css={utilityGridStyles}>
						<div css={assistanceStyles}>
							<span css={utilityTitleStyles}>
								Need some assistance?
							</span>
							<div css={utilityLinksStyles}>
								<a css={utilityLinkStyles} href="/help/puzzles">
									Puzzle FAQs
								</a>
								<a css={utilityLinkStyles} href="/help">
									Help centre
								</a>
							</div>
						</div>
						<div>
							<span css={utilityTitleStyles}>View more:</span>
							<div css={utilityLinksStyles}>
								<a css={utilityLinkStyles} href="/puzzles">
									Puzzle hub
								</a>
								{archiveNavigation.map((item) => (
									<a
										css={utilityLinkStyles}
										href={item.url}
										key={item.url}
									>
										{item.title}
									</a>
								))}
							</div>
						</div>
					</div>
				</Section>
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
					pageFooter={puzzlePage.pageFooter}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.footer}
					editionId={puzzlePage.editionId}
				/>
			</Section>
		</>
	);
};
