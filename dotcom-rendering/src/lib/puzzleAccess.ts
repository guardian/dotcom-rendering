import { getOptionsHeaders, type SignedIn } from './identity';

/**
 * The uncached `frontend` endpoint that answers "does this reader have access
 * to this premium puzzle?". Modelled on the puzzle progress endpoints: it is
 * served from `config.ajaxUrl` (which avoids the page's CDN cache) and the
 * reader's own `Authorization` header is forwarded.
 *
 * NOTE: the path and the response shape are the proposed contract and still
 * have to be agreed with the backend. Until then it is mocked by the
 * development server (`src/server/lib/dev-puzzle-access-mock.ts`).
 */
export const PUZZLE_ACCESS_ENDPOINT = '/puzzles-and-games/access';

/**
 * The id of the positioned wrapper the page layout puts around the whole main
 * content. The gate renders the modal into it (through a portal), so the modal
 * covers the whole page content and not just the game's area.
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
 * timeout, no puzzle id) is reported as `'failed'`.
 *
 * @param baseUrl the origin to call, normally `config.ajaxUrl`
 * @param puzzleId the Puzzles API id, e.g. `guardian-sudoku-easy-20261002`
 * @param signal aborts the request (for example when the reader signs out)
 */
export const fetchPuzzleAccess = async ({
	baseUrl,
	puzzleId,
	authStatus,
	signal,
	timeoutMs = PUZZLE_ACCESS_TIMEOUT_MS,
}: {
	baseUrl: string;
	puzzleId: string | undefined;
	authStatus: SignedIn;
	signal?: AbortSignal;
	timeoutMs?: number;
}): Promise<PuzzleAccessCheckResult> => {
	if (puzzleId === undefined) return 'failed';

	const controller = new AbortController();
	const abort = () => controller.abort();
	const timer = setTimeout(abort, timeoutMs);
	signal?.addEventListener('abort', abort);

	try {
		const url = new URL(
			PUZZLE_ACCESS_ENDPOINT,
			baseUrl === '' ? window.location.origin : baseUrl,
		);
		url.searchParams.set('puzzleId', puzzleId);

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
