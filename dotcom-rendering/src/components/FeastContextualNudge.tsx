import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineBold24,
	palette as sourcePalette,
	space,
	textEgyptian14,
	textEgyptian17,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgCross,
} from '@guardian/source/react-components';
import { useState } from 'react';
import type { EditionId } from '../lib/edition';
import type { RecipeBlockElement } from '../types/content';

/** Feast brand palette — matches FeastThrasher */
const FEAST_BG = '#f7efe9';
const FEAST_BG_DARK = '#1a1a0a'; // deep dark olive — matches brand warmth
const FEAST_TEXT_DARK = sourcePalette.neutral[93];
const FEAST_SUBTEXT_DARK = sourcePalette.neutral[60];
const FEAST_GREEN = '#68773c';
const FEAST_GREEN_HOVER = '#4d5c2b';
const FEAST_BORDER = 'rgba(104, 119, 60, 0.3)'; // FEAST_GREEN at 30% opacity
const FEAST_BORDER_DARK = 'rgba(104, 119, 60, 0.5)';

/**
 * Builds an Adjust go.link deep link.
 *
 * Users with the Feast app installed will be taken directly to the app;
 * users without it will be sent to the relevant App Store page.
 *
 * Once per-recipe Feast IDs are available from the `frontend` backend, add a
 * `deep_link_value` query parameter here so users land on the specific recipe.
 *
 * @see https://help.adjust.com/en/article/deep-linking
 */
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

// ─── Copy variants ────────────────────────────────────────────────────────────

type NudgeVariant = {
	heading: string;
	body: string;
	actions: Array<{ label: string; campaign: string }>;
};

const getNudgeVariant = (
	variant: 'hvsSubscriber' | 'usNonSubscriber' | 'default',
): NudgeVariant => {
	if (variant === 'hvsSubscriber') {
		return {
			heading: 'Your supporter package includes Feast',
			body: 'Use Cook Mode to keep your screen on while you cook — hands-free, no touch required.',
			actions: [
				{
					label: 'Open in Cook Mode',
					campaign: 'FeastNudge_HVS_CookMode',
				},
				{ label: 'Save to My Feast', campaign: 'FeastNudge_HVS_Save' },
			],
		};
	}

	if (variant === 'usNonSubscriber') {
		return {
			heading: 'Cook this recipe with the Feast app',
			body: 'Automatically convert cups, ounces and more. Plus 7,000+ recipes, Cook Mode and My Feast Collections. Try free for 14 days.',
			actions: [
				{
					label: 'Try Cook Mode free',
					campaign: 'FeastNudge_US_CookMode',
				},
				{
					label: 'Add to shopping list',
					campaign: 'FeastNudge_US_ShoppingList',
				},
			],
		};
	}

	return {
		heading: 'Cook this recipe with the Feast app',
		body: 'Keep your screen on with Cook Mode, save recipes to My Feast, and browse 7,000+ Guardian recipes. Try free for 14 days.',
		actions: [
			{
				label: 'Open in Cook Mode',
				campaign: 'FeastNudge_Default_CookMode',
			},
			{ label: 'Save to My Feast', campaign: 'FeastNudge_Default_Save' },
			{
				label: 'Add to shopping list',
				campaign: 'FeastNudge_Default_ShoppingList',
			},
		],
	};
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const containerStyles = css`
	background-color: ${FEAST_BG};
	border: 1px solid ${FEAST_BORDER};
	border-radius: 4px;
	margin: ${space[4]}px 0;
	padding: ${space[4]}px;
	display: flex;
	gap: ${space[3]}px;

	${from.tablet} {
		padding: ${space[5]}px;
		gap: ${space[5]}px;
	}

	/* At wide the sticky left-col FeastRecipeNudge takes over */
	${from.wide} {
		display: none;
	}

	/* Storybook colour-scheme: light before dark so dark wins the cascade */
	[data-color-scheme='light'] & {
		background-color: ${FEAST_BG};
		border-color: ${FEAST_BORDER};
	}
	[data-color-scheme='dark'] & {
		background-color: ${FEAST_BG_DARK};
		border-color: ${FEAST_BORDER_DARK};
	}
`;

const containerDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		background-color: ${FEAST_BG_DARK};
		border-color: ${FEAST_BORDER_DARK};
	}
