import { css } from '@emotion/react';
import {
	article15,
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { LinkButton } from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import {
	BrazeBannersSystemDisplay,
	BrazeBannersSystemPlacementId,
	isPlacementStale,
} from '../lib/braze/BrazeBannersSystem';
import { getFeastSavedFromTheWebRecipes } from '../lib/feast/savedFromWeb';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useBraze } from '../lib/useBraze';
import type { StageType } from '../types/config';
import type { RecipeBlockElement } from '../types/content';
import { useConfig } from './ConfigContext';

// ── Feast brand colours ───────────────────────────────────────────────────────

const FEAST_BG = '#F3F3E9';
const FEAST_BG_DARK = '#2B2B26';
const FEAST_TEXT = sourcePalette.neutral[20];
const FEAST_TEXT_DARK = sourcePalette.neutral[93];
const FEAST_GREEN = '#68773C';
const FEAST_GREEN_HOVER = '#4d5c2b';
const FEAST_BORDER = FEAST_GREEN;
const FEAST_BORDER_DARK = FEAST_GREEN;

// ── CSS custom properties ─────────────────────────────────────────────────────

const lightVars = css`
	--feast-nudge-bg: ${FEAST_BG};
	--feast-nudge-text: ${FEAST_TEXT};
	--feast-nudge-border: ${FEAST_BORDER};
`;

const darkVars = css`
	--feast-nudge-bg: ${FEAST_BG_DARK};
	--feast-nudge-text: ${FEAST_TEXT_DARK};
	--feast-nudge-border: ${FEAST_BORDER_DARK};
`;

// ── Deep-link helpers ─────────────────────────────────────────────────────────

const FEAST_ADJUST_TOKEN_PROD = '20wmhy68';
const FEAST_ADJUST_TOKEN_CODE = '20o7ykck';

const getAdjustToken = (stage: StageType): string => {
	return stage === 'PROD' ? FEAST_ADJUST_TOKEN_PROD : FEAST_ADJUST_TOKEN_CODE;
};

