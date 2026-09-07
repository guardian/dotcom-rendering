import type { Request, Response } from 'express';
import { createGamePage } from '../../fixtures/manual/gamePage';
import { handleGamePage } from './handler.gamePage.web';
import { renderGamePage } from './render.gamePage.web';

jest.mock('./render.gamePage.web', () => ({
	renderGamePage: jest.fn(),
}));

const mockedRenderGamePage = jest.mocked(renderGamePage);

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
	handleGamePage({ body } as Request, res as unknown as Response, jest.fn());

describe('handleGamePage', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		mockedRenderGamePage.mockReturnValue({
			html: '<html>Game</html>',
			prefetchScripts: ['/assets/index.js'],
		});
	});

	it('renders the page for a known slug regardless of serverSideABTests', () => {
		const res = response();
		const page = createGamePage('crossword');

		invokeHandler(page, res);

		expect(mockedRenderGamePage).toHaveBeenCalledWith({
			gamePage: {
				...page,
				gameConfig: expect.objectContaining({ slug: 'crossword' }),
			},
		});
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.set).toHaveBeenCalledWith(
			'Link',
			expect.stringContaining('/assets/index.js'),
		);
		expect(res.send).toHaveBeenCalledWith('<html>Game</html>');
	});

	it.each(['sudoku-easy', 'wordiply', 'on-the-ball', 'film-reveal'])(
		'renders iframe-based slug %s',
		(slug) => {
			const res = response();
			const page = createGamePage(slug);

			invokeHandler(page, res);

			expect(mockedRenderGamePage).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
		},
	);

	it.each([
		['absent', {}],
		['unrelated', { 'another-test': 'variant' }],
	])(
		'renders the page regardless of serverSideABTests content (%s)',
		(_, serverSideABTests) => {
			const res = response();
			const page = createGamePage('crossword', {
				config: {
					...createGamePage('crossword').config,
					serverSideABTests,
				},
			});

			invokeHandler(page, res);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(mockedRenderGamePage).toHaveBeenCalled();
		},
	);

	it('returns 404 for an unknown slug', () => {
		const res = response();
		const page = createGamePage('crossword');
		page.slug = 'not-a-real-game';

		invokeHandler(page, res);

		expect(res.sendStatus).toHaveBeenCalledWith(404);
		expect(mockedRenderGamePage).not.toHaveBeenCalled();
	});

	it('rejects an invalid payload without invoking the renderer', () => {
		const res = response();
		const invalidPage = createGamePage('crossword') as unknown as Record<
			string,
			unknown
		>;
		delete invalidPage.instance;

		expect(() => invokeHandler(invalidPage, res)).toThrow(TypeError);
		expect(mockedRenderGamePage).not.toHaveBeenCalled();
	});
});
