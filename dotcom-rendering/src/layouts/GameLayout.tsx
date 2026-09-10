import { css } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	until,
} from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { Footer } from '../components/Footer';
import { GameIframe } from '../components/GameIframe.island';
import { GridItem } from '../components/GridItem';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { ShareButton } from '../components/ShareButton.island';
import { SubNav } from '../components/SubNav.island';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { NavType } from '../model/extract-nav';
import { type GameConfig, resolveIframeUrl } from '../model/games/gameConfigs';
import { palette as themePalette } from '../palette';
import type { FEGamePageType } from '../types/gamePage';

/**
 * A fresh, self-contained layout for generic Game pages. It intentionally
 * does not reuse Article-domain composite components (`ArticleMeta`,
 * `ArticleTitle`, `ArticleBody`) as those require a full `ArticleFormat` +
 * `TagType[]` + branding/podcast/avatar machinery that doesn't apply to a
 * generic game page. It does directly reuse existing generic building
 * blocks (Masthead, Section, Footer, AdSlot, ShareButton.island) rather than
 * duplicating them.
 *
 * Game Page is scoped to iframe-based games only — crosswords remain on
 * their existing, separate `/crosswords/*` flow
 * (`ArticleDesign.Crossword` / `src/layouts/CrosswordLayout.tsx`), which is
 * unrelated to this layout. There is accordingly no setter byline, PDF
 * link, or comments rendering here — none of the current `GameConfig`
 * registry entries have any equivalent concept.
 */

const gameGroupLabels: Record<GameConfig['gameGroup'], string> = {
	crosswords: 'Crosswords',
	'logic-puzzles': 'Logic puzzles',
	'word-games': 'Word games',
	'trivia-and-quizzes': 'Quizzes and Trivia',
};

/**
 * `ShareButton.island` only needs an `ArticleFormat` to branch a handful of
 * minor style decisions (e.g. LiveBlog-specific spacing). Game pages have no
 * equivalent concept, so a minimal, fixed format value is used to satisfy
 * its prop contract without fabricating article-specific data (tags,
 * branding, etc.). This is read-only reuse of existing exported enum
 * values — it does not modify `articleFormat.ts` or any crossword decision
 * logic.
 */
const gamePageFormat = {
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
 * The `/GamePage` handler resolves and validates the `GameConfig` for the
 * request's `slug` before rendering; it is passed alongside the raw payload
 * rather than re-derived here so `GameLayout` has a single, already-narrowed
 * source of truth for rendering decisions.
 */
export type ResolvedGamePage = FEGamePageType & { gameConfig: GameConfig };

const GameContent = ({ gamePage }: { gamePage: ResolvedGamePage }) => {
	const { instance, gameConfig } = gamePage;

	return (
		<Island priority="critical" defer={{ until: 'visible' }}>
			<GameIframe
				src={resolveIframeUrl(gameConfig)}
				title={instance.title}
			/>
		</Island>
	);
};

const RelatedGamesRail = ({
	items,
}: {
	items: NonNullable<FEGamePageType['instance']['moreFromPuzzlesAndGames']>;
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
	gamePage: ResolvedGamePage;
	NAV: NavType;
}

export const GameLayout = ({ gamePage, NAV }: Props) => {
	const { config, instance, editionId, gameConfig } = gamePage;

	const showShare = gameConfig.shareEnabled;
	const showPrint = gameConfig.printEnabled;
	const showRelated = !!instance.moreFromPuzzlesAndGames?.length;
	const labelText = gameGroupLabels[gameConfig.gameGroup];

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
					pageId={gamePage.id}
					tagIds={[]}
					sectionId={config.section}
					contentType="Game"
				/>
			</div>

			<main data-layout="GameLayout">
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
										pageId={gamePage.id}
										webTitle={gamePage.webTitle}
										format={gamePageFormat}
										context="ArticleMeta"
									/>
								)}
								{showPrint && <PrintButton />}
							</div>
						</GridItem>
						<GridItem area="body" element="article">
							<GameContent gamePage={gamePage} />
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
						<RelatedGamesRail
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
					pageFooter={gamePage.pageFooter}
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
