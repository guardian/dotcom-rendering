import type { PuzzleItem } from '../types/puzzlesPage';
import { getAuthStatus } from './identity';
import { loadPuzzleProgress, withProgress } from './puzzleCardProgress';

jest.mock('./identity', () => ({ getAuthStatus: jest.fn() }));

const mockedGetAuthStatus = jest.mocked(getAuthStatus);

const easy: PuzzleItem = {
	id: 'sudoku-easy',
	title: 'Easy sudoku',
	type: 'sudoku',
	set: 'easy',
	cardVariant: 'compact',
};
const medium: PuzzleItem = { ...easy, id: 'sudoku-medium', set: 'medium' };

const respond = (ok: boolean, body: unknown) => {
	global.fetch = jest.fn().mockResolvedValue({
		ok,
		json: () => Promise.resolve(body),
	});
};

describe('withProgress', () => {
	it('sets progress only on cards the API reports, leaving the rest', () => {
		const result = withProgress(
			[easy, medium],
			[
				{
					puzzleType: 'SUDOKU_EASY',
					publishDate: '2026-10-11',
					progress: 40,
					gameStatus: 'in-progress',
				},
			],
		);
		expect(result[0]).toEqual({
			...easy,
			progress: 40,
			gameStatus: 'in-progress',
		});
		expect(result[1]).toBe(medium);
	});
});

describe('loadPuzzleProgress', () => {
	beforeEach(() => {
		mockedGetAuthStatus.mockResolvedValue({ kind: 'SignedOut' } as never);
	});

	afterEach(() => {
		Reflect.deleteProperty(global, 'fetch');
		jest.clearAllMocks();
	});

	it('returns the reported progress', async () => {
		respond(true, {
			results: [
				{
					puzzleType: 'SUDOKU_EASY',
					publishDate: '2026-10-11',
					progress: 40,
					gameStatus: 'in-progress',
				},
			],
		});
		await expect(loadPuzzleProgress()).resolves.toEqual([
			{
				puzzleType: 'SUDOKU_EASY',
				publishDate: '2026-10-11',
				progress: 40,
				gameStatus: 'in-progress',
			},
		]);
	});

	it('ignores a status it does not recognise', async () => {
		respond(true, {
			results: [
				{
					puzzleType: 'SUDOKU_EASY',
					publishDate: '2026-10-11',
					progress: 40,
					gameStatus: 'paused',
				},
			],
		});
		const [item] = (await loadPuzzleProgress()) ?? [];
		expect(item).not.toHaveProperty('gameStatus');
	});

	it.each([
		['an error response', () => respond(false, {})],
		['an unexpected payload', () => respond(true, { results: 'nope' })],
		[
			'a network failure',
			() => {
				global.fetch = jest
					.fn()
					.mockRejectedValue(new Error('offline'));
			},
		],
	])('resolves undefined on %s', async (_name, arrange) => {
		arrange();
		await expect(loadPuzzleProgress()).resolves.toBeUndefined();
	});

	it('resolves undefined when identity fails', async () => {
		mockedGetAuthStatus.mockRejectedValue(new Error('identity'));
		await expect(loadPuzzleProgress()).resolves.toBeUndefined();
	});
});
