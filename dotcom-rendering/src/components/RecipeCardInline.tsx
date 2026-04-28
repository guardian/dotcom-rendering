import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	headlineMedium24,
	palette as sourcePalette,
	space,
	textSans15,
	textSans17,
	textSans20,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgCross,
} from '@guardian/source/react-components';
import type { RecipeBlockElement } from '../types/content';

// ── Feast brand colours ───────────────────────────────────────────────────────

const FEAST_BG = '#f7efe9';
const FEAST_BG_DARK = '#1a1a0a';
const FEAST_TEXT_DARK = sourcePalette.neutral[93];
const FEAST_SUBTEXT_DARK = sourcePalette.neutral[60];
const FEAST_GREEN = '#68773c';
const FEAST_GREEN_HOVER = '#4d5c2b';
const FEAST_BORDER = 'rgba(104, 119, 60, 0.3)';
const FEAST_BORDER_DARK = 'rgba(104, 119, 60, 0.5)';

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
	borderSecondary: 'transparent',
	backgroundSecondary: 'transparent',
	backgroundSecondaryHover: 'rgba(104, 119, 60, 0.1)',
} as const;

// ── Grid templates — mirror ProductCardInline ─────────────────────────────────

const defaultGrid = css`
	grid-template:
		'image info'
		'buttons buttons'
		'custom-attributes custom-attributes' / 1fr 1fr;
	${from.mobileLandscape} {
		grid-template:
			'image info' auto
			'image buttons' 1fr
			'custom-attributes custom-attributes' / 1fr 1fr;
	}
`;

const noCustomAttributesGrid = css`
	grid-template:
		'image info'
		'buttons buttons' / 1fr 1fr;
	${from.mobileLandscape} {
		grid-template:
			'image info' auto
			'image buttons' 1fr / 1fr 1fr;
	}
`;

// ── Card styles — mirror ProductCardInline ────────────────────────────────────

const baseCard = css`
	padding: ${space[2]}px ${space[3]}px ${space[3]}px;
	display: grid;
	column-gap: 10px;
	row-gap: ${space[4]}px;
	max-width: 100%;
	${from.mobileLandscape} {
		column-gap: 20px;
		row-gap: ${space[2]}px;
	}
`;

const hideFromWide = css`
	${from.wide} {
		display: none;
	}
`;

const showcaseCard = css`
	${baseCard};
	background-color: ${FEAST_BG};
	border-top: 2px solid ${FEAST_GREEN};

	[data-color-scheme='dark'] & {
		background-color: ${FEAST_BG_DARK};
	}
`;

const showcaseCardDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		background-color: ${FEAST_BG_DARK};
	}
`;

// ── Grid area styles — mirror ProductCardInline ───────────────────────────────

const imageGridArea = css`
	grid-area: image;
	img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}
`;

const productInfoContainer = css`
	grid-area: info;
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	${textSans17};

	${from.mobileLandscape} {
		${textSans20};
	}
`;

const primaryHeading = css`
	${headlineMedium20};
	${from.mobileLandscape} {
		${headlineMedium24};
	}
	color: ${sourcePalette.neutral[0]};

	[data-color-scheme='dark'] & {
		color: ${FEAST_TEXT_DARK};
	}
`;

const primaryHeadingDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${FEAST_TEXT_DARK};
	}
`;

const productNameStyle = css`
	${textSans17};
	> strong {
		${textSansBold17};
	}

	${from.mobileLandscape} {
		${textSans20};
		> strong {
			${textSansBold20};
		}
	}
	color: ${sourcePalette.neutral[46]};

	[data-color-scheme='dark'] & {
		color: ${FEAST_SUBTEXT_DARK};
	}
`;

const productNameDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${FEAST_SUBTEXT_DARK};
	}
`;

const buttonWrapper = css`
	grid-area: buttons;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: ${space[1]}px;
`;

const customAttributesContainer = css`
	grid-area: custom-attributes;
	border-top: 1px solid ${FEAST_BORDER};
	padding-top: ${space[2]}px;
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
	margin-top: ${space[2]}px;

	[data-color-scheme='dark'] & {
		border-top-color: ${FEAST_BORDER_DARK};
	}
`;

const customAttributesDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		border-top-color: ${FEAST_BORDER_DARK};
	}
`;

