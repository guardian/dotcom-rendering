import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	until,
} from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { PuzzleIframe } from '../components/PuzzleIframe.island';
import { Section } from '../components/Section';
import { ShareButton } from '../components/ShareButton.island';
import { SubNav } from '../components/SubNav.island';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { NavType } from '../model/extract-nav';
import {
	type PuzzleConfig,
	resolveIframeUrl,
} from '../model/puzzles/puzzleConfigs';
import { palette as themePalette } from '../palette';
import type { FEPuzzlePageType } from '../types/puzzlePage';

/**
 * A fresh, self-contained layout for generic Puzzle Pages. It intentionally
 * does not reuse Article-domain composite components (`ArticleMeta`,
 * `ArticleTitle`, `ArticleBody`) as those require a full `ArticleFormat` +
 * `TagType[]` + branding/podcast/avatar machinery that doesn't apply to a
 * generic puzzle page. It does directly reuse existing generic building
 * blocks (Masthead, Section, Footer, AdSlot, ShareButton.island) rather than
 * duplicating them.
 *
 * Puzzle Page is scoped to iframe-based puzzles only — crosswords remain on
 * their existing, separate `/crosswords/*` flow
 * (`ArticleDesign.Crossword` / `src/layouts/CrosswordLayout.tsx`), which is
 * unrelated to this layout. There is accordingly no setter byline, PDF
 * link, or comments rendering here — none of the current `PuzzleConfig`
 * registry entries have any equivalent concept.
 */

const puzzleGroupLabels: Record<PuzzleConfig['puzzleGroup'], string> = {
	'logic-puzzles': 'Logic puzzles',
	'word-games': 'Word games',
};

/**
 * `ShareButton.island` only needs an `ArticleFormat` to branch a handful of
 * minor style decisions (e.g. LiveBlog-specific spacing). Puzzle pages have
 * no equivalent concept, so a minimal, fixed format value is used to satisfy
 * its prop contract without fabricating article-specific data (tags,
 * branding, etc.). This is read-only reuse of existing exported enum
 * values — it does not modify `articleFormat.ts` or any crossword decision
 * logic.
 */
const puzzlePageFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
} as const;

const headerGrid = css`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	grid-template-areas:
		'label'
		'title'
		'meta'
		'body';
	row-gap: 8px;

	${from.leftCol} {
		grid-template-columns: 140px 1fr;
		column-gap: 20px;
		grid-template-areas:
			'label  title'
			'.      meta'
			'body   body';
	}
`;

const puzzleTypeLabel = css`
	color: ${themePalette('--crossword-clues-header-border-top')};
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.02em;
`;

const metaRow = css`
	display: flex;
	align-items: center;
	gap: 16px;
	flex-wrap: wrap;
`;

const printButtonStyles = css`
	background: none;
	border: 1px solid currentColor;
	border-radius: 100px;
	padding: 4px 12px;
	cursor: pointer;
	font-size: inherit;
	color: inherit;

	@media print {
		display: none;
	}
`;

const PrintButton = () => (
	<button
		type="button"
		css={printButtonStyles}
		onClick={() => window.print()}
	>
		Print
	</button>
);

const relatedRailStyles = css`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px 0;

	${until.tablet} {
		padding: 16px 20px;
	}
`;

const relatedRailHeading = css`
	font-weight: 700;
`;

/**
 * The `/PuzzlePage` handler resolves and validates the `PuzzleConfig` for
 * the request's `slug` before rendering; it is passed alongside the raw
 * payload rather than re-derived here so `PuzzlePageLayout` has a single,
 * already-narrowed source of truth for rendering decisions.
 */
export type ResolvedPuzzlePage = FEPuzzlePageType & {
	puzzleConfig: PuzzleConfig;
};

const PuzzlePageContent = ({
	puzzlePage,
}: {
	puzzlePage: ResolvedPuzzlePage;
}) => {
	const { instance, puzzleConfig } = puzzlePage;

	return (
		<Island priority="critical" defer={{ until: 'visible' }}>
			<PuzzleIframe
				src={resolveIframeUrl(puzzleConfig)}
				title={instance.title}
			/>
		</Island>
	);
};

