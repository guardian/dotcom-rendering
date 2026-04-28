import { css } from '@emotion/react';
import {
	from,
	headlineBold17,
	headlineBold20,
	palette as sourcePalette,
	space,
	textSans12,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import type { EditionId } from '../lib/edition';
import type {
	RecipeBlockElement,
	RecipeServing,
	RecipeTiming,
} from '../types/content';

// ─── Feast brand palette (shared with FeastContextualNudge) ───────────────────

const FEAST_BG = '#f7efe9';
const FEAST_BG_DARK = '#1a1a0a';
const FEAST_TEXT_DARK = sourcePalette.neutral[93];
const FEAST_GREEN = '#68773c';
const FEAST_GREEN_HOVER = '#4d5c2b';
const FEAST_BORDER = 'rgba(104, 119, 60, 0.3)';
const FEAST_BORDER_DARK = 'rgba(104, 119, 60, 0.5)';

// ─── Deep link builder (identical to FeastContextualNudge) ───────────────────

const buildFeastDeepLink = (id: string): string => `feast://recipes/${id}`;

const buildAppLink = (
	pageId: string,
	campaign: string,
	feastId?: string,
): string => {
	const params = new URLSearchParams({
		utm_medium: 'ACQUISITIONS_NUDGE',
		utm_campaign: campaign,
		utm_content: pageId,
		utm_source: 'GUARDIAN_WEB',
		...(feastId ? { deep_link_value: buildFeastDeepLink(feastId) } : {}),
	});
	return `https://guardian-feast.go.link/p0nQT?${params.toString()}`;
};

// ─── Styles ───────────────────────────────────────────────────────────────────

/**
 * The card itself is hidden on all viewports narrower than `wide`.
 * At `wide` it becomes `position: sticky` so it tracks the viewport top
 * while the reader scrolls through the recipe section.
 *
 * The sticky effect only applies while the parent `position: relative`
 * section container (set up in ArticleRenderer) is on screen — as soon as
 * the section scrolls away, the card disappears, exactly like ProductCardLeftCol.
 */
const cardStyles = css`
	display: none;

	${from.wide} {
		display: block;
		position: sticky;
		top: ${space[3]}px;
		width: 220px;
		background-color: ${FEAST_BG};
		border-top: 2px solid ${FEAST_GREEN};
		overflow: hidden;
	}

	/* Storybook colour-scheme overrides — light before dark so dark wins */
	[data-color-scheme='light'] & {
		background-color: ${FEAST_BG};
	}
	[data-color-scheme='dark'] & {
		background-color: ${FEAST_BG_DARK};
		border-top-color: ${FEAST_GREEN};
	}
`;

const cardDarkMedia = css`
	${from.wide} {
		@media (prefers-color-scheme: dark) {
			background-color: ${FEAST_BG_DARK};
		}
	}
`;

const featuredImageStyles = css`
	width: 100%;
	height: 150px;
	object-fit: cover;
	display: block;
`;

const cardBodyStyles = css`
	padding: ${space[3]}px;
`;

const logoRowStyles = css`
	display: flex;
	align-items: center;
	gap: ${space[2]}px;
	margin-bottom: ${space[3]}px;
`;

const logoIconStyles = css`
	flex-shrink: 0;
	width: 32px;
	height: 32px;
	background-color: ${FEAST_GREEN};
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const appLabelStyles = css`
	${textSans12};
	color: ${FEAST_GREEN};
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.06em;
`;

const dividerStyles = css`
	border: none;
	border-top: 1px solid ${FEAST_BORDER};
	margin: 0 0 ${space[2]}px;

	[data-color-scheme='dark'] & {
		border-top-color: ${FEAST_BORDER_DARK};
	}
`;

const dividerDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		border-top-color: ${FEAST_BORDER_DARK};
	}
`;

const recipeNameStyles = css`
	${headlineBold17};
	${from.wide} {
		${headlineBold20};
	}
	color: ${sourcePalette.neutral[0]};
	margin: 0 0 ${space[3]}px;

	[data-color-scheme='light'] & {
		color: ${sourcePalette.neutral[0]};
	}
	[data-color-scheme='dark'] & {
		color: ${FEAST_TEXT_DARK};
	}
`;

const recipeNameDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${FEAST_TEXT_DARK};
	}
`;

const buttonContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
`;

const fullWidthButton = css`
	width: 100%;
	justify-content: center;
`;

const metaRowStyles = css`
	${textSans12};
	color: ${sourcePalette.neutral[20]};
	margin: ${space[1]}px 0;
	display: flex;
	align-items: flex-start;
	gap: 4px;

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const metaLabelStyles = css`
	font-weight: 700;
	flex-shrink: 0;
`;

const chipRowStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
	margin: ${space[2]}px 0;
`;

