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

	const withServerSideABTests = (
		page: ReturnType<typeof createPuzzlePage>,
		serverSideABTests: Record<string, string>,
	) => ({
		...page,
		config: { ...page.config, serverSideABTests },
	});

	it('omits V2 recommendations from existing V1 puzzle pages', () => {
		const page = withServerSideABTests(createPuzzlePage('sudoku-easy'), {
			'puzzles-new-hub-v1': 'variant',
		});
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
		).toEqual(existing);
	});

	it('renders the page for a known slug when the puzzles-new-hub-v1 variant is active', () => {
		const res = response();
		const page = withServerSideABTests(createPuzzlePage('sudoku-easy'), {
			'puzzles-new-hub-v1': 'variant',
		});

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
	])('renders V1 iframe-based slug %s when in variant', (slug) => {
		const res = response();
		const page = withServerSideABTests(createPuzzlePage(slug), {
			'puzzles-new-hub-v1': 'variant',
		});

		invokeHandler(page, res);

		expect(mockedRenderPuzzlePage).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it.each(['film-reveal', 'on-the-ball'])(
		'gates %s behind cumulative V2 participation',
		(slug) => {
			for (const [serverSideABTests, allowed] of [
				[{ 'puzzles-new-hub-v1': 'variant' }, false],
				[{ 'puzzles-new-hub-v2': 'variant' }, false],
				[
					{
						'puzzles-new-hub-v1': 'variant',
						'puzzles-new-hub-v2': 'control',
					},
					false,
				],
				[
					{
						'puzzles-new-hub-v1': 'variant',
						'puzzles-new-hub-v2': 'unknown',
					},
					false,
				],
				[
					{
						'puzzles-new-hub-v1': 'variant',
						'puzzles-new-hub-v2': 'variant',
					},
					true,
				],
			] as const) {
				mockedRenderPuzzlePage.mockClear();
				const res = response();
				invokeHandler(
					withServerSideABTests(
						createPuzzlePage(slug),
						serverSideABTests,
					),
					res,
				);
				if (allowed) {
					expect(res.status).toHaveBeenCalledWith(200);
					expect(mockedRenderPuzzlePage).toHaveBeenCalledTimes(1);
				} else {
					expect(res.sendStatus).toHaveBeenCalledWith(404);
					expect(mockedRenderPuzzlePage).not.toHaveBeenCalled();
				}
			}
		},
	);

	it.each(['film-reveal', 'on-the-ball'])(
		'requires a non-empty API gameUrl for %s',
		(slug) => {
			for (const gameUrl of [undefined, '', '   ']) {
				const res = response();
				const page = withServerSideABTests(
					createPuzzlePage(slug, {
						instance: { title: slug, gameUrl },
					}),
					{
						'puzzles-new-hub-v1': 'variant',
						'puzzles-new-hub-v2': 'variant',
					},
				);

				invokeHandler(page, res);

				expect(res.sendStatus).toHaveBeenCalledWith(404);
			}
			expect(mockedRenderPuzzlePage).not.toHaveBeenCalled();
		},
	);

	it('renders without experiment participation in local development', () => {
		const previousNodeEnvironment = process.env.NODE_ENV;
		process.env.NODE_ENV = 'development';
		const res = response();
		const page = withServerSideABTests(createPuzzlePage('sudoku-easy'), {});

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

	it.each([
		['control', { 'puzzles-new-hub-v1': 'control' }],
		['missing', {}],
		['unknown group', { 'puzzles-new-hub-v1': 'unknown' }],
		['unrelated', { 'another-test': 'variant' }],
	])(
		'returns 404 without mounting the renderer for %s',
		(_, serverSideABTests) => {
			const res = response();
			const page = withServerSideABTests(
				createPuzzlePage('sudoku-easy'),
				serverSideABTests,
			);

			invokeHandler(page, res);

			expect(res.sendStatus).toHaveBeenCalledWith(404);
			expect(mockedRenderPuzzlePage).not.toHaveBeenCalled();
		},
	);

	it('returns 404 for an unknown slug even when in variant', () => {
		const res = response();
		const page = withServerSideABTests(createPuzzlePage('sudoku-easy'), {
			'puzzles-new-hub-v1': 'variant',
		});
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