`;

const logoWrapStyles = css`
	flex-shrink: 0;
	width: 48px;
	height: 48px;
	background-color: ${FEAST_GREEN};
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

/* Feast "F" logotype as a simple inline SVG — no external asset needed */
const FeastLogo = () => (
	<svg
		aria-hidden="true"
		width="28"
		height="28"
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

const contentStyles = css`
	flex: 1;
	min-width: 0;
`;

const headingStyles = css`
	${headlineBold20};
	${from.tablet} {
		${headlineBold24};
	}
	color: ${sourcePalette.neutral[0]};
	margin: 0 0 ${space[1]}px;

	[data-color-scheme='light'] & {
		color: ${sourcePalette.neutral[0]};
	}
	[data-color-scheme='dark'] & {
		color: ${FEAST_TEXT_DARK};
	}
`;

const headingDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${FEAST_TEXT_DARK};
	}
`;

const bodyStyles = css`
	${textEgyptian14};
	${from.tablet} {
		${textEgyptian17};
	}
	color: ${sourcePalette.neutral[20]};
	margin: 0 0 ${space[4]}px;

	[data-color-scheme='light'] & {
		color: ${sourcePalette.neutral[20]};
	}
	[data-color-scheme='dark'] & {
		color: ${FEAST_SUBTEXT_DARK};
	}
`;

const bodyDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${FEAST_SUBTEXT_DARK};
	}
`;

const actionsRowStyles = css`
	display: flex;
	flex-wrap: wrap;
	gap: ${space[2]}px;
`;

/* Theme overrides for Source buttons — bypasses article pillar color inheritance */
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

/* On mobile, secondary actions collapse so the card stays compact */
const secondaryCtaMobileHide = css`
	${until.mobileLandscape} {
		display: none;
	}
`;

const dismissWrapStyles = css`
	flex-shrink: 0;
`;

/**
 * Source's tertiary button inherits the article pillar color by default.
 * We override only the icon/text color so it stays neutral.
 */
const dismissButtonStyles = css`
	color: ${sourcePalette.neutral[46]};

	[data-color-scheme='light'] & {
		color: ${sourcePalette.neutral[46]};
	}
	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const dismissDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${sourcePalette.neutral[60]};
	}
`;

// ─── Recipe data styles ─────────────────────────────────────────────────────

const recipeImageStyles = css`
	width: 100%;
	max-height: 280px;
	object-fit: cover;
	display: block;
	border-radius: 3px 3px 0 0;
	margin-bottom: ${space[3]}px;
`;

const recipeSectionTitleStyles = css`
	${textEgyptian14};
	font-weight: 700;
	color: ${FEAST_GREEN};
	margin: ${space[3]}px 0 ${space[1]}px;
	text-transform: uppercase;
	letter-spacing: 0.05em;

	[data-color-scheme='dark'] & {
		color: ${FEAST_GREEN};
	}
`;

const recipeMetaRowStyles = css`
	${textEgyptian14};
	color: ${sourcePalette.neutral[20]};
	display: flex;
	flex-wrap: wrap;
	gap: ${space[2]}px ${space[4]}px;
	margin: ${space[2]}px 0;

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const recipeMetaDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		color: ${sourcePalette.neutral[60]};
	}
`;

const recipeMetaItemStyles = css`
	display: flex;
	align-items: baseline;
	gap: 4px;
`;

const recipeMetaLabelStyles = css`
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
	${textEgyptian14};
	background-color: rgba(104, 119, 60, 0.12);
	color: ${FEAST_GREEN};
	border-radius: 2px;
	padding: 2px 8px;
	font-weight: 600;
	text-transform: capitalize;

	[data-color-scheme='dark'] & {
		background-color: rgba(104, 119, 60, 0.25);
	}
`;

const contributorStyles = css`
	${textEgyptian14};
	color: ${sourcePalette.neutral[46]};
	margin: ${space[1]}px 0 ${space[2]}px;

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const recipeDescriptionStyles = css`
	${textEgyptian14};
	color: ${sourcePalette.neutral[20]};
	margin: ${space[2]}px 0;
	font-style: italic;

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const appReadyBadgeStyles = css`
	${textEgyptian14};
	display: inline-block;
	border-radius: 2px;
	padding: 2px 8px;
	font-weight: 700;
	margin-bottom: ${space[2]}px;
`;

