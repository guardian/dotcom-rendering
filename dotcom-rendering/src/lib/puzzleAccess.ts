import { getOptionsHeaders, type SignedIn } from './identity';

/**
 * The uncached `frontend` endpoint that answers "does this reader have access
 * to this premium puzzle?", requested as
 * `<PUZZLE_ACCESS_ENDPOINT>/<puzzleId>/<date>`. It is served from
 * `config.ajaxUrl` and the reader's own `Authorization` header is forwarded.
 * `frontend` relays it to the Puzzles API, which owns the rule and is the
 * authority.
 *
 * The id and the date are path parameters, not a query string: query
 * parameters are stripped by the CDN in CODE and PROD (see
 * `PuzzlesArchiveCalendar.island.tsx`), and nothing here may depend on how the
 * CDN treats a request. The route also has to be allowed in the router
 * (`router.conf` in guardian/platform), like the archive data routes.
 */
export const PUZZLE_ACCESS_ENDPOINT = '/puzzles-and-games/access';

/**
 * The id of the page layout's positioned `<main>`. The gate renders the modal
 * into it (through a portal), so the modal covers the whole page content and
 * not just the game's area.
 */
export const PUZZLE_MODAL_ROOT_ID = 'puzzle-modal-root';

/**
 * How long to wait for the access check before treating it as failed.
 */
export const PUZZLE_ACCESS_TIMEOUT_MS = 3000;

/** The outcome of asking the backend about the reader's access. */
export type PuzzleAccessCheckResult = 'granted' | 'denied' | 'failed';

/** What the reader looks like, once their auth state is known. */
export type PuzzleReader = {
	isSignedIn: boolean;
	/**
	 * Whether the reader has the `adFree` benefit (the `GU_AF1` cookie).
	 * Supporter Plus and Digital Pack both include ad-free reading, so this
	 * is a good hint that the reader is a subscriber. It is only a hint: the
	 * backend is always the authority.
	 */
	hasAdFreeHint: boolean;
};

/** What the page shows in place of the game. */
export type PuzzleAccessView =
	/** The game. */
	| 'board'
	/** An empty box with the game's height: neither the game nor the modal. */
	| 'placeholder'
	/** The "unlock premium puzzles" modal, over an empty box. */
	| 'modal';

/**
 * The evidence that lets us assume access when we cannot find out for sure:
 * a signed in reader with the ad-free benefit.
 */
const isLikelySubscriber = (reader: PuzzleReader): boolean =>
	reader.isSignedIn && reader.hasAdFreeHint;

/**
 * Decides what to show. Pure, so every case can be tested.
 *
 * - Free puzzles (or when the backend does not say otherwise) always show the
 *   game, immediately, and nothing is asked.
 * - Premium puzzles:
 *   - signed out: the modal, with no request (no session, no subscription);
 *   - signed in with the ad-free hint: the game straight away, and it is only
 *     replaced by the modal if the backend then says there is no access;
 *   - signed in without the hint: an empty box until the backend answers.
 *   - if the check fails or times out, access is only assumed for readers
 *     with the evidence above (signed in and ad-free). Anyone else gets the
 *     modal, so a failure on our side never unlocks everything.
 *
 * @param reader `undefined` until the reader's auth state is known.
 * @param check `undefined` until the backend has answered (or failed).
 */
export const getPuzzleAccessView = ({
	requiresSubscription,
	reader,
	check,
}: {
	requiresSubscription: boolean;
	reader: PuzzleReader | undefined;
	check: PuzzleAccessCheckResult | undefined;
}): PuzzleAccessView => {
	if (!requiresSubscription) return 'board';
	if (reader === undefined) return 'placeholder';
	if (!reader.isSignedIn) return 'modal';

	switch (check) {
		case 'granted':
			return 'board';
		case 'denied':
			return 'modal';
		case 'failed':
			return isLikelySubscriber(reader) ? 'board' : 'modal';
		case undefined:
			return isLikelySubscriber(reader) ? 'board' : 'placeholder';
	}
};

const isAccessResponse = (value: unknown): value is { hasAccess: boolean } =>
	typeof value === 'object' &&
	value !== null &&
	'hasAccess' in value &&
	typeof value.hasAccess === 'boolean';

/**
 * Asks the backend whether the signed in reader may play a premium puzzle.
 * Never throws: any failure (network error, non-2xx status, invalid body,
 * timeout, no puzzle id or date) is reported as `'failed'`.
 *
 * @param baseUrl the origin to call, normally `config.ajaxUrl`
 * @param puzzleId the Puzzles API id, e.g. `guardian-sudoku-easy-20261002`
 * @param puzzleDate the UK day the puzzle was published on, as `YYYY-MM-DD`
 * (`instance.puzzleDate`). The Puzzles API only uses it to find the puzzle
 * from its id, and decides from the puzzle's own publish date, so a wrong
 * date is a "not found", never a free puzzle.
 * @param signal aborts the request (for example when the reader signs out)
 */
export const fetchPuzzleAccess = async ({
	baseUrl,
	puzzleId,
	puzzleDate,
	authStatus,
	signal,
	timeoutMs = PUZZLE_ACCESS_TIMEOUT_MS,
}: {
	baseUrl: string;
	puzzleId: string | undefined;
	puzzleDate: string | null | undefined;
	authStatus: SignedIn;
	signal?: AbortSignal;
	timeoutMs?: number;
}): Promise<PuzzleAccessCheckResult> => {
	if (
		puzzleId === undefined ||
		puzzleDate === undefined ||
		puzzleDate === null ||
		puzzleDate === ''
	) {
		return 'failed';
	}

	const controller = new AbortController();
	const abort = () => controller.abort();
	const timer = setTimeout(abort, timeoutMs);
	signal?.addEventListener('abort', abort);

	try {
		const url = new URL(
			`${PUZZLE_ACCESS_ENDPOINT}/${encodeURIComponent(puzzleId)}/${encodeURIComponent(puzzleDate)}`,
			baseUrl === '' ? window.location.origin : baseUrl,
		);

		const response = await fetch(url, {
			mode: 'cors',
			...getOptionsHeaders(authStatus),
			signal: controller.signal,
		});

		if (!response.ok) return 'failed';

		const body: unknown = await response.json();
		if (!isAccessResponse(body)) return 'failed';

		return body.hasAccess ? 'granted' : 'denied';
	} catch {
		return 'failed';
	} finally {
		clearTimeout(timer);
		signal?.removeEventListener('abort', abort);
	}
};
