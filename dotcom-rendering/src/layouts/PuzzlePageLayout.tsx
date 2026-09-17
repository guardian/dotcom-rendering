import { css } from '@emotion/react';
import {
	from,
	remSpace,
	palette as sourcePalette,
} from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { DecideLines } from '../components/DecideLines';
import { DiscussionLayout } from '../components/DiscussionLayout';
import { Footer } from '../components/Footer';
import { GridItem } from '../components/GridItem';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { PuzzleIframe } from '../components/PuzzleIframe.island';
import { RightColumn } from '../components/RightColumn';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { StickyBottomBanner } from '../components/StickyBottomBanner.island';
import { SubMeta } from '../components/SubMeta';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { shouldShowMobileAboveNavSlot } from '../lib/commercialMobileAboveNavTest';
import { formatPuzzleDate } from '../lib/puzzleDate';
import { isPuzzlesHubV1Enabled } from '../lib/puzzlesHubVersionExperiment';
import type { LinkType, NavType, SubNavType } from '../model/extract-nav';
import type { PuzzleConfig } from '../model/puzzles/puzzleConfigs';
import { palette as themePalette } from '../palette';
import type { FEPuzzlePageType } from '../types/puzzlePage';
import type { TagType } from '../types/tag';
import { BannerWrapper, Stuck } from './lib/stickiness';

/**
 * A deliberate, near-verbatim structural replica of `CrosswordLayout.tsx`
 * (sticky header ad, Masthead, survey ad, an `<article>` grid with
 * title/headline/standfirst/meta rows and a `right-column` ad on wide
 * viewports, a straight-line separator, SubMeta, merchandising ads,
 * comments, sub-nav, footer, the contributions banner and the mobile
 * sticky container), reusing the exact same generic + Article-domain
 * components (`ArticleTitle`, `ArticleHeadline`, `ArticleMeta`, `SubMeta`,
 * `DiscussionLayout`, `StickyBottomBanner`) that page uses, not
 * Puzzle-Page-specific rewrites of them - see `CrosswordLayout.tsx` for the
 * original this mirrors.
 *
 * The **one deliberate content difference**, per explicit product/design
 * direction: the crossword game itself (`ArticleBody` rendering the
 * `crossword` block) is replaced by `PuzzleIframe.island` in the `body`
 * grid area. Puzzle Page is scoped to iframe-based puzzles only; the
 * crossword-only game/data model has no equivalent here.
 *
 * Everywhere else, `FEPuzzlePageType` (`src/types/puzzlePage.ts`) simply
 * doesn't carry the same fields `ArticleDeprecated` does (no `tags`,
 * `byline`, `crossword`, `blocks`, `isCommentable`, `subMetaKeywordLinks`/
 * `subMetaSectionLinks`, `pageType`, `isAdFreeUser`, `shouldHideAds`,
 * `guardianBaseURL`, etc. - see `docs/puzzle-page.md`'s "The
 * `FEPuzzlePageType` request contract"). Rather than dropping those
 * components, each is still rendered with the closest real data Puzzle
 * Page actually has, and a **hardcoded, explicitly-commented fallback**
 * (an empty array, `undefined`, or a `false` gate) everywhere a genuine
 * Puzzle-Page equivalent doesn't exist - e.g. comments are permanently
 * disabled below via `const showComments = false`, mirroring exactly how
 * `CrosswordLayout` itself gates its own `showComments` Section, just with
 * a fixed value instead of a derived one.
 */

const puzzleGroupLabels: Record<PuzzleConfig['puzzleGroup'], string> = {
	'logic-puzzles': 'Logic puzzles',
	'word-games': 'Word games',
};

/**
 * The puzzle *family* name (e.g. "Sudoku" for every sudoku variant), used
 * as the `ArticleTitle`/`SeriesSectionLink` "series" kicker - the same
 * design pattern the real crossword page already uses for its own series
 * tag (e.g. "Quick"), stacked above the section link (`puzzleGroupLabels`
 * above, e.g. "Logic puzzles"). Neither `FEPuzzlePageType` nor
 * `PuzzleConfig` carries a dedicated "family name" field distinct from the
 * per-variant `instance.title`/SEO `title` template, so this is a small,
 * explicit, hardcoded map instead, mirroring `puzzleGroupLabels`.
 */
const puzzleFamilyNames: Record<string, string> = {
	'sudoku-easy': 'Sudoku',
	'sudoku-medium': 'Sudoku',
	'sudoku-hard': 'Sudoku',
	'sudoku-killer': 'Sudoku',
	'word-wheel': 'Word wheel',
	wordiply: 'Wordiply',
};

