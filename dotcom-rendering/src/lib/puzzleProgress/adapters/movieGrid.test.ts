import {
	createMovieGridAdapter,
	handleMovieGridMessage,
	movieGridGames,
} from './movieGrid';

for (const slug of ['film-reveal', 'on-the-ball']) {
	const game = movieGridGames[slug]!;
	const identity = {
		puzzleId: `api-opaque-${slug}`,
		puzzleType: game.puzzleType,
		publishDate: '2026-11-02T00:00:00Z',
	};
	const message = (event: string) => ({ event, puzzle: game.puzzle });

	describe(`${slug} progress`, () => {
		it('does not count loading the game as starting it', () => {
			const adapter = createMovieGridAdapter(game, identity)!;
			expect(adapter.start(message('start_game'))).toBeNull();
			expect(
				handleMovieGridMessage(adapter, message('start_game')),
			).toBeNull();
		});

		it('reports the first guess using the API identity, not message or URL-derived IDs', () => {
			const adapter = createMovieGridAdapter(game, identity)!;
			expect(
				handleMovieGridMessage(adapter, {
					...message('input'),
					puzzleId: 'untrusted-provider-id',
					remaining_guesses: 4,
					correct_guess: false,
				}),
			).toEqual({ ...identity, gameStatus: 'in-progress', progress: 1 });
		});

		it('reports end_game as completed, including the event emitted after confirmed Give up', () => {
			const adapter = createMovieGridAdapter(game, identity)!;
			expect(
				handleMovieGridMessage(adapter, message('end_game')),
			).toEqual({
				...identity,
				gameStatus: 'completed',
				progress: 100,
			});
		});

		it('never downgrades completion and permits a retry when the shared reporter previously skipped an update', () => {
			const adapter = createMovieGridAdapter(game, identity)!;
			handleMovieGridMessage(adapter, message('end_game'));
			expect(
				handleMovieGridMessage(adapter, message('input')),
			).toBeNull();
			expect(
				handleMovieGridMessage(adapter, message('end_game')),
			).toEqual({
				...identity,
				gameStatus: 'completed',
				progress: 100,
			});
		});

		it.each([
			null,
			undefined,
			'not-json',
			JSON.stringify(message('end_game')),
			[],
			{},
			{ event: 'end_game' },
			{ event: 'end_game', puzzle: 'different_game' },
			{ event: 'share_game', puzzle: game.puzzle },
		])('ignores unrelated or malformed messages: %j', (raw) => {
			const adapter = createMovieGridAdapter(game, identity)!;
			expect(handleMovieGridMessage(adapter, raw)).toBeNull();
		});

		it.each([
			{ puzzleId: '' },
			{ puzzleId: ' ' },
			{ puzzleType: 'SUDOKU_EASY' },
			{
				puzzleType:
					game.puzzleType === 'FILMREVEAL'
						? 'ONTHEBALL'
						: 'FILMREVEAL',
			},
			{ publishDate: '2026-11-02' },
			{ publishDate: '2026-02-30T00:00:00Z' },
			{ publishDate: '2026-11-02T12:00:00Z' },
			{ publishDate: 'invalid' },
		])('does not create an adapter for invalid identity: %j', (invalid) => {
			expect(
				createMovieGridAdapter(game, { ...identity, ...invalid }),
			).toBeUndefined();
		});
	});
}
