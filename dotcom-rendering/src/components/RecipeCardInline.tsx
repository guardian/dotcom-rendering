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
import { LinkButton } from '@guardian/source/react-components';
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

// ── Grid template ─────────────────────────────────────────────────────────────

const cardGrid = css`
	grid-template:
		'image info'
		'buttons buttons'
		'details details' / 1fr 1fr;
	${from.mobileLandscape} {
		grid-template:
			'image info' auto
			'image buttons' 1fr
			'details details' / 1fr 1fr;
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

const detailsArea = css`
	grid-area: details;
	border-top: 1px solid ${FEAST_BORDER};
	padding-top: ${space[3]}px;
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;

	[data-color-scheme='dark'] & {
		border-top-color: ${FEAST_BORDER_DARK};
	}
`;

const detailsAreaDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		border-top-color: ${FEAST_BORDER_DARK};
	}
`;

const tagRowStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
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

const appReadyBadgeStyles = css`
	${textSans15};
	display: inline-block;
	border-radius: 2px;
	padding: 2px 8px;
	font-weight: 700;
`;

const appReadyOnStyles = css`
	background-color: ${FEAST_GREEN};
	color: ${sourcePalette.neutral[100]};
`;

const appReadyOffStyles = css`
	background-color: ${sourcePalette.neutral[60]};
	color: ${sourcePalette.neutral[100]};
`;

const metaRowStyles = css`
	${textSans17};
	color: ${sourcePalette.neutral[46]};
	display: flex;
	gap: 4px;
	margin: 0;

	[data-color-scheme='dark'] & {
		color: ${FEAST_SUBTEXT_DARK};
	}
`;

const metaLabelStyles = css`
	font-weight: 700;
	flex-shrink: 0;
`;

const descriptionStyles = css`
	${textSans17};
	color: ${sourcePalette.neutral[46]};
	font-style: italic;
	margin: 0;

	[data-color-scheme='dark'] & {
		color: ${FEAST_SUBTEXT_DARK};
	}
`;

const sectionTitleStyles = css`
	${textSans15};
	font-weight: 700;
	color: ${FEAST_GREEN};
	text-transform: uppercase;
	letter-spacing: 0.06em;
	margin: 0;
`;

const ingredientGroupStyles = css`
	margin-bottom: ${space[1]}px;
`;

const ingredientGroupLabelStyles = css`
	${textSans15};
	color: ${sourcePalette.neutral[46]};
	font-style: italic;
	margin: 0 0 2px;

	[data-color-scheme='dark'] & {
		color: ${FEAST_SUBTEXT_DARK};
	}
`;

const ingredientListStyles = css`
	${textSans17};
	color: ${sourcePalette.neutral[46]};
	margin: 0;
	padding-left: ${space[4]}px;

	li {
		margin-bottom: 2px;
	}

	[data-color-scheme='dark'] & {
		color: ${FEAST_SUBTEXT_DARK};
	}
`;

const instructionListStyles = css`
	${textSans17};
	color: ${sourcePalette.neutral[46]};
	margin: 0;
	padding-left: ${space[5]}px;

	li {
		margin-bottom: ${space[2]}px;
	}

	[data-color-scheme='dark'] & {
		color: ${FEAST_SUBTEXT_DARK};
	}
`;

const commerceCtaLinkStyles = css`
	${textSans17};
	display: block;
	color: ${FEAST_GREEN};
	text-decoration: underline;
`;

// ── Props ─────────────────────────────────────────────────────────────────────