/**
 * The headline (`<h1>`) text for each puzzle, per explicit design
 * direction: e.g. "Easy sudoku", not `instance.title`'s "Sudoku (easy)".
 * This intentionally matches the word order already used in each entry's
 * SEO `title` template in `puzzleConfigs.ts` (e.g. `"Easy sudoku {date} -
 * logic puzzle | The Guardian"`) - just the plain noun phrase, without the
 * date/suffix - rather than introducing a second, differently-worded copy
 * source. Falls back to `instance.title` (the value `frontend` actually
 * sends) for any slug not in this map, so an unrecognised/future slug
 * still renders something instead of `undefined`.
 */
const puzzleHeadlineNames: Record<string, string> = {
	'sudoku-easy': 'Easy sudoku',
	'sudoku-medium': 'Medium sudoku',
	'sudoku-hard': 'Hard sudoku',
	'sudoku-killer': 'Killer sudoku',
	'word-wheel': 'Word wheel',
	wordiply: 'Wordiply',
};

/**
 * Puzzle Page has no real equivalent of `ArticleDeprecated.guardianBaseURL`
 * (see `docs/puzzle-page.md`'s contract table - it isn't part of
 * `FEPuzzlePageType`). `ArticleTitle` only uses it to build the tag/section
 * link's absolute href, so the real, stable production base URL is
 * hardcoded here rather than leaving it blank.
 */
const GUARDIAN_BASE_URL = 'https://www.theguardian.com';

/**
 * A hardcoded replica of the real crossword page's header sub-nav row
 * (`Masthead`/`Titlepiece/SubNav.tsx`, fed by `NAV.subNavSections` there -
 * e.g. "Crosswords / Blog / Quick / Sunday quick / ..."), per explicit
 * design direction: the same visual row/pattern, but with Puzzles & Games'
 * own top-level categories instead of Crosswords' own series list.
 *
 * `NAV.subNavSections` (as sent by `frontend`) reflects generic,
 * page-specific navigation `frontend` resolves for its own pages; Puzzle
 * Page requests don't carry a meaningful equivalent of the crossword
 * page's series sub-nav, so this is a fixed, design-provided list instead
 * of anything derived from `NAV`/`FEPuzzlePageType`.
 *
 * "Word games"/"Logic puzzles"/"Trivia & quizzes" link to their hub
 * sub-section paths; per `docs/puzzle-page.md`, those landing pages don't
 * exist yet (they're V1/V2 work) and "Trivia & quizzes" has no puzzles in
 * the current V0 registry at all - these links are included now on
 * explicit design direction, and are expected to 404 until that work
 * ships, exactly like this layout's other pre-existing "not built yet"
 * placeholder links (e.g. the archive-redirect targets documented
 * elsewhere in `docs/puzzle-page.md`).
 */
const PUZZLES_SUBNAV_PARENT: LinkType = {
	title: 'Puzzles & games',
	longTitle: 'Puzzles & games',
	url: '/puzzles-and-games',
};

const PUZZLES_SUBNAV_LINKS: LinkType[] = [
	{ title: 'Crosswords', longTitle: 'Crosswords', url: '/crosswords' },
	{
		title: 'Word games',
		longTitle: 'Word games',
		url: '/puzzles-and-games/word-games',
	},
	{
		title: 'Logic puzzles',
		longTitle: 'Logic puzzles',
		url: '/puzzles-and-games/logic-puzzles',
	},
	{
		title: 'Trivia & quizzes',
		longTitle: 'Trivia & quizzes',
		url: '/puzzles-and-games/trivia-and-quizzes',
	},
];

const PUZZLES_SUBNAV: SubNavType = {
	parent: PUZZLES_SUBNAV_PARENT,
	links: PUZZLES_SUBNAV_LINKS,
};

/**
 * `ArticleHeadline`'s "This article is more than X (days/months/years)
 * old" age warning (`getAgeWarning`, `src/lib/age-warning.ts`) is meant for
 * genuinely stale news content; it doesn't make sense for Puzzle Page,
 * whose "publication date" isn't a real one at all (`instance.puzzleDate`
 * is *which day's puzzle to show*, formatted for display, not when the
 * page itself was published). `getAgeWarning` already special-cases
 * exactly this situation for the closest existing content type,
 * crosswords, by excluding any content tagged `type/crossword` - reused
 * here verbatim, passed only to `ArticleHeadline` (the only place that
 * warning is computed), rather than modifying that shared, generic
 * article-domain logic.
 */
