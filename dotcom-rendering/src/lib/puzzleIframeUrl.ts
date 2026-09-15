import type {
	AmuseLabsIframeConfig,
	PuzzleConfig,
	WordiplyIframeConfig,
} from '../model/puzzles/puzzleConfigs';

/**
 * Per-provider strategy for building a puzzle iframe's `src` URL.
 *
 * Each puzzle iframe provider (AmuseLabs, Wordiply, and, in future,
 * MovieGrid/SportsReveal) has its own, independently-confirmed rules for
 * what query params it accepts and in what form (see the "Puzzles hub 3P
 * API requirements" architecture document): AmuseLabs accepts `set`, `id`
 * (vs `idx=1` for "latest"), `embed=1`, an optional `uid`, and an optional
 * `darkMode=0|1` (a plain literal value, not a JSON blob). Wordiply has no
 * confirmed query param support of any kind yet. MovieGrid/SportsReveal
 * accept a client-added `darkMode=0|1` but no confirmed `uid`.
 *
 * Blindly applying the same query params to every provider regardless of
 * what it actually supports is fragile, and was already conceptually
 * wrong even though harmless in practice (V0 only has 2 providers, one of
 * which happens to ignore unknown params). This module exists so each
 * provider's own rules are encapsulated in its own builder function and
 * dispatched on via `resolvePuzzleIframeUrl`, rather than being applied
 * generically to every provider. Adding a new provider means adding a new
 * builder function here and a new case in the dispatcher, not touching the
 * existing providers' logic.
 *
 * `guardian-puzzle-context` (DCR's own JSON-encoded context blob) is
 * deliberately NOT part of this module: it stays generic, applied
 * uniformly to every provider regardless of `PuzzleIframeConfig.provider`,
 * in `src/components/PuzzleIframe.island.tsx`. It is DCR's own additional
 * channel, not a provider-specific mechanism, so it does not belong to any
 * one provider's strategy, providers that don't understand it simply
 * ignore it.
 */

/**
 * What any given provider's URL-building strategy might need to know about
 * the current reader/page to build its URL. Reused as-is (not duplicated)
 * from the shape DCR already builds for `guardian-puzzle-context`, see
 * `PuzzleContext` in `src/components/PuzzleIframe.island.tsx`, which
 * re-exports this same type rather than defining its own.
 */
export interface PuzzleUrlContext {
	userId: string | null;
	darkMode: boolean;
}

const AMUSELABS_BASE_URL = 'https://tg.amuselabs.com/guardian/date-picker';

/**
 * Builds an AmuseLabs iframe URL: `set`, `embed=1`, and `idx=1` (today's
 * puzzle), then conditionally `uid` (only when signed in, confirmed
 * mechanism), then always `darkMode=0|1` (a plain literal query value,
 * confirmed mechanism, unlike `uid` this is always included, never
 * conditionally omitted).
 *
 * `idx=1` is a "today only" hack, confirmed against the AmuseLabs
 * integration doc ("The apps currently use idx=1 for the latest puzzle.
 * Archive URLs should use the stable id instead... Do not add idx=1, as
 * that selects the latest puzzle instead of the archived one."). Swapping
 * `idx=1` for `id={realProviderPuzzleId}` to support a specific past
 * puzzle (archive/calendar, V1) is future work, not something to build
 * now, this function is structured so that swap will be a small, contained
 * change here later (e.g. an optional `id` parameter on this function),
 * not a rewrite. See docs/puzzle-page.md.
 */
export const buildAmuseLabsUrl = (
	config: AmuseLabsIframeConfig,
	context: PuzzleUrlContext,
): string => {
	const url = new URL(AMUSELABS_BASE_URL);
	url.searchParams.set('set', config.set);
	url.searchParams.set('embed', '1');
	url.searchParams.set('idx', '1');
	if (context.userId !== null) {
		url.searchParams.set('uid', context.userId);
	}
	url.searchParams.set('darkMode', context.darkMode ? '1' : '0');
	return url.toString();
};

/**
 * Builds a Wordiply iframe URL. Deliberately minimal, just `baseUrl`
 * unmodified, pending confirmation of what query params Wordiply actually
 * supports (none are confirmed today, see docs/puzzle-page.md). Takes
 * `context` for signature symmetry with `buildAmuseLabsUrl` (and so a
 * future confirmed Wordiply param can be added here without changing the
 * dispatcher), it is currently unused.
 */
export const buildWordiplyUrl = (
	config: WordiplyIframeConfig,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for signature symmetry, see doc comment above
	context: PuzzleUrlContext,
): string => config.baseUrl;

/**
 * Resolves a puzzle's iframe `src` URL by dispatching on
 * `config.iframe.provider` to the right provider-specific builder. This is
 * the single entry point callers should use, rather than calling
 * `buildAmuseLabsUrl`/`buildWordiplyUrl` directly.
 */
export const resolvePuzzleIframeUrl = (
	config: PuzzleConfig,
	context: PuzzleUrlContext,
): string => {
	const { iframe } = config;
	switch (iframe.provider) {
		case 'amuselabs':
			return buildAmuseLabsUrl(iframe, context);
		case 'wordiply':
			return buildWordiplyUrl(iframe, context);
		default: {
			// Exhaustiveness check: adding a new PuzzleProvider without also
			// adding a case (and builder function) here is a compile error,
			// not a silent runtime gap.
			const exhaustiveCheck: never = iframe;
			throw new Error(
				`Unhandled puzzle iframe provider: ${JSON.stringify(exhaustiveCheck)}`,
			);
		}
	}
};
