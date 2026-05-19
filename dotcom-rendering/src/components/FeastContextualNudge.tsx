import { css } from '@emotion/react';
import {
	article15,
	from,
	headlineBold17,
	headlineMedium20,
	headlineMedium24,
	palette as sourcePalette,
	space,
	textSans17,
	textSans20,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import { useConfig } from './ConfigContext';
import type { RecipeBlockElement } from '../types/content';

// ── Utility helpers ───────────────────────────────────────────────────────────

export const stripHtmlTags = (html: string): string =>
	html.replace(/<[^>]+>/g, '').trim();

// ── Feast brand colours ───────────────────────────────────────────────────────

const FEAST_BG = '#F9F9F5';
const FEAST_BG_DARK = '#1A1A17';
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

// const buildFeastDeepLink = (id: string): string => `feast://recipes/${id}`;

// const buildAppLink = (
// 	pageId: string,
// 	campaign: string,
// 	feastId?: string,
// ): string => {
// 	const params = new URLSearchParams({
// 		utm_medium: 'ACQUISITIONS_NUDGE',
// 		utm_campaign: campaign,
// 		utm_content: pageId,
// 		utm_source: 'GUARDIAN_WEB',
// 		...(feastId ? { deep_link_value: buildFeastDeepLink(feastId) } : {}),
// 	});
// 	return `https://guardian-feast.go.link/p0nQT?${params.toString()}`;
// };

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
	padding: 0 ${space[2]}px ${space[2]}px ${space[2]}px;
	max-width: 100%;
	background-color: var(--feast-nudge-bg);
	border-top: 2px solid ${FEAST_GREEN};
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	/* ${from.mobileLandscape} {
		column-gap: 20px;
		row-gap: ${space[2]}px;
	} */
`;

// ── Grid area styles ──────────────────────────────────────────────────────────

const productInfoContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
`;

const primaryHeadingStyles = css`
	${headlineBold17};
	font-weight: 600;
	color: var(--feast-nudge-heading);
	/* ${from.mobileLandscape} {
	 	${headlineMedium24};
	} */
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
`;

// ── Props ─────────────────────────────────────────────────────────────────────

type FeastContextualNudgeProps = {
	recipe?: RecipeBlockElement;
	recipeName: string;
	pageId: string;
};

// ── Component ─────────────────────────────────────────────────────────────────

export const FeastContextualNudge = ({
	recipe,
	recipeName,
	pageId,
}: FeastContextualNudgeProps) => {
	const { darkModeAvailable } = useConfig();

	const [isStorybook, setIsStorybook] = useState(false);
	useEffect(() => {
		if (!('STORIES' in window)) return;
		setIsStorybook(true);
	}, []);

	const title = recipe?.title ?? recipeName;
	const feastId = recipe?.id;

	return (
		<div
			aria-description={`Contextual nudge for the Feast app, related to the recipe: ${title}. (id: ${
				feastId ?? 'N/A'
			}; pageId: ${pageId})`}
			aria-id
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
				<div css={primaryHeadingStyles}>
					Feast app: Your most useful kitchen utensil
				</div>

				<div css={descriptionStyles}>
					The best of the Guardian’s world-class recipes with app
					exclusive recipes and cooking features
				</div>
			</div>

			{/* buttons */}
			<div css={buttonWrapperStyles}>
				<LinkButton
					priority="primary"
					size="small"
					// href={buildFeastDeepLink(feastId)}
					theme={primaryCtaTheme}
					data-ignore="global-link-styling"
				>
					Start your free trial
				</LinkButton>
			</div>
		</div>
	);
};
