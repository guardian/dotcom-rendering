import type { Request, Response } from 'express';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { triviaPuzzlesContainer } from '../../fixtures/manual/puzzlesPage';
import type { EditionId } from '../lib/edition';
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

	const withConfig = (
		page: ReturnType<typeof createPuzzlePage>,
		edition: EditionId,
	) => ({
		...page,
		config: { ...page.config, edition, serverSideABTests: {} },
	});

	it('preserves trivia recommendations on existing puzzle pages without participation', () => {
		const page = withConfig(createPuzzlePage('sudoku-easy'), 'INT');
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

	it('renders the page for a known slug when the edition is International', () => {
		const res = response();
		const page = withConfig(createPuzzlePage('sudoku-easy'), 'INT');

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
	])('renders iframe-based slug %s in the International edition', (slug) => {
		const res = response();
		const page = withConfig(createPuzzlePage(slug), 'INT');

		invokeHandler(page, res);

		expect(mockedRenderPuzzlePage).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it.each(['film-reveal', 'on-the-ball'])(
		'renders %s without experiment participation in every hub edition',
		(slug) => {
			for (const edition of ['INT', 'EUR', 'AU', 'US', 'UK'] as const) {
				const res = response();
				invokeHandler(withConfig(createPuzzlePage(slug), edition), res);
				expect(res.status).toHaveBeenCalledWith(200);
			}
		},
	);

	it.each(['film-reveal', 'on-the-ball'])(
		'requires a non-empty API gameUrl for %s',
		(slug) => {
			for (const gameUrl of [undefined, '', '   ']) {
				const res = response();
				const page = withConfig(
					createPuzzlePage(slug, {
						instance: { title: slug, gameUrl },
					}),
					'INT',
				);

				invokeHandler(page, res);

				expect(res.sendStatus).toHaveBeenCalledWith(404);
			}
			expect(mockedRenderPuzzlePage).not.toHaveBeenCalled();
		},
	);

	it('renders outside the International edition in local development', () => {
		const previousNodeEnvironment = process.env.NODE_ENV;
		process.env.NODE_ENV = 'development';
		const res = response();
		const page = withConfig(createPuzzlePage('sudoku-easy'), 'UK');

		try {
			invokeHandler(page, res);
			expect(mockedRenderPuzzlePage).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
		} finally {
			if (previousNodeEnvironment === undefined) {
				delete process.env.NODE_ENV;
			} else {
				process.env.NODE_ENV = previousNodeEnvironment;
			}
		}
	});

	it('returns 404 for an unknown slug even when in the International edition', () => {
		const res = response();
		const page = withConfig(createPuzzlePage('sudoku-easy'), 'INT');
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
