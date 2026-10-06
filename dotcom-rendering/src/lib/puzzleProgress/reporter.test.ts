import { getAuthStatus } from '../identity';
import {
	PUZZLE_PROGRESS_ENDPOINT,
	reportPuzzleProgress,
	resetReporterForTests,
	toApiTimestamp,
} from './reporter';
import type { PuzzleProgressEvent } from './types';

jest.mock('../identity', () => ({
	getAuthStatus: jest.fn(),
	getOptionsHeaders: jest.fn(() => ({
		headers: {
			Authorization: 'Bearer reader-token',
			'X-GU-IS-OAUTH': 'true',
		},
	})),
}));

const mockedGetAuthStatus = jest.mocked(getAuthStatus);

const signedIn = () => ({
	kind: 'SignedIn' as const,
	accessToken: {} as never,
	idToken: {} as never,
});

const progressEvent: PuzzleProgressEvent = {
	puzzleId: 'guardian-sudoku-easy-20261002',
	puzzleType: 'SUDOKU_EASY',
	publishDate: '2026-10-02T00:00:00Z',
	gameStatus: 'completed',
	progress: 100,
};

const now = new Date('2026-10-02T15:30:00.123Z');

const fetchMock = jest.fn();

beforeEach(() => {
	resetReporterForTests();
	fetchMock.mockReset();
	fetchMock.mockResolvedValue({ ok: true });
	global.fetch = fetchMock;
	mockedGetAuthStatus.mockResolvedValue(signedIn());
});

describe('toApiTimestamp', () => {
	it('drops the milliseconds', () => {
		expect(toApiTimestamp(now)).toBe('2026-10-02T15:30:00Z');
	});
});

describe('reportPuzzleProgress', () => {
	it('sends a one item array to the frontend proxy with the reader token', async () => {
		await expect(reportPuzzleProgress(progressEvent, now)).resolves.toBe(
			true,
		);

		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
		expect(url).toBe(PUZZLE_PROGRESS_ENDPOINT);
		expect(init.method).toBe('PUT');

		const headers = init.headers as Headers;
		expect(headers.get('Authorization')).toBe('Bearer reader-token');
		expect(headers.get('Content-Type')).toBe('application/json');

		expect(JSON.parse(init.body as string)).toEqual([
			{ ...progressEvent, lastUpdated: '2026-10-02T15:30:00Z' },
		]);
	});

	it('never sends an identity or an API key', async () => {
		await reportPuzzleProgress(progressEvent, now);

		const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
		expect(init.body as string).not.toMatch(/identity|api-?key/i);
		expect((init.headers as Headers).has('X-Api-Key')).toBe(false);
	});

	it('does nothing for a signed-out reader', async () => {
		mockedGetAuthStatus.mockResolvedValue({ kind: 'SignedOut' });

		await expect(reportPuzzleProgress(progressEvent, now)).resolves.toBe(
			false,
		);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('does not resend an unchanged status for the same puzzle', async () => {
		await reportPuzzleProgress(progressEvent, now);
		await expect(reportPuzzleProgress(progressEvent, now)).resolves.toBe(
			false,
		);

		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it('does not remember an update the proxy rejected, so it can be retried', async () => {
		fetchMock.mockResolvedValueOnce({ ok: false });

		await expect(reportPuzzleProgress(progressEvent, now)).resolves.toBe(
			false,
		);
		await expect(reportPuzzleProgress(progressEvent, now)).resolves.toBe(
			true,
		);
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});

	it('never throws when the request fails', async () => {
		const consoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => undefined);
		fetchMock.mockRejectedValue(new Error('offline'));

		await expect(reportPuzzleProgress(progressEvent, now)).resolves.toBe(
			false,
		);

		consoleError.mockRestore();
	});
});