const RelatedPuzzlesRail = ({
	items,
}: {
	items: NonNullable<FEPuzzlePageType['instance']['moreFromPuzzlesAndGames']>;
}) => (
	<div css={relatedRailStyles}>
		<h2 css={relatedRailHeading}>More from Puzzles &amp; games</h2>
		<ul>
			{items.map((item) => (
				<li key={item.id}>
					{item.url ? (
						<a href={item.url}>{item.title}</a>
					) : (
						item.title
					)}
				</li>
			))}
		</ul>
	</div>
);

interface Props {
	puzzlePage: ResolvedPuzzlePage;
	NAV: NavType;
}

export const PuzzlePageLayout = ({ puzzlePage, NAV }: Props) => {
	const { config, instance, editionId, puzzleConfig } = puzzlePage;

	const showShare = puzzleConfig.shareEnabled;
	const showPrint = puzzleConfig.printEnabled;
	const showRelated = !!instance.moreFromPuzzlesAndGames?.length;
	const labelText = puzzleGroupLabels[puzzleConfig.puzzleGroup];

	return (
		<>
			<div data-print-layout="hide">
				<Section
					fullWidth={true}
					showTopBorder={false}
					showSideBorders={false}
					padSides={false}
					shouldCenter={false}
				>
					<HeaderAdSlot />
				</Section>

				<Masthead
					nav={NAV}
					editionId={editionId}
					idUrl={config.idUrl}
					mmaUrl={config.mmaUrl}
					discussionApiUrl={config.discussionApiUrl}
					idApiUrl={config.idApiUrl}
					contributionsServiceUrl=""
					showSubNav={true}
					showSlimNav={false}
					hasPageSkin={false}
					hasPageSkinContentSelfConstrain={false}
					pageId={puzzlePage.id}
					tagIds={[]}
					sectionId={config.section}
					contentType="Game"
				/>
			</div>

			<main data-layout="PuzzlePageLayout">
				<Section
					fullWidth={true}
					showTopBorder={false}
					backgroundColour={themePalette('--article-background')}
					borderColour={themePalette('--article-border')}
					element="article"
				>
					<div css={headerGrid}>
						<GridItem area="label" element="aside">
							<span css={puzzleTypeLabel}>{labelText}</span>
						</GridItem>
						<GridItem area="title">
							<h1>{instance.title}</h1>
						</GridItem>
						<GridItem area="meta" element="aside">
							<div css={metaRow}>
								{showShare && (
									<ShareButton
										pageId={puzzlePage.id}
										webTitle={puzzlePage.webTitle}
										format={puzzlePageFormat}
										context="ArticleMeta"
									/>
								)}
								{showPrint && <PrintButton />}
							</div>
						</GridItem>
						<GridItem area="body" element="article">
							<PuzzlePageContent puzzlePage={puzzlePage} />
						</GridItem>
					</div>
				</Section>

				<Section
					fullWidth={true}
					showTopBorder={false}
					padSides={false}
					backgroundColour={themePalette('--article-background')}
					hideFromPrintLayout={true}
				>
					<StraightLines
						count={4}
						color={themePalette('--straight-lines')}
						cssOverrides={css`
							display: block;
						`}
					/>
				</Section>

				{showRelated && (
					<Section
						fullWidth={true}
						showTopBorder={false}
						backgroundColour={themePalette('--article-background')}
					>
						<RelatedPuzzlesRail
							items={instance.moreFromPuzzlesAndGames ?? []}
						/>
					</Section>
				)}

				<Section
					fullWidth={true}
					padSides={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={themePalette('--ad-background')}
					element="aside"
				>
					<AdSlot
						data-print-layout="hide"
						position="merchandising-high"
					/>
				</Section>

				<Section
					fullWidth={true}
					padSides={false}
					showTopBorder={false}
					showSideBorders={false}
					backgroundColour={themePalette('--ad-background')}
					element="aside"
				>
					<AdSlot position="merchandising" />
				</Section>
			</main>

			{NAV.subNavSections && (
				<Section fullWidth={true} padSides={false} element="aside">
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							position="footer"
						/>
					</Island>
				</Section>
			)}

			<Section
				fullWidth={true}
				padSides={false}
				backgroundColour={sourcePalette.brand[400]}
				borderColour={sourcePalette.brand[600]}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={puzzlePage.pageFooter}
					selectedPillar={NAV.selectedPillar}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.footer}
					editionId={editionId}
				/>
			</Section>

			<MobileStickyContainer data-print-layout="hide" />
		</>
	);
};
