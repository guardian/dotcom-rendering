import type {
	PuzzleProgressAdapter,
	PuzzleProgressEvent,
	PuzzleProgressIdentity,
} from '../types';

type MovieGridGame = {
	origin: string;
	puzzle: 'film_reveal' | 'on_the_ball';
	puzzleType: 'FILMREVEAL' | 'ONTHEBALL';
};

export const movieGridGames: Record<string, MovieGridGame | undefined> = {
	'film-reveal': {
		origin: 'https://moviegrid.io',
		puzzle: 'film_reveal',
		puzzleType: 'FILMREVEAL',
	},
	'on-the-ball': {
		origin: 'https://sportsreveal.io',
		puzzle: 'on_the_ball',
		puzzleType: 'ONTHEBALL',
	},
};

/** The provider messages omit identity; use only the API identity supplied by frontend. */
export const createMovieGridAdapter = (
	game: MovieGridGame,
	identity: PuzzleProgressIdentity,
): PuzzleProgressAdapter | undefined => {
	if (
		!identity.puzzleId.trim() ||
		identity.puzzleType !== game.puzzleType ||
		!/^\d{4}-\d{2}-\d{2}T00:00:00Z$/.test(identity.publishDate) ||
		!Number.isFinite(Date.parse(identity.publishDate)) ||
		new Date(identity.publishDate).toISOString() !==
			identity.publishDate.replace('Z', '.000Z')
	) {
		return undefined;
	}

	let completed = false;
	const matchesEvent = (raw: unknown, event: string): boolean =>
		typeof raw === 'object' &&
		raw !== null &&
		!Array.isArray(raw) &&
		'event' in raw &&
		raw.event === event &&
		'puzzle' in raw &&
		raw.puzzle === game.puzzle;

	const progress = (
		gameStatus: PuzzleProgressEvent['gameStatus'],
		percentage: number,
	): PuzzleProgressEvent => ({
		puzzleId: identity.puzzleId,
		puzzleType: game.puzzleType,
		publishDate: identity.publishDate,
		gameStatus,
		progress: percentage,
	});

	return {
		// start_game fires on loading, before the reader has played.
		start: () => null,
		update: (raw) =>
			!completed && matchesEvent(raw, 'input')
				? progress('in-progress', 1)
				: null,
		complete: (raw) => {
			if (!matchesEvent(raw, 'end_game')) return null;
			// Finishing includes confirmed Give up, not just a correct solution.
			completed = true;
			return progress('completed', 100);
		},
	};
};

export const handleMovieGridMessage = (
	adapter: PuzzleProgressAdapter,
	raw: unknown,
): PuzzleProgressEvent | null => {
	if (typeof raw !== 'object' || raw === null || !('event' in raw)) {
		return null;
	}
	switch (raw.event) {
		case 'input':
			return adapter.update(raw);
		case 'end_game':
			return adapter.complete(raw);
		default:
			return null;
	}
};