const tagStyles = css`
	${textSans15};
	background-color: rgba(104, 119, 60, 0.12);
	color: ${FEAST_GREEN};
	border-radius: 2px;
	padding: 2px 8px;
	text-transform: capitalize;

	[data-color-scheme='dark'] & {
		background-color: rgba(104, 119, 60, 0.25);
	}
`;

// ── Dismiss button — positioned outside the grid flow ────────────────────────

const cardWrapper = css`
	position: relative;
`;

const dismissWrap = css`
	position: absolute;
	top: ${space[1]}px;
	right: ${space[1]}px;
	z-index: 1;
`;

const dismissButtonStyles = css`
	color: ${sourcePalette.neutral[46]};

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const dismissDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${sourcePalette.neutral[60]};
	}
`;

// ── Props ─────────────────────────────────────────────────────────────────────

type RecipeCardInlineProps = {
	recipe?: RecipeBlockElement;
	recipeName: string;
	pageId: string;
	onDismiss: () => void;
	/**
	 * When true, hides the card at `from.wide` because the sticky left-col card
	 * takes over — mirrors the `shouldShowLeftColCard` behaviour in ProductCardInline.
	 */
	shouldShowLeftColCard?: boolean;
	darkModeAvailable?: boolean;
};

// ── Component — mirrors ProductCardInline ─────────────────────────────────────

export const RecipeCardInline = ({
	recipe,
	recipeName,
	pageId,
	onDismiss,
	shouldShowLeftColCard = false,
	darkModeAvailable = false,
}: RecipeCardInlineProps) => {
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
	const hasTags = tags.length > 0;

	return (
		<div css={cardWrapper}>
			<div
				data-component="recipe-card-inline"
				css={[
					showcaseCard,
					darkModeAvailable && showcaseCardDarkMedia,
					shouldShowLeftColCard && hideFromWide,
					hasTags ? defaultGrid : noCustomAttributesGrid,
				]}
			>
				{image && (
					<div css={imageGridArea}>
						<img src={image.url} alt={image.caption ?? title} />
					</div>
				)}
				<div css={productInfoContainer}>
					{title && (
						<div
							css={[
								primaryHeading,
								darkModeAvailable && primaryHeadingDarkMedia,
							]}
						>
							{title}
						</div>
					)}
					{byline.length > 0 && (
						<div
							css={[
								productNameStyle,
								darkModeAvailable && productNameDarkMedia,
							]}
						>
							By {byline.join(', ')}
						</div>
					)}
					{meta && (
						<div
							css={[
								productNameStyle,
								darkModeAvailable && productNameDarkMedia,
							]}
						>
							{meta}
						</div>
					)}
				</div>
				<div css={buttonWrapper}>
					{recipe?.isAppReady && feastId && (
						<LinkButton
							priority="primary"
							size="small"
							href={buildFeastDeepLink(feastId)}
							theme={primaryCtaTheme}
							data-ignore="global-link-styling"
						>
							Open in Feast
						</LinkButton>
					)}
					<LinkButton
						priority={recipe?.isAppReady ? 'secondary' : 'primary'}
						size="small"
						href={buildAppLink(
							pageId,
							'RecipeNudge_CookMode',
							feastId,
						)}
						theme={
							recipe?.isAppReady
								? secondaryCtaTheme
								: primaryCtaTheme
						}
						data-ignore="global-link-styling"
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
							background-color: transparent;
						`}
					>
						Save to My Feast
					</LinkButton>
				</div>
				{hasTags && (
					<div
						css={[
							customAttributesContainer,
							darkModeAvailable && customAttributesDarkMedia,
						]}
					>
						{tags.map((tag) => (
							<span key={tag} css={tagStyles}>
								{slugToLabel(tag)}
							</span>
						))}
					</div>
				)}
			</div>
			<div css={dismissWrap}>
				<Button
					aria-label="Dismiss Feast nudge"
					priority="tertiary"
					size="small"
					icon={<SvgCross />}
					hideLabel
					onClick={onDismiss}
					cssOverrides={
						darkModeAvailable
							? css`
									${dismissButtonStyles};
									${dismissDarkMedia};
							  `
							: dismissButtonStyles
					}
				>
					Dismiss
				</Button>
			</div>
		</div>
	);
};
