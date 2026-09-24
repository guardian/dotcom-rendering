import { css } from '@emotion/react';
import { until } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { getAuthStatus, subscribeToAuthStateChange } from '../lib/identity';
import { resolvePuzzleIframeUrl } from '../lib/puzzleIframeUrl';
import { useMatchMedia } from '../lib/useMatchMedia';
import type { PuzzleConfig } from '../model/puzzles/puzzleConfigs';
import { palette as themePalette } from '../palette';

interface Props {
	/**
	 * The puzzle's own `PuzzleConfig`, used to resolve the provider-specific
	 * iframe URL (`set`/`baseUrl`, etc., see `src/lib/puzzleIframeUrl.ts`)
	 * client-side, since that resolution needs the reactive `userId`/
	 * `darkMode` context this component itself computes. Replaces a
	 * previous, pre-resolved `src: string` prop.
	 */
	puzzleConfig: PuzzleConfig;
	title: string;
	/**
	 * Whether dark mode is available for this page/request at all (the
	 * `webx-dark-mode-web` server-side AB test flag, already threaded down
	 * from `PuzzlePage.tsx`/`useConfig()` the same way it reaches
	 * `rootStyles()`). Combined client-side with the reader's real OS/browser
	 * preference (`prefers-color-scheme`) to decide `PuzzleContext.darkMode`.
	 */
	darkModeAvailable: boolean;
	/**
	 * Which day's puzzle is being shown, as the raw `YYYY-MM-DD` string
	 * `frontend` resolved (`instance.puzzleDate`), or `null` if not
	 * provided. Passed straight through to `PuzzleContext.puzzleDate`
	 * unformatted, third-party providers need the machine-readable form,
	 * not the human-readable display text rendered next to the title.
	 */
	puzzleDate: string | null;
	puzzleId?: string;
}

type MinHeightTiers = { default: number; tablet: number; mobile: number };

/**
 * Per-slug min-height overrides, hardcoded rather than guessed generically:
 * each puzzle's actual required height differs (a 4x4 killer sudoku grid
 * needs more vertical space than a plain word wheel, for example), so a
 * single shared constant can't fit every puzzle without either clipping
 * some or wasting space on others. These are still best-effort estimates,
 * not confirmed pixel-for-pixel against a real AmuseLabs/Wordiply embed
 * (see docs/puzzle-page.md's "Iframe height at narrower viewports" -
 * platform access for real measurement is being arranged separately), but
 * are deliberately tuned per puzzle instead of one generic guess for all
 * six.
 *
 * Three tiers, matching AmuseLabs' own responsive reflow breakpoints:
 * - `default`: from `desktop` (980px) up.
 * - `tablet`: from `tablet` (740px) up to `desktop` (980px) - a second,
 *   intermediate breakpoint below 980px, distinct from the narrower
 *   `mobile` tier below.
 * - `mobile`: below `tablet` (740px), where AmuseLabs' side menu reflows
 *   below the puzzle grid, needing the most vertical space.
 *
 * These are the values used for non-touch (mouse/trackpad) devices. See
 * `PUZZLE_MIN_HEIGHTS_TOUCH` below for the touch-device override (applied
 * via `@media (pointer: coarse)`, regardless of viewport width, since a
 * touch tablet can still be as wide as a `desktop`-tier viewport).
 *
 * Falls back to `DEFAULT_MIN_HEIGHT`/`DEFAULT_MIN_HEIGHT_TABLET`/
 * `DEFAULT_MIN_HEIGHT_MOBILE` for any slug not listed here.
 */
const PUZZLE_MIN_HEIGHTS: Record<string, MinHeightTiers> = {
	'sudoku-easy': { default: 620, tablet: 520, mobile: 630 },
	'sudoku-medium': { default: 620, tablet: 520, mobile: 630 },
	'sudoku-hard': { default: 620, tablet: 520, mobile: 630 },
	'sudoku-killer': { default: 620, tablet: 520, mobile: 630 },
	'word-wheel': { default: 600, tablet: 750, mobile: 500 },
	wordiply: { default: 600, tablet: 600, mobile: 560 },
};

