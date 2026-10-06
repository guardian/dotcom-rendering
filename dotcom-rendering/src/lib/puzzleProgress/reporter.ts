import { getAuthStatus, getOptionsHeaders } from '../identity';
import type { PuzzleProgressEvent, PuzzleProgressUpdate } from './types';

/**
 * The `frontend` proxy for the Puzzles API's `PUT /progress`. The browser
 * never talks to the Puzzles API directly: `frontend` adds the API key, which
 * must stay server-side. The reader's own `Authorization` header is forwarded
 * and the Puzzles API derives the identity from it.
 */
export const PUZZLE_PROGRESS_ENDPOINT = '/puzzles-and-games/progress';

/** `YYYY-MM-DDTHH:mm:ssZ`, as the Puzzles API expects (no milliseconds). */
export const toApiTimestamp = (date: Date): string =>
	date.toISOString().replace(/\.\d{3}Z$/, 'Z');

/**
 * The last status sent per puzzle, so an unchanged event is not sent again.
 */
const lastSent = new Map<string, string>();

const signature = (event: PuzzleProgressEvent): string =>
	`${event.gameStatus}:${event.progress}`;

/**
 * Reports one progress event for the signed-in reader.
 *
 * Never throws and never blocks the game: signed-out readers are skipped
 * (the API would answer 401) and any failure is logged and swallowed.
 *
 * @returns whether the update was accepted by the proxy.
 */
export const reportPuzzleProgress = async (
	event: PuzzleProgressEvent,
	now: Date = new Date(),
): Promise<boolean> => {
	try {
		if (lastSent.get(event.puzzleId) === signature(event)) return false;

		const authStatus = await getAuthStatus();
		if (authStatus.kind !== 'SignedIn') return false;

		const update: PuzzleProgressUpdate = {
			...event,
			lastUpdated: toApiTimestamp(now),
		};

		const headers = new Headers(getOptionsHeaders(authStatus).headers);
		headers.set('Content-Type', 'application/json');

		const response = await fetch(PUZZLE_PROGRESS_ENDPOINT, {
			method: 'PUT',
			headers,
			body: JSON.stringify([update]),
		});

		if (!response.ok) return false;

		lastSent.set(event.puzzleId, signature(event));
		return true;
	} catch (error) {
		// eslint-disable-next-line no-console -- reporting must never break the game
		console.error('Failed to report puzzle progress', error);
		return false;
	}
};

/** For tests only. */
export const resetReporterForTests = (): void => lastSent.clear();
