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

// ─── Feast brand palette (shared with FeastContextualNudge) ───────────────────

const FEAST_BG = '#f7efe9';
const FEAST_BG_DARK = '#1a1a0a';
const FEAST_TEXT_DARK = sourcePalette.neutral[93];
const FEAST_GREEN = '#68773c';
const FEAST_GREEN_HOVER = '#4d5c2b';
const FEAST_BORDER = 'rgba(104, 119, 60, 0.3)';
const FEAST_BORDER_DARK = 'rgba(104, 119, 60, 0.5)';

// ─── Deep link builder (identical to FeastContextualNudge) ───────────────────

const buildAppLink = (pageId: string, campaign: string): string => {
	const params = new URLSearchParams({
		utm_medium: 'ACQUISITIONS_NUDGE',
		utm_campaign: campaign,
		utm_content: pageId,
		utm_source: 'GUARDIAN_WEB',
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
		padding: ${space[3]}px;
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

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Strip HTML tags from a subheading element's `.html` property so we can
 * render the recipe name as plain text inside the nudge card.
 */
export const stripHtmlTags = (html: string): string =>
	html.replace(/<[^>]+>/g, '').trim();

// ─── Component ────────────────────────────────────────────────────────────────

export type Props = {
	/** Plain-text recipe name, stripped from the SubheadingBlockElement html. */
	recipeName: string;
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
	pageId,
	darkModeAvailable = false,
}: Props) => (
	<aside
		aria-label={`Open ${recipeName} in the Feast app`}
		css={[cardStyles, darkModeAvailable && cardDarkMedia]}
	>
		{/* Feast logo + app label */}
		<div css={logoRowStyles}>
			<div css={logoIconStyles} aria-hidden="true">
				<FeastMiniLogo />
			</div>
			<span css={appLabelStyles}>Feast</span>
		</div>

		{/* Recipe name */}
		<p css={[recipeNameStyles, darkModeAvailable && recipeNameDarkMedia]}>
			{recipeName}
		</p>

		<hr css={[dividerStyles, darkModeAvailable && dividerDarkMedia]} />

		{/* CTAs */}
		<div css={buttonContainerStyles}>
			<LinkButton
				priority="primary"
				size="small"
				href={buildAppLink(pageId, 'FeastRecipeNudge_CookMode')}
				theme={primaryCtaTheme}
				data-ignore="global-link-styling"
				cssOverrides={fullWidthButton}
			>
				Open in Cook Mode
			</LinkButton>
			<LinkButton
				priority="secondary"
				size="small"
				href={buildAppLink(pageId, 'FeastRecipeNudge_Save')}
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
	</aside>
);

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