const appReadyOnStyles = css`
	background-color: ${FEAST_GREEN};
	color: ${sourcePalette.neutral[100]};
`;

const appReadyOffStyles = css`
	background-color: ${sourcePalette.neutral[60]};
	color: ${sourcePalette.neutral[100]};
`;

const ingredientsSectionStyles = css`
	margin: ${space[2]}px 0 0;
`;

const ingredientSectionLabelStyles = css`
	${textEgyptian14};
	color: ${sourcePalette.neutral[46]};
	font-style: italic;
	margin: ${space[2]}px 0 4px;

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const ingredientListStyles = css`
	${textEgyptian14};
	color: ${sourcePalette.neutral[20]};
	margin: 0;
	padding: 0 0 0 ${space[4]}px;

	li {
		margin-bottom: 2px;
	}

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const instructionListStyles = css`
	${textEgyptian14};
	color: ${sourcePalette.neutral[20]};
	margin: 0;
	padding: 0 0 0 ${space[5]}px;

	li {
		margin-bottom: ${space[2]}px;
	}

	[data-color-scheme='dark'] & {
		color: ${sourcePalette.neutral[60]};
	}
`;

const dividerStyles = css`
	border: none;
	border-top: 1px solid ${FEAST_BORDER};
	margin: ${space[3]}px 0;

	[data-color-scheme='dark'] & {
		border-top-color: ${FEAST_BORDER_DARK};
	}
`;

const dividerDarkMedia = css`
	@media (prefers-color-scheme: dark) {
		border-top-color: ${FEAST_BORDER_DARK};
	}
`;

const slugToLabel = (s: string): string =>
	s.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
	pageId: string;
	editionId: EditionId;
	/** Copy variant — determined by the caller based on subscriber/edition state */
	subscriberVariant: 'hvsSubscriber' | 'usNonSubscriber' | 'default';
	/** Called when the user dismisses the nudge */
	onDismiss: () => void;
	/** Full structured recipe data from the RecipeBlockElement, when available. */
	recipe?: RecipeBlockElement;
	/**
	 * When true, hides the heading and body copy — used for subsequent recipes
	 * in a multi-recipe article so the marketing message is only shown once.
	 */
	compact?: boolean;
	/**
	 * Whether the page supports dark mode.
	 */
	darkModeAvailable?: boolean;
};

