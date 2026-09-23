import type { Request, Response } from 'express';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
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

	it('renders the page for a known slug when the puzzles-new-hub variant is active', () => {
		const res = response();
		const page = withServerSideABTests(createPuzzlePage('sudoku-easy'), {
			'puzzles-new-hub': 'variant',
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
	])('renders iframe-based slug %s when in variant', (slug) => {
		const res = response();
		const page = withServerSideABTests(createPuzzlePage(slug), {
			'puzzles-new-hub': 'variant',
		});

		invokeHandler(page, res);

		expect(mockedRenderPuzzlePage).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
	});

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
		['control', { 'puzzles-new-hub': 'control' }],
		['missing', {}],
		['unknown group', { 'puzzles-new-hub': 'unknown' }],
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
			'puzzles-new-hub': 'variant',
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
