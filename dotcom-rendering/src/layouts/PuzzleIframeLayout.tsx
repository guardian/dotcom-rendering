import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	palette,
	space,
	textSans17,
} from '@guardian/source/foundations';
import { AdSlot } from '../components/AdSlot.web';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { PuzzleBackLink } from '../components/PuzzleBackLink.island';
import { PuzzleMeEmbed } from '../components/PuzzleMeEmbed.island';
import { RightColumn } from '../components/RightColumn';
import { Section } from '../components/Section';
import {
	shouldShowSudokuPrintControls,
	SudokuPrintControls,
} from '../components/SudokuPrintControls.island';
import { ArticleDisplay } from '../lib/articleFormat';
import type { NavType } from '../model/extract-nav';
import type { FEPuzzleIframePageType } from '../types/puzzleIframePage';
import { Stuck } from './lib/stickiness';

type Props = {
	puzzlePage: FEPuzzleIframePageType;
	NAV: NavType;
};

const mainStyles = css`
	padding: ${space[6]}px 0 ${space[12]}px;

	@media print {
		padding: 0;
	}
`;

const copyStyles = css`
	margin: 0 0 ${space[5]}px;
	color: ${palette.neutral[20]};
	${textSans17};
`;

const getIframeHeights = (
	puzzlePage: FEPuzzleIframePageType,
): { mobile: number; desktop: number } => {
	if (puzzlePage.puzzle.slug === 'wordiply') {
		return { mobile: 1200, desktop: 1400 };
	}
	return { mobile: 760, desktop: 900 };
};

const iframeWrapStyles = (puzzlePage: FEPuzzleIframePageType) => {
	const heights = getIframeHeights(puzzlePage);

	return css`
		border: 1px solid ${palette.neutral[86]};
		border-radius: 12px;
		overflow: hidden;
		background: white;

		@media print {
			border: 0;
			border-radius: 0;
			break-inside: avoid;
		}

		.puzzle-me-embed,
		.pm-embed-div {
			display: block;
			width: 100%;
		}

		iframe,
		.puzzle-me-embed iframe,
		.pm-embed-div iframe {
			display: block;
			width: 100% !important;
			height: ${heights.mobile}px !important;
			min-height: ${heights.mobile}px;
			border: 0;
		}

		${from.desktop} {
			iframe,
			.puzzle-me-embed iframe,
			.pm-embed-div iframe {
				height: ${heights.desktop}px !important;
				min-height: ${heights.desktop}px;
			}
		}

		@media print {
			iframe,
			.puzzle-me-embed iframe,
			.pm-embed-div iframe {
				height: 760px !important;
				min-height: 760px;
			}
		}
	`;
};

const iframePageGridStyles = css`
	display: grid;
	gap: ${space[6]}px;
	grid-template-columns: minmax(0, 1fr);

	${from.wide} {
		grid-template-columns: minmax(0, 1fr) 300px;
		align-items: start;
	}

	@media print {
		display: block;
	}
`;

const rightColumnAdStyles = css`
	margin-top: ${space[1]}px;
`;

const fallbackStyles = css`
	padding: ${space[8]}px;
	${headlineBold24};
`;

export const PuzzleIframeLayout = ({ puzzlePage, NAV }: Props) => {
	const src = puzzlePage.puzzle.url;
	const renderAds = !puzzlePage.isAdFreeUser;
	const showPrintOptions = shouldShowSudokuPrintControls(puzzlePage.puzzle);
	const puzzleTargetId = 'printable-sudoku';

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
				<Section
					title={puzzlePage.webTitle}
					fullWidth={true}
					showTopBorder={false}
				>
					<div data-print-layout="hide">
						<PuzzleBackLink
							archiveMonth={puzzlePage.archiveMonth}
							puzzleSlug={puzzlePage.puzzle.slug}
						/>
					</div>
					{puzzlePage.description !== undefined && (
						<p css={copyStyles}>{puzzlePage.description}</p>
					)}
					{showPrintOptions && (
						<Island
							priority="critical"
							defer={{ until: 'interaction' }}
						>
							<SudokuPrintControls
								targetId={puzzleTargetId}
								title={puzzlePage.webTitle}
							/>
						</Island>
					)}
					<div css={iframePageGridStyles}>
						<div
							css={iframeWrapStyles(puzzlePage)}
							id={showPrintOptions ? puzzleTargetId : undefined}
						>
							{src !== undefined ? (
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<PuzzleMeEmbed
										src={src}
										title={puzzlePage.webTitle}
									/>
								</Island>
							) : (
								<div css={fallbackStyles}>
									Puzzle unavailable
								</div>
							)}
						</div>
						{renderAds && (
							<RightColumn showFrom="wide">
								<div css={rightColumnAdStyles}>
									<AdSlot
										position="right"
										display={ArticleDisplay.Standard}
										shouldHideReaderRevenue={false}
									/>
								</div>
							</RightColumn>
						)}
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