export const FeastContextualNudge = ({
	pageId,
	subscriberVariant,
	onDismiss,
	recipe,
	compact = false,
	darkModeAvailable = false,
}: Props) => {
	const [isVisible, setIsVisible] = useState(true);

	const variant = getNudgeVariant(subscriberVariant);
	const [primaryAction, ...secondaryActions] = variant.actions;
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

	if (!isVisible || !primaryAction) return null;

	const handleDismiss = () => {
		setIsVisible(false);
		onDismiss();
	};

	return (
		<aside
			aria-label="Get the Feast app"
			css={[containerStyles, darkModeAvailable && containerDarkMedia]}
		>
			{/* Featured image — spans the full card width */}
			{image && (
				<img
					src={image.url}
					alt={image.caption}
					css={recipeImageStyles}
				/>
			)}

			<div css={logoWrapStyles} aria-hidden="true">
				<FeastLogo />
			</div>

			<div css={contentStyles}>
				{/* Recipe name (when we have structured data) */}
				{recipe?.title && (
					<h2
						css={[
							headingStyles,
							darkModeAvailable && headingDarkMedia,
						]}
					>
						{recipe.title}
					</h2>
				)}

				{/* Metadata row: difficulty · timings · serves */}
				{recipe && (
					<div
						css={[
							recipeMetaRowStyles,
							darkModeAvailable && recipeMetaDarkMedia,
						]}
					>
						{recipe.difficultyLevel && (
							<span css={recipeMetaItemStyles}>
								<span css={recipeMetaLabelStyles}>
									Difficulty
								</span>
								{slugToLabel(recipe.difficultyLevel)}
							</span>
						)}
						{timings.map((t) => (
							<span
								key={t.qualifier ?? t.text}
								css={recipeMetaItemStyles}
							>
								{t.qualifier && (
									<span css={recipeMetaLabelStyles}>
										{slugToLabel(t.qualifier)}
									</span>
								)}
								{t.text}
							</span>
						))}
						{serves.map((s, i) => (
							<span key={i} css={recipeMetaItemStyles}>
								<span css={recipeMetaLabelStyles}>Serves</span>
								{s.text}
							</span>
						))}
					</div>
				)}

				{/* Description */}
				{recipe?.description && !compact && (
					<p css={recipeDescriptionStyles}>{recipe.description}</p>
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
								? appReadyOnStyles
								: appReadyOffStyles,
						]}
					>
						{recipe.isAppReady
							? '✓ Live in Feast'
							: '○ Not in Feast'}
					</span>
				)}

				{/* Fallback heading/body when no structured recipe data (or not compact) */}
				{!recipe && !compact && (
					<>
						<h2
							css={[
								headingStyles,
								darkModeAvailable && headingDarkMedia,
							]}
						>
							{variant.heading}
						</h2>
						<p
							css={[
								bodyStyles,
								darkModeAvailable && bodyDarkMedia,
							]}
						>
							{variant.body}
						</p>
					</>
				)}

				{/* Ingredients */}
				{(recipe?.ingredients ?? []).length > 0 && (
					<>
						<hr
							css={[
								dividerStyles,
								darkModeAvailable && dividerDarkMedia,
							]}
						/>
						<p css={recipeSectionTitleStyles}>Ingredients</p>
						{recipe?.ingredients?.map((section, si) => (
							<div key={si} css={ingredientsSectionStyles}>
								{section.recipeSection && (
									<p css={ingredientSectionLabelStyles}>
										{section.recipeSection}
									</p>
								)}
								<ul css={ingredientListStyles}>
									{(section.ingredientsList ?? []).map(
										(ing, ii) => (
											<li
												key={
													ing.ingredientId ??
													`${si}-${ii}`
												}
											>
												{ing.text}
											</li>
										),
									)}
								</ul>
							</div>
						))}
					</>
				)}

				{/* Instructions */}
				{(recipe?.instructions ?? []).length > 0 && (
					<>
						<hr
							css={[
								dividerStyles,
								darkModeAvailable && dividerDarkMedia,
							]}
						/>
						<p css={recipeSectionTitleStyles}>Method</p>
						<ol css={instructionListStyles}>
							{recipe?.instructions?.map((step, i) => (
								<li key={step.stepNumber ?? i}>
									{step.description}
								</li>
							))}
						</ol>
					</>
				)}

				{/* CTAs */}
				<hr
					css={[dividerStyles, darkModeAvailable && dividerDarkMedia]}
				/>
				<div css={actionsRowStyles}>
					{/* Direct Feast deep-link when recipe is live */}
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
					{/* Primary CTA */}
					<LinkButton
						priority={recipe?.isAppReady ? 'secondary' : 'primary'}
						size="small"
						href={buildAppLink(
							pageId,
							primaryAction.campaign,
							feastId,
						)}
						theme={
							recipe?.isAppReady
								? secondaryCtaTheme
								: primaryCtaTheme
						}
						data-ignore="global-link-styling"
					>
						{primaryAction.label}
					</LinkButton>

					{/* Secondary CTAs */}
					{secondaryActions.map((action) => (
						<LinkButton
							key={action.campaign}
							priority="secondary"
							size="small"
							href={buildAppLink(
								pageId,
								action.campaign,
								feastId,
							)}
							theme={secondaryCtaTheme}
							data-ignore="global-link-styling"
							cssOverrides={css`
								background-color: transparent;
								${secondaryCtaMobileHide}
							`}
						>
							{action.label}
						</LinkButton>
					))}
				</div>
			</div>

			<div css={dismissWrapStyles}>
				<Button
					aria-label="Dismiss Feast app nudge"
					priority="tertiary"
					size="small"
					icon={<SvgCross />}
					hideLabel
					onClick={handleDismiss}
					cssOverrides={
						darkModeAvailable
							? css`
									${dismissButtonStyles}
									${dismissDarkMedia}
							  `
							: dismissButtonStyles
					}
				>
					Dismiss
				</Button>
			</div>
		</aside>
	);
};
