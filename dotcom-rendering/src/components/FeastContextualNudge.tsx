import { css } from '@emotion/react';
import {
	from,
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

const FEAST_BG = '#f7efe9';
const FEAST_BG_DARK = '#1a1a0a';
const FEAST_TEXT = sourcePalette.neutral[0];
const FEAST_TEXT_DARK = sourcePalette.neutral[93];
const FEAST_SUBTEXT = sourcePalette.neutral[46];
const FEAST_SUBTEXT_DARK = sourcePalette.neutral[60];
const FEAST_GREEN = '#68773c';
const FEAST_GREEN_HOVER = '#4d5c2b';
const FEAST_BORDER = 'rgba(104, 119, 60, 0.3)';
const FEAST_BORDER_DARK = 'rgba(104, 119, 60, 0.5)';

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

// ── Card styles ───────────────────────────────────────────────────────────────

const showcaseCard = css`
	${lightVars};
	padding: ${space[2]}px ${space[3]}px ${space[3]}px;
	display: grid;
	column-gap: 10px;
	row-gap: ${space[4]}px;
	max-width: 100%;
	background-color: var(--feast-nudge-bg);
	border-top: 2px solid ${FEAST_GREEN};
	${from.mobileLandscape} {
		column-gap: 20px;
		row-gap: ${space[2]}px;
	}
`;

// ── Grid area styles ──────────────────────────────────────────────────────────

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
	color: var(--feast-nudge-heading);
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
	color: var(--feast-nudge-subtext);
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
	border-top: 1px solid var(--feast-nudge-border);
	padding-top: ${space[3]}px;
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
`;

const descriptionStyles = css`
	${textSans17};
	color: var(--feast-nudge-subtext);
	font-style: italic;
	margin: 0;
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
	const image = recipe?.featuredImage;

	return (
		<div
			data-component="feast-contextual-nudge"
			css={[
				showcaseCard,
				cardGrid,
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
			{/* image */}
			{image && (
				<div css={imageGridArea}>
					<img src={image.url} alt={image.caption ?? title} />
				</div>
			)}

			{/* info: title · id */}
			<div css={productInfoContainer}>
				{/* title */}
				{!!title && <div css={primaryHeading}>{title}</div>}

				{/* id */}
				{!!feastId && <div css={productNameStyle}>ID: {feastId}</div>}
			</div>

			{/* buttons */}
			<div css={buttonWrapper}>
				{!!feastId && (
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
					priority="secondary"
					size="small"
					href={buildAppLink(pageId, 'RecipeNudge_CookMode', feastId)}
					theme={secondaryCtaTheme}
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

			{/* details: description */}
			{recipe && (
				<div css={detailsArea}>
					{/* description */}
					{!!recipe.description && (
						<p css={descriptionStyles}>{recipe.description}</p>
					)}
				</div>
			)}
		</div>
	);
};