const AGE_WARNING_SUPPRESSION_TAGS: TagType[] = [
	{ id: 'type/crossword', type: 'type', title: 'Crosswords' },
];

/**
 * `ArticleTitle`/`ArticleHeadline`/`ArticleMeta`/`SubMeta`/`DiscussionLayout`/
 * `StickyBottomBanner` only need an `ArticleFormat` to branch a handful of
 * style/behaviour decisions (e.g. LiveBlog-specific spacing, headline
 * weight). Puzzle pages have no equivalent concept, so a minimal, fixed
 * format value is used to satisfy those prop contracts without fabricating
 * article-specific data (tags, branding, etc.).
 *
 * `design: ArticleDesign.Crossword` is deliberately reused (not
 * `Standard`): `ArticleContainer`'s width switch already special-cases
 * `Crossword` as "the player manages its own width" (no fixed `620px`
 * desktop max-width) - exactly the behaviour `PuzzleIframe`'s own
 * `width: 100%` styling needs too, so this reuses that existing,
 * documented case rather than inventing a new one.
 *
 * `theme: Pillar.Lifestyle` matches the real crossword page (Crosswords
 * sits under the Lifestyle pillar/section) - this is what makes
 * `pillarPalette`-driven colours (the share button, print button border,
 * etc, see `paletteDeclarations.ts`) resolve to the pink/purple
 * "lifestyle 400" the design expects, not `Pillar.News`'s red.
 *
 * **Exported** so `PuzzlePage.tsx` can pass this exact same value to
 * `rootStyles()` for its page-wide `<Global>` styles. `themePalette()`
 * (`src/palette.ts`) only ever emits a `var(--some-colour)` reference; the
 * actual colour each CSS custom property resolves to is computed once,
 * globally, by `rootStyles()`/`paletteDeclarations()` from whichever
 * `ArticleFormat` `PuzzlePage.tsx` gives it - a separate, independent
 * format value from this one. Before this was exported and reused, that
 * `<Global>` format had its own, unsynchronised copy hardcoded to
 * `Pillar.News`, which silently overrode every colour decision made here
 * with red instead of Lifestyle pink, regardless of what `puzzlePageFormat`
 * itself said.
 */
export const puzzlePageFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Crossword,
	theme: Pillar.Lifestyle,
} as const;

/**
 * Identical to `CrosswordLayout.tsx`'s own `CrosswordGrid`: the same grid
 * areas (including `instructions`, which Puzzle Page never populates, see
 * the `instructions` `GridItem` below), the same breakpoints, the same
 * print stylesheet.
 */
const PuzzleGrid = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: grid;
			width: 100%;
			margin-left: 0;
			grid-column-gap: 0px;
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas:
				'title'
				'headline'
				'standfirst'
				'meta'
				'instructions'
				'body';

			${from.leftCol} {
				grid-column-gap: 20px;
				grid-template-columns: 140px 1fr;
				grid-template-areas:
					'title  headline    '
					'meta   standfirst  '
					'meta   instructions'
					'body   body        ';
			}

			${from.wide} {
				grid-template-columns: 220px 1fr 300px;
				grid-template-areas:
					'title  headline      .'
					'meta   standfirst    .'
					'meta   instructions  .'
					'body   body          right-column';
			}

			@media print {
				grid-template-columns: 1fr;
				grid-template-areas:
					'title'
					'headline'
					'standfirst'
					'meta'
					'instructions'
					'body';
			}
		`}
	>
		{children}
	</div>
);

const maxWidth = css`
	${from.desktop} {
		max-width: 620px;
	}
`;

const frameContainerStyles = css`
	margin-top: 16px;
	margin-bottom: 16px;
`;

const stretchLines = css`
	${from.leftCol} {
		margin-left: 0;
	}
`;

const printButtonStyles = css`
	background: none;
	border: 1px solid currentColor;
	border-radius: 100px;
	padding: 4px 12px;
	margin: ${remSpace[2]}px 0;
	cursor: pointer;
	font-size: inherit;
	color: inherit;

	@media print {
		display: none;
	}
`;

/**
 * Occupies the exact same `standfirst`-area slot `CrosswordLinks`' "PDF
 * version" link uses in `CrosswordLayout`, but a plain print button
 * instead: iframe-based puzzles have no `crossword.pdf` concept, but
 * `PuzzleConfig.printEnabled` (Sudoku only, per explicit product decision -
 * PR #16700 review, see `puzzleConfigs.ts`) is the real Puzzle Page
 * equivalent of "give the reader an offline/printable copy".
 */
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
`;