const buildFeastLink = (recipeId: string, stage: StageType): string => {
	const token = getAdjustToken(stage);
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

// ── CLS mitigation ────────────────────────────────────────────────────────────

/**
 * Reserves vertical space for the nudge so that the async swap between the
 * native fallback card and a Braze banner (see the `useBraze` fetch below)
 * doesn't shift surrounding content once the placement is already visible to
 * the reader.
 *
 * Values are the rendered height of the native fallback card (fixed copy, so
 * the height is deterministic), measured via Storybook at each named
 * breakpoint where the description text wraps to a different number of
 * lines:
 * - < mobileMedium (375px): 3 lines  → 111px
 * - mobileMedium–phablet (375–659px): 2 lines → 90px
 * - >= phablet (660px): 1 line → 69px
 *
 * A small buffer is added to absorb minor font-metric differences (e.g.
 * webfont vs. fallback font during load).
 *
 * This only guarantees no shift when a Braze banner is the same height or
 * shorter. Braze banners can set their own `minHeight` custom property (see
 * `BrazeBannersSystem.tsx`) to match or exceed these values so their content
 * doesn't overflow the reserved space either.
 */
const nudgeMinHeightStyles = css`
	min-height: 112px;
	${from.mobileMedium} {
		min-height: 92px;
	}
	${from.phablet} {
		min-height: 72px;
	}
`;

/**
 * Extra vertical margin applied around the reserved-height box, matching
 * `showcaseCardStyles`' own margin so the placeholder shown while the
 * "Saved from web" status is loading (see `isRecipeSaved` below) takes up
 * exactly the same space as whichever of the Braze banner or native card
 * replaces it, keeping the CLS mitigation consistent across all three
 * states.
 */
const nudgeSpacingStyles = css`
	margin: ${space[2]}px 0;
`;

/**
 * Upper bound on how long to wait for `getFeastSavedFromTheWebRecipes` (see
 * below) before giving up and treating the recipe as not-saved. Prevents an
 * unusually slow/hanging request from blocking the nudge from rendering at
 * all. Mirrors the timeout pattern used for `fetchEmail` in
 * `BrazeBannersSystem.tsx`.
 */
const SAVED_FROM_WEB_TIMEOUT_MS = 2_000;

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
	color: var(--feast-nudge-text);
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
	nudgeIndex: number;
	idApiUrl: string | undefined;
	/**
	 * Every recipe id that will get a nudge on this page (at most 5). Shared
	 * across all FeastContextualNudge instances so that whichever one
	 * hydrates first fetches the reader's "Saved from web" state for the
	 * whole batch in a single request, rather than each nudge querying just
	 * its own recipe id separately.
	 */
	allNudgeRecipeIds: string[];
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
	nudgeIndex,
	idApiUrl,
	allNudgeRecipeIds,
}: FeastContextualNudgeProps) => {
	const { darkModeAvailable, renderingTarget } = useConfig();
	const { braze } = useBraze(idApiUrl ?? '', renderingTarget);

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

	/**
	 * Logs a CLICK event with Ophan when the reader taps the native
	 * (non-Braze) "Download the app" install button.
	 */
	const handleDownloadClick = () => {
		void submitComponentEvent(
			{
				component: {
					componentType: 'RETENTION_ENGAGEMENT_BANNER',
					id: `feast-contextual-nudge-${nudgeIndex}`,
				},
				action: 'CLICK',
			},
			renderingTarget,
		);
	};

	useEffect(() => {
		if (isDev) {
			console.log(
				`Contextual nudge for the Feast app, related to the recipe: ${title}. (id: ${feastId}; pageId: ${pageId})`,
			);
		}
	}, [feastId, title, pageId, isDev]);

	// Whether this recipe is already in the reader's "Saved from web" list.
	// `getFeastSavedFromTheWebRecipes` caches by user id + recipe ids, so no
	// matter how many FeastContextualNudge islands on this page call it as
	// they hydrate (each is deferred `until: 'visible'`), only one network
	// request for the batch of recipe ids on this page is ever made.
	//
	// `undefined` specifically means "not yet known" (auth status still
	// pending, or the saved-from-web request is still in flight) as opposed
	// to `false`, which means "known to not be saved". The Braze banner
	// iframe reads `isRecipeSaved` from `context` only once, when it asks for
	// context on load (see `GetContext` in `BrazeBannersSystem.tsx`) — so the
	// banner must not be rendered until the real value is known, otherwise it
	// would be permanently stuck showing the wrong saved state. See the
	// render gate below, which holds off rendering anything (Braze banner
	// *or* native fallback) until this resolves.
	const authStatus = useAuthStatus();
	const [isRecipeSaved, setIsRecipeSaved] = useState<boolean | undefined>(
		undefined,
	);
	useEffect(() => {
		if (authStatus.kind === 'Pending') return;
		if (authStatus.kind !== 'SignedIn') {
			setIsRecipeSaved(false);
			return;
		}

		let cancelled = false;
		const timeout = new Promise<Set<string>>((resolve) => {
			setTimeout(() => resolve(new Set()), SAVED_FROM_WEB_TIMEOUT_MS);
		});
		void Promise.race([
			getFeastSavedFromTheWebRecipes(
				authStatus.idToken.claims.sub,
				authStatus.accessToken.accessToken,
				allNudgeRecipeIds,
			),
			timeout,
		]).then((savedRecipeIds) => {
			if (!cancelled) setIsRecipeSaved(savedRecipeIds.has(feastId));
		});
		return () => {
			cancelled = true;
		};
	}, [authStatus, feastId, allNudgeRecipeIds]);

	// Only the native fallback renders `isRecipeSaved`-free, so it's safe to
	// show straight away when there's no Braze placement to wait on. When a
	// Braze placement is possible, hold off on rendering anything until the
	// saved-from-web status is known, so the native card never flashes before
	// the Braze banner is ready to show with the correct context, and so the
	// banner is never shown with a stale/incorrect `isRecipeSaved`. The
	// reserved height/margin (`nudgeMinHeightStyles` + `nudgeSpacingStyles`)
	// matches the Braze/native cards below, so this causes no layout shift
	// once real content replaces it.
	if (idApiUrl !== undefined && isRecipeSaved === undefined) {
		return (
			<div
				data-component="feast-contextual-nudge"
				aria-hidden="true"
				css={[nudgeMinHeightStyles, nudgeSpacingStyles]}
			/>
		);
	}

	// If idApiUrl is defined and Braze has a banner for this placement slot,
	// render the Braze banner instead of the native nudge.
	if (idApiUrl !== undefined) {
		const placementId =
			BrazeBannersSystemPlacementId[
				`FeastContextualNudge${nudgeIndex}` as keyof typeof BrazeBannersSystemPlacementId
			];

		// Guard against stale placements: if the last requestBannersRefresh
		// was rate-limited AND this placement has suppressOnStale: true in
		// PLACEMENT_SUPPRESS_ON_STALE, skip getBanner() and fall through to
		// the native nudge below.
		//
		// Each FeastContextualNudge placement ID has its own entry in
		// PLACEMENT_SUPPRESS_ON_STALE — change any individual one to `true`
		// to suppress that specific nudge on a failed refresh.
		const banner = !isPlacementStale(placementId)
			? (braze?.getBanner(placementId) ?? null)
			: null;

		if (banner && braze) {
			return (
				<div
					aria-description={`Open the recipe ${title} in the Feast app`}
					data-component="feast-contextual-nudge"
					css={[nudgeMinHeightStyles, nudgeSpacingStyles]}
				>
					<BrazeBannersSystemDisplay
						meta={{
							id: `feast-contextual-nudge-${nudgeIndex}`,
							braze,
							banner,
						}}
						idApiUrl={idApiUrl}
						stage={stage}
						context={{
							recipe,
							recipeArticleTitle,
							pageId,
							isDev,
							nudgeIndex,
							darkMode: darkModeAvailable,
							adjustToken: getAdjustToken(stage),
							isRecipeSaved,
						}}
					/>
				</div>
			);
		}
	}

	return (
		<div
			aria-description={`Open the recipe ${title} in the Feast app`}
			data-component="feast-contextual-nudge"
			css={[
				showcaseCardStyles,
				cardGridStyles,
				nudgeMinHeightStyles,
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
					onClick={handleDownloadClick}
				>
					Download the app
				</LinkButton>
			</div>
		</div>
	);
};
