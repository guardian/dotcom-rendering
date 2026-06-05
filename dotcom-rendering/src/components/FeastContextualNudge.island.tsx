import { css } from '@emotion/react';
import {
	article15,
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import type { StageType } from '../types/config';
import type { RecipeBlockElement } from '../types/content';
import { useBetaAB } from '../lib/useAB';
import { useConfig } from './ConfigContext';

// ── Feast brand colours ───────────────────────────────────────────────────────

const FEAST_BG = '#F3F3E9';
const FEAST_BG_DARK = '#2B2B26';
const FEAST_TEXT = sourcePalette.neutral[10];
const FEAST_TEXT_DARK = sourcePalette.neutral[100];
const FEAST_SUBTEXT = sourcePalette.neutral[20];
const FEAST_SUBTEXT_DARK = sourcePalette.neutral[93];
const FEAST_GREEN = '#68773C';
const FEAST_GREEN_HOVER = '#4d5c2b';
const FEAST_BORDER = FEAST_GREEN;
const FEAST_BORDER_DARK = FEAST_GREEN;

// ── CSS custom properties ─────────────────────────────────────────────────────

const lightVars = css`
	--feast-nudge-bg: ${FEAST_BG};
	--feast-nudge-heading: ${FEAST_TEXT};
	--feast-nudge-subtext: ${FEAST_SUBTEXT};
	--feast-nudge-border: ${FEAST_BORDER};
`;

const darkVars = css`
	--feast-nudge-bg: ${FEAST_BG_DARK};
	--feast-nudge-heading: ${FEAST_TEXT_DARK};
	--feast-nudge-subtext: ${FEAST_SUBTEXT_DARK};
	--feast-nudge-border: ${FEAST_BORDER_DARK};
`;

// ── Deep-link helpers ─────────────────────────────────────────────────────────

const FEAST_ADJUST_TOKEN_PROD = '20wmhy68';
const FEAST_ADJUST_TOKEN_CODE = '20o7ykck';

const buildFeastLink = (recipeId: string, stage: StageType): string => {
	const token =
		stage === 'PROD' ? FEAST_ADJUST_TOKEN_PROD : FEAST_ADJUST_TOKEN_CODE;
	return `https://guardian-feast.go.link/recipe/${encodeURIComponent(
		recipeId,
	)}?adj_t=${encodeURIComponent(token)}`;
};

// ── Button themes ─────────────────────────────────────────────────────────────

const primaryCtaTheme = {
	backgroundPrimary: FEAST_GREEN,
	backgroundPrimaryHover: FEAST_GREEN_HOVER,
	textPrimary: sourcePalette.neutral[100],
} as const;

// ── Grid template ─────────────────────────────────────────────────────────────

const cardGridStyles = css`
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

// ── Card styles ───────────────────────────────────────────────────────────────

const showcaseCardStyles = css`
	${lightVars};
	padding: 5px ${space[2]}px 10px ${space[2]}px;
	max-width: 100%;
	background-color: var(--feast-nudge-bg);
	border-top: 1px solid ${FEAST_GREEN};
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	margin: ${space[2]}px 0;
`;

// ── Grid area styles ──────────────────────────────────────────────────────────

const productInfoContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
`;

const buttonWrapperStyles = css`
	grid-area: buttons;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: ${space[1]}px;
`;

const descriptionStyles = css`
	${article15};
	color: var(--feast-nudge-subtext);
	b {
		font-weight: bold;
	}
`;

// ── Props ─────────────────────────────────────────────────────────────────────

type FeastContextualNudgeProps = {
	recipe: RecipeBlockElement;
	recipeArticleTitle: string;
	pageId: string;
	isDev: boolean;
};

/**
 * Inline contextual nudge prompting readers to open the current recipe in the
 * Feast app. Rendered as an island so that client-only concerns (stage
 * detection, dark-mode, Storybook colour-scheme) are handled safely without
 * hydration mismatches.
 *
 * ## Why does this need to be an Island?
 *
 * The component reads `window.guardian.config.stage` at runtime to build the
 * correct Adjust deep-link token. Reading `window.*` during SSR would cause a
 * hydration mismatch; wrapping it as an island means it is only ever executed
 * on the client.
 */
export const FeastContextualNudge = ({
	recipe,
	recipeArticleTitle,
	pageId,
	isDev,
}: FeastContextualNudgeProps) => {
	const abTests = useBetaAB();
	const isVariant =
		abTests?.isUserInTestGroup('feast-recipe-nudge', 'variant-1') ?? false;

	const { darkModeAvailable } = useConfig();

	const [isStorybook, setIsStorybook] = useState(false);
	useEffect(() => {
		if (!('STORIES' in window)) return;
		setIsStorybook(true);
	}, []);

	const [stage, setStage] = useState<StageType>('PROD');
	useEffect(() => {
		setStage(window.guardian.config.stage);
	}, []);

	const title = recipe.title ?? recipeArticleTitle;
	const feastId = recipe.id;

	useEffect(() => {
		if (isDev) {
			console.log(
				`Contextual nudge for the Feast app, related to the recipe: ${title}. (id: ${feastId}; pageId: ${pageId})`,
			);
		}
	}, [feastId, title, pageId, isDev]);

	if (!isVariant) return null;

	return (
		<div
			aria-description={`Open the recipe ${title} in the Feast app`}
			data-component="feast-contextual-nudge"
			css={[
				showcaseCardStyles,
				cardGridStyles,
				darkModeAvailable &&
					css`
						@media (prefers-color-scheme: dark) {
							${darkVars}
						}
					`,
				isStorybook &&
					css`
						[data-color-scheme='light'] & {
							${lightVars}
						}
						[data-color-scheme='dark'] & {
							${darkVars}
						}
					`,
			]}
		>
			{/* info: title · id */}
			<div css={productInfoContainerStyles}>
				<div css={descriptionStyles}>
					<b>Want to save this recipe?</b> Download the Guardian Feast
					app to add this to your collection.
				</div>
			</div>

			{/* buttons */}
			<div css={buttonWrapperStyles}>
				<LinkButton
					priority="primary"
					size="xsmall"
					href={buildFeastLink(feastId, stage)}
					target="_blank"
					rel="noreferrer"
					theme={primaryCtaTheme}
					data-ignore="global-link-styling"
				>
					Download the app
				</LinkButton>
			</div>
		</div>
	);
};