const relatedRailHeading = css`
	font-weight: 700;
`;

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

/**
 * The `/PuzzlePage` handler resolves and validates the `PuzzleConfig` for
 * the request's `slug` before rendering; it is passed alongside the raw
 * payload rather than re-derived here so `PuzzlePageLayout` has a single,
 * already-narrowed source of truth for rendering decisions.
 */
export type ResolvedPuzzlePage = FEPuzzlePageType & {
	puzzleConfig: PuzzleConfig;
};

interface Props {
	puzzlePage: ResolvedPuzzlePage;
	NAV: NavType;
	darkModeAvailable: boolean;
}

export const PuzzlePageLayout = ({
	puzzlePage,
	NAV,
	darkModeAvailable,
}: Props) => {
	const { config, instance, editionId, puzzleConfig } = puzzlePage;
	const { isPaidContent, host, hasSurveyAd } = config;

	// Puzzle Page instances have no comments/discussion concept at all:
	// `FEPuzzlePageType` carries no `isCommentable` flag or per-instance
	// discussion identifiers (see docs/puzzle-page.md's contract table).
	// Hardcoded permanently off, mirroring exactly how `CrosswordLayout`
	// gates its own (there, real) `showComments` Section, just with a
	// fixed value instead of a derived one.
	const showComments = false;

	// The "More from Puzzles & Games" rail is a v1-scoped feature (per the
	// Puzzles & Games rollout plan - see abTests.ts's puzzles-new-hub-v1
	// JSDoc), not a v0 one - so it must not render just because
	// instance.moreFromPuzzlesAndGames happens to be non-empty.
	const showRelated =
		!!instance.moreFromPuzzlesAndGames?.length &&
		isPuzzlesHubV1Enabled(config);

	// `canRenderAds`/`ArticleDeprecated.isAdFreeUser` have no Puzzle Page
	// equivalent (`FEPuzzlePageType` models no ad-free-user concept at
	// all), so ads are hardcoded on, matching every current Puzzle Page
	// instance's real behaviour.
	const renderAds = true;

	// `getContributionsServiceUrl` reads `config.contributionsServiceUrl`,
	// a field `ConfigType` doesn't carry for Puzzle Page requests. Hardcoded
	// to the empty string, same as this layout's previous implementation.
	const contributionsServiceUrl = '';

	const labelText = puzzleGroupLabels[puzzleConfig.puzzleGroup];
	const displayDate = formatPuzzleDate(instance.puzzleDate);
	const puzzleFamilyName =
		puzzleFamilyNames[puzzleConfig.slug] ?? instance.title;
	const puzzleHeadlineText =
		puzzleHeadlineNames[puzzleConfig.slug] ?? instance.title;
	/**
	 * A single synthetic "Series"-type tag, existing purely to trigger
	 * `SeriesSectionLink`'s already-existing "series name stacked above
	 * section link" pattern (`if (tag) { ... }`, `hasSeriesTag` etc in
	 * `SeriesSectionLink.tsx`) - the exact same two-tier kicker the real
	 * crossword page gets from its own `Series`-type tags (e.g. "Quick"
	 * stacked above "Crosswords"). `FEPuzzlePageType` has no real tag
	 * data at all, so this is fabricated purely to reuse that existing
	 * rendering branch rather than duplicating its markup/styles here.
	 */
	const puzzleFamilyTag: TagType[] = [
		{
			id: `puzzles-and-games/${puzzleConfig.puzzleGroup}/${puzzleConfig.slug}`,
			type: 'Series',
			title: puzzleFamilyName,
		},
	];

	/**
	 * `NAV` (`extractNAV(puzzlePage.nav)`) carries whatever generic
	 * navigation `frontend` resolved for this request; its
	 * `subNavSections` has no real Puzzle Page equivalent (see
	 * `PUZZLES_SUBNAV`'s doc comment above). `Masthead`/`Titlepiece`
	 * (header) and the footer's own `SubNav.island` both read
	 * `subNavSections`/`currentNavLink` straight off the `NavType` they're
	 * given, so this single override is reused for both, rather than
	 * duplicating the hardcoded sub-nav in two places.
	 */
	const puzzleNAV: NavType = {
		...NAV,
		subNavSections: PUZZLES_SUBNAV,
		currentNavLink: labelText,
	};

	return (
		<>
			<div data-print-layout="hide">
				{renderAds && (
					<Stuck>
						<div data-print-layout="hide">
							<Section
								fullWidth={true}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								shouldCenter={false}
							>
								<HeaderAdSlot
									includeMobile={shouldShowMobileAboveNavSlot(
										config.serverSideABTests[
											'commercial-mobile-above-nav-test'
										],
									)}
								/>
							</Section>
						</div>
					</Stuck>
				)}

				<Masthead
					nav={puzzleNAV}
					editionId={editionId}
					idUrl={config.idUrl}
					mmaUrl={config.mmaUrl}
					discussionApiUrl={config.discussionApiUrl}
					idApiUrl={config.idApiUrl}
					contributionsServiceUrl={contributionsServiceUrl}
					// `puzzlePageFormat.theme` is always `Pillar.News`
					// (never `ArticleSpecial.Labs`), so `CrosswordLayout`'s
					// derived `format.theme !== ArticleSpecial.Labs` check
					// always evaluates `true` here - hardcoded directly
					// rather than keeping a comparison TypeScript can prove
					// is always true.
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

			{renderAds && hasSurveyAd && (
				<AdSlot position="survey" display={puzzlePageFormat.display} />
			)}

			<main data-layout="PuzzlePageLayout">
				<Section
					fullWidth={true}
					showTopBorder={false}
					backgroundColour={themePalette('--article-background')}
					borderColour={themePalette('--article-border')}
					element="article"
				>
					<div>
						<PuzzleGrid>
							<GridItem area="title" element="aside">
								<div data-print-layout="hide">
									<ArticleTitle
										format={puzzlePageFormat}
										tags={puzzleFamilyTag}
										sectionLabel={labelText}
										sectionUrl={`puzzles-and-games/${puzzleConfig.puzzleGroup}`}
										guardianBaseURL={GUARDIAN_BASE_URL}
									/>
								</div>
							</GridItem>
							<GridItem area="headline">
								<div css={maxWidth}>
									<ArticleHeadline
										format={puzzlePageFormat}
										headlineString={puzzleHeadlineText}
										tags={AGE_WARNING_SUPPRESSION_TAGS}
										webPublicationDateDeprecated={
											displayDate ?? ''
										}
									/>
								</div>
							</GridItem>
							<GridItem area="standfirst">
								<div data-print-layout="hide">
									<Hide until="leftCol">
										<DecideLines
											format={puzzlePageFormat}
											color={themePalette(
												'--article-meta-lines',
											)}
										/>
									</Hide>
									<Hide from="desktop">
										<Standfirst
											format={puzzlePageFormat}
											standfirst={
												'<a href="https://app.adjust.com/16xt6hai" data-link-name="crossword-mobile-link">Download the Guardian app</a> for a better puzzles experience'
											}
										/>
									</Hide>
									{/*
									 * `CrosswordLinks`' one job is a
									 * `crossword.pdf` "PDF version" link -
									 * a crossword-only concept with no
									 * Puzzle Page equivalent
									 * (`FEPuzzlePageType` has no `crossword`
									 * field at all). It occupies this same
									 * grid slot, but with the real Puzzle
									 * Page equivalent instead: a print
									 * button, gated on
									 * `puzzleConfig.printEnabled` (Sudoku
									 * only, see `PrintButton`'s doc
									 * comment).
									 */}
									{puzzleConfig.printEnabled && (
										<PrintButton />
									)}
								</div>
							</GridItem>
							<GridItem area="meta" element="aside">
								<div css={maxWidth}>
									<div
										data-print-layout="hide"
										css={stretchLines}
									>
										<DecideLines
											format={puzzlePageFormat}
											color={themePalette(
												'--article-meta-lines',
											)}
										/>
									</div>
									<ArticleMeta
										format={puzzlePageFormat}
										pageId={puzzlePage.id}
										webTitle={puzzlePage.webTitle}
										tags={[]}
										primaryDateline={displayDate ?? ''}
										secondaryDateline=""
										isCommentable={showComments}
										discussionApiUrl={
											config.discussionApiUrl
										}
										shortUrlId={config.shortUrlId}
									/>
								</div>
							</GridItem>
							{/*
							 * `instructions` (crossword-specific setter
							 * instructions, e.g. Prize/Genius puzzles) has
							 * no Puzzle Page equivalent - `FEPuzzlePageType`
							 * carries no such field, so this `GridItem` is
							 * never rendered, hardcoded off exactly like
							 * `CrosswordLayout`'s own
							 * `!!article.crossword?.instructions` gate,
							 * just with a fixed `false` instead of a
							 * derived one.
							 */}
							<GridItem area="body" element="article">
								<div css={frameContainerStyles}>
									<ArticleContainer format={puzzlePageFormat}>
										<Island
											priority="critical"
											defer={{ until: 'visible' }}
										>
											<PuzzleIframe
												puzzleConfig={puzzleConfig}
												title={instance.title}
												darkModeAvailable={
													darkModeAvailable
												}
												puzzleDate={
													instance.puzzleDate ?? null
												}
											/>
										</Island>
									</ArticleContainer>
								</div>
							</GridItem>
							<GridItem area="right-column">
								<RightColumn showFrom="wide">
									<div
										css={css`
											margin-top: ${remSpace[3]};
										`}
									>
										{renderAds ? (
											<AdSlot
												position="right"
												display={
													puzzlePageFormat.display
												}
												isPaidContent={isPaidContent}
												shouldHideReaderRevenue={
													config.shouldHideReaderRevenue
												}
											/>
										) : null}
									</div>
								</RightColumn>
							</GridItem>
						</PuzzleGrid>
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
						count={1}
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
					showTopBorder={false}
					backgroundColour={themePalette('--article-background')}
				>
					<SubMeta
						format={puzzlePageFormat}
						subMetaKeywordLinks={[]}
						subMetaSectionLinks={[]}
						pageId={puzzlePage.id}
						webUrl={puzzlePage.canonicalUrl}
						webTitle={puzzlePage.webTitle}
						showBottomSocialButtons={true}
					/>
				</Section>
				{renderAds && (
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
							display={puzzlePageFormat.display}
						/>
					</Section>
				)}

				{showComments && (
					<Section
						fullWidth={true}
						sectionId="comments"
						element="section"
						backgroundColour={themePalette(
							'--discussion-section-background',
						)}
						borderColour={themePalette('--article-border')}
						fontColour={themePalette('--discussion-text')}
						hideFromPrintLayout={true}
					>
						<DiscussionLayout
							discussionApiUrl={config.discussionApiUrl}
							shortUrlId={config.shortUrlId}
							format={puzzlePageFormat}
							discussionD2Uid={config.discussionD2Uid}
							discussionApiClientHeader={
								config.discussionApiClientHeader
							}
							enableDiscussionSwitch={
								!!config.switches.enableDiscussionSwitch
							}
							isAdFreeUser={false}
							shouldHideAds={false}
							idApiUrl={config.idApiUrl}
						/>
					</Section>
				)}

				{renderAds && (
					<Section
						fullWidth={true}
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={themePalette('--ad-background')}
						element="aside"
					>
						<AdSlot
							position="merchandising"
							display={puzzlePageFormat.display}
						/>
					</Section>
				)}
			</main>

			{/*
			 * `CrosswordLayout` also renders `NAV.subNavSections` again
			 * here, just above its footer, via `SubNav.island` - a second,
			 * scrollable copy of the same sub-nav row already shown in the
			 * header (`Masthead`/`Titlepiece`). Per explicit product
			 * feedback, that duplicate footer row doesn't make sense for
			 * Puzzle Page's hardcoded `PUZZLES_SUBNAV` (see its doc
			 * comment above): the header copy is enough, so this second
			 * rendering is intentionally omitted here rather than blindly
			 * replicating every `CrosswordLayout` slot.
			 */}

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

			<BannerWrapper data-print-layout="hide">
				<Island priority="feature" defer={{ until: 'idle' }}>
					<StickyBottomBanner
						contentType="Game"
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={config.idApiUrl}
						// Puzzle Page has no minute-article concept -
						// `FEPuzzlePageType` carries no `pageType` field at
						// all, so this is hardcoded off.
						isMinuteArticle={false}
						isPaidContent={!!isPaidContent}
						isPreview={!!config.isPreview}
						isSensitive={config.isSensitive}
						pageId={puzzlePage.id}
						sectionId={config.section}
						shouldHideReaderRevenue={
							!!config.shouldHideReaderRevenue
						}
						remoteBannerSwitch={!!config.switches.remoteBanner}
						// Puzzle Page instances carry no `tags` at all
						// (`FEPuzzlePageType` has no `tags` field), so this
						// is hardcoded to an empty array.
						tags={[]}
						host={host}
					/>
				</Island>
			</BannerWrapper>
			{renderAds && <MobileStickyContainer data-print-layout="hide" />}
		</>
	);
};
