import { type Handler, Router } from 'express';

/**
 * DEVELOPMENT ONLY: mocks, until the backend provides them, the two things
 * the premium puzzles access gate (`PuzzleAccessGate.island.tsx`) needs:
 *
 * 1. `instance.requiresSubscription` on the `/PuzzlePage` payload, which the
 *    backend will compute from the puzzle's date. `puzzlePageMockOverrides`
 *    sets it on whatever payload the dev server is about to render.
 * 2. The uncached access endpoint (`PUZZLE_ACCESS_ENDPOINT`), served by
 *    `puzzleAccessMockRouter`.
 *
 * Both read the same in-memory state, changed with a plain GET so it can be
 * done from the browser address bar, for example:
 *
 * - `/puzzles-and-games/access/mock?requiresSubscription=true`
 * - `/puzzles-and-games/access/mock?hasAccess=false`
 * - `/puzzles-and-games/access/mock?delayMs=2000` (slow answer)
 * - `/puzzles-and-games/access/mock?fail=true` (the endpoint answers 500)
 * - `/puzzles-and-games/access/mock?reset=true`
 *
 * It is not mounted in production: it is only imported by `server.dev.ts`.
 */

type MockState = {
	/** `undefined` leaves the payload's own value untouched. */
	requiresSubscription: boolean | undefined;
	hasAccess: boolean;
	delayMs: number;
	fail: boolean;
};

const initialState: MockState = {
	requiresSubscription: undefined,
	hasAccess: true,
	delayMs: 0,
	fail: false,
};

let state: MockState = { ...initialState };

const parseBoolean = (value: unknown): boolean | undefined =>
	value === 'true' ? true : value === 'false' ? false : undefined;

const sleep = (ms: number) =>
	new Promise<void>((resolve) => setTimeout(resolve, ms));

export const puzzleAccessMockRouter = Router();

// The page can be opened from another origin (for example a local `frontend`
// on r.thegulocal.com), so the mock must allow cross-origin requests with the
// reader's `Authorization` header, like the real endpoint does.
puzzleAccessMockRouter.use('/puzzles-and-games/access', (req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'authorization, x-gu-is-oauth',
	});
	if (req.method === 'OPTIONS') {
		res.sendStatus(204);
		return;
	}
	next();
});

puzzleAccessMockRouter.get('/puzzles-and-games/access/mock', (req, res) => {
	if (req.query.reset === 'true') {
		state = { ...initialState };
	}

	state = {
		requiresSubscription:
			parseBoolean(req.query.requiresSubscription) ??
			state.requiresSubscription,
		hasAccess: parseBoolean(req.query.hasAccess) ?? state.hasAccess,
		delayMs: Number.isFinite(Number(req.query.delayMs))
			? Number(req.query.delayMs)
			: state.delayMs,
		fail: parseBoolean(req.query.fail) ?? state.fail,
	};

	res.json(state);
});

puzzleAccessMockRouter.get('/puzzles-and-games/access', (_req, res) => {
	void sleep(state.delayMs).then(() => {
		res.set('Cache-Control', 'no-store');
		if (state.fail) {
			res.sendStatus(500);
			return;
		}
		res.json({ hasAccess: state.hasAccess });
	});
});

/**
 * Sets `instance.requiresSubscription` on the payload about to be rendered,
 * when the mock state has a value for it.
 */
export const puzzlePageMockOverrides: Handler = (req, _res, next) => {
	const body: unknown = req.body;
	if (
		state.requiresSubscription !== undefined &&
		typeof body === 'object' &&
		body !== null &&
		'instance' in body &&
		typeof body.instance === 'object' &&
		body.instance !== null
	) {
		(body.instance as Record<string, unknown>).requiresSubscription =
			state.requiresSubscription;
	}
	next();
};
