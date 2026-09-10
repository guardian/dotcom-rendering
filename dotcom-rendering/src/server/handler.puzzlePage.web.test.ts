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

	it('renders the page for a known slug regardless of serverSideABTests', () => {
		const res = response();
		const page = createPuzzlePage('sudoku-easy');

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
		const page = createPuzzlePage(slug);

		invokeHandler(page, res);

		expect(mockedRenderPuzzlePage).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it.each([
		['absent', {}],
		['unrelated', { 'another-test': 'variant' }],
	])(
		'renders the page regardless of serverSideABTests content (%s)',
		(_, serverSideABTests) => {
			const res = response();
			const page = createPuzzlePage('sudoku-easy', {
				config: {
					...createPuzzlePage('sudoku-easy').config,
					serverSideABTests,
				},
			});

			invokeHandler(page, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(mockedRenderPuzzlePage).toHaveBeenCalled();
		},
	);

	it('returns 404 for an unknown slug', () => {
		const res = response();
		const page = createPuzzlePage('sudoku-easy');
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
