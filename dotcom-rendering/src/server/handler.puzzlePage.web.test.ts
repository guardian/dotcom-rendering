import type { Request, Response } from 'express';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { triviaPuzzlesContainer } from '../../fixtures/manual/puzzlesPage';
import { handlePuzzlePage } from './handler.puzzlePage.web';
import { renderPuzzlePage } from './render.puzzlePage.web';

jest.mock('./render.puzzlePage.web', () => ({
	renderPuzzlePage: jest.fn(),
}));

const mockedRenderPuzzlePage = jest.mocked(renderPuzzlePage);

const response = () => {
	const res = {
		status: jest.fn(),
		set: jest.fn(),
		send: jest.fn(),
		sendStatus: jest.fn(),
	};
	res.status.mockReturnValue(res);
	res.set.mockReturnValue(res);
	res.send.mockReturnValue(res);
	res.sendStatus.mockReturnValue(res);
	return res;
};

const invokeHandler = (body: unknown, res: ReturnType<typeof response>) =>
	handlePuzzlePage(
		{ body } as Request,
		res as unknown as Response,
		jest.fn(),
	);

describe('handlePuzzlePage', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockedRenderPuzzlePage.mockReturnValue({
			html: '<html>Puzzle</html>',
			prefetchScripts: ['/assets/index.js'],
		});
	});

	const withoutParticipation = (
		page: ReturnType<typeof createPuzzlePage>,
	) => ({
		...page,
		config: { ...page.config, serverSideABTests: {} },
	});

	it('preserves trivia recommendations on existing puzzle pages without participation', () => {
		const page = withoutParticipation(createPuzzlePage('sudoku-easy'));
		const existing = page.instance.moreFromPuzzlesAndGames!;
		page.instance.moreFromPuzzlesAndGames = [
			...existing,
			...triviaPuzzlesContainer.content.items[0]!,
		];
		const res = response();
		invokeHandler(page, res);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(
			mockedRenderPuzzlePage.mock.calls[0]![0].puzzlePage.instance
				.moreFromPuzzlesAndGames,
		).toEqual(page.instance.moreFromPuzzlesAndGames);
	});

	it('renders the page for a known slug', () => {
		const res = response();
		const page = withoutParticipation(createPuzzlePage('sudoku-easy'));

		invokeHandler(page, res);

		expect(mockedRenderPuzzlePage).toHaveBeenCalledWith({
			puzzlePage: {
				...page,
				puzzleConfig: expect.objectContaining({
					slug: 'sudoku-easy',
				}),
			},
		});
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.set).toHaveBeenCalledWith(
			'Link',
			expect.stringContaining('/assets/index.js'),
		);
		expect(res.send).toHaveBeenCalledWith('<html>Puzzle</html>');
	});

	it.each([
		'sudoku-easy',
		'sudoku-medium',
		'sudoku-hard',
		'sudoku-killer',
		'word-wheel',
		'wordiply',
	])('renders iframe-based slug %s', (slug) => {
		const res = response();
		const page = withoutParticipation(createPuzzlePage(slug));

		invokeHandler(page, res);

		expect(mockedRenderPuzzlePage).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it.each(['film-reveal', 'on-the-ball'])(
		'renders %s without experiment participation',
		(slug) => {
			const res = response();
			invokeHandler(withoutParticipation(createPuzzlePage(slug)), res);
			expect(res.status).toHaveBeenCalledWith(200);
		},
	);

	it.each(['film-reveal', 'on-the-ball'])(
		'requires a non-empty API gameUrl for %s',
		(slug) => {
			for (const gameUrl of [undefined, '', '   ']) {
				const res = response();
				const page = withoutParticipation(
					createPuzzlePage(slug, {
						instance: { title: slug, gameUrl },
					}),
				);

				invokeHandler(page, res);

				expect(res.sendStatus).toHaveBeenCalledWith(404);
			}
			expect(mockedRenderPuzzlePage).not.toHaveBeenCalled();
		},
	);

	it('returns 404 for an unknown slug', () => {
		const res = response();
		const page = withoutParticipation(createPuzzlePage('sudoku-easy'));
		page.slug = 'not-a-real-puzzle';

		invokeHandler(page, res);

		expect(res.sendStatus).toHaveBeenCalledWith(404);
		expect(mockedRenderPuzzlePage).not.toHaveBeenCalled();
	});

	it('rejects an invalid payload without invoking the renderer', () => {
		const res = response();
		const invalidPage = createPuzzlePage(
			'sudoku-easy',
		) as unknown as Record<string, unknown>;
		delete invalidPage.instance;

		expect(() => invokeHandler(invalidPage, res)).toThrow(TypeError);
		expect(mockedRenderPuzzlePage).not.toHaveBeenCalled();
	});
});