/**
 * Touch-device-only min-height overrides, keyed by slug: only puzzles that
 * actually need a different height on a touch device (currently just
 * Wordiply) have an entry here. Applied on top of `PUZZLE_MIN_HEIGHTS`
 * above via `@media (pointer: coarse)` in `buildFrameStyles` - a pure-CSS
 * check for "is this a touch device", with no JS/`useMatchMedia` needed,
 * since `pointer: coarse` is exactly the standard media feature for "the
 * primary input mechanism cannot easily/precisely point" (touchscreens),
 * as opposed to `pointer: fine` (mouse/trackpad). A slug not listed here
 * simply keeps its `PUZZLE_MIN_HEIGHTS` value on touch devices too.
 */
const PUZZLE_MIN_HEIGHTS_TOUCH: Partial<Record<string, MinHeightTiers>> = {
	wordiply: { default: 800, tablet: 600, mobile: 500 },
};

const DEFAULT_MIN_HEIGHT = 500;
const DEFAULT_MIN_HEIGHT_TABLET = 700;
const DEFAULT_MIN_HEIGHT_MOBILE = 900;

/**
 * Builds the iframe's `frameStyles`, with a `min-height` tuned per puzzle
 * via `PUZZLE_MIN_HEIGHTS` across three tiers (see that constant's doc
 * comment: `default` from `desktop` up, `tablet` between `tablet` and
 * `desktop`, `mobile` below `tablet`), since AmuseLabs' own iframe content
 * reflows at each of these widths, needing progressively more vertical
 * space the narrower the viewport gets. Also applies a visible border
 * around the iframe matching the page's own article border colour.
 *
 * When `PUZZLE_MIN_HEIGHTS_TOUCH` has an entry for this slug, its values
 * override the three tiers above for touch devices, via
 * `@media (pointer: coarse)`. That block is written after the base rules,
 * so on a touch device it wins the CSS cascade (same specificity, later
 * source order) for whichever tier's width also matches - no JS feature
 * detection needed.
 */
export const buildFrameStyles = (slug: string) => {
	const {
		default: defaultMinHeight,
		tablet: tabletMinHeight,
		mobile: mobileMinHeight,
	} = PUZZLE_MIN_HEIGHTS[slug] ?? {
		default: DEFAULT_MIN_HEIGHT,
		tablet: DEFAULT_MIN_HEIGHT_TABLET,
		mobile: DEFAULT_MIN_HEIGHT_MOBILE,
	};
	const touchOverride = PUZZLE_MIN_HEIGHTS_TOUCH[slug];

	return css`
		width: 100%;
		min-height: ${defaultMinHeight}px;
		border: 1px solid ${themePalette('--article-border')};
		overflow: hidden;

		${until.desktop} {
			min-height: ${tabletMinHeight}px;
		}

		${until.tablet} {
			min-height: ${mobileMinHeight}px;
		}

		${touchOverride &&
		css`
			@media (pointer: coarse) {
				min-height: ${touchOverride.default}px;

				${until.desktop} {
					min-height: ${touchOverride.tablet}px;
				}

				${until.tablet} {
					min-height: ${touchOverride.mobile}px;
				}
			}
		`}
	`;
};

/**
 * The context posted to (and encoded in the URL of) the puzzle iframe,
 * carrying enough about the current Guardian reader for puzzle providers
 * (AmuseLabs, Wordiply) to personalise/save progress against a real
 * account and render consistently with the reader's colour scheme, rather
 * than guessing at either.
 *
 * Structurally a superset of `PuzzleUrlContext`
 * (`src/lib/puzzleIframeUrl.ts`, `{ userId, darkMode }`, what the
 * per-provider URL-building strategy needs) plus `puzzleDate`, which no
 * provider's URL strategy currently uses. Deliberately not split into two
 * separate types: a `PuzzleContext` value can be passed anywhere a
 * `PuzzleUrlContext` is expected as-is (TypeScript's structural typing
 * allows the extra `puzzleDate` field), so there is nothing to duplicate.
 */