type RecipeCardInlineProps = {
	recipe?: RecipeBlockElement;
	recipeName: string;
	pageId: string;
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
	shouldShowLeftColCard = false,
	darkModeAvailable = false,
}: RecipeCardInlineProps) => {
	const title = recipe?.title ?? recipeName;
	const byline = recipe?.byline ?? [];
	const feastId = recipe?.id;
	const image = recipe?.featuredImage;
	const timings = recipe?.timings ?? [];
	const serves = recipe?.serves ?? [];
	const allTags = [
		...(recipe?.cuisineIds ?? []),
		...(recipe?.mealTypeIds ?? []),
		...(recipe?.suitableForDietIds ?? []),
		...(recipe?.celebrationIds ?? []),
		...(recipe?.techniquesUsedIds ?? []),
		...(recipe?.utensilsAndApplianceIds ?? []),
	];
	const ingredients = recipe?.ingredients ?? [];
	const instructions = recipe?.instructions ?? [];
	const commerceCtas = recipe?.commerceCtas ?? [];

	return (
		<div
			data-component="recipe-card-inline"
			css={[
				showcaseCard,
				darkModeAvailable && showcaseCardDarkMedia,
				shouldShowLeftColCard && hideFromWide,
				cardGrid,
			]}
		>
			{/* image */}
			{image && (
				<div css={imageGridArea}>
					<img src={image.url} alt={image.caption ?? title} />
				</div>
			)}

			{/* info: title · byline · isAppReady · date · difficulty · timings · serves */}
			<div css={productInfoContainer}>
				{/* title */}
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

				{/* id */}
				{feastId && (
					<div
						css={[
							productNameStyle,
							darkModeAvailable && productNameDarkMedia,
						]}
					>
						ID: {feastId}
					</div>
				)}

				{/* byline */}
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

				{/* isAppReady */}
				{recipe && (
					<span
						css={[
							appReadyBadgeStyles,
							recipe.isAppReady
								? appReadyOnStyles
								: appReadyOffStyles,
						]}
					>
						{recipe.isAppReady
							? '✓ Live in Feast'
							: '○ Not in Feast'}
					</span>
				)}

				{/* webPublicationDate */}
				{recipe?.webPublicationDate && (
					<div
						css={[
							productNameStyle,
							darkModeAvailable && productNameDarkMedia,
						]}
					>
						{new Date(recipe.webPublicationDate).toLocaleDateString(
							'en-GB',
							{
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							},
						)}
					</div>
				)}

				{/* difficultyLevel */}
				{recipe?.difficultyLevel && (
					<p css={metaRowStyles}>
						<span css={metaLabelStyles}>Difficulty</span>
						{slugToLabel(recipe.difficultyLevel)}
					</p>
				)}

				{/* timings — each entry */}
				{timings.map((t, i) => (
					<p key={i} css={metaRowStyles}>
						<span css={metaLabelStyles}>
							{t.qualifier ? slugToLabel(t.qualifier) : 'Time'}
						</span>
						{t.text ??
							(t.durationInMins
								? `${t.durationInMins.min ?? '?'}–${
										t.durationInMins.max ?? '?'
								  } min`
								: '')}
					</p>
				))}

				{/* serves — each entry */}
				{serves.map((s, i) => (
					<p key={i} css={metaRowStyles}>
						<span css={metaLabelStyles}>Serves</span>
						{s.text ??
							(s.amount
								? `${s.amount.min ?? '?'}–${
										s.amount.max ?? '?'
								  }${s.unit ? ` ${s.unit}` : ''}`
								: '')}
					</p>
				))}
			</div>

			{/* buttons */}
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
					href={buildAppLink(pageId, 'RecipeNudge_CookMode', feastId)}
					theme={
						recipe?.isAppReady ? secondaryCtaTheme : primaryCtaTheme
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

			{/* details: description · bookCredit · all tags · ingredients · instructions · commerceCtas */}
			{recipe && (
				<div
					css={[
						detailsArea,
						darkModeAvailable && detailsAreaDarkMedia,
					]}
				>
					{/* description */}
					{recipe.description && (
						<p css={descriptionStyles}>{recipe.description}</p>
					)}

					{/* bookCredit */}
					{recipe.bookCredit && (
						<p
							css={[
								productNameStyle,
								darkModeAvailable && productNameDarkMedia,
							]}
						>
							From: {recipe.bookCredit}
						</p>
					)}

					{/* cuisineIds · mealTypeIds · suitableForDietIds · celebrationIds · techniquesUsedIds · utensilsAndApplianceIds */}
					{allTags.length > 0 && (
						<div css={tagRowStyles}>
							{allTags.map((tag) => (
								<span key={tag} css={tagStyles}>
									{slugToLabel(tag)}
								</span>
							))}
						</div>
					)}

					{/* ingredients */}
					{ingredients.length > 0 && (
						<div>
							<p css={sectionTitleStyles}>Ingredients</p>
							{ingredients.map((group, gi) => (
								<div key={gi} css={ingredientGroupStyles}>
									{group.recipeSection && (
										<p css={ingredientGroupLabelStyles}>
											{group.recipeSection}
										</p>
									)}
									<ul css={ingredientListStyles}>
										{(group.ingredientsList ?? []).map(
											(ing, ii) => (
												<li
													key={
														ing.ingredientId ??
														`${gi}-${ii}`
													}
												>
													{ing.text}
												</li>
											),
										)}
									</ul>
								</div>
							))}
						</div>
					)}

					{/* instructions */}
					{instructions.length > 0 && (
						<div>
							<p css={sectionTitleStyles}>Method</p>
							<ol css={instructionListStyles}>
								{instructions.map((step, i) => (
									<li key={step.stepNumber ?? i}>
										{step.description}
									</li>
								))}
							</ol>
						</div>
					)}

					{/* commerceCtas */}
					{commerceCtas.length > 0 && (
						<div>
							<p css={sectionTitleStyles}>Buy ingredients</p>
							{commerceCtas.map((cta) => (
								<a
									key={cta.url}
									href={cta.url}
									css={commerceCtaLinkStyles}
									target="_blank"
									rel="noopener noreferrer"
								>
									{cta.sponsorName}
									{cta.territory ? ` (${cta.territory})` : ''}
								</a>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
