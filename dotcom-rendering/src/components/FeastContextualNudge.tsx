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
const buildAppLink = (pageId: string, campaign: string): string => {
	const params = new URLSearchParams({
		utm_medium: 'ACQUISITIONS_NUDGE',
		utm_campaign: campaign,
		utm_content: pageId,
		utm_source: 'GUARDIAN_WEB',
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

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
	pageId: string;
	editionId: EditionId;
	/** Copy variant — determined by the caller based on subscriber/edition state */
	subscriberVariant: 'hvsSubscriber' | 'usNonSubscriber' | 'default';
	/** Called when the user dismisses the nudge */
	onDismiss: () => void;
	/**
	 * When true, hides the heading and body copy — used for subsequent recipes
	 * in a multi-recipe article so the marketing message is only shown once.
	 */
	compact?: boolean;
	/**
	 * Whether the page supports dark mode. Controls whether
	 * `@media (prefers-color-scheme: dark)` styles are applied.
	 * Pages that do not support dark mode (e.g. Labs) should pass `false`.
	 */
	darkModeAvailable?: boolean;
};

export const FeastContextualNudge = ({
	pageId,
	subscriberVariant,
	onDismiss,
	compact = false,
	darkModeAvailable = false,
}: Props) => {
	const [isVisible, setIsVisible] = useState(true);

	const variant = getNudgeVariant(subscriberVariant);
	const [primaryAction, ...secondaryActions] = variant.actions;

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
			<div css={logoWrapStyles} aria-hidden="true">
				<FeastLogo />
			</div>

			<div css={contentStyles}>
				{!compact && (
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

				<div css={actionsRowStyles}>
					{/* Primary CTA */}
					<LinkButton
						priority="primary"
						size="small"
						href={buildAppLink(pageId, primaryAction.campaign)}
						theme={primaryCtaTheme}
						data-ignore="global-link-styling"
					>
						{primaryAction.label}
					</LinkButton>

					{/* Secondary CTAs — same deep link until per-recipe IDs are available */}
					{secondaryActions.map((action) => (
						<LinkButton
							key={action.campaign}
							priority="secondary"
							size="small"
							href={buildAppLink(pageId, action.campaign)}
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
