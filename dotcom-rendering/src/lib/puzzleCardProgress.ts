import type { PuzzleItem } from '../types/puzzlesPage';
import { getAuthStatus } from './identity';
import type { GameStatus } from './puzzleProgress/types';

export type PuzzleProgressItem = {
	puzzleType: string;
	publishDate: string;
	progress: number;
	/** The Puzzles API's own state; absent if it sent none we recognise. */
	gameStatus?: GameStatus;
	setterName?: string;
	gameUrl?: string;
};

const puzzleTypesByCard = new Map<string, string>([
	['crossword:quick', 'CROSSWORD_QUICK'],
	['crossword:mini', 'CROSSWORD_MINI'],
	['crossword:cryptic', 'CROSSWORD_CRYPTIC'],
	['crossword:quick-cryptic', 'CROSSWORD_QUICKCRYPTIC'],
	['crossword:weekend', 'CROSSWORD_WEEKEND'],
	['crossword:prize', 'CROSSWORD_PRIZE'],
	['crossword:quiptic', 'CROSSWORD_QUIPTIC'],
	['crossword:sunday-quick', 'CROSSWORD_SUNDAYQUICK'],
	['sudoku:easy', 'SUDOKU_EASY'],
	['sudoku:medium', 'SUDOKU_MEDIUM'],
	['sudoku:hard', 'SUDOKU_HARD'],
	['sudoku:killer', 'SUDOKU_KILLER'],
	['word-wheel:all', 'WORDWHEEL'],
	['wordiply:all', 'WORDIPLY'],
]);

export const puzzleTypeForCard = (item: PuzzleItem): string | undefined =>
	puzzleTypesByCard.get(`${item.type}:${item.set}`);

const gameStatuses: readonly string[] = [
	'not-started',
	'in-progress',
	'completed',
];

export const isGameStatus = (value: unknown): value is GameStatus =>
	typeof value === 'string' && gameStatuses.includes(value);

export const parseProgressItems = (
	value: unknown,
): PuzzleProgressItem[] | undefined => {
	if (typeof value !== 'object' || value === null) return undefined;
	const results = (value as Record<string, unknown>).results;
	if (!Array.isArray(results)) return undefined;

	const items: PuzzleProgressItem[] = [];
	for (const result of results) {
		if (typeof result !== 'object' || result === null) return undefined;
		const item = result as Record<string, unknown>;
		if (
			typeof item.puzzleType !== 'string' ||
			typeof item.publishDate !== 'string' ||
			typeof item.progress !== 'number' ||
			(item.setterName != null && typeof item.setterName !== 'string') ||
			(item.gameUrl != null && typeof item.gameUrl !== 'string')
		) {
			return undefined;
		}
		items.push({
			puzzleType: item.puzzleType,
			publishDate: item.publishDate,
			progress: item.progress,
			...(typeof item.setterName === 'string'
				? { setterName: item.setterName }
				: {}),
			...(isGameStatus(item.gameStatus)
				? { gameStatus: item.gameStatus }
				: {}),
			...(typeof item.gameUrl === 'string'
				? { gameUrl: item.gameUrl }
				: {}),
		});
	}
	return items;
};

const requestProgress = async (): Promise<PuzzleProgressItem[] | undefined> => {
	const authStatus = await getAuthStatus();
	const headers: Record<string, string> = { Accept: 'application/json' };
	if (authStatus.kind === 'SignedIn') {
		headers.Authorization = `Bearer ${authStatus.accessToken.accessToken}`;
	}

	const response = await fetch(
		`${window.guardian.config.page.ajaxUrl}/puzzles-and-games/progress`,
		{
			cache: 'no-store',
			credentials: 'same-origin',
			headers,
		},
	);
	if (!response.ok) return undefined;
	return parseProgressItems(await response.json());
};

/**
 * The reader's progress on today's puzzles, or `undefined` whenever it cannot
 * be had (signed out, offline, error response, unexpected payload). Never
 * rejects: callers keep the server-rendered cards.
 */
export const loadPuzzleProgress = async (): Promise<
	PuzzleProgressItem[] | undefined
> => {
	const [result] = await Promise.allSettled([requestProgress()]);
	return result.status === 'fulfilled' ? result.value : undefined;
};

/**
 * Sets `progress` on every card the API reports on, leaving everything else
 * (label, date, link) as the server sent it.
 */
export const withProgress = (
	items: PuzzleItem[],
	progress: PuzzleProgressItem[],
): PuzzleItem[] => {
	const byType = new Map(progress.map((item) => [item.puzzleType, item]));
	return items.map((item) => {
		const puzzleType = puzzleTypeForCard(item);
		const reported =
			puzzleType !== undefined ? byType.get(puzzleType) : undefined;
		return reported
			? {
					...item,
					progress: reported.progress,
					gameStatus: reported.gameStatus,
				}
			: item;
	});
};