const chipStyles = css`
	${textSans12};
	background-color: rgba(104, 119, 60, 0.12);
	color: ${FEAST_GREEN};
	border-radius: 2px;
	padding: 2px 6px;
	font-weight: 600;
	text-transform: capitalize;

	[data-color-scheme='dark'] & {
		background-color: rgba(104, 119, 60, 0.25);
	}
`;

const contributorStyles = css`
	${textSans12};
	color: ${sourcePalette.neutral[46]};
	margin: ${space[1]}px 0 ${space[2]}px;

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const appReadyBadgeStyles = css`
	${textSans12};
	display: inline-block;
	border-radius: 2px;
	padding: 2px 6px;
	font-weight: 700;
	margin-bottom: ${space[2]}px;
`;

const appReadyStyles = css`
	background-color: ${FEAST_GREEN};
	color: ${sourcePalette.neutral[100]};
`;

const appNotReadyStyles = css`
	background-color: ${sourcePalette.neutral[60]};
	color: ${sourcePalette.neutral[100]};
`;

/** Source's tertiary/secondary buttons need global-link-styling opted out */
const primaryCtaTheme = {
	backgroundPrimary: FEAST_GREEN,
	backgroundPrimaryHover: FEAST_GREEN_HOVER,
	textPrimary: sourcePalette.neutral[100],
} as const;

const secondaryCtaTheme = {
	textSecondary: FEAST_GREEN,
	borderSecondary: FEAST_GREEN,
	backgroundSecondary: 'transparent',
	backgroundSecondaryHover: 'rgba(104, 119, 60, 0.1)',
} as const;

// ─── Feast "F" mini-logo ──────────────────────────────────────────────────────

const FeastMiniLogo = () => (
	<svg
		aria-hidden="true"
		width="20"
		height="20"
		viewBox="0 0 28 28"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<text
			x="7"
			y="21"
			fontFamily="Georgia, serif"
			fontSize="22"
			fontWeight="bold"
			fill="white"
		>
			F
		</text>
	</svg>
);

// ─── Formatting helpers ──────────────────────────────────────────────────────

const formatTimings = (timings: RecipeTiming[]): string =>
	timings
		.map((t) => t.text ?? '')
		.filter(Boolean)
		.join(' · ');

const formatServes = (serves: RecipeServing[]): string =>
	serves
		.map((s) => s.text ?? '')
		.filter(Boolean)
		.join(', ');

const slugToLabel = (s: string): string =>
	s.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

/**
 * Strip HTML tags from a subheading element's `.html` property so we can
 * render the recipe name as plain text inside the nudge card.
 */
export const stripHtmlTags = (html: string): string =>
	html.replace(/<[^>]+>/g, '').trim();

// ─── Component ────────────────────────────────────────────────────────────────

export type Props = {
	/** Plain-text recipe name fallback, stripped from the SubheadingBlockElement html. */
	recipeName: string;
	/** Full structured recipe data from the RecipeBlockElement, when available. */
	recipe?: RecipeBlockElement;
	/** Article page ID, used for building Feast deep links. */
	pageId: string;
	/** Edition, kept for future per-edition copy variants. */
	editionId: EditionId;
	/**
	 * Whether the page supports dark mode. Controls whether
	 * `@media (prefers-color-scheme: dark)` styles are applied.
	 */
	darkModeAvailable?: boolean;
};

/**
 * Sticky left-column nudge that promotes the Guardian Feast app alongside an
 * individual recipe section.
 *
 * Rendering model — mirrors ProductCardLeftCol / LeftColProductCardContainer:
 *
 *   ┌──────────────────────────────────────────────┐
 *   │  position: relative (section wrapper)         │
 *   │  ┌──────────────────────────────────────────┐ │
 *   │  │ position: absolute; left: -240px;        │ │
 *   │  │ height: 100%    (left-col container)     │ │
 *   │  │  ┌────────────────────────────────────┐  │ │
 *   │  │  │ position: sticky; top: 8px         │  │ │
 *   │  │  │ FeastRecipeNudge ← THIS COMPONENT  │  │ │
 *   │  │  └────────────────────────────────────┘  │ │
 *   │  └──────────────────────────────────────────┘ │
 *   │  (recipe content: ingredients, steps …)        │
 *   └──────────────────────────────────────────────┘
 *
 * On viewports narrower than `wide` the card is `display: none` — the inline
 * FeastContextualNudge handles those screen sizes.
 */
export const FeastRecipeNudge = ({
	recipeName,
	recipe,
	pageId,
	darkModeAvailable = false,
}: Props) => {
	const displayName = recipe?.title ?? recipeName;
	const feastId = recipe?.id;
	const image = recipe?.featuredImage;
	const timings = recipe?.timings ?? [];
	const serves = recipe?.serves ?? [];
	const allTags = [
		...(recipe?.cuisineIds ?? []),
		...(recipe?.mealTypeIds ?? []),
		...(recipe?.suitableForDietIds ?? []),
	];
	const byline = recipe?.byline ?? [];

	return (
		<aside
			aria-label={`Open ${displayName} in the Feast app`}
			css={[cardStyles, darkModeAvailable && cardDarkMedia]}
		>
			{/* Featured image */}
			{image && (
				<img
					src={image.url}
					alt={image.caption}
					css={featuredImageStyles}
				/>
			)}

			<div css={cardBodyStyles}>
				{/* Feast logo + app label */}
				<div css={logoRowStyles}>
					<div css={logoIconStyles} aria-hidden="true">
						<FeastMiniLogo />
					</div>
					<span css={appLabelStyles}>Feast</span>
				</div>

				{/* Recipe name */}
				<p
					css={[
						recipeNameStyles,
						darkModeAvailable && recipeNameDarkMedia,
					]}
				>
					{displayName}
				</p>

				{/* Difficulty */}
				{recipe?.difficultyLevel && (
					<div css={metaRowStyles}>
						<span css={metaLabelStyles}>Difficulty</span>
						{slugToLabel(recipe.difficultyLevel)}
					</div>
				)}

				{/* Timings */}
				{timings.length > 0 && (
					<div css={metaRowStyles}>
						<span css={metaLabelStyles}>Time</span>
						{formatTimings(timings)}
					</div>
				)}

				{/* Serves */}
				{serves.length > 0 && (
					<div css={metaRowStyles}>
						<span css={metaLabelStyles}>Serves</span>
						{formatServes(serves)}
					</div>
				)}

				{/* Tags: cuisine, meal type, dietary */}
				{allTags.length > 0 && (
					<div css={chipRowStyles}>
						{allTags.map((tag) => (
							<span key={tag} css={chipStyles}>
								{slugToLabel(tag)}
							</span>
						))}
					</div>
				)}

				{/* Contributor */}
				{byline.length > 0 && (
					<p css={contributorStyles}>By {byline.join(', ')}</p>
				)}

				{/* Feast app-ready badge */}
				{recipe && (
					<span
						css={[
							appReadyBadgeStyles,
							recipe.isAppReady
								? appReadyStyles
								: appNotReadyStyles,
						]}
					>
						{recipe.isAppReady
							? '✓ Live in Feast'
							: '○ Not in Feast'}
					</span>
				)}

				<hr
					css={[dividerStyles, darkModeAvailable && dividerDarkMedia]}
				/>

				{/* CTAs */}
				<div css={buttonContainerStyles}>
					{/* Direct deep-link — only when the recipe is live in Feast */}
					{recipe?.isAppReady && feastId && (
						<LinkButton
							priority="primary"
							size="small"
							href={buildFeastDeepLink(feastId)}
							theme={primaryCtaTheme}
							data-ignore="global-link-styling"
							cssOverrides={fullWidthButton}
						>
							Open in Feast
						</LinkButton>
					)}
					<LinkButton
						priority={recipe?.isAppReady ? 'secondary' : 'primary'}
						size="small"
						href={buildAppLink(
							pageId,
							'FeastRecipeNudge_CookMode',
							feastId,
						)}
						theme={
							recipe?.isAppReady
								? secondaryCtaTheme
								: primaryCtaTheme
						}
						data-ignore="global-link-styling"
						cssOverrides={fullWidthButton}
					>
						Open in Cook Mode
					</LinkButton>
					<LinkButton
						priority="secondary"
						size="small"
						href={buildAppLink(
							pageId,
							'FeastRecipeNudge_Save',
							feastId,
						)}
						theme={secondaryCtaTheme}
						data-ignore="global-link-styling"
						cssOverrides={css`
							${fullWidthButton};
							background-color: transparent;
						`}
					>
						Save to My Feast
					</LinkButton>
				</div>
			</div>
		</aside>
	);
};

// ─── Subheading section wrapper styles (used in ArticleRenderer) ──────────────

/**
 * Gives the recipe section `position: relative` so the absolutely-positioned
 * left-col container can anchor itself to the section boundaries.
 */
export const recipeContentContainerStyles = css`
	position: relative;
`;

/**
 * Positions the sticky nudge in the 220px left-column gutter that exists at
 * `from.wide` in StandardLayout (219px col + 1px border + 10px gap = 230px
 * before the article body starts; -240px gives a 10px breathing gap).
 */
export const recipeLeftColContainerStyles = css`
	display: none;

	${from.wide} {
		position: absolute;
		left: -240px;
		height: 100%;
		display: block;
		width: 220px;
	}
`;

// Re-export the label text for stories / testing
export const OPEN_IN_COOK_MODE = 'Open in Cook Mode';
export const SAVE_TO_MY_FEAST = 'Save to My Feast';
