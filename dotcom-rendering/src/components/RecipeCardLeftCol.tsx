import { css } from '@emotion/react';
import {
	from,
	headlineMedium17,
	palette as sourcePalette,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import type { RecipeBlockElement } from '../types/content';

// ── Feast brand colours ───────────────────────────────────────────────────────

const FEAST_BG = '#f7efe9';
const FEAST_BG_DARK = '#1a1a0a';
const FEAST_GREEN = '#68773c';
const FEAST_GREEN_HOVER = '#4d5c2b';
const FEAST_BORDER = 'rgba(104, 119, 60, 0.3)';

// ── Deep-link helpers ─────────────────────────────────────────────────────────

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

// ── Utility helpers ───────────────────────────────────────────────────────────

/**
 * Strip HTML tags from a SubheadingBlockElement's `.html` property so we can
 * use the recipe name as plain text inside the card.
 */
export const stripHtmlTags = (html: string): string =>
	html.replace(/<[^>]+>/g, '').trim();

const slugToLabel = (s: string): string =>
	s.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

const formatMeta = (recipe?: RecipeBlockElement): string => {
	const parts: string[] = [];
	if (recipe?.difficultyLevel)
		parts.push(slugToLabel(recipe.difficultyLevel));
	const timing = recipe?.timings?.[0]?.text;
	if (timing) parts.push(timing);
	const serving = recipe?.serves?.[0]?.text;
	if (serving) parts.push(`Serves ${serving}`);
	return parts.join(' · ');
};

// ── Button themes ─────────────────────────────────────────────────────────────

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

// ── Styles — mirrors ProductCardLeftCol ───────────────────────────────────────

const card = css`
	display: none;
	${from.wide} {
		top: ${space[3]}px;
		position: sticky;
		display: block;
		width: 220px;
		border-top: 2px solid ${FEAST_GREEN};
		background-color: ${FEAST_BG};
	}
	img {
		height: 220px;
		width: 220px;
		object-fit: cover;
		display: block;
	}
	strong {
		font-weight: 700;
	}
`;

const cardDarkMedia = css`
	${from.wide} {
		@media (prefers-color-scheme: dark) {
			background-color: ${FEAST_BG_DARK};
		}
	}
`;

const productInfoContainer = css`
	display: grid;
	row-gap: ${space[1]}px;
	padding: ${space[1]}px 0 ${space[2]}px 0;
`;

const brandNameFont = css`
	${headlineMedium17};
	color: ${sourcePalette.neutral[0]};

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[93]};
	}
`;

const brandNameDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${sourcePalette.neutral[93]};
	}
`;

const productNameFont = css`
	${textSans17};
	color: ${sourcePalette.neutral[46]};

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const productNameDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${sourcePalette.neutral[60]};
	}
`;

const buttonContainer = css`
	padding-bottom: ${space[6]}px;
	min-width: 100%;
	display: grid;
	row-gap: ${space[3]}px;
`;

const fullWidthButton = css`
	width: 100%;
	justify-content: center;
`;

const customAttributesContainer = css`
	border-top: 1px solid ${FEAST_BORDER};
	padding-top: ${space[2]}px;
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
`;

const tagStyles = css`
	${textSans15};
	background-color: rgba(104, 119, 60, 0.12);
	color: ${FEAST_GREEN};
	border-radius: 2px;
	padding: 2px 6px;
	text-transform: capitalize;

	[data-color-scheme='dark'] & {
		background-color: rgba(104, 119, 60, 0.25);
	}
`;

// ── Layout styles exported to ArticleRenderer ─────────────────────────────────

/**
 * Gives the recipe section `position: relative` so the absolutely-positioned
 * left-col container can anchor itself to the section boundaries.
 */
export const recipeContentContainerStyles = css`
	position: relative;
`;

/**
 * Positions the sticky card in the 220px left-column gutter that exists at
 * `from.wide` in StandardLayout.
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

// ── Props ─────────────────────────────────────────────────────────────────────

type RecipeCardLeftColProps = {
	recipe?: RecipeBlockElement;
	recipeName: string;
	pageId: string;
	darkModeAvailable?: boolean;
};

// ── Component — mirrors ProductCardLeftCol ────────────────────────────────────

export const RecipeCardLeftCol = ({
	recipe,
	recipeName,
	pageId,
	darkModeAvailable = false,
}: RecipeCardLeftColProps) => {
	const title = recipe?.title ?? recipeName;
	const byline = recipe?.byline ?? [];
	const meta = formatMeta(recipe);
	const feastId = recipe?.id;
	const image = recipe?.featuredImage;
	const tags = [
		...(recipe?.cuisineIds ?? []),
		...(recipe?.mealTypeIds ?? []),
		...(recipe?.suitableForDietIds ?? []),
	];

	return (
		<div
			data-component="recipe-card-left-col"
			css={[card, darkModeAvailable && cardDarkMedia]}
		>
			{image && <img src={image.url} alt={image.caption ?? title} />}
			<div css={productInfoContainer}>
				<div
					css={[
						brandNameFont,
						darkModeAvailable && brandNameDarkMedia,
					]}
				>
					{title}
				</div>
				{byline.length > 0 && (
					<div
						css={[
							productNameFont,
							darkModeAvailable && productNameDarkMedia,
						]}
					>
						By {byline.join(', ')}
					</div>
				)}
				{meta && (
					<div
						css={[
							productNameFont,
							darkModeAvailable && productNameDarkMedia,
						]}
					>
						{meta}
					</div>
				)}
			</div>
			<div css={buttonContainer}>
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
					href={buildAppLink(pageId, 'RecipeNudge_CookMode', feastId)}
					theme={
						recipe?.isAppReady ? secondaryCtaTheme : primaryCtaTheme
					}
					data-ignore="global-link-styling"
					cssOverrides={fullWidthButton}
				>
					Open in Cook Mode
				</LinkButton>
				<LinkButton
					priority="secondary"
					size="small"
					href={buildAppLink(pageId, 'RecipeNudge_Save', feastId)}
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
			{tags.length > 0 && (
				<div css={customAttributesContainer}>
					{tags.map((tag) => (
						<span key={tag} css={tagStyles}>
							{slugToLabel(tag)}
						</span>
					))}
				</div>
			)}
		</div>
	);
};
