import type { Request, Response } from 'express';
import { createGamePage } from '../../fixtures/manual/gamePage';
import {
	gamePageExperiment,
	gamePageParticipation,
} from '../lib/gamePageExperiment';
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

const pageWithParticipations = (
	slug: string,
	serverSideABTests: Record<string, string>,
) =>
	createGamePage(slug, {
		config: {
			...createGamePage(slug).config,
			serverSideABTests,
		},
	});

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

	it('renders the page for the configured variant', () => {
		const res = response();
		const page = pageWithParticipations(
			'crossword',
			gamePageParticipation(gamePageExperiment.variant),
		);

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

	it.each([
		['sudoku-easy', gamePageParticipation(gamePageExperiment.variant)],
		['wordiply', gamePageParticipation(gamePageExperiment.variant)],
		['on-the-ball', gamePageParticipation(gamePageExperiment.variant)],
		['film-reveal', gamePageParticipation(gamePageExperiment.variant)],
	])('renders iframe-based slug %s', (slug, participation) => {
		const res = response();
		const page = pageWithParticipations(slug, participation);

		invokeHandler(page, res);

		expect(mockedRenderGamePage).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
	});

	it.each([
		['control', gamePageParticipation(gamePageExperiment.control)],
		['absent', {}],
		['malformed', gamePageParticipation('variant:extra')],
		['unknown group', gamePageParticipation('unknown')],
		['unrelated', { 'another-test': 'variant' }],
	])('returns 404 and does not render for %s participation', (_, tests) => {
		const res = response();

		invokeHandler(pageWithParticipations('crossword', tests), res);

		expect(res.sendStatus).toHaveBeenCalledWith(404);
		expect(mockedRenderGamePage).not.toHaveBeenCalled();
	});

	it('returns 404 for an unknown slug even with an enabled participation', () => {
		const res = response();
		const page = pageWithParticipations(
			'crossword',
			gamePageParticipation(gamePageExperiment.variant),
		);
		page.slug = 'not-a-real-game';

		invokeHandler(page, res);

		expect(res.sendStatus).toHaveBeenCalledWith(404);
		expect(mockedRenderGamePage).not.toHaveBeenCalled();
	});

	it('rejects an invalid payload without invoking the renderer', () => {
		const res = response();
		const invalidPage = pageWithParticipations(
			'crossword',
			gamePageParticipation(gamePageExperiment.variant),
		) as unknown as Record<string, unknown>;
		delete invalidPage.instance;

		expect(() => invokeHandler(invalidPage, res)).toThrow(TypeError);
		expect(mockedRenderGamePage).not.toHaveBeenCalled();
	});
});