export interface PuzzleContext {
	/**
	 * The reader's `idToken.claims.legacy_identity_id` (their Guardian
	 * "identity ID", the same identifier already used to build MyAccount
	 * links elsewhere in DCR - see `TopBarMyAccount.tsx`) - not the OIDC
	 * `sub` claim some newer API integrations elsewhere in DCR use instead.
	 * `null` when the reader is signed out (or the auth check hasn't
	 * resolved yet).
	 *
	 * Whether `legacy_identity_id` is actually the ID format
	 * AmuseLabs/Wordiply expect has not been confirmed with those providers
	 * - see the "Open questions" section of docs/puzzle-page.md.
	 */
	userId: string | null;
	/**
	 * Whether dark mode is currently actually active for this reader: both
	 * `darkModeAvailable` (the server-side AB flag for this page/request)
	 * AND the reader's OS/browser actually preferring dark
	 * (`prefers-color-scheme: dark`) must be true. See `usePuzzleDarkMode`.
	 */
	darkMode: boolean;
	/**
	 * Which day's puzzle is being shown, as the raw `YYYY-MM-DD` string
	 * `frontend` resolved (`instance.puzzleDate`). `null` when not provided.
	 * DCR does not parse the Puzzle Page URL or own the date-in-path/
	 * redirect-to-archive logic itself, it simply passes through whatever
	 * `frontend` resolved and sent (see `docs/puzzle-page.md`).
	 */
	puzzleDate: string | null;
}

export interface PuzzleContextMessage {
	type: 'guardian-puzzle-context';
	context: PuzzleContext;
}

/**
 * Reactively resolves the current signed-in user's Guardian identity ID (or
 * `undefined` if signed out/unknown), re-checking whenever the underlying
 * identity-auth client reports an auth state change (e.g. the reader signs
 * in or out while already on this page, via a sign-in modal or another
 * tab) - not just once on mount.
 */
const usePuzzleUserId = (): string | undefined => {
	const [userId, setUserId] = useState<string | undefined>(undefined);

	useEffect(() => {
		let isMounted = true;

		const refresh = () => {
			void getAuthStatus().then((authStatus) => {
				if (!isMounted) return;
				setUserId(
					authStatus.kind === 'SignedIn'
						? authStatus.idToken.claims.legacy_identity_id
						: undefined,
				);
			});
		};

		refresh();
		const unsubscribe = subscribeToAuthStateChange(refresh);

		return () => {
			isMounted = false;
			unsubscribe();
		};
	}, []);

	return userId;
};

/**
 * Reactively resolves whether dark mode is currently actually active:
 * returns `false` immediately (without touching `matchMedia` at all) when
 * `darkModeAvailable` is `false` for this page/request; otherwise reuses
 * the existing, generic `useMatchMedia` hook (already used elsewhere in DCR
 * for `prefers-color-scheme` and other media queries) to check - and stay
 * reactively subscribed to - the reader's real OS/browser preference, so
 * this updates live if the reader switches their OS theme while the page
 * is open.
 */
const usePuzzleDarkMode = (darkModeAvailable: boolean): boolean => {
	const prefersDark = useMatchMedia('(prefers-color-scheme: dark)');
	return darkModeAvailable && prefersDark;
};

const buildPuzzleContext = (
	userId: string | undefined,
	darkMode: boolean,
	puzzleDate: string | null,
): PuzzleContext => ({
	userId: userId ?? null,
	darkMode,
	puzzleDate,
});

/**
 * Resolves the final iframe `src` for a puzzle in two steps, with a
 * deliberately clean split of responsibility:
 *
 * 1. `resolvePuzzleIframeUrl` (`src/lib/puzzleIframeUrl.ts`) builds the
 *    provider-specific base URL, including whichever query params that
 *    specific provider actually supports (e.g. AmuseLabs' `uid`/
 *    `darkMode=0|1`, confirmed per-provider, not applied to every
 *    provider generically).
 * 2. This function then layers DCR's own `guardian-puzzle-context` JSON
 *    blob on top, as a query parameter, applied uniformly to every
 *    provider regardless of `puzzleConfig.iframe.provider`. This is our
 *    own generic, additional channel, not a provider-specific mechanism
 *    (providers that don't understand it simply ignore it), so it
 *    deliberately stays outside the per-provider strategy in step 1.
 *
 * Returns the provider URL unchanged if it cannot be parsed as an absolute
 * URL (steps 2's `guardian-puzzle-context` is simply not added in that
 * case).
 */
export const buildPuzzleIframeSrc = (
	puzzleConfig: PuzzleConfig,
	context: PuzzleContext,
	puzzleId?: string,
): string => {
	const providerUrl = resolvePuzzleIframeUrl(puzzleConfig, context, puzzleId);
	try {
		const url = new URL(providerUrl);
		url.searchParams.set(
			'guardian-puzzle-context',
			JSON.stringify(context),
		);
		return url.toString();
	} catch {
		return providerUrl;
	}
};

const postContextMessage = (
	iframe: HTMLIFrameElement,
	context: PuzzleContext,
) => {
	const message: PuzzleContextMessage = {
		type: 'guardian-puzzle-context',
		context,
	};
	iframe.contentWindow?.postMessage(message, '*');
};

/**
 * Generic sandboxed iframe wrapper for third-party (or in-house, non-React)
 * puzzle providers, such as AmuseLabs-hosted puzzles or bespoke providers
 * like wordiply.com. Used for every `PuzzleConfig` entry (all iframe-based).
 *
 * Passes a `PuzzleContext` (the current signed-in user's identity, whether
 * dark mode is currently active, and which day's puzzle is being shown) to
 * the puzzle provider two ways:
 * as a `guardian-puzzle-context` query parameter (JSON-encoded) on the
 * iframe `src` (so it is present from the very first request the iframe
 * makes), and via `postMessage` once the iframe has loaded (`{ type:
 * 'guardian-puzzle-context', context }` - see `PuzzleContextMessage`).
 * The provider-specific portion of the URL (e.g. AmuseLabs' `uid`/
 * `darkMode=0|1` query params) is resolved separately per provider, see
 * `buildPuzzleIframeSrc`'s doc comment. Because `src` is derived from the
 * reactive `usePuzzleUserId()`/`usePuzzleDarkMode()` results, the iframe is
 * automatically reloaded by the browser (a fresh `src` triggers a new
 * navigation) whenever the reader's sign-in state or OS colour-scheme
 * preference changes while on the page - no manual reload fallback is
 * needed for that case, though the `onLoad` `postMessage` still fires
 * again after each such reload too.
 *
 * `frameStyles` is built per-slug via `buildFrameStyles(puzzleConfig.slug)`,
 * giving each puzzle a tailored `min-height` (see `PUZZLE_MIN_HEIGHTS`
 * above) instead of one generic guess for every puzzle.
 */
export const PuzzleIframe = ({
	puzzleConfig,
	title,
	darkModeAvailable,
	puzzleDate,
	puzzleId,
}: Props) => {
	const userId = usePuzzleUserId();
	const darkMode = usePuzzleDarkMode(darkModeAvailable);
	const context = buildPuzzleContext(userId, darkMode, puzzleDate);
	const iframeSrc = buildPuzzleIframeSrc(puzzleConfig, context, puzzleId);

	return (
		<iframe
			css={buildFrameStyles(puzzleConfig.slug)}
			src={iframeSrc}
			title={title}
			loading="lazy"
			sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
			onLoad={(event) => postContextMessage(event.currentTarget, context)}
		/>
	);
};
